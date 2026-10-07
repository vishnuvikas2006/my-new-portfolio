import { projects } from '../../data/projects';
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

export function Projects() {
  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow="03 / PROJECTS"
        title="Projects"
        description="A growing collection of software and AI-focused work."
        particle
      />
      {projects.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__star" aria-hidden="true">✦</span>
          <p>Project archive ready.</p>
          <span>Add project entries in <code>src/data/projects.ts</code>.</span>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={`${project.title}-${project.github ?? project.liveDemo ?? ''}`}>
              {project.image ? (
                <img className="project-card__image" src={project.image} alt={`${project.title} project preview`} />
              ) : (
                <div className="project-card__visual" aria-hidden="true"><span>✦</span></div>
              )}
              <div className="project-card__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="card-links">
                  {isExternalUrl(project.liveDemo) ? (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>
                  ) : null}
                  {isExternalUrl(project.github) ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
