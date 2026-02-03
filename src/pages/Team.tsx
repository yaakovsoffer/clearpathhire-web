import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "lucide-react";
import jacobSofferImg from "@/assets/team/jacob-soffer-enhanced.jpg";
import jarredTeodoroImg from "@/assets/team/jarred-teodoro-gray.jpg";
import johnReyJacobeImg from "@/assets/team/john-rey-enhanced.jpg";
import jemStrellaImg from "@/assets/team/jem-strella-gray.jpg";
import janMattImg from "@/assets/team/jan-matt-gray.jpg";
import outsourcingSolutionImg from "@/assets/outsourcing-solution.png";

const teamMembers = [
  {
    name: "Jacob Soffer",
    role: "team.roles.founder",
    image: jacobSofferImg,
    imagePosition: "center 10%",
  },
  {
    name: "Jarred Teodoro",
    role: "team.roles.directorOps",
    image: jarredTeodoroImg,
    imagePosition: "center 20%",
  },
  {
    name: "John Rey Jacobe",
    role: "team.roles.directorTalent",
    image: johnReyJacobeImg,
    imagePosition: "center 10%",
  },
  {
    name: "Jem Strella",
    role: "team.roles.accountingDirector",
    image: jemStrellaImg,
    imagePosition: "center 10%",
  },
  {
    name: "Jan Matt",
    role: "team.roles.marketingDirector",
    image: janMattImg,
    imagePosition: "center 20%",
  },
];

const Team = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative min-h-[520px] lg:min-h-[580px] rounded-[3rem] lg:rounded-[4rem] overflow-hidden"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${outsourcingSolutionImg})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
            </div>
              
            {/* Content */}
            <div className="relative z-10 flex items-center h-full min-h-[520px] lg:min-h-[580px] p-8 lg:p-16">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                  <span className="block">Meet the People</span>
                  <span className="block">Behind <span className="text-accent">Clear Path Hire</span></span>
                </h1>
                <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                  {t("team.subtitle")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
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
                className="bg-background rounded-3xl overflow-hidden cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                {/* Image Container */}
                <div className="relative h-96 overflow-hidden bg-muted">
                  {member.image ? (
                    <>
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{ objectPosition: member.imagePosition }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Branded Navy Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <User className="w-24 h-24 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium">
                    {t(member.role)}
                  </p>
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
