import { SectionHeading } from './SectionHeading';

const skillGroups = [
  { label: 'Languages', skills: ['Python', 'Java'] },
  { label: 'Web', skills: ['HTML', 'CSS'] },
  { label: 'Data', skills: ['MongoDB'] },
  { label: 'Tools', skills: ['VS Code', 'Docker', 'Git', 'GitHub', 'Coding Agents', 'Claude / Claude Code'] },
  { label: 'AI & ML', skills: ['Prompt Engineering', 'AI Agents'] },
  { label: 'Foundations', skills: ['System Design', 'Basic Data Structures and Algorithms'] },
];

export function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="02 / SKILLS"
        title="Skills"
        description="Technologies, tools, and foundations I am actively learning and using."
        particle
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article className="skill-group" key={group.label}>
            <p className="skill-group__index">0{index + 1}</p>
            <h3>{group.label}</h3>
            <ul>
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
