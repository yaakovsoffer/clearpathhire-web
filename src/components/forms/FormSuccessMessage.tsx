import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessMessageProps {
  type: "contact" | "apply";
  onReset: () => void;
}

export const FormSuccessMessage = ({ type, onReset }: FormSuccessMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-3xl p-8 md:p-12 shadow-brand border border-border text-center"
    >
      <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-secondary" size={40} />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        {type === "contact" ? "Message Sent!" : "Application Submitted!"}
      </h2>
      
      <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
        {type === "contact" 
          ? "Thank you for reaching out! A member of our team will review your inquiry and get back to you within 24 hours."
          : "Thank you for your application! A member of our team will review your information and reach out to you shortly to discuss the next steps."
        }
      </p>

      <div className="bg-muted/50 rounded-xl p-4 mb-8 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">What happens next?</span>
          <br />
          {type === "contact" 
            ? "We'll review your needs and prepare a personalized response."
            : "Our talent team will evaluate your profile and schedule a call if there's a good fit."
          }
        </p>
      </div>

      <Button
        variant="outline"
        onClick={onReset}
        className="gap-2"
      >
        <ArrowLeft size={16} />
        {type === "contact" ? "Send Another Message" : "Submit Another Application"}
      </Button>
    </motion.div>
  );
};
