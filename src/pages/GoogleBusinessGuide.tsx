import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, MapPin, Star, Clock, Phone, Camera, MessageSquare, BarChart3, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Sign In or Create a Google Account",
    description: "You'll need a Google account to manage your business profile. If you already have Gmail, you can use that account.",
    tips: [
      "Use a business email if possible for better organization",
      "Enable 2-factor authentication for security",
      "Make sure the account owner is someone who will be with the company long-term",
    ],
  },
  {
    number: 2,
    title: "Go to Google Business Profile",
    description: "Visit business.google.com and click 'Manage now' to start setting up your profile.",
    tips: [
      "You can also search for your business on Google and click 'Own this business?'",
      "If your business already has a listing, you can claim it instead of creating a new one",
    ],
    link: {
      url: "https://business.google.com",
      text: "Go to Google Business Profile",
    },
  },
  {
    number: 3,
    title: "Enter Your Business Name",
    description: "Type your exact business name as it appears in the real world. This helps customers find you and builds trust.",
    tips: [
      "Use your real business name - don't stuff keywords",
      "Be consistent with how your name appears elsewhere online",
      "If you're a service-area business, you can hide your address later",
    ],
  },
  {
    number: 4,
    title: "Choose Your Business Category",
    description: "Select the category that best describes what your business does. This is crucial for appearing in relevant searches.",
    tips: [
      "Choose the most specific category available",
      "You can add additional categories later",
      "Categories affect what features are available to you",
    ],
  },
  {
    number: 5,
    title: "Add Your Location",
    description: "Enter your business address. If you serve customers at their location, you can set up a service area instead.",
    tips: [
      "For home-based businesses, you can hide your street address",
      "Service-area businesses can specify the regions they serve",
      "Make sure your address matches your other online listings",
    ],
  },
  {
    number: 6,
    title: "Add Contact Information",
    description: "Enter your business phone number and website URL. This makes it easy for customers to reach you.",
    tips: [
      "Use a local phone number when possible",
      "Make sure your website is mobile-friendly",
      "Keep this information consistent across all platforms",
    ],
  },
  {
    number: 7,
    title: "Verify Your Business",
    description: "Google needs to verify that you own or manage this business. Most businesses verify by postcard, but other options may be available.",
    tips: [
      "Postcard verification typically takes 5-14 days",
      "Some businesses qualify for phone or email verification",
      "Don't change your business name or address while waiting for verification",
    ],
  },
  {
    number: 8,
    title: "Complete Your Profile",
    description: "Add photos, business hours, services, and other details to make your profile complete and attractive.",
    tips: [
      "Profiles with photos get 42% more requests for directions",
      "Add your business hours and keep them updated",
      "Write a compelling business description with relevant keywords",
    ],
  },
];

const benefits = [
  {
    icon: MapPin,
    title: "Appear in Local Searches",
    description: "Show up when potential customers search for services in your area.",
  },
  {
    icon: Star,
    title: "Build Trust with Reviews",
    description: "Collect and respond to customer reviews to build credibility.",
  },
  {
    icon: Clock,
    title: "Share Business Hours",
    description: "Let customers know when you're open, including special hours for holidays.",
  },
  {
    icon: Phone,
    title: "Enable Direct Contact",
    description: "Customers can call or message you directly from your profile.",
  },
  {
    icon: Camera,
    title: "Showcase Your Work",
    description: "Add photos and videos to show what makes your business unique.",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    description: "See how customers find you and what actions they take.",
  },
];

const GoogleBusinessGuide = () => {
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
                Free Resource
              </span>
              <h1 id="guide-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                How to Set Up Your Google Business Profile
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A complete step-by-step guide to creating and optimizing your Google Business Profile 
                to attract more local customers and grow your business.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  15 min read
                </span>
                <span>•</span>
                <span>Updated December 2024</span>
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
                Why You Need a Google Business Profile
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                46% of all Google searches are looking for local information. Here's how a Google Business Profile helps you capture that traffic.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background rounded-xl p-6 border border-border"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
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
                Step-by-Step Setup Guide
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these steps to create and optimize your Google Business Profile in about 15 minutes.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {steps.map((step, index) => (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-card rounded-xl p-6 border border-border"
                  aria-labelledby={`step-${step.number}-title`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg" aria-hidden="true">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 id={`step-${step.number}-title`} className="text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      {step.tips && (
                        <div className="bg-muted rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                            Pro Tips
                          </h4>
                          <ul className="space-y-2" role="list">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.link && (
                        <a
                          href={step.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        >
                          {step.link.text}
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
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
                Tips for Long-Term Success
              </h2>
              
              <div className="bg-background rounded-xl p-6 border border-border space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground">Keep Information Updated</h3>
                    <p className="text-sm text-muted-foreground">Regularly check that your hours, contact info, and services are accurate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground">Respond to Reviews</h3>
                    <p className="text-sm text-muted-foreground">Thank customers for positive reviews and address negative ones professionally.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground">Post Regular Updates</h3>
                    <p className="text-sm text-muted-foreground">Use Google Posts to share news, offers, and events with potential customers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground">Add Fresh Photos</h3>
                    <p className="text-sm text-muted-foreground">Upload new photos regularly to keep your profile engaging and current.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-foreground">Answer Questions</h3>
                    <p className="text-sm text-muted-foreground">Monitor and answer questions that customers ask on your profile.</p>
                  </div>
                </div>
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
                Need Help Growing Your Business?
              </h2>
              <p className="text-muted-foreground mb-8">
                Clear Path Hire helps businesses scale efficiently with dedicated remote professionals. 
                Let us handle your staffing needs so you can focus on growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Get Started Today</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">Explore Our Services</Link>
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
