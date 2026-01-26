import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export const ServicesPreview = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "Staffing Solutions",
      description: "Find the perfect candidates for your team with our comprehensive recruitment services.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "HR & Compliance",
      description: "Stay compliant with employment laws and regulations across all jurisdictions.",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Payroll Management",
      description: "Streamlined payroll processing and benefits administration for your global team.",
      image: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/4 flex-shrink-0"
          >
            <span className="text-sm font-bold text-accent uppercase tracking-wider mb-4 block">
              {t("services.title")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Custom
              <br />
              Staffing &
              <br />
              HR Solutions
            </h2>
          </motion.div>

          {/* Right Side - Cards */}
          <div className="lg:w-3/4 flex-grow">
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  {/* Custom Masked Image Container */}
                  <div 
                    className="relative h-64 lg:h-80 mb-5 overflow-hidden"
                    style={{
                      borderRadius: '2.5rem 0.5rem 2.5rem 0.5rem',
                    }}
                  >
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows - Bottom Right */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center hover:bg-navy/90 transition-colors"
                aria-label="Previous service"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-navy text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
                aria-label="Next service"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
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
