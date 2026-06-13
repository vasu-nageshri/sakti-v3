import { NavBar } from "@/components/nav-bar";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { Panel } from "@/components/panel";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { ShowcaseH } from "@/components/sections/showcase-h";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <HorizontalScroll>
        {/* Each Panel = one full-height column on desktop (whole page scrolls
            horizontally as you scroll vertically), normal stacked block on mobile. */}
        <Panel width="lg:w-screen">
          <Hero />
        </Panel>

        <Panel width="lg:w-[55vw]">
          <div className="flex flex-col gap-10 py-16 lg:py-0">
            <Trust />
            <Marquee />
          </div>
        </Panel>

        <Panel id="services" width="lg:w-[95vw]">
          <Services />
        </Panel>

        <Panel id="capabilities" width="lg:w-[92vw]">
          <ShowcaseH />
        </Panel>

        <Panel id="work" width="lg:w-[95vw]">
          <Work />
        </Panel>

        <Panel id="about" width="lg:w-[92vw]">
          <About />
        </Panel>

        <Panel id="blog" width="lg:w-[80vw]">
          <Blog />
        </Panel>

        <Panel id="contact" width="lg:w-[92vw]">
          <Contact />
        </Panel>
      </HorizontalScroll>
    </main>
  );
}
