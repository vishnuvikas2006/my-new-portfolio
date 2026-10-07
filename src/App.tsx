import { useState } from 'react';
import { Navigation } from './components/navigation/Navigation';
import { AmbientParticles } from './components/effects/AmbientParticles';
import { ParticleHero } from './components/hero/ParticleHero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Certificates } from './components/sections/Certificates';
import { HackathonCertificates } from './components/sections/HackathonCertificates';
import { Contact } from './components/sections/Contact';

export default function App() {
  const [isHackathonViewOpen, setIsHackathonViewOpen] = useState(false);

  return (
    <>
      <AmbientParticles />
      <Navigation onViewHackathons={() => setIsHackathonViewOpen(true)} />
      <main>
        <ParticleHero />
        <div className="portfolio-content">
          <About />
          <Skills />
          <Projects />
          <Certificates onViewHackathons={() => setIsHackathonViewOpen(true)} />
          <Contact />
        </div>
      </main>
      {isHackathonViewOpen ? <HackathonCertificates onClose={() => setIsHackathonViewOpen(false)} /> : null}
    </>
  );
}
