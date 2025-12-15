import { useState } from "react";
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
} from "lucide-react";

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

const openPositions = [
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

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    linkedin: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      linkedin: "",
      about: "",
    });
    setIsSubmitting(false);
  };

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
              <span className="text-gradient">Career Opportunity</span>
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

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-brand border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Apply Now
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="h-12"
                      />
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
                        className="h-12"
                      />
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
                        className="h-12"
                      />
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
                        className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select a position</option>
                        {openPositions.map((pos) => (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
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
                        className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
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
                        className="h-12"
                      />
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
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Application <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
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
                  We're actively hiring for these roles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {openPositions.slice(0, 6).map((pos) => (
                    <span
                      key={pos}
                      className="text-xs bg-secondary/20 text-primary px-3 py-1 rounded-full"
                    >
                      {pos}
                    </span>
                  ))}
                  <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                    +{openPositions.length - 6} more
                  </span>
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
