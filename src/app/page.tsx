import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Foreword from "@/components/sections/Foreword";
import WhoAmI from "@/components/sections/WhoAmI";
import PersonalBranding from "@/components/sections/PersonalBranding";
import AttitudeEthics from "@/components/sections/AttitudeEthics";
import Communication from "@/components/sections/Communication";
import PublicSpeaking from "@/components/sections/PublicSpeaking";
import GoalSetting from "@/components/sections/GoalSetting";
import Reflection from "@/components/sections/Reflection";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-black">
      <Navbar />
      <Hero />
      <Foreword />
      <WhoAmI />
      <PersonalBranding />
      <AttitudeEthics />
      <Communication />
      <PublicSpeaking />
      <GoalSetting />
      <Reflection />
    </main>
  );
}
