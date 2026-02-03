import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    role: "CEO",
    company: "TechFlow Solutions",
    content: "Clear Path Hire transformed how we build teams. Within weeks, we had exceptional developers who felt like part of our company from day one.",
    rating: 5,
  },
  {
    role: "Founder",
    company: "GrowthLab Marketing",
    content: "The compliance and payroll management alone are worth it. We used to spend hours on international payments and tax compliance. Now it just happens seamlessly.",
    rating: 5,
  },
  {
    role: "Operations Director",
    company: "Sterling Legal Partners",
    content: "We significantly increased our caseload with the legal assistants Clear Path Hire placed with us. The thorough background checks gave us complete confidence.",
    rating: 5,
  },
  {
    role: "CFO",
    company: "Horizon Accounting",
    content: "Tax season used to be a nightmare for staffing. Clear Path Hire solved that quickly. Our remote accountants are exceptional.",
    rating: 5,
  },
  {
    role: "VP of Sales",
    company: "CloudFirst Technologies",
    content: "Our SDR team from Clear Path Hire significantly grew our pipeline. The quality of talent has been a game-changer.",
    rating: 5,
  },
  {
    role: "CEO",
    company: "Nexus E-Commerce",
    content: "From customer support to data analysis, Clear Path Hire has helped us build a remote team that operates like they are all in the same office.",
    rating: 5,
  },
];

// Get initials from role
const getInitials = (role: string) => {
  return role
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

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
              key={`${testimonial.role}-${testimonial.company}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header with Avatar and Rating */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar with Initials */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm bg-navy"
                  >
                    {getInitials(testimonial.role)}
                  </div>
                  <div>
                    {/* Rating Stars */}
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
                </div>
              </div>

              {/* Role/Company as Title */}
              <h4 className="font-semibold text-foreground mb-2">
                {testimonial.role}, {testimonial.company}
              </h4>

              {/* Content */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
