import FAQs from "@/components/FAQ";
import Hero from "@/components/Hero";
import NearByLocations from "@/components/NearByLocation";
import OwnersNote from "@/components/Owner";
import ReviewsSection from "@/components/Reviews";
import SafetyAndHygiene from "@/components/SafetyAndHygiene";
import VillaExperienceStandard from "@/components/VillaStandards";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <VillaExperienceStandard />
      <NearByLocations />
      <SafetyAndHygiene />
      <WhyChooseUs />
      <ReviewsSection />
      <OwnersNote />
      <FAQs />
    </>
  );
}
