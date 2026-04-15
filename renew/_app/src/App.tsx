import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { AgenticCoding } from '@/sections/AgenticCoding';
import { Projects } from '@/sections/Projects';
import { Experience } from '@/sections/Experience';
import { Writing } from '@/sections/Writing';
import { Contact } from '@/sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <AgenticCoding />
        <Projects />
        <Experience />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
