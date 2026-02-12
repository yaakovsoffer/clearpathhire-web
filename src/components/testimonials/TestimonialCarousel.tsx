import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "JM",
    content: "Clear Path Hire transformed how we build teams. Within weeks, we had exceptional developers who felt like part of our company from day one.",
    rating: 5,
  },
  {
    initials: "RS",
    content: "The compliance and payroll management alone are worth it. We used to spend hours on international payments and tax compliance. Now it just happens seamlessly.",
    rating: 5,
  },
  {
    initials: "KL",
    content: "We significantly increased our caseload with the assistants Clear Path Hire placed with us. The thorough background checks gave us complete confidence.",
    rating: 5,
  },
  {
    initials: "DP",
    content: "Tax season used to be a nightmare for staffing. Clear Path Hire solved that quickly. Our remote team members are exceptional.",
    rating: 5,
  },
  {
    initials: "AT",
    content: "Our team from Clear Path Hire significantly grew our pipeline. The quality of talent has been a game-changer for our business.",
    rating: 5,
  },
  {
    initials: "MR",
    content: "From customer support to data analysis, Clear Path Hire has helped us build a remote team that operates like they are all in the same office.",
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
            What Drives Us Forward
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.initials + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with Avatar and Rating */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm bg-navy flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-secondary fill-secondary"
                      size={14}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
