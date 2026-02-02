import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Heart, Users, Globe, Award } from "lucide-react";
import aboutHeroImg from "@/assets/about-hero.png";
import ourStoryImg from "@/assets/our-story.png";

const values = [
  {
    icon: Heart,
    title: "People First",
    description: "We believe in building genuine relationships with both our clients and the professionals we place.",
    isDark: false,
  },
  {
    icon: Globe,
    title: "Global Excellence",
    description: "We connect you with top talent worldwide, breaking geographical barriers to find the perfect fit.",
    isDark: true,
  },
  {
    icon: Award,
    title: "Quality Commitment",
    description: "Every candidate goes through rigorous vetting to ensure they meet our high standards.",
    isDark: false,
  },
  {
    icon: Users,
    title: "Partnership Approach",
    description: "We work as an extension of your team, understanding your culture and goals deeply.",
    isDark: true,
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Main Hero Container with Asymmetrical Mask */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden"
              style={{ 
                borderRadius: '3rem 1rem 3rem 1rem',
                minHeight: '500px'
              }}
            >
              {/* Background Image */}
              <img 
                src={aboutHeroImg}
                alt="Modern blue glass office building"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 p-10 lg:p-16 flex flex-col justify-center min-h-[500px] max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.3] mb-8">
                    <span className="whitespace-nowrap">Your Direct Route to the</span>
                    <br />
                    <span className="text-accent">Right Talent</span>
                  </h1>
                  <p className="text-lg text-white/90 max-w-md leading-relaxed">
                    Clear Path Hire was founded on a simple belief: great talent exists everywhere, and businesses deserve access to it without the complexity of international hiring.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl"
            >
              <img 
                src={ourStoryImg}
                alt="Clear Path Hire logo"
                className="w-full h-[400px] lg:h-[480px] object-cover"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
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
              className="rounded-3xl overflow-hidden relative min-h-[400px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Team collaboration"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/80" />
              <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  Our Mission
                </h3>
                <p className="text-white/90 leading-relaxed">
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
              className="rounded-3xl overflow-hidden relative min-h-[400px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800&auto=format&fit=crop"
                alt="Global connectivity"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/80" />
              <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  Our Vision
                </h3>
                <p className="text-white/90 leading-relaxed">
                  A world where every business, regardless of size, can access exceptional talent globally, and every skilled professional can find meaningful work opportunities without geographical limitations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              WHY CHOOSE CLEAR PATH HIRE?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              What Drives Us Forward
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className={`rounded-3xl p-8 relative cursor-pointer min-h-[220px] ${
                  value.isDark 
                    ? 'bg-navy text-white' 
                    : 'bg-background text-navy border border-border'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  value.isDark ? 'text-white' : 'text-navy'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  value.isDark ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {value.description}
                </p>
                
                {/* Circular Icon at bottom right */}
                <div className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center ${
                  value.isDark 
                    ? 'bg-white/20' 
                    : 'bg-navy'
                }`}>
                  <value.icon 
                    size={20} 
                    className={value.isDark ? 'text-white' : 'text-white'} 
                    aria-hidden="true" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
