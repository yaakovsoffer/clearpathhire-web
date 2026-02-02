import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, any>> = {
  en: {
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
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      team: "Equipo",
      services: "Servicios",
      testimonials: "Testimonios",
      contact: "Contacto",
      clientLogin: "Acceso Clientes",
      applyForJobs: "Aplicar a Empleos",
      startHiring: "Comenzar a Contratar",
    },
    hero: {
      badge: "Tu Socio en Talento Global",
      title: "Construye Tu Equipo Ideal con",
      titleHighlight: "Talento Remoto de Primera",
      description: "Te conectamos con profesionales pre-evaluados de todo el mundo. Ahorra hasta un 70% en costos de personal mientras obtienes miembros dedicados que se integran perfectamente con tu negocio.",
      highlights: {
        vetted: "Profesionales Pre-Evaluados",
        payroll: "Soporte Completo de Nómina y RR.HH.",
        risk: "Período de Prueba Sin Riesgo",
      },
      cta: {
        primary: "Comenzar a Contratar",
        secondary: "Más Información",
      },
      stats: {
        placed: "Profesionales Ubicados",
        savings: "Ahorro en Costos",
        days: "Días para Contratar",
      },
      features: {
        teams: "Equipos Dedicados",
        teamsDesc: "Profesionales a tiempo completo comprometidos con tu éxito",
        compliance: "Cumplimiento Total",
        complianceDesc: "Manejamos todos los requisitos legales y fiscales",
      },
      badge2: "Contratación Sin Riesgo",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales de personal y RR.HH. adaptadas a las necesidades de tu negocio",
      cta: "Explorar Todos los Servicios",
      staffing: {
        title: "Soluciones de Personal",
        description: "Reclutamos y te ayudamos a incorporar talento de habla inglesa en menos de 21 días.",
      },
      background: {
        title: "Verificación de Antecedentes",
        description: "Verificación integral incluyendo antecedentes penales, historial laboral y educación.",
      },
      payroll: {
        title: "Gestión de Nómina",
        description: "Manejamos todo, desde cumplimiento fiscal hasta desembolsos de salarios globalmente.",
      },
      hr: {
        title: "RR.HH. y Cumplimiento",
        description: "Navega las leyes laborales locales y mantén el cumplimiento para todos los tipos de empleo.",
      },
      support: {
        title: "Soporte Continuo",
        description: "Gestión de cuenta dedicada y soporte continuo para ti y tu equipo.",
      },
      infrastructure: {
        title: "Infraestructura Segura",
        description: "Seguridad de nivel empresarial y herramientas para colaboración remota sin problemas.",
      },
      items: {
        staffing: {
          title: "Soluciones de Personal",
          description: "Encuentra los candidatos perfectos para tu equipo con nuestros servicios integrales de reclutamiento.",
        },
        hr: {
          title: "RR.HH. y Cumplimiento",
          description: "Mantente en cumplimiento con las leyes laborales y regulaciones en todas las jurisdicciones.",
        },
        payroll: {
          title: "Gestión de Nómina",
          description: "Procesamiento de nómina simplificado y administración de beneficios para tu equipo global.",
        },
        training: {
          title: "Capacitación y Desarrollo",
          description: "Mejora las habilidades de tu equipo con programas de capacitación y recursos personalizados.",
        },
      },
    },
    whyChooseUs: {
      title: "¿Por Qué Elegir Clear Path Hire?",
      subtitle: "No somos solo otra agencia de personal. Somos tu socio estratégico para construir un equipo remoto de clase mundial.",
      stats: {
        savings: "Ahorro Promedio en Costos",
        placement: "Tasa de Éxito en Colocaciones",
      },
      benefits: {
        vetted: {
          title: "Talento Pre-Evaluado",
          description: "Cada candidato pasa por una rigurosa evaluación que incluye pruebas de habilidades, verificación de antecedentes y evaluación de ajuste cultural.",
        },
        compliance: {
          title: "Cumplimiento Total",
          description: "Manejamos todo el cumplimiento legal, fiscal y laboral para que puedas enfocarte en hacer crecer tu negocio.",
        },
        support: {
          title: "Soporte Dedicado",
          description: "Tu gerente de cuenta dedicado asegura una incorporación fluida y éxito continuo para cada colocación.",
        },
        flexible: {
          title: "Escalamiento Flexible",
          description: "Escala fácilmente tu equipo hacia arriba o abajo según las necesidades de tu negocio sin compromisos a largo plazo.",
        },
      },
    },
    cta: {
      title: "¿Listo para Transformar Tu Fuerza Laboral?",
      description: "Únete a cientos de empresas que ya han descubierto el poder del talento global. Comienza a construir tu equipo ideal hoy sin riesgo.",
      primary: "Comenzar a Contratar Hoy",
      secondary: "Explorar Servicios",
      trust: "Confiado por startups, agencias y empresas en todo el mundo",
    },
    footer: {
      description: "Tu ruta directa al talento adecuado. Conectamos empresas con profesionales globales capacitados, manejando todo desde la contratación hasta la nómina.",
      company: "Empresa",
      resources: "Recursos",
      contact: "Contacto",
      aboutUs: "Sobre Nosotros",
      applyForJobs: "Aplicar a Empleos",
      clientPortal: "Portal de Clientes",
      makePayment: "Realizar un Pago",
      googleGuide: "Guía de Google Business",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      rights: "Todos los derechos reservados.",
    },
    clientLogin: {
      title: "Portal de Clientes",
      subtitle: "Inicia sesión para ver tus facturas y gestionar pagos",
      email: "Correo Electrónico",
      password: "Contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      signIn: "Iniciar Sesión",
      signingIn: "Iniciando sesión...",
      needHelp: "¿Necesitas ayuda?",
      contactSupport: "Contactar Soporte",
      demoMessage: "Modo Demo",
      demoDescription: "La autenticación se habilitará pronto. Redirigiendo a la vista previa del panel.",
    },
    dashboard: {
      welcome: "Bienvenido de Nuevo",
      subtitle: "Gestiona tus facturas y pagos",
      totalOutstanding: "Total Pendiente",
      paidInvoices: "Facturas Pagadas",
      pendingInvoices: "Facturas Pendientes",
      payOutstanding: "Pagar Saldo Pendiente",
      invoices: "Facturas",
      all: "Todas",
      pending: "Pendientes",
      paid: "Pagadas",
      overdue: "Vencidas",
      noInvoices: "No se encontraron facturas",
      issued: "Emitida",
      due: "Vence",
      payNow: "Pagar Ahora",
    },
    payment: {
      title: "Realizar un Pago",
      subtitle: "Ingresa el monto que deseas pagar",
      payInvoice: "Pagar factura",
      amount: "Monto del Pago (USD)",
      cardDetails: "Datos de la Tarjeta",
      cardholderName: "Nombre del Titular",
      cardNumber: "Número de Tarjeta",
      expiry: "Fecha de Vencimiento",
      cvc: "CVC",
      securityNotice: "Tu información de pago está encriptada y segura. Nunca almacenamos los datos completos de tu tarjeta.",
      processing: "Procesando...",
      payNow: "Pagar",
      bankTransfer: "¿Prefieres pagar por transferencia bancaria?",
      bankDetails: "Datos de Transferencia Bancaria",
      success: {
        title: "¡Pago Exitoso!",
        description: "Gracias por tu pago. Se ha enviado un correo de confirmación a tu dirección registrada.",
        returnDashboard: "Volver al Panel",
        goHome: "Ir al Inicio",
      },
    },
    googleGuide: {
      badge: "Recurso Gratuito",
      title: "Cómo Configurar Tu Perfil de Google Business",
      subtitle: "Una guía completa paso a paso para crear y optimizar tu Perfil de Google Business para atraer más clientes locales y hacer crecer tu negocio.",
      readTime: "15 min de lectura",
      updated: "Actualizado Diciembre 2024",
      whyTitle: "Por Qué Necesitas un Perfil de Google Business",
      whySubtitle: "El 46% de todas las búsquedas en Google buscan información local. Así es como un Perfil de Google Business te ayuda a capturar ese tráfico.",
      benefits: {
        localSearch: {
          title: "Aparece en Búsquedas Locales",
          description: "Muéstrate cuando clientes potenciales buscan servicios en tu área.",
        },
        reviews: {
          title: "Construye Confianza con Reseñas",
          description: "Recopila y responde a las reseñas de clientes para construir credibilidad.",
        },
        hours: {
          title: "Comparte Tu Horario",
          description: "Informa a los clientes cuándo estás abierto, incluyendo horarios especiales para días festivos.",
        },
        contact: {
          title: "Habilita Contacto Directo",
          description: "Los clientes pueden llamarte o enviarte mensajes directamente desde tu perfil.",
        },
        showcase: {
          title: "Muestra Tu Trabajo",
          description: "Agrega fotos y videos para mostrar lo que hace único a tu negocio.",
        },
        performance: {
          title: "Rastrea el Rendimiento",
          description: "Ve cómo te encuentran los clientes y qué acciones toman.",
        },
      },
      stepsTitle: "Guía de Configuración Paso a Paso",
      stepsSubtitle: "Sigue estos pasos para crear y optimizar tu Perfil de Google Business en aproximadamente 15 minutos.",
      proTips: "Consejos Pro",
      steps: {
        step1: {
          title: "Inicia Sesión o Crea una Cuenta de Google",
          description: "Necesitarás una cuenta de Google para gestionar tu perfil de negocio. Si ya tienes Gmail, puedes usar esa cuenta.",
          tips: [
            "Usa un correo empresarial si es posible para mejor organización",
            "Habilita la autenticación de 2 factores para seguridad",
            "Asegúrate de que el propietario de la cuenta sea alguien que permanecerá en la empresa a largo plazo",
          ],
        },
        step2: {
          title: "Ve a Google Business Profile",
          description: "Visita business.google.com y haz clic en 'Gestionar ahora' para comenzar a configurar tu perfil.",
          tips: [
            "También puedes buscar tu negocio en Google y hacer clic en '¿Es tuyo este negocio?'",
            "Si tu negocio ya tiene una ficha, puedes reclamarla en lugar de crear una nueva",
          ],
          linkText: "Ir a Google Business Profile",
        },
        step3: {
          title: "Ingresa el Nombre de Tu Negocio",
          description: "Escribe el nombre exacto de tu negocio como aparece en el mundo real. Esto ayuda a los clientes a encontrarte y genera confianza.",
          tips: [
            "Usa el nombre real de tu negocio - no agregues palabras clave",
            "Sé consistente con cómo aparece tu nombre en otros lugares en línea",
            "Si eres un negocio de área de servicio, puedes ocultar tu dirección más tarde",
          ],
        },
        step4: {
          title: "Elige Tu Categoría de Negocio",
          description: "Selecciona la categoría que mejor describa lo que hace tu negocio. Esto es crucial para aparecer en búsquedas relevantes.",
          tips: [
            "Elige la categoría más específica disponible",
            "Puedes agregar categorías adicionales más tarde",
            "Las categorías afectan qué funciones están disponibles para ti",
          ],
        },
        step5: {
          title: "Agrega Tu Ubicación",
          description: "Ingresa la dirección de tu negocio. Si atiendes a clientes en su ubicación, puedes configurar un área de servicio en su lugar.",
          tips: [
            "Para negocios desde casa, puedes ocultar tu dirección",
            "Los negocios de área de servicio pueden especificar las regiones que atienden",
            "Asegúrate de que tu dirección coincida con tus otras fichas en línea",
          ],
        },
        step6: {
          title: "Agrega Información de Contacto",
          description: "Ingresa el número de teléfono de tu negocio y la URL de tu sitio web. Esto facilita que los clientes te contacten.",
          tips: [
            "Usa un número de teléfono local cuando sea posible",
            "Asegúrate de que tu sitio web sea compatible con móviles",
            "Mantén esta información consistente en todas las plataformas",
          ],
        },
        step7: {
          title: "Verifica Tu Negocio",
          description: "Google necesita verificar que eres propietario o gestionas este negocio. La mayoría de los negocios verifican por postal, pero otras opciones pueden estar disponibles.",
          tips: [
            "La verificación por postal típicamente toma 5-14 días",
            "Algunos negocios califican para verificación por teléfono o correo electrónico",
            "No cambies el nombre o dirección de tu negocio mientras esperas la verificación",
          ],
        },
        step8: {
          title: "Completa Tu Perfil",
          description: "Agrega fotos, horarios de negocio, servicios y otros detalles para hacer tu perfil completo y atractivo.",
          tips: [
            "Los perfiles con fotos reciben 42% más solicitudes de direcciones",
            "Agrega tus horarios de negocio y mantenlos actualizados",
            "Escribe una descripción de negocio convincente con palabras clave relevantes",
          ],
        },
      },
      successTitle: "Consejos para el Éxito a Largo Plazo",
      successTips: {
        updated: {
          title: "Mantén la Información Actualizada",
          description: "Revisa regularmente que tus horarios, información de contacto y servicios sean precisos.",
        },
        reviews: {
          title: "Responde a las Reseñas",
          description: "Agradece a los clientes por las reseñas positivas y aborda las negativas profesionalmente.",
        },
        posts: {
          title: "Publica Actualizaciones Regulares",
          description: "Usa Google Posts para compartir noticias, ofertas y eventos con clientes potenciales.",
        },
        photos: {
          title: "Agrega Fotos Nuevas",
          description: "Sube fotos nuevas regularmente para mantener tu perfil atractivo y actual.",
        },
        questions: {
          title: "Responde Preguntas",
          description: "Monitorea y responde las preguntas que los clientes hacen en tu perfil.",
        },
      },
      ctaTitle: "¿Necesitas Ayuda para Hacer Crecer Tu Negocio?",
      ctaDescription: "Clear Path Hire ayuda a las empresas a escalar eficientemente con profesionales remotos dedicados. Déjanos manejar tus necesidades de personal para que puedas enfocarte en el crecimiento.",
      ctaPrimary: "Comenzar Hoy",
      ctaSecondary: "Explorar Nuestros Servicios",
    },
    contact: {
      title: "Contáctanos",
      subtitle: "¿Tienes preguntas? Nos encantaría saber de ti. Envíanos un mensaje y responderemos lo antes posible.",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        company: "Nombre de la Empresa",
        phone: "Número de Teléfono",
        message: "Mensaje",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        success: "¡Mensaje Enviado!",
        successDesc: "Gracias por comunicarte. Te responderemos dentro de 24 horas.",
      },
      info: {
        email: "Escríbenos",
        emailDesc: "Nuestro equipo está aquí para ayudar",
        phone: "Llámanos",
        phoneDesc: "Lun-Vie de 8am a 6pm",
        location: "Ubicación",
        locationDesc: "Atendiendo clientes en todo el mundo",
        response: "Tiempo de Respuesta",
        responseDesc: "Dentro de 24 horas",
      },
      consultation: {
        title: "Consulta Gratuita",
        description: "Agenda una consulta gratuita de 30 minutos para discutir tus necesidades de personal y descubrir cómo podemos ayudar a crecer tu negocio.",
      },
    },
    about: {
      title: "Sobre Clear Path Hire",
      subtitle: "Estamos en una misión de revolucionar cómo las empresas construyen sus equipos conectándolas con talento global excepcional.",
    },
    apply: {
      title: "Únete a Nuestra Red de Talento",
      subtitle: "Da el siguiente paso en tu carrera. Aplica para unirte a nuestra red de profesionales capacitados y conéctate con los mejores empleadores en todo el mundo.",
    },
    team: {
      badge: "NUESTRO EQUIPO",
      title: "Conoce a las Personas Detrás de Clear Path Hire",
      subtitle: "Nuestro dedicado equipo de expertos trabaja incansablemente para conectar empresas con talento global excepcional.",
      roles: {
        founder: "Fundador",
        directorOps: "Director de Operaciones",
        directorTalent: "Director de Adquisición de Talento",
        accountingDirector: "Director de Contabilidad",
        marketingDirector: "Director de Marketing",
      },
      cta: {
        title: "¿Quieres Unirte a Nuestro Equipo?",
        description: "Siempre estamos buscando personas talentosas que compartan nuestra pasión por conectar empresas con talento global excepcional.",
        button: "Ver Posiciones Abiertas",
      },
    },
  },
};
