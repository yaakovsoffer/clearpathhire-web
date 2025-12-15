import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@clearpathhire.com",
    description: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "United States",
    description: "Serving clients globally",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Under 24 Hours",
    description: "For all inquiries",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Let's Build Your{" "}
              <span className="text-gradient">Dream Team</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to scale with global talent? Get in touch and we'll help you find the perfect fit for your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-brand border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Start Hiring Today
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
                        placeholder="John Smith"
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
                        placeholder="john@company.com"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tell us about your hiring needs *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What positions are you looking to fill? What skills are most important?"
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
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-card rounded-2xl p-6 border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary-foreground" size={22} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-primary font-medium">{item.value}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 bg-navy rounded-2xl p-6"
              >
                <h3 className="font-semibold text-navy-foreground mb-3">
                  Free Consultation
                </h3>
                <p className="text-navy-foreground/80 text-sm mb-4">
                  Not sure where to start? Schedule a free 30-minute consultation with our team to discuss your specific needs.
                </p>
                <div className="text-secondary font-semibold">
                  Zero commitment, zero risk
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
