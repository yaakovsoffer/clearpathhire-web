import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileCheck, 
  DollarSign, 
  Shield, 
  HeadphonesIcon, 
  Building2,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Users,
    title: "Staffing Solutions",
    description: "We source and help you onboard top, English-speaking talent in under 21 days.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileCheck,
    title: "Background Checks",
    description: "Comprehensive vetting including criminal records, employment history, and references.",
    color: "bg-secondary/30 text-primary",
  },
  {
    icon: DollarSign,
    title: "Payroll Management",
    description: "We handle everything from tax compliance to salary disbursements accurately and on time.",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: Shield,
    title: "HR & Compliance",
    description: "Navigate local labor laws with our experts. We handle all employment compliance.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "Dedicated account management and continuous support for you and your team.",
    color: "bg-secondary/30 text-primary",
  },
  {
    icon: Building2,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security and tools to ensure seamless remote collaboration.",
    color: "bg-accent/20 text-accent",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            A 360° Solution Beyond Staffing
          </h2>
          <p className="text-lg text-muted-foreground">
            Your full-service partner to streamline talent acquisition, hiring, onboarding, payroll, retention, and compliance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-background rounded-2xl p-8 shadow-sm hover:shadow-brand transition-all duration-300 border border-border hover:border-secondary"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="default" size="lg" asChild>
            <Link to="/services">
              View All Services <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
