import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Users,
  Shield,
  DollarSign,
  ArrowRight,
  UserCheck,
  HeadphonesIcon,
  TrendingUp,
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Users,
      title: "Staffing Solutions",
      description: "Find the perfect candidates for your team with our comprehensive recruitment services.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
    },
    {
      icon: Shield,
      title: "HR & Compliance",
      description: "Stay compliant with employment laws and regulations across all jurisdictions.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    },
    {
      icon: DollarSign,
      title: "Payroll Management",
      description: "Streamlined payroll processing and benefits administration for your global team.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const benefits = [
    {
      icon: UserCheck,
      title: "Pre-Vetted Talent",
      description: "Every candidate undergoes rigorous screening including skills assessment, background checks, and cultural fit evaluation.",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description: "Your dedicated account manager ensures smooth onboarding and ongoing success for every placement.",
    },
    {
      icon: Shield,
      title: "Full Compliance",
      description: "We handle all legal, tax, and employment compliance so you can focus on growing your business.",
    },
    {
      icon: TrendingUp,
      title: "Flexible Scaling",
      description: "Easily scale your team up or down based on your business needs without long-term commitments.",
    },
  ];

  const roles = [
    "Executive Assistants",
    "Accountants & Bookkeepers",
    "Customer Support",
    "Sales Representatives",
    "Marketing Specialists",
    "Software Developers",
    "Data Analysts",
    "Project Managers",
    "HR Specialists",
    "Legal Assistants",
  ];

  return (
    <Layout>
      {/* Hero Section with Image */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[400px] lg:min-h-[500px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50" />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Custom Staffing &{" "}
                <span className="text-secondary">HR Solutions</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Your full-service partner to streamline talent acquisition, hiring, onboarding, payroll, retention, and compliance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid with Images */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need to Build Your Remote Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-brand transition-all duration-300 border border-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center">
                      <service.icon className="text-primary" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Why Choose Clear Path Hire?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Your Strategic Partner for{" "}
              <span className="text-primary">Remote Excellence.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-brand transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <benefit.icon size={28} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-16 mt-16"
          >
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">70%</div>
              <div className="text-muted-foreground">Average Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">97%</div>
              <div className="text-muted-foreground">Placement Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Roles We Fill
            </h2>
            <p className="text-muted-foreground">
              We source and place talent for any role that can be done remotely.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {roles.map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="bg-card rounded-full px-5 py-2.5 border border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-default"
              >
                <span className="text-sm font-medium text-foreground">{role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="text-secondary">Workforce?</span>
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Join hundreds of companies that have already discovered the power of 
              global talent. Start building your dream team today with zero risk.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Start Hiring Today <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-navy"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
