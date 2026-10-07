export type Project = {
  title: string;
  description: string;
  liveDemo?: string;
  github?: string;
  image?: string;
  technologies: string[];
};

// Add projects here. Cards are created automatically by the Projects section.
export const projects: Project[] = [
  {
  title: 'AI-Based Municipal Grievance Portal',
  description: 'AI-Based Municipal Grievance Portal — An AI-powered civic platform that enables citizens to submit complaints, intelligently routes and prioritizes them, detects duplicates, and helps authorities efficiently track and resolve issues.',
  liveDemo: '', // omit or leave empty to hide this button
  github: 'https://github.com/vishnuvikas2006/AI_based_municiple_work_project.git', // omit or leave empty to hide this button
  image: 'https://www.image2url.com/r2/default/images/1791287964693-e3a52fc8-7116-46c9-a8aa-b9a0e8ffe207.png', // optional
  technologies: ['Next.js', 'TypeScript', 'Gemini API','Mongo db']
}
];
