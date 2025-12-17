import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Users,
  FileCheck,
  DollarSign,
  Shield,
  HeadphonesIcon,
  Building2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Users,
      title: t("services.staffing.title"),
      description: t("services.staffing.description"),
      features: [
        "Access to pre-vetted talent pool",
        "Culture-fit assessment",
        "Skills verification",
        "Fast 21-day placement",
      ],
    },
    {
      icon: FileCheck,
      title: t("services.background.title"),
      description: t("services.background.description"),
      features: [
        "Criminal background screening",
        "Employment history verification",
        "Education credentials check",
        "Professional reference calls",
      ],
    },
    {
      icon: DollarSign,
      title: t("services.payroll.title"),
      description: t("services.payroll.description"),
      features: [
        "Multi-currency payments",
        "Tax compliance handling",
        "Timely disbursements",
        "Detailed reporting",
      ],
    },
    {
      icon: Shield,
      title: t("services.hr.title"),
      description: t("services.hr.description"),
      features: [
        "Local labor law compliance",
        "Contract management",
        "Employment documentation",
        "Risk mitigation",
      ],
    },
    {
      icon: HeadphonesIcon,
      title: t("services.support.title"),
      description: t("services.support.description"),
      features: [
        "Dedicated account manager",
        "Performance monitoring",
        "Conflict resolution",
        "Team retention strategies",
      ],
    },
    {
      icon: Building2,
      title: t("services.infrastructure.title"),
      description: t("services.infrastructure.description"),
      features: [
        "Secure communication tools",
        "Data protection protocols",
        "Collaboration platforms",
        "IT support access",
      ],
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
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-navy text-navy-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4 px-4 py-2 bg-secondary/10 rounded-full">
              {t("nav.services")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              A Complete Outsourcing{" "}
              <span className="text-secondary">Solution</span>
            </h1>
            <p className="text-xl text-navy-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Everything you need to build and manage a world-class remote team. We handle the complexity so you can focus on growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-brand transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              A simple, streamlined process to get you the talent you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Tell us about your needs and ideal candidate profile" },
              { step: "02", title: "Sourcing", desc: "We search our network for pre-vetted candidates" },
              { step: "03", title: "Selection", desc: "Review candidates and conduct interviews" },
              { step: "04", title: "Onboarding", desc: "We handle all paperwork and get them started" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Positions We Fill
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Find the Perfect Fit for Every Role
            </h2>
            <p className="text-muted-foreground">
              We source and place talent for any role that can be done remotely.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {roles.map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="bg-card rounded-full px-5 py-2.5 border border-border hover:border-primary hover:bg-primary/5 transition-colors"
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
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-navy-foreground/80 mb-8">
              Let us help you build your dream team. Schedule a free consultation to discuss your hiring needs.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                {t("nav.startHiring")} <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
