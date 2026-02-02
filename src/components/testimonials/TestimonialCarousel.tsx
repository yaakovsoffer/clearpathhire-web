import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    date: "01/15/2025",
    title: "Exceptional Team Building",
    content: "Clear Path Hire transformed how we build teams. Within 3 weeks, we had 5 exceptional developers who felt like part of our company from day one.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    initials: "MC",
    date: "12/08/2024",
    title: "Seamless Compliance & Payroll",
    content: "The compliance and payroll management alone are worth it. We used to spend hours on international payments and tax compliance. Now it just happens seamlessly.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    initials: "ER",
    date: "11/22/2024",
    title: "Doubled Our Caseload",
    content: "We doubled our caseload with the legal assistants Clear Path Hire placed with us. The thorough background checks gave us complete confidence.",
    rating: 5,
  },
  {
    name: "David Park",
    initials: "DP",
    date: "10/30/2024",
    title: "Tax Season Solved",
    content: "Tax season used to be a nightmare for staffing. Clear Path Hire solved that in just 3 weeks. Our remote accountants are exceptional.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    initials: "LT",
    date: "09/15/2024",
    title: "Game-Changing Talent",
    content: "Our SDR team from Clear Path Hire added $15M in pipeline within the first year. The quality of talent has been a game-changer.",
    rating: 5,
  },
  {
    name: "James Wilson",
    initials: "JW",
    date: "08/20/2024",
    title: "Seamless Remote Operations",
    content: "From customer support to data analysis, Clear Path Hire has helped us build a 20-person remote team that operates like they are all in the same office.",
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold uppercase tracking-wider mb-3">
            WHY CHOOSE CLEAR PATH HIRE?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    name: string;
    initials: string;
    date: string;
    title: string;
    content: string;
    rating: number;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-background border border-border rounded-xl p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Avatar + Name + Stars */}
        <div className="flex items-center gap-3">
          {/* Initials Avatar - Dark Blue */}
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-semibold text-sm">
            {testimonial.initials}
          </div>
          
          {/* Name and Stars */}
          <div>
            <h4 className="font-semibold text-foreground text-sm">
              {testimonial.name}
            </h4>
            <div className="flex items-center gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="text-accent fill-accent" size={12} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Date */}
        <span className="text-muted-foreground text-xs">
          {testimonial.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-foreground mb-2">
        {testimonial.title}
      </h3>

      {/* Content */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {testimonial.content}
      </p>
    </motion.div>
  );
};

export default TestimonialCarousel;
