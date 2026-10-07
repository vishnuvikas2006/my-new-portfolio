import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { certificates } from '../../data/hackaton';
import { CertificateGallery } from './Certificates';
import { ParticleSectionTitle } from '../effects/ParticleSectionTitle';

type HackathonCertificatesProps = {
  onClose: () => void;
};

export function HackathonCertificates({ onClose }: HackathonCertificatesProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.classList.add('hackathon-view-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('hackathon-view-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="hackathon-view"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="hackathon-view__panel" role="dialog" aria-modal="true" aria-labelledby="hackathon-view-title">
        <button className="hackathon-view__close" type="button" onClick={onClose} aria-label="Close Hackathon Certificates">
          <span aria-hidden="true">&larr;</span> Back to portfolio
        </button>
        <header className="hackathon-view__header">
          <p className="eyebrow">HACKATHONS / CERTIFICATES</p>
          <h2 id="hackathon-view-title" className="particle-section-title">
            <span className="sr-only">Hackathon Certificates</span>
            <ParticleSectionTitle text="Hackathon Certificates" />
          </h2>
          <p>A collection of my hackathon participation and achievement certificates.</p>
        </header>
        <CertificateGallery
          entries={certificates}
          emptyMessage="No hackathon certificates added yet."
          emptyDetail={<>Add certificate entries in <code>src/data/hackaton.ts</code>.</>}
          className="hackathon-view__grid"
        />
      </div>
    </div>,
    document.body,
  );
}
