import { createContext, useContext, ReactNode } from "react";

interface LanguageContextType {
  language: "en";
  setLanguage: (lang: "en") => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Clear any previously stored Spanish preference
  if (typeof window !== "undefined") {
    localStorage.removeItem("language");
  }

  const t = (key: string): any => {
    const keys = key.split(".");
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => {}, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<string, any> = {
  nav: {
    home: "Home",
    about: "About",
    team: "Team",
    services: "Services",
    testimonials: "Testimonials",
    contact: "Contact",
    clientLogin: "Client Login",
    applyForJobs: "Apply for Jobs",
    startHiring: "Start Hiring",
  },
  hero: {
    badge: "Your Partner in Global Talent",
    title: "Build Your Dream Team with",
    titleHighlight: "Top Remote Talent",
    description: "We connect you with pre-vetted professionals from around the world. Save up to 70% on staffing costs while getting dedicated team members who integrate seamlessly with your business.",
    highlights: {
      vetted: "Pre-Vetted Professionals",
      payroll: "Full Payroll & HR Support",
      risk: "Zero Risk Trial Period",
    },
    cta: {
      primary: "Start Hiring",
      secondary: "Learn More",
    },
    stats: {
      placed: "Professionals Placed",
      savings: "Cost Savings",
      days: "Days to Hire",
    },
    features: {
      teams: "Dedicated Teams",
      teamsDesc: "Full-time professionals committed to your success",
      compliance: "Full Compliance",
      complianceDesc: "We handle all legal and tax requirements",
    },
    badge2: "Zero Risk Hiring",
  },
  services: {
    title: "Our Services",
    subtitle: "Comprehensive staffing and HR solutions tailored to your business needs",
    cta: "Explore All Services",
    staffing: {
      title: "Staffing Solutions",
      description: "We source and help you onboard top, English-speaking talent in under 21 days.",
    },
    background: {
      title: "Background Checks",
      description: "Comprehensive vetting including criminal records, employment history, and education verification.",
    },
    payroll: {
      title: "Payroll Management",
      description: "We handle everything from tax compliance to salary disbursements globally.",
    },
    hr: {
      title: "HR & Compliance",
      description: "Navigate local labor laws and maintain compliance for all employment types.",
    },
    support: {
      title: "Ongoing Support",
      description: "Dedicated account management and continuous support for you and your team.",
    },
    infrastructure: {
      title: "Secure Infrastructure",
      description: "Enterprise-grade security and tools for seamless remote collaboration.",
    },
    items: {
      staffing: {
        title: "Staffing Solutions",
        description: "Find the perfect candidates for your team with our comprehensive recruitment services.",
      },
      hr: {
        title: "HR & Compliance",
        description: "Stay compliant with employment laws and regulations across all jurisdictions.",
      },
      payroll: {
        title: "Payroll Management",
        description: "Streamlined payroll processing and benefits administration for your global team.",
      },
      training: {
        title: "Training & Development",
        description: "Enhance your team's skills with customized training programs and resources.",
      },
    },
  },
  whyChooseUs: {
    title: "Why Choose Clear Path Hire?",
    subtitle: "We're not just another staffing agency. We're your strategic partner in building a world-class remote team.",
    stats: {
      savings: "Average Cost Savings",
      placement: "Placement Success Rate",
    },
    benefits: {
      vetted: {
        title: "Pre-Vetted Talent",
        description: "Every candidate undergoes rigorous screening including skills assessment, background checks, and cultural fit evaluation.",
      },
      compliance: {
        title: "Full Compliance",
        description: "We handle all legal, tax, and employment compliance so you can focus on growing your business.",
      },
      support: {
        title: "Dedicated Support",
        description: "Your dedicated account manager ensures smooth onboarding and ongoing success for every placement.",
      },
      flexible: {
        title: "Flexible Scaling",
        description: "Easily scale your team up or down based on your business needs without long-term commitments.",
      },
    },
  },
  cta: {
    title: "Ready to Transform Your Workforce?",
    description: "Join hundreds of companies that have already discovered the power of global talent. Start building your dream team today with zero risk.",
    primary: "Start Hiring Today",
    secondary: "Explore Services",
    trust: "Trusted by startups, agencies, and enterprises worldwide",
  },
  footer: {
    description: "Your direct route to the right talent. We connect businesses with skilled global professionals, handling everything from hiring to payroll.",
    company: "Company",
    resources: "Resources",
    contact: "Contact",
    aboutUs: "About Us",
    applyForJobs: "Apply for Jobs",
    clientPortal: "Client Portal",
    makePayment: "Make a Payment",
    googleGuide: "Google Business Guide",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    rights: "All rights reserved.",
  },
  clientLogin: {
    title: "Client Portal",
    subtitle: "Sign in to view your invoices and manage payments",
    email: "Email Address",
    password: "Password",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    signingIn: "Signing in...",
    needHelp: "Need help?",
    contactSupport: "Contact Support",
    demoMessage: "Demo Mode",
    demoDescription: "Authentication will be enabled soon. Redirecting to dashboard preview.",
  },
  dashboard: {
    welcome: "Welcome Back",
    subtitle: "Manage your invoices and payments",
    totalOutstanding: "Total Outstanding",
    paidInvoices: "Paid Invoices",
    pendingInvoices: "Pending Invoices",
    payOutstanding: "Pay Outstanding Balance",
    invoices: "Invoices",
    all: "All",
    pending: "Pending",
    paid: "Paid",
    overdue: "Overdue",
    noInvoices: "No invoices found",
    issued: "Issued",
    due: "Due",
    payNow: "Pay Now",
  },
  payment: {
    title: "Make a Payment",
    subtitle: "Enter the amount you'd like to pay",
    payInvoice: "Pay invoice",
    amount: "Payment Amount (USD)",
    cardDetails: "Card Details",
    cardholderName: "Cardholder Name",
    cardNumber: "Card Number",
    expiry: "Expiry Date",
    cvc: "CVC",
    securityNotice: "Your payment information is encrypted and secure. We never store your full card details.",
    processing: "Processing...",
    payNow: "Pay",
    bankTransfer: "Prefer to pay by bank transfer?",
    bankDetails: "Bank Transfer Details",
    success: {
      title: "Payment Successful!",
      description: "Thank you for your payment. A confirmation email has been sent to your registered email address.",
      returnDashboard: "Return to Dashboard",
      goHome: "Go to Homepage",
    },
  },
  googleGuide: {
    badge: "Free Resource",
    title: "How to Set Up Your Google Business Profile",
    subtitle: "A complete step-by-step guide to creating and optimizing your Google Business Profile to attract more local customers and grow your business.",
    readTime: "15 min read",
    updated: "Updated December 2024",
    whyTitle: "Why You Need a Google Business Profile",
    whySubtitle: "46% of all Google searches are looking for local information. Here's how a Google Business Profile helps you capture that traffic.",
    benefits: {
      localSearch: {
        title: "Appear in Local Searches",
        description: "Show up when potential customers search for services in your area.",
      },
      reviews: {
        title: "Build Trust with Reviews",
        description: "Collect and respond to customer reviews to build credibility.",
      },
      hours: {
        title: "Share Business Hours",
        description: "Let customers know when you're open, including special hours for holidays.",
      },
      contact: {
        title: "Enable Direct Contact",
        description: "Customers can call or message you directly from your profile.",
      },
      showcase: {
        title: "Showcase Your Work",
        description: "Add photos and videos to show what makes your business unique.",
      },
      performance: {
        title: "Track Performance",
        description: "See how customers find you and what actions they take.",
      },
    },
    stepsTitle: "Step-by-Step Setup Guide",
    stepsSubtitle: "Follow these steps to create and optimize your Google Business Profile in about 15 minutes.",
    proTips: "Pro Tips",
    steps: {
      step1: {
        title: "Sign In or Create a Google Account",
        description: "You'll need a Google account to manage your business profile. If you already have Gmail, you can use that account.",
        tips: [
          "Use a business email if possible for better organization",
          "Enable 2-factor authentication for security",
          "Make sure the account owner is someone who will be with the company long-term",
        ],
      },
      step2: {
        title: "Go to Google Business Profile",
        description: "Visit business.google.com and click 'Manage now' to start setting up your profile.",
        tips: [
          "You can also search for your business on Google and click 'Own this business?'",
          "If your business already has a listing, you can claim it instead of creating a new one",
        ],
        linkText: "Go to Google Business Profile",
      },
      step3: {
        title: "Enter Your Business Name",
        description: "Type your exact business name as it appears in the real world. This helps customers find you and builds trust.",
        tips: [
          "Use your real business name - don't stuff keywords",
          "Be consistent with how your name appears elsewhere online",
          "If you're a service-area business, you can hide your address later",
        ],
      },
      step4: {
        title: "Choose Your Business Category",
        description: "Select the category that best describes what your business does. This is crucial for appearing in relevant searches.",
        tips: [
          "Choose the most specific category available",
          "You can add additional categories later",
          "Categories affect what features are available to you",
        ],
      },
      step5: {
        title: "Add Your Location",
        description: "Enter your business address. If you serve customers at their location, you can set up a service area instead.",
        tips: [
          "For home-based businesses, you can hide your street address",
          "Service-area businesses can specify the regions they serve",
          "Make sure your address matches your other online listings",
        ],
      },
      step6: {
        title: "Add Contact Information",
        description: "Enter your business phone number and website URL. This makes it easy for customers to reach you.",
        tips: [
          "Use a local phone number when possible",
          "Make sure your website is mobile-friendly",
          "Keep this information consistent across all platforms",
        ],
      },
      step7: {
        title: "Verify Your Business",
        description: "Google needs to verify that you own or manage this business. Most businesses verify by postcard, but other options may be available.",
        tips: [
          "Postcard verification typically takes 5-14 days",
          "Some businesses qualify for phone or email verification",
          "Don't change your business name or address while waiting for verification",
        ],
      },
      step8: {
        title: "Complete Your Profile",
        description: "Add photos, business hours, services, and other details to make your profile complete and attractive.",
        tips: [
          "Profiles with photos get 42% more requests for directions",
          "Add your business hours and keep them updated",
          "Write a compelling business description with relevant keywords",
        ],
      },
    },
    successTitle: "Tips for Long-Term Success",
    successTips: {
      updated: {
        title: "Keep Information Updated",
        description: "Regularly check that your hours, contact info, and services are accurate.",
      },
      reviews: {
        title: "Respond to Reviews",
        description: "Thank customers for positive reviews and address negative ones professionally.",
      },
      posts: {
        title: "Post Regular Updates",
        description: "Use Google Posts to share news, offers, and events with potential customers.",
      },
      photos: {
        title: "Add Fresh Photos",
        description: "Upload new photos regularly to keep your profile engaging and current.",
      },
      questions: {
        title: "Answer Questions",
        description: "Monitor and answer questions that customers ask on your profile.",
      },
    },
    ctaTitle: "Need Help Growing Your Business?",
    ctaDescription: "Clear Path Hire helps businesses scale efficiently with dedicated remote professionals. Let us handle your staffing needs so you can focus on growth.",
    ctaPrimary: "Get Started Today",
    ctaSecondary: "Explore Our Services",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    form: {
      name: "Full Name",
      email: "Email Address",
      company: "Company Name",
      phone: "Phone Number",
      message: "Message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message Sent!",
      successDesc: "Thank you for reaching out. We'll get back to you within 24 hours.",
    },
    info: {
      email: "Email Us",
      emailDesc: "Our team is here to help",
      phone: "Call Us",
      phoneDesc: "Mon-Fri from 8am to 6pm",
      location: "Location",
      locationDesc: "Serving clients worldwide",
      response: "Response Time",
      responseDesc: "Within 24 hours",
    },
    consultation: {
      title: "Free Consultation",
      description: "Schedule a free 30-minute consultation to discuss your staffing needs and discover how we can help your business grow.",
    },
  },
  about: {
    title: "About Clear Path Hire",
    subtitle: "We're on a mission to revolutionize how businesses build their teams by connecting them with exceptional global talent.",
  },
  apply: {
    title: "Join Our Talent Network",
    subtitle: "Take the next step in your career. Apply to join our network of skilled professionals and connect with top employers worldwide.",
  },
  team: {
    badge: "OUR TEAM",
    title: "Meet the People Behind Clear Path Hire",
    subtitle: "Our dedicated team of experts works tirelessly to connect businesses with exceptional global talent.",
    roles: {
      founder: "Founder",
      directorOps: "Director of Operations",
      directorTalent: "Director of Talent Acquisition",
      accountingDirector: "Accounting Director",
      marketingDirector: "Marketing Director",
    },
    cta: {
      title: "Want to Join Our Team?",
      description: "We're always looking for talented individuals who share our passion for connecting businesses with exceptional global talent.",
      button: "View Open Positions",
    },
  },
};

export default LanguageContext;
