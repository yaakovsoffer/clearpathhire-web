import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "500+", label: "Professionals Placed" },
  { value: "70%", label: "Cost Savings" },
  { value: "21", label: "Days to Hire" },
];

const highlights = [
  "Background-checked professionals",
  "Full HR & compliance handled",
  "Work in your timezone",
];

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe size={16} />
              Global Talent, Local Excellence
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Build High-Performing Remote Teams for{" "}
              <span className="text-gradient">70% Less</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Your direct route to the right talent. We handle hiring, background checks, HR, compliance, and payroll — so you can treat them like your own employees.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <CheckCircle size={18} className="text-accent" />
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Start Hiring <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-3xl p-8 shadow-brand">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4 bg-background rounded-xl p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Dedicated Teams</div>
                    <div className="text-sm text-muted-foreground">
                      Work exclusively for you
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-4 bg-background rounded-xl p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Full Compliance</div>
                    <div className="text-sm text-muted-foreground">
                      HR, payroll & taxes handled
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
              >
                Zero Risk Hiring
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
