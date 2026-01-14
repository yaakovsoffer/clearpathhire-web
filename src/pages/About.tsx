import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Users, Globe, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People First",
    description: "We believe in building genuine relationships with both our clients and the professionals we place.",
  },
  {
    icon: Globe,
    title: "Global Excellence",
    description: "We connect you with top talent worldwide, breaking geographical barriers to find the perfect fit.",
  },
  {
    icon: Award,
    title: "Quality Commitment",
    description: "Every candidate goes through rigorous vetting to ensure they meet our high standards.",
  },
  {
    icon: Users,
    title: "Partnership Approach",
    description: "We work as an extension of your team, understanding your culture and goals deeply.",
  },
];

const stats = [
  { value: "500+", label: "Placements Made" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "21", label: "Days Average to Hire" },
  { value: "15+", label: "Countries Served" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sky/20 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Direct Route to the{" "}
              <span className="text-gradient">Right Talent</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Clear Path Hire was founded on a simple belief: great talent exists everywhere, and businesses deserve access to it without the complexity of international hiring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Since COVID-19 transformed the workplace, businesses discovered a powerful truth: anything that can be done from home can be done from anywhere. This revelation opened doors to a global talent pool of skilled professionals ready to work remotely.
                </p>
                <p>
                  Clear Path Hire was born from this realization. We saw businesses struggling with the complexities of international hiring — navigating compliance, managing payroll across borders, and vetting candidates from afar.
                </p>
                <p>
                  Today, we serve as your complete outsourcing partner. We handle everything from sourcing and background checks to HR, compliance, payroll, and taxes. Our clients get to treat their remote team members like their own employees — because they are.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-background rounded-2xl p-6 text-center shadow-sm border border-border"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-navy rounded-3xl overflow-hidden"
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
              </div>
              <div className="p-10">
                <div className="w-14 h-14 rounded-xl bg-secondary/30 flex items-center justify-center mb-6">
                  <Target className="text-secondary" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-navy-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-navy-foreground/80 leading-relaxed">
                  To remove the barriers between businesses and global talent, providing a seamless path to building high-performing remote teams while handling all the complexities of international employment.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-primary rounded-3xl overflow-hidden"
            >
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800&auto=format&fit=crop"
                  alt="Global connectivity"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
              </div>
              <div className="p-10">
                <div className="w-14 h-14 rounded-xl bg-secondary/30 flex items-center justify-center mb-6">
                  <Eye className="text-secondary" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  A world where every business, regardless of size, can access exceptional talent globally, and every skilled professional can find meaningful work opportunities without geographical limitations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Drives Us Forward
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border hover:shadow-brand transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
