import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    date: "01/15/2025",
    title: "Exceptional Team Building",
    content: "Clear Path Hire transformed how we build teams. Within 3 weeks, we had 5 exceptional developers who felt like part of our company from day one.",
    rating: 5,
    color: "bg-sky",
  },
  {
    name: "Michael Chen",
    initials: "MC",
    date: "12/08/2024",
    title: "Seamless Compliance & Payroll",
    content: "The compliance and payroll management alone are worth it. We used to spend hours on international payments and tax compliance. Now it just happens seamlessly.",
    rating: 5,
    color: "bg-accent",
  },
  {
    name: "Emily Rodriguez",
    initials: "ER",
    date: "11/22/2024",
    title: "Doubled Our Caseload",
    content: "We doubled our caseload with the legal assistants Clear Path Hire placed with us. The thorough background checks gave us complete confidence.",
    rating: 5,
    color: "bg-navy",
  },
  {
    name: "David Park",
    initials: "DP",
    date: "10/30/2024",
    title: "Tax Season Solved",
    content: "Tax season used to be a nightmare for staffing. Clear Path Hire solved that in just 3 weeks. Our remote accountants are exceptional.",
    rating: 5,
    color: "bg-sky",
  },
  {
    name: "Lisa Thompson",
    initials: "LT",
    date: "09/15/2024",
    title: "Game-Changing Talent",
    content: "Our SDR team from Clear Path Hire added $15M in pipeline within the first year. The quality of talent has been a game-changer.",
    rating: 5,
    color: "bg-accent",
  },
  {
    name: "James Wilson",
    initials: "JW",
    date: "08/20/2024",
    title: "Seamless Remote Operations",
    content: "From customer support to data analysis, Clear Path Hire has helped us build a 20-person remote team that operates like they are all in the same office.",
    rating: 5,
    color: "bg-navy",
  },
];

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-background shadow-sm -ml-2 lg:-ml-6"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-background shadow-sm -mr-2 lg:-mr-6"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden mx-8 lg:mx-12" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
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
    color: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-background border border-border rounded-xl p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Avatar + Name + Stars */}
        <div className="flex items-center gap-3">
          {/* Initials Avatar */}
          <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-sm`}>
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
