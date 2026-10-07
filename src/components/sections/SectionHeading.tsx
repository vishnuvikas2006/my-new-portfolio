import { ParticleSectionTitle } from '../effects/ParticleSectionTitle';

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  particle?: boolean;
};

export function SectionHeading({ id, eyebrow, title, description, particle = false }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      {particle ? (
        <h2 id={id} className="particle-section-title">
          <span className="sr-only">{title}</span>
          <ParticleSectionTitle text={title} />
        </h2>
      ) : <h2 id={id}>{title}</h2>}
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
