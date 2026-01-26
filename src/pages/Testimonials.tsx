import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import testimonialsHeroImg from "@/assets/testimonials-hero.png";

const Testimonials = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-visible bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="relative min-h-[520px] lg:min-h-[580px] rounded-[3rem] lg:rounded-[4rem] overflow-visible">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[3rem] lg:rounded-[4rem] overflow-hidden"
              style={{
                backgroundImage: `url(${testimonialsHeroImg})`,
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 lg:p-16 flex flex-col justify-center h-full min-h-[520px] lg:min-h-[580px]">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                    <span className="block">
                      Trusted by{" "}
                      <span className="text-accent">Growing</span>
                    </span>
                    <span className="block mt-2">Businesses</span>
                  </h1>

                  <p className="text-base md:text-lg text-white/90 mb-8 max-w-lg leading-relaxed drop-shadow-md">
                    See how companies like yours have transformed their workforce and achieved remarkable results with Clear Path Hire.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy rounded-3xl p-12 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Success Stories
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Ready to experience the Clear Path Hire difference? Schedule a free consultation and discover how we can help you build your dream team.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Start Your Journey <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
