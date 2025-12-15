import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/clearpath-logo.png";

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { name: t("footer.aboutUs"), path: "/about" },
      { name: t("nav.services"), path: "/services" },
      { name: t("nav.testimonials"), path: "/testimonials" },
      { name: t("nav.contact"), path: "/contact" },
    ],
    resources: [
      { name: t("footer.applyForJobs"), path: "/apply" },
      { name: t("footer.clientPortal"), path: "/client-login" },
      { name: t("footer.makePayment"), path: "/payment" },
      { name: t("footer.googleGuide"), path: "/google-business-guide" },
    ],
  };

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img src={logo} alt="Clear Path Hire" className="h-12 w-auto mb-6 brightness-0 invert" />
            <p className="text-navy-foreground/80 mb-6 max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-navy-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-navy-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-secondary mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-navy-foreground/70">info@clearpathhire.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-secondary mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-navy-foreground/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-navy-foreground/70">United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-foreground/60 text-sm">
            © {new Date().getFullYear()} Clear Path Hire. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-navy-foreground/60 hover:text-secondary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="#" className="text-navy-foreground/60 hover:text-secondary transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
