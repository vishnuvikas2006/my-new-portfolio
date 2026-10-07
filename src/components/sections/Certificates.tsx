import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { certificates, type Certificate } from '../../data/certificates';
import { SectionHeading } from './SectionHeading';

const isExternalUrl = (url?: string) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};

export type CertificateEntry = Certificate;

type CertificateGalleryProps = {
  entries: CertificateEntry[];
  emptyMessage: string;
  emptyDetail?: ReactNode;
  className?: string;
};

export function CertificateGallery({ entries, emptyMessage, emptyDetail, className = '' }: CertificateGalleryProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateEntry | null>(null);

  useEffect(() => {
    if (!selectedCertificate) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCertificate(null);
    };

    document.body.classList.add('certificate-modal-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('certificate-modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedCertificate]);

  return (
    <>
      {entries.length === 0 ? (
        <div className="empty-state empty-state--certificate">
          <span className="empty-state__star" aria-hidden="true">&#10023;</span>
          <p>{emptyMessage}</p>
          {emptyDetail ? <span>{emptyDetail}</span> : null}
        </div>
      ) : (
        <div className={`certificate-grid ${className}`.trim()}>
          {entries.map((certificate) => (
            <article className="certificate-card" key={`${certificate.title}-${certificate.date}`}>
              {certificate.image ? (
                <button
                  className="certificate-card__preview"
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                  aria-label={`Open full ${certificate.title} certificate`}
                >
                  <img className="certificate-card__image" src={certificate.image} alt={`${certificate.title} certificate preview`} />
                  <span className="certificate-card__expand" aria-hidden="true">View full certificate &rarr;</span>
                </button>
              ) : (
                <div className="certificate-card__placeholder" aria-hidden="true">
                  <span>VV</span><i>&#10022;</i>
                </div>
              )}
              <div className="certificate-card__body">
                <p className="eyebrow">{certificate.issuer} / {certificate.date}</p>
                <h3>{certificate.title}</h3>
                {isExternalUrl(certificate.certificateUrl) ? (
                  <a className="text-link" href={certificate.certificateUrl} target="_blank" rel="noopener noreferrer">
                    View certificate <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
      {selectedCertificate?.image ? createPortal(
        <div
          className="certificate-modal"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedCertificate(null);
          }}
        >
          <div className="certificate-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title">
            <button className="certificate-modal__close" type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate viewer">
              <span aria-hidden="true">&times;</span> Close
            </button>
            <img className="certificate-modal__image" src={selectedCertificate.image} alt={`${selectedCertificate.title} full certificate`} />
            <p id="certificate-modal-title">{selectedCertificate.title}</p>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}

type CertificatesProps = {
  onViewHackathons: () => void;
};

export function Certificates({ onViewHackathons }: CertificatesProps) {
  return (
    <section id="certificates" className="section certificates-section" aria-labelledby="certificates-title">
      <SectionHeading
        id="certificates-title"
        eyebrow="04 / CERTIFICATES"
        title="Certificates"
        description="A place to keep a focused record of completed learning and certifications."
        particle
      />
      <CertificateGallery
        entries={certificates}
        emptyMessage="Certificate collection ready."
        emptyDetail={<>Add certificate entries in <code>src/data/certificates.ts</code>.</>}
      />
      <button className="button certificates__hackathon-trigger" type="button" onClick={onViewHackathons}>
        View All Hackathon Certificates <span aria-hidden="true">&rarr;</span>
      </button>
    </section>
  );
}
