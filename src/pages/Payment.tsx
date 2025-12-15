import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle, Building2 } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("invoice");
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    amount: invoiceId ? "4750.00" : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }
    
    if (name === "expiry") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 5) }));
      return;
    }
    
    if (name === "cvc") {
      setFormData(prev => ({ ...prev, [name]: value.slice(0, 4) }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      toast({
        title: t("payment.success.title"),
        description: t("payment.success.description"),
      });
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <Layout>
        <main id="main-content" role="main" aria-labelledby="success-heading">
          <section className="min-h-[80vh] flex items-center justify-center py-20 bg-gradient-hero">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto text-center"
              >
                <div className="bg-card rounded-2xl shadow-brand p-8 border border-border">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h1 id="success-heading" className="text-2xl font-bold text-foreground mb-2">
                    {t("payment.success.title")}
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    {t("payment.success.description")}
                  </p>
                  <div className="space-y-3">
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/client-dashboard">{t("payment.success.returnDashboard")}</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/">{t("payment.success.goHome")}</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main id="main-content" role="main" aria-labelledby="payment-heading">
        <section className="py-20 bg-gradient-hero min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h1 id="payment-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t("payment.title")}
                </h1>
                <p className="text-muted-foreground">
                  {invoiceId 
                    ? `${t("payment.payInvoice")} ${invoiceId}` 
                    : t("payment.subtitle")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-2xl shadow-brand p-8 border border-border"
              >
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Payment form">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-foreground">
                      {t("payment.amount")}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        $
                      </span>
                      <Input
                        id="amount"
                        name="amount"
                        type="text"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        className="pl-8 text-lg font-semibold"
                        required
                        aria-required="true"
                        readOnly={!!invoiceId}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                      <span>{t("payment.cardDetails")}</span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        {t("payment.cardholderName")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="cc-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-foreground">
                        {t("payment.cardNumber")}
                      </Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="cc-number"
                        inputMode="numeric"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="text-foreground">
                          {t("payment.expiry")}
                        </Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          autoComplete="cc-exp"
                          inputMode="numeric"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc" className="text-foreground">
                          {t("payment.cvc")}
                        </Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          type="text"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          autoComplete="cc-csc"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <Lock className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">
                      {t("payment.securityNotice")}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                    aria-busy={isProcessing}
                  >
                    {isProcessing ? (
                      <>{t("payment.processing")}</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" aria-hidden="true" />
                        {t("payment.payNow")} {formData.amount ? `$${formData.amount}` : ""}
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {t("payment.bankTransfer")}
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="text-sm font-medium text-foreground">{t("payment.bankDetails")}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Bank: First National Bank</p>
                      <p>Account Name: Clear Path Hire LLC</p>
                      <p>Account Number: ****4521</p>
                      <p>Routing Number: ****7890</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Payment;
