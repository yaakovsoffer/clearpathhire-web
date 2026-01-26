import { motion } from "framer-motion";
import { ArrowRight, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "500+", label: "Professionals Placed" },
    { value: "70%", label: "Cost Savings" },
    { value: "21", label: "Days to Hire" },
    { value: "15+", label: "Countries Served" },
  ];

  const features = [
    {
      icon: Users,
      title: "Dedicated Teams",
      description: "Full-time professionals committed to your success",
    },
    {
      icon: Shield,
      title: "Full Compliance",
      description: "We handle all legal and tax requirements",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Image Background */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky/95 via-sky/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-16 flex flex-col justify-center h-full min-h-[500px] lg:min-h-[600px]">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Build Your Dream Team{" "}
                  <span className="block">with Top Remote Talent</span>
                </h1>

                <p className="text-base md:text-lg text-navy/80 mb-8 max-w-lg leading-relaxed">
                  We connect you with pre-vetted professionals from around the world. 
                  Save up to 70% on staffing costs while getting dedicated team members 
                  who integrate seamlessly with your business.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild className="rounded-full">
                    <Link to="/contact">
                      Start Hiring
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    asChild
                    className="bg-white border-navy/20 text-navy hover:bg-white/90 rounded-full"
                  >
                    <Link to="/services">Learn More</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Zero Risk Hiring Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8"
          >
            <div className="bg-sky text-white font-semibold px-8 py-4 rounded-full shadow-lg text-lg">
              Zero Risk Hiring
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats & Features Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {/* Features */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="text-primary" size={28} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}

            {/* Stats */}
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
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
    </section>
  );
};
