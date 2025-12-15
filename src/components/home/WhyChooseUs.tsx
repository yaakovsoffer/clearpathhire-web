import { motion } from "framer-motion";
import { TrendingUp, Clock, BadgeDollarSign, UserCheck } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Scale Faster",
    description: "We source top remote talent that are the right fit for your open roles in under 21 days with a 97% placement rate.",
  },
  {
    icon: BadgeDollarSign,
    title: "Reduce Costs",
    description: "Hiring highly-skilled global talent unlocks cost savings of 30%-70% compared to comparable US-based professionals.",
  },
  {
    icon: UserCheck,
    title: "Treat Them As Your Own",
    description: "Since COVID proved work can be done remotely, your global team works just like local employees — dedicated and integrated.",
  },
  {
    icon: Clock,
    title: "Zero Hassle",
    description: "We handle all the complexities — hiring, HR, compliance, payroll, and taxes — so you can focus on growing your business.",
  },
];

export const WhyChooseUs = () => {
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
              Why Clear Path Hire
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How We Help You{" "}
              <span className="text-gradient">Grow</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We provide everything you need to build and manage a world-class remote team. No complexity, no risk — just results.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">97%</div>
                <div className="text-sm text-muted-foreground">Placement Rate</div>
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
                  <benefit.icon size={24} className="text-primary-foreground" />
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
