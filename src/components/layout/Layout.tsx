import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import SkipLink from "@/components/ui/SkipLink";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <div className="flex-1 pt-20">{children}</div>
      <Footer />
    </div>
  );
};
