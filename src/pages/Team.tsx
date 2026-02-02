import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "team.roles.ceo",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    role: "team.roles.coo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Emily Rodriguez",
    role: "team.roles.headTalent",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "David Thompson",
    role: "team.roles.headOperations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Jessica Park",
    role: "team.roles.headHR",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Robert Martinez",
    role: "team.roles.headCompliance",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    linkedin: "#",
  },
];

const Team = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-4 block">
              {t("team.badge")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
              {t("team.title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("team.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                }}
                className="bg-background rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-4">
                    {t(member.role)}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-navy hover:text-white transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`mailto:contact@clearpathhire.com`}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-navy hover:text-white transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Team collaboration"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/85" />
            <div className="relative z-10 p-10 lg:p-16 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {t("team.cta.title")}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("team.cta.description")}
              </p>
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
              >
                {t("team.cta.button")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
