import HeroSection from "@/components/HeroSection";
import ChallengeSection from "@/components/ChallengeSection";
import SolutionSection from "@/components/SolutionSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import TeamSection from "@/components/TeamSection";
import ImpactSection from "@/components/ImpactSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <ChallengeSection />
      <SolutionSection />
      <ObjectivesSection />
      <TeamSection />
      <ImpactSection />
    </main>
  );
};

export default Index;
