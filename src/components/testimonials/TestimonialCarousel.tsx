import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    content: "Clear Path Hire transformed how we build teams. Within 3 weeks, we had 5 exceptional developers who felt like part of our company from day one.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "GrowthLab Marketing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    content: "The compliance and payroll management alone are worth it. We used to spend hours on international payments and tax compliance. Now it just happens seamlessly while we focus on scaling our agency.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    company: "Sterling Legal Partners",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
    content: "We doubled our caseload with the legal assistants Clear Path Hire placed with us. The thorough background checks gave us complete confidence.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "CFO",
    company: "Horizon Accounting",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    content: "Tax season used to be a nightmare for staffing. Clear Path Hire solved that in just 3 weeks. Our remote accountants are exceptional.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "VP of Sales",
    company: "CloudFirst Technologies",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    content: "Our SDR team from Clear Path Hire added $15M in pipeline within the first year. The quality of talent has been a game-changer.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "CEO",
    company: "Nexus E-Commerce",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    content: "From customer support to data analysis, Clear Path Hire has helped us build a 20-person remote team that operates like they are all in the same office.",
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
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
            What Drives Us Forward
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
              {testimonials.map((testimonial, index) => (
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
    role: string;
    company: string;
    image: string;
    content: string;
    rating: number;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Card Container */}
      <div className="relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden bg-muted shadow-sm">
        {/* Portrait Image */}
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover object-center"
        />

        {/* Hover Overlay with Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/40 flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="text-secondary fill-secondary" size={16} />
            ))}
          </div>

          {/* Quote */}
          <p className="text-white text-sm leading-relaxed mb-4">
            "{testimonial.content}"
          </p>
        </motion.div>
      </div>

      {/* Name and Role - Always visible below card */}
      <div className="text-center mt-4">
        <h3 className="font-semibold text-foreground text-lg">
          {testimonial.name}
        </h3>
        <p className="text-muted-foreground text-sm">
          {testimonial.role}, {testimonial.company}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCarousel;
