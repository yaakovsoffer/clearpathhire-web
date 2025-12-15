import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "Clear Path Hire transformed how we build teams. Within 3 weeks, we had 5 exceptional developers who felt like part of our company from day one. The cost savings allowed us to invest more in product development.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "GrowthLab Marketing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The compliance and payroll management alone are worth it. We used to spend hours on international payments and tax compliance. Now it just happens seamlessly while we focus on scaling our agency.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    company: "Sterling Legal Partners",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    content: "We doubled our caseload with the legal assistants Clear Path Hire placed with us. The thorough background checks gave us complete confidence in our new team members handling sensitive client information.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "CFO",
    company: "Horizon Accounting",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Tax season used to be a nightmare for staffing. Clear Path Hire solved that in just 3 weeks. Our remote accountants are exceptional — skilled, reliable, and they work our exact hours.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "VP of Sales",
    company: "CloudFirst Technologies",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    content: "Our SDR team from Clear Path Hire added $15M in pipeline within the first year. The quality of talent and the ongoing support have been game-changers for our sales organization.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "CEO",
    company: "Nexus E-Commerce",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "From customer support to data analysis, Clear Path Hire has helped us build a 20-person remote team that operates like they are all in the same office. The cultural fit screening really works.",
    rating: 5,
  },
];

const stats = [
  { value: "500+", label: "Professionals Placed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "70%", label: "Average Cost Savings" },
  { value: "97%", label: "Placement Success Rate" },
];

const Testimonials = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Trusted by Growing{" "}
              <span className="text-gradient">Businesses</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              See how companies like yours have transformed their workforce and achieved remarkable results with Clear Path Hire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-navy-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-3xl p-8 shadow-sm border border-border hover:shadow-brand transition-shadow relative"
              >
                <Quote className="absolute top-6 right-6 text-secondary/30" size={40} />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-accent fill-accent" size={18} />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-3xl p-12 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Join Our Success Stories
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
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
