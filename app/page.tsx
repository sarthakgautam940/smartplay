import { HomeSections } from "@/components/marketing/home-sections";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { PublicShell } from "@/components/marketing/public-shell";

export default function Home() {
  return (
    <PublicShell>
      <MarketingHero />
      <HomeSections />
    </PublicShell>
  );
}
