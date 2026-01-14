import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-foreground mb-6">
            Ready to Transform Your{" "}
            <span className="text-secondary">Workforce?</span>
          </h2>
          <p className="text-lg text-navy-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of companies that have already discovered the power of 
            global talent. Start building your dream team today with zero risk.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Start Hiring Today <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy"
              asChild
            >
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
