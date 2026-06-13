import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <Hero />
      <Trust />
      <Marquee />
      <Services />
      <Showcase />
      <Work />
      <About />
      <Blog />
      <Contact />
    </main>
  );
}
