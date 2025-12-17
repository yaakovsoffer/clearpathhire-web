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
  Handshake,
  TrendingUp,
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Users,
      title: t("services.staffing.title"),
      description: t("services.staffing.description"),
    },
    {
      icon: FileCheck,
      title: t("services.background.title"),
      description: t("services.background.description"),
    },
    {
      icon: DollarSign,
      title: t("services.payroll.title"),
      description: t("services.payroll.description"),
    },
    {
      icon: Shield,
      title: t("services.hr.title"),
      description: t("services.hr.description"),
    },
    {
      icon: HeadphonesIcon,
      title: t("services.support.title"),
      description: t("services.support.description"),
    },
    {
      icon: Building2,
      title: t("services.infrastructure.title"),
      description: t("services.infrastructure.description"),
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Discovery Session",
      description: "Share your hiring goals and we'll guide you on roles, markets, and comp. Then align on how to hire and what to offer.",
    },
    {
      number: "2",
      title: "Kick-Off Call",
      description: "Meet your recruiter to finalize the role and build your hiring plan. We'll align on profile, process, and timeline.",
    },
    {
      number: "3",
      title: "Interviews & Hiring",
      description: "Review 3+ top candidates in under 5 days. Interview, choose your hire, and we'll handle the rest.",
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
      <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              A 360 Solution{" "}
              <span className="text-primary">Beyond Staffing</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Your full-service partner to streamline talent acquisition, hiring, onboarding, payroll, retention, and compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              How Our Proven Hiring<br />Process Works
            </h2>
          </motion.div>

          {/* Process Steps */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="border-l-2 border-border pl-6 py-2">
                    <span className="text-sm font-semibold text-muted-foreground mb-2 block">
                      {step.number}. {step.title}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              />
            </div>

            {/* Timeline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <span className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-2 rounded-full">
                THE RIGHT HIRE IN 3 WEEKS
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* After You Hire Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              After You Hire
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl p-8 border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Handshake className="text-primary" size={24} />
                  <h3 className="text-xl font-bold text-foreground">Onboard, Pay, Retain</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We support onboarding, payroll, and compliance, so your new hire integrates fast and sticks long term.
                </p>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center items-center relative">
                <motion.svg
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  width="120"
                  height="40"
                  viewBox="0 0 120 40"
                  className="text-accent absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <path
                    d="M0 20 Q60 20 80 20 Q100 20 110 25"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="105,20 115,25 105,30"
                    fill="currentColor"
                  />
                </motion.svg>
              </div>

              {/* Right Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-background rounded-2xl p-8 border border-border md:col-start-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-primary" size={24} />
                  <h3 className="text-xl font-bold text-foreground">Ongoing Support & Team Expansion</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Keep hiring with the same speed and quality whenever you need. Your recruiter stays close to support future hires, backfills, or scaling your team.
                </p>
              </motion.div>
            </div>
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
            className="text-center max-w-2xl mx-auto"
          >
            <Button variant="hero" size="lg" asChild className="mb-6">
              <Link to="/contact">
                Start Hiring <ArrowRight size={18} />
              </Link>
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-navy-foreground/70">
              <Shield size={16} />
              <span className="text-sm">Zero-risk hiring. If you don't make a hire, you don't pay anything.</span>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;