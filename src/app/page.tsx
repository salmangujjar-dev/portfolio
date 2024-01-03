import dynamic from "next/dynamic";

const HeroScreen = dynamic(() => import("@screen/hero"), { ssr: true });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroScreen />
    </main>
  );
}
