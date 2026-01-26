import { motion } from "framer-motion";
import { UserCheck, HeadphonesIcon, Shield, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: UserCheck,
      title: "Pre-Vetted Talent",
      description: "Every candidate undergoes rigorous screening including skills assessment, background checks, and cultural fit evaluation.",
      isDark: false,
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description: "Your dedicated account manager ensures smooth onboarding and ongoing success for every placement.",
      isDark: true,
    },
    {
      icon: Shield,
      title: "Full Compliance",
      description: "We handle all legal, tax, and employment compliance so you can focus on growing your business.",
      isDark: false,
    },
    {
      icon: TrendingUp,
      title: "Flexible Scaling",
      description: "Easily scale your team up or down based on your business needs without long-term commitments.",
      isDark: true,
    },
  ];

  const stats = [
    { value: "70%", label: "Average Cost Savings" },
    { value: "97%", label: "Placement Success Rate" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-bold text-accent uppercase tracking-wider mb-4 block">
            {t("whyChooseUs.title")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Your Strategic Partner for
            <br />
            Remote Excellence.
          </h2>
        </motion.div>

        {/* Benefits Grid - Alternating Colors */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className={`rounded-3xl p-8 relative cursor-pointer ${
                benefit.isDark 
                  ? 'bg-navy text-white' 
                  : 'bg-muted text-navy'
              }`}
            >
              <h3 className={`text-xl font-bold mb-4 ${
                benefit.isDark ? 'text-white' : 'text-navy'
              }`}>
                {benefit.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-12 ${
                benefit.isDark ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                {benefit.description}
              </p>
              
              {/* Icon at bottom right */}
              <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center ${
                benefit.isDark 
                  ? 'bg-white/20' 
                  : 'bg-navy/10'
              }`}>
                <benefit.icon 
                  size={20} 
                  className={benefit.isDark ? 'text-white' : 'text-navy'} 
                  aria-hidden="true" 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-16 lg:gap-32"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-7xl font-bold text-navy mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
