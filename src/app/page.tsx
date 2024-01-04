import Header from "@components/Header";
import dynamic from "next/dynamic";

const HeroScreen = dynamic(() => import("@screen/hero"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen p-2">
      {/* <Header /> */}
      <HeroScreen />
    </main>
  );
}
