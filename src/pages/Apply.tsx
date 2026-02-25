import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  Globe,
  DollarSign,
  Shield,
  Send,
  CheckCircle,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { applyFormSchema, type ApplyFormData } from "@/lib/formValidation";
import { FormSuccessMessage } from "@/components/forms/FormSuccessMessage";

const benefits = [
  {
    icon: Globe,
    title: "Work Remotely",
    description: "Work from anywhere while collaborating with top US companies",
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Earn above-market rates with consistent, on-time payments",
  },
  {
    icon: Shield,
    title: "Full Benefits",
    description: "Healthcare, paid time off, and professional development",
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    description: "Opportunities to advance and develop your skills",
  },
];

interface CRMRole {
  id: string;
  title: string;
  description: string;
  employment_type: string;
  location: string;
  timezone: string;
  company: string;
}

const experienceOptions = [
  { value: "0-1 years", label: "0-1 years" },
  { value: "1-3 years", label: "1-3 years" },
  { value: "3-5 years", label: "3-5 years" },
  { value: "5-10 years", label: "5-10 years" },
  { value: "10+ years", label: "10+ years" },
];

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAllPositions, setShowAllPositions] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyFormData, string>>>({});
  const [crmRoles, setCrmRoles] = useState<CRMRole[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [formData, setFormData] = useState<ApplyFormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    linkedin: "",
    about: "",
  });

  // Fetch open roles from CRM
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crm-proxy?action=get-roles`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch roles");
        const rolesData = await response.json();
        setCrmRoles(rolesData.roles || []);
      } catch (err) {
        console.error("Failed to fetch CRM roles:", err);
        // Silently fail - positions dropdown will use fallback list
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedRoleId("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      linkedin: "",
      about: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "position") {
      // Find the role to set the role_id
      const role = crmRoles.find((r) => r.title === value);
      setSelectedRoleId(role?.id || "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ApplyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = applyFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ApplyFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ApplyFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email notification (existing flow)
      const emailPromise = supabase.functions.invoke("send-form-email", {
        body: {
          formType: "apply",
          ...result.data,
        },
      });

      // Submit to CRM
      const crmPayload: Record<string, unknown> = {
        full_name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        years_of_experience: experienceOptions.find(
          (o) => o.value === result.data.experience || o.label === result.data.experience
        )?.value || result.data.experience,
        about: result.data.about || undefined,
        linkedin_profile: result.data.linkedin || undefined,
      };

      if (selectedRoleId) {
        crmPayload.role_id = selectedRoleId;
      }

      const crmPromise = supabase.functions.invoke("crm-proxy?action=submit-application", {
        body: crmPayload,
      });

      // Execute both in parallel
      const [emailResult, crmResult] = await Promise.allSettled([emailPromise, crmPromise]);

      // Check email result
      if (emailResult.status === "rejected") {
        console.error("Email send failed:", emailResult.reason);
      } else if (emailResult.value.error) {
        console.error("Email send error:", emailResult.value.error);
      }

      // Check CRM result
      if (crmResult.status === "rejected") {
        console.error("CRM submit failed:", crmResult.reason);
      } else if (crmResult.value.error) {
        const crmError = crmResult.value.error;
        // Handle specific CRM error codes
        if (typeof crmError === "object" && crmError?.context?.status === 409) {
          toast({
            title: "Already Applied",
            description: "An application with this email already exists in our system.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        if (typeof crmError === "object" && crmError?.context?.status === 429) {
          toast({
            title: "Too Many Requests",
            description: "Please wait a moment before submitting again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        console.error("CRM submit error:", crmError);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit your application. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const positionOptions = crmRoles.length > 0
    ? crmRoles.map((r) => r.title)
    : [
        "Executive Assistant",
        "Accountant / Bookkeeper",
        "Customer Support Specialist",
        "Sales Development Representative",
        "Marketing Specialist",
        "Software Developer",
        "Data Analyst",
        "Project Manager",
        "HR Specialist",
        "Legal Assistant",
        "Content Writer",
        "Graphic Designer",
      ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Join Our Talent Network
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Next{" "}
              <span className="text-primary">Career</span>{" "}
              <span className="text-secondary">Opportunity</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Work remotely with leading US companies. Enjoy competitive pay, full benefits, and meaningful career growth.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-primary-foreground" size={26} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Open Roles from CRM */}
          {crmRoles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">
                Open Positions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crmRoles.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-brand transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {role.title}
                    </h3>
                    {role.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {role.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {role.employment_type && (
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                          <Briefcase size={12} />
                          {role.employment_type}
                        </span>
                      )}
                      {role.location && (
                        <span className="text-xs bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                          <MapPin size={12} />
                          {role.location}
                        </span>
                      )}
                      {role.timezone && (
                        <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock size={12} />
                          {role.timezone}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoleId(role.id);
                        setFormData((prev) => ({ ...prev, position: role.title }));
                        document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Apply for this role
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div id="application-form" className="grid lg:grid-cols-5 gap-12">
            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {isSubmitted ? (
                <FormSuccessMessage type="apply" onReset={handleReset} />
              ) : (
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-brand border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Apply Now
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        maxLength={100}
                        className={`h-12 ${errors.name ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        maxLength={255}
                        className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                        maxLength={30}
                        className={`h-12 ${errors.phone ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-sm text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Position of Interest *
                      </label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className={`flex h-12 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.position ? "border-destructive" : "border-input"}`}
                        aria-invalid={!!errors.position}
                        aria-describedby={errors.position ? "position-error" : undefined}
                      >
                        <option value="">
                          {rolesLoading ? "Loading positions..." : "Select a position"}
                        </option>
                        {positionOptions.map((pos) => (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
                      {errors.position && (
                        <p id="position-error" className="text-sm text-destructive mt-1">{errors.position}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Years of Experience *
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className={`flex h-12 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.experience ? "border-destructive" : "border-input"}`}
                        aria-invalid={!!errors.experience}
                        aria-describedby={errors.experience ? "experience-error" : undefined}
                      >
                        <option value="">Select experience</option>
                        {experienceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.experience && (
                        <p id="experience-error" className="text-sm text-destructive mt-1">{errors.experience}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        LinkedIn Profile
                      </label>
                      <Input
                        name="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/yourprofile"
                        maxLength={200}
                        className={`h-12 ${errors.linkedin ? "border-destructive" : ""}`}
                      />
                      {errors.linkedin && (
                        <p className="text-sm text-destructive mt-1">{errors.linkedin}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tell us about yourself *
                    </label>
                    <Textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="Share your relevant experience, skills, and why you're interested in working with US companies remotely."
                      required
                      maxLength={2000}
                      rows={5}
                      className={errors.about ? "border-destructive" : ""}
                      aria-invalid={!!errors.about}
                      aria-describedby={errors.about ? "about-error" : undefined}
                    />
                    {errors.about && (
                      <p id="about-error" className="text-sm text-destructive mt-1">{errors.about}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.about.length}/2000 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
              )}
            </motion.div>

            {/* What We Look For */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-navy rounded-3xl p-8 mb-8">
                <h3 className="text-xl font-bold text-navy-foreground mb-6">
                  What We Look For
                </h3>
                <ul className="space-y-4">
                  {[
                    "Excellent English communication skills",
                    "Reliable internet connection",
                    "Dedicated home office setup",
                    "Ability to work US business hours",
                    "Strong professional references",
                    "Passion for your craft",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-navy-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3">
                  Open Positions
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {rolesLoading ? "Loading open positions..." : `We're actively hiring for ${positionOptions.length} roles:`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(showAllPositions ? positionOptions : positionOptions.slice(0, 6)).map((pos) => (
                    <span
                      key={pos}
                      className="text-xs bg-secondary/20 text-primary px-3 py-1 rounded-full"
                    >
                      {pos}
                    </span>
                  ))}
                  {!showAllPositions && positionOptions.length > 6 && (
                    <button
                      onClick={() => setShowAllPositions(true)}
                      className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      +{positionOptions.length - 6} more
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
