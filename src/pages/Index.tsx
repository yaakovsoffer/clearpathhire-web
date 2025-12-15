import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <CTASection />
    </Layout>
  );
};

export default Index;
