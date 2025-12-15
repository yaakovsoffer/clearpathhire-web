import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const services = [
  {
    icon: Users,
    title: "Staffing Solutions",
    description: "We source and help you onboard top, English-speaking talent in under 21 days. Leverage our expertise to find remote talent that aligns with your culture and works in your time zone.",
    features: [
      "Access to pre-vetted talent pool",
      "Culture-fit assessment",
      "Skills verification",
      "Fast 21-day placement",
    ],
  },
  {
    icon: FileCheck,
    title: "Background Checks",
    description: "Comprehensive vetting including criminal records, employment history, education verification, and professional references to ensure you hire with confidence.",
    features: [
      "Criminal background screening",
      "Employment history verification",
      "Education credentials check",
      "Professional reference calls",
    ],
  },
  {
    icon: DollarSign,
    title: "Payroll Management",
    description: "We handle everything from tax compliance to salary disbursements, ensuring your team is paid accurately and on time, regardless of their location.",
    features: [
      "Multi-currency payments",
      "Tax compliance handling",
      "Timely disbursements",
      "Detailed reporting",
    ],
  },
  {
    icon: Shield,
    title: "HR & Compliance",
    description: "Our experts help you navigate local labor laws and maintain compliance for all employment types, from contractors to full-time staff.",
    features: [
      "Local labor law compliance",
      "Contract management",
      "Employment documentation",
      "Risk mitigation",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "Dedicated account management and continuous support for both you and your remote team members, ensuring smooth operations.",
    features: [
      "Dedicated account manager",
      "Performance monitoring",
      "Conflict resolution",
      "Team retention strategies",
    ],
  },
  {
    icon: Building2,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security and tools to ensure seamless remote collaboration, data protection, and efficient team communication.",
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

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              A Complete Outsourcing{" "}
              <span className="text-gradient">Solution</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to build and manage a world-class remote team. We handle the complexity so you can focus on growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6">
                    <service.icon className="text-primary-foreground" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="text-accent flex-shrink-0" size={20} />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="bg-background rounded-3xl p-8 shadow-brand border border-border">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/30 rounded-2xl flex items-center justify-center">
                      <service.icon className="text-primary" size={80} />
                    </div>
                  </div>
                </div>
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
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Positions We Fill
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Find the Perfect Fit for Every Role
            </h2>
            <p className="text-muted-foreground">
              We source and place talent for any role that can be done remotely. Here are some of the most common positions we help fill.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {roles.map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-full px-6 py-3 border border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-default"
              >
                <span className="font-medium text-foreground">{role}</span>
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
                Start Hiring <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
