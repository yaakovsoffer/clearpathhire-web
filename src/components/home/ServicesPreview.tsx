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
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesPreview = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Users,
      title: t("services.items.staffing.title"),
      description: t("services.items.staffing.description"),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: FileCheck,
      title: t("services.items.hr.title"),
      description: t("services.items.hr.description"),
      color: "bg-secondary/30 text-primary",
    },
    {
      icon: DollarSign,
      title: t("services.items.payroll.title"),
      description: t("services.items.payroll.description"),
      color: "bg-accent/20 text-accent",
    },
    {
      icon: Shield,
      title: t("services.items.training.title"),
      description: t("services.items.training.description"),
      color: "bg-primary/10 text-primary",
    },
  ];

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
            {t("services.title")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("services.subtitle")}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                <service.icon size={28} aria-hidden="true" />
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
              {t("services.cta")} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
