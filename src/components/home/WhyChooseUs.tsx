import { motion } from "framer-motion";
import { TrendingUp, Clock, BadgeDollarSign, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: TrendingUp,
      title: t("whyChooseUs.benefits.vetted.title"),
      description: t("whyChooseUs.benefits.vetted.description"),
    },
    {
      icon: BadgeDollarSign,
      title: t("whyChooseUs.benefits.compliance.title"),
      description: t("whyChooseUs.benefits.compliance.description"),
    },
    {
      icon: UserCheck,
      title: t("whyChooseUs.benefits.support.title"),
      description: t("whyChooseUs.benefits.support.description"),
    },
    {
      icon: Clock,
      title: t("whyChooseUs.benefits.flexible.title"),
      description: t("whyChooseUs.benefits.flexible.description"),
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              {t("whyChooseUs.title")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("whyChooseUs.subtitle")}
            </h2>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">70%</div>
                <div className="text-sm text-muted-foreground">{t("whyChooseUs.stats.savings")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">97%</div>
                <div className="text-sm text-muted-foreground">{t("whyChooseUs.stats.placement")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Benefits */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-brand transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-4">
                  <benefit.icon size={24} className="text-primary-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
