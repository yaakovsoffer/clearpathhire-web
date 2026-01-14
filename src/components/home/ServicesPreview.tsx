import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users, 
  Shield, 
  DollarSign, 
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export const ServicesPreview = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      icon: Users,
      title: "Staffing Solutions",
      description: "Find the perfect candidates for your team with our comprehensive recruitment services.",
    },
    {
      icon: Shield,
      title: "HR & Compliance",
      description: "Stay compliant with employment laws and regulations across all jurisdictions.",
    },
    {
      icon: DollarSign,
      title: "Payroll Management",
      description: "Streamlined payroll processing and benefits administration for your global team.",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              {t("services.title")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Custom{" "}
              <span className="text-primary">Staffing &</span>
              <br />
              <span className="text-primary">HR Solutions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-brand">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                alt="Professional team collaboration"
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">Staffing Solutions</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-background rounded-2xl p-8 border transition-all duration-300 ${
                  index === activeIndex 
                    ? 'border-primary shadow-brand' 
                    : 'border-border hover:border-secondary hover:shadow-sm'
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="text-primary" size={28} aria-hidden="true" />
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

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous service"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next service"
            >
              <ArrowRight size={20} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
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
