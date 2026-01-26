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

      {/* Services Rows */}
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

          <div className="space-y-20 lg:space-y-28">
            {/* Row 1: Staffing Solutions - Text Left, Image Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Staffing Solutions
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We source and help you onboard top, English-speaking talent in under 21 days. Leverage our expertise to find remote talent that aligns with your culture and works in your time zone.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Access to pre-vetted talent pool
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Culture-fit assessment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Skills verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Fast 21-day placement
                  </li>
                </ul>
              </div>
              <motion.div 
                className="order-1 lg:order-2"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
                    alt="Two professionals collaborating at a laptop"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Row 2: Background Checks - Image Left, Text Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop"
                    alt="Professionals shaking hands"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Background Checks
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Comprehensive vetting including criminal records, employment history, education verification, and professional references to ensure you hire with confidence.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Criminal background screening
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Employment history verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Education credentials check
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Professional reference calls
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Row 3: Payroll Management - Text Left, Image Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Payroll Management
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Streamlined global payroll processing and benefits administration for your distributed team. We handle the complexity so you don't have to.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Multi-currency payments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Tax compliance handling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Benefits administration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Automated payroll processing
                  </li>
                </ul>
              </div>
              <motion.div 
                className="order-1 lg:order-2"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600&auto=format&fit=crop"
                    alt="Modern office building"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Row 4: HR & Compliance - Image Left, Text Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop"
                    alt="HR compliance documentation"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  HR & Compliance
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Stay compliant with employment laws and regulations across all jurisdictions. We navigate the legal complexities for you.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Local labor law compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Employment contract management
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Regulatory updates monitoring
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Risk mitigation strategies
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Row 5: Ongoing Support - Text Left, Image Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Ongoing Support
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Dedicated account management ensures smooth operations and continued success with your remote team.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Performance monitoring
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Issue resolution support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Team optimization consulting
                  </li>
                </ul>
              </div>
              <motion.div 
                className="order-1 lg:order-2"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                    alt="Supportive team environment"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Row 6: Secure Infrastructure - Image Left, Text Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg rounded-bl-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
                    alt="Secure data infrastructure"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Secure Infrastructure
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Enterprise-grade security measures to protect your data and ensure technical stability for your remote operations.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Secure data storage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    Regular security audits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2.5 flex-shrink-0" />
                    99.9% uptime guarantee
                  </li>
                </ul>
              </div>
            </motion.div>
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
