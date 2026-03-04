import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Other from "@/components/sections/Other";
import Footer from "@/components/ui/Footer";
import Background from "@/components/ui/Background";

export default function Home() {
  return (
    <main className="relative text-white overflow-hidden min-h-screen">
      <Background />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Other />
      </div>

      <Footer />
    </main>
  );
}
