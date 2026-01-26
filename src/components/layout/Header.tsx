import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/cph-logo.png";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.testimonials"), path: "/testimonials" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-lg border-b border-navy/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Clear Path Hire" className="h-10 md:h-12 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-navy-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" asChild className="lg:size-default text-navy-foreground/80 hover:text-secondary hover:bg-navy-foreground/10">
              <Link to="/client-login">{t("nav.clientLogin")}</Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="lg:size-default border-secondary text-secondary hover:bg-secondary hover:text-navy">
              <Link to="/apply">{t("nav.applyForJobs")}</Link>
            </Button>
            <Button size="sm" asChild className="lg:size-default bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">{t("nav.startHiring")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-navy-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-navy/80"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-2 transition-colors hover:text-secondary ${
                    location.pathname === link.path
                      ? "text-secondary"
                      : "text-navy-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-navy-foreground/20">
                <Button variant="ghost" asChild className="w-full text-navy-foreground/80 hover:text-secondary hover:bg-navy-foreground/10">
                  <Link to="/client-login" onClick={() => setIsOpen(false)}>
                    {t("nav.clientLogin")}
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full border-secondary text-secondary hover:bg-secondary hover:text-navy">
                  <Link to="/apply" onClick={() => setIsOpen(false)}>
                    {t("nav.applyForJobs")}
                  </Link>
                </Button>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    {t("nav.startHiring")}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
