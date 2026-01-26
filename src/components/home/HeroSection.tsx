import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, UsersRound, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const heroImages = [heroSlide1, heroSlide2, heroSlide3];

export const HeroSection = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "500+", label: "Professionals Placed" },
    { value: "70%", label: "Cost Savings" },
    { value: "21", label: "Days to Hire" },
    { value: "15+", label: "Countries Served" },
  ];

  const features = [
    {
      icon: UsersRound,
      title: "Dedicated Teams",
      description: "Full-time professionals committed to your success",
    },
    {
      icon: ShieldCheck,
      title: "Full Compliance",
      description: "We handle all legal and tax requirements",
    },
  ];

  return (
    <section className="relative overflow-visible bg-background">
      {/* Hero Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative min-h-[520px] lg:min-h-[580px] rounded-[3rem] lg:rounded-[4rem] overflow-hidden">
          {/* Background Image Slideshow */}
          <AnimatePresence mode="sync">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 2, ease: "easeInOut" },
                scale: { duration: 18, ease: "linear" }
              }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${heroImages[currentImageIndex]}')`,
              }}
            />
          </AnimatePresence>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30 z-[1]" />

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-16 flex flex-col justify-center h-full min-h-[520px] lg:min-h-[580px]">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
                  <span className="whitespace-nowrap">Build Your Dream Team</span>
                  <span className="block mt-2 whitespace-nowrap">with <span className="text-accent">Top Remote Talent</span></span>
                </h1>

                <p className="text-base md:text-lg text-white/90 mb-8 max-w-lg leading-relaxed drop-shadow-md">
                  We connect you with pre-vetted professionals from around the world. 
                  Save up to 70% on staffing costs while getting dedicated team members 
                  who integrate seamlessly with your business.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    asChild 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link to="/contact">
                      Start Hiring
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    asChild
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-semibold"
                  >
                    <Link to="/services">Learn More</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Zero Risk Hiring Banner - Outside the hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-end mt-6 pr-8 lg:pr-16"
        >
          <div className="bg-sky text-navy font-bold px-10 py-4 rounded-full shadow-xl text-lg tracking-wide">
            Zero Risk Hiring
          </div>
        </motion.div>
      </div>

      {/* Stats & Features Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
            {/* Features - Left Side */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <feature.icon className="text-navy" size={56} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}

            {/* Stats - Right Side in 2x2 Grid */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-4xl md:text-5xl font-bold text-navy mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
