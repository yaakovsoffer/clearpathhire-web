import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, MapPin, Star, Clock, Phone, Camera, BarChart3, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const GoogleBusinessGuide = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: MapPin, titleKey: "localSearch" },
    { icon: Star, titleKey: "reviews" },
    { icon: Clock, titleKey: "hours" },
    { icon: Phone, titleKey: "contact" },
    { icon: Camera, titleKey: "showcase" },
    { icon: BarChart3, titleKey: "performance" },
  ];

  const steps = [
    { num: 1, hasLink: false },
    { num: 2, hasLink: true, linkUrl: "https://business.google.com" },
    { num: 3, hasLink: false },
    { num: 4, hasLink: false },
    { num: 5, hasLink: false },
    { num: 6, hasLink: false },
    { num: 7, hasLink: false },
    { num: 8, hasLink: false },
  ];

  const successTips = ["updated", "reviews", "posts", "photos", "questions"];

  return (
    <Layout>
      <main id="main-content" role="main" aria-labelledby="guide-heading">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero" aria-labelledby="guide-heading">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                {t("googleGuide.badge")}
              </span>
              <h1 id="guide-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("googleGuide.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t("googleGuide.subtitle")}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {t("googleGuide.readTime")}
                </span>
                <span>•</span>
                <span>{t("googleGuide.updated")}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-card" aria-labelledby="benefits-heading">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="benefits-heading" className="text-3xl font-bold text-foreground mb-4">
                {t("googleGuide.whyTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("googleGuide.whySubtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background rounded-xl p-6 border border-border"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`googleGuide.benefits.${benefit.titleKey}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`googleGuide.benefits.${benefit.titleKey}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16" aria-labelledby="steps-heading">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 id="steps-heading" className="text-3xl font-bold text-foreground mb-4">
                {t("googleGuide.stepsTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("googleGuide.stepsSubtitle")}
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {steps.map((step, index) => {
                const tips = t(`googleGuide.steps.step${step.num}.tips`);
                const tipsArray = typeof tips === "string" ? [] : tips as unknown as string[];
                
                return (
                  <motion.article
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-card rounded-xl p-6 border border-border"
                    aria-labelledby={`step-${step.num}-title`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg" aria-hidden="true">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <h3 id={`step-${step.num}-title`} className="text-xl font-semibold text-foreground mb-2">
                          {t(`googleGuide.steps.step${step.num}.title`)}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {t(`googleGuide.steps.step${step.num}.description`)}
                        </p>
                        
                        {tipsArray.length > 0 && (
                          <div className="bg-muted rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                              {t("googleGuide.proTips")}
                            </h4>
                            <ul className="space-y-2" role="list">
                              {tipsArray.map((tip: string, tipIndex: number) => (
                                <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.hasLink && (
                          <a
                            href={step.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                          >
                            {t(`googleGuide.steps.step${step.num}.linkText`)}
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tips for Success */}
        <section className="py-16 bg-card" aria-labelledby="tips-heading">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 id="tips-heading" className="text-3xl font-bold text-foreground mb-6 text-center">
                {t("googleGuide.successTitle")}
              </h2>
              
              <div className="bg-background rounded-xl p-6 border border-border space-y-4">
                {successTips.map((tipKey) => (
                  <div key={tipKey} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium text-foreground">
                        {t(`googleGuide.successTips.${tipKey}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`googleGuide.successTips.${tipKey}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 id="cta-heading" className="text-3xl font-bold text-foreground mb-4">
                {t("googleGuide.ctaTitle")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("googleGuide.ctaDescription")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">{t("googleGuide.ctaPrimary")}</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">{t("googleGuide.ctaSecondary")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default GoogleBusinessGuide;
