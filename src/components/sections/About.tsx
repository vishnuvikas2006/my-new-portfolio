import { useState } from 'react';
import { profile } from '../../data/profile';
import { SectionHeading } from './SectionHeading';

export function About() {
  const [hasProfileImage, setHasProfileImage] = useState(true);

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <SectionHeading
        id="about-title"
        eyebrow="01 / ABOUT"
        title="Hello, I am Vishnu Vikas."
      />

      <div className="about-grid">
        <div className="about-copy">
          <p>
            I&apos;m a B.Tech student focused on Artificial Intelligence and Machine Learning, building useful software and
            AI-powered applications.
          </p>
          <p>
            Hackathons have strengthened my problem-solving and teamwork. I&apos;m actively learning AI, software development,
            and modern developer tools.
          </p>
        </div>

        <aside className="identity-card" aria-label="Profile and education">
          <div className="identity-card__top">
            <div className="profile-image" aria-label="Profile image placeholder">
              {hasProfileImage ? (
                <img src={profile.profileImage} alt="Vishnu Vikas Maggam" onError={() => setHasProfileImage(false)} />
              ) : null}
              {!hasProfileImage ? <span aria-hidden="true">VV</span> : null}
            </div>
            <div>
              <p className="identity-card__label">BASED IN</p>
              <p>{profile.location}</p>
            </div>
          </div>
          <div className="education-entry">
            <p className="identity-card__label">EDUCATION</p>
            <h3>B.Tech — Artificial Intelligence / AI &amp; ML</h3>
            <p>Mohan Babu University, Tirupati</p>
            <p className="education-entry__detail">2024 — 2028 · Expected May 2028</p>
          </div>
          <div className="education-entry education-entry--compact">
            <p className="identity-card__label">FOUNDATION</p>
            <p>Sri Sai Ram English Medium High School, Nellore</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
