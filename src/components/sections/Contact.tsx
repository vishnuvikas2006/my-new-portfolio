import { profile } from '../../data/profile';
import { ParticleSectionTitle } from '../effects/ParticleSectionTitle';

export function Contact() {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <p className="eyebrow">05 / CONTACT</p>
      <h2 id="contact-title" className="particle-section-title">
        <span className="sr-only">Contact</span>
        <ParticleSectionTitle text="Contact" />
      </h2>
      <p className="contact-section__copy">
        I&apos;m open to internships, AI and software development opportunities, real-world projects, and thoughtful collaboration.
      </p>
      <div className="contact-actions">
        <a className="button button--primary" href={`mailto:${profile.email}`}>Email me <span aria-hidden="true">↗</span></a>
        <a className="button" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <a className="button" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </div>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website.replace('https://', '')} ↗</a>
      </footer>
    </section>
  );
}
