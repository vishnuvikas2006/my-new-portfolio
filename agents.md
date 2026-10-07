You are working on my existing portfolio website.

IMPORTANT:
Do NOT create a completely unrelated portfolio from scratch.
First inspect my existing project structure, components, pages, styles, assets, package.json, and current implementation.

I want to redesign the website into a premium futuristic interactive portfolio inspired by the cinematic particle interaction style of modern OpenAI/Astra-style landing pages.

==================================================
1. MAIN HERO / LANDING EXPERIENCE
==================================================

When the website opens, the first thing the user should see is:

A nearly black / very dark navy full-screen background.

There should NOT be a large galaxy image, nebula background, planet, hologram, or decorative galaxy occupying the screen.

Instead, the main visual should be created using thousands of small glowing stars/particles.

The stars themselves must form the text:

VISHNU VIKAS

The text should NOT be rendered as normal HTML text.

The letters "VISHNU VIKAS" must be created using particles/stars.

Visual style:

- Premium
- Minimal
- Futuristic
- Cinematic
- Dark
- Space-inspired
- Mostly black background
- White / soft blue / subtle violet glowing particles
- Very subtle particle glow
- No huge galaxy image
- No movie hologram
- No unnecessary visual clutter

The initial viewport should feel like:

                ✦       ·
       ·
                   ✧

             VISHNU VIKAS
          (formed completely
           from particles)

       ·       ✦       ·

                 ↓
             DRAG DOWN

The name should be the primary visual focus.

==================================================
2. PARTICLE TEXT
==================================================

Create the "VISHNU VIKAS" text using a particle system.

Preferred technology:

- Three.js
- React Three Fiber
- @react-three/fiber
- @react-three/drei
- custom shader/particle logic where useful

Use the technology already present in my project if possible.

Do NOT use a giant static PNG/JPG of the text.

The particles should actually be interactive.

Requirements:

- Thousands of particles
- Particles positioned according to the shape of the letters
- Small particle sizes
- Soft glow
- Slight random movement
- Subtle idle animation
- Smooth animation
- Good performance
- Responsive on desktop and mobile

The particle text should remain readable.

==================================================
3. DRAG / SCROLL INTERACTION
==================================================

This is the MOST IMPORTANT interaction.

When the page initially loads:

Particles form:

VISHNU VIKAS

When the user starts dragging downward / scrolling downward:

The particles should gradually separate from the letter positions.

Do NOT instantly disappear.

The transition must happen progressively.

Example:

STATE 1:
VISHNU VIKAS
particles tightly form the letters.

STATE 2:
VISHNU VIKAS
particles start moving away from the letters.

STATE 3:
The letters become partially broken apart.
Particles start flowing downward/outward.

STATE 4:
The letters completely dissolve into particles.

STATE 5:
Particles smoothly move away / transition into the next portfolio section.

The transition should be controlled by scroll progress.

Use:

scroll progress = 0 → intact text

scroll progress = 0.25 → slight particle separation

scroll progress = 0.50 → major separation

scroll progress = 0.75 → text mostly dissolved

scroll progress = 1 → transition completed

The particle movement should have:

- easing
- inertia
- smooth interpolation
- subtle randomness
- depth movement
- slight parallax
- no sudden jumps

The interaction should feel physically connected to the user's drag.

==================================================
4. DRAG DOWN INDICATOR
==================================================

At the bottom of the hero section show a very minimal indicator:

DRAG DOWN
↓
or a minimal mouse/drag icon.

It should gently animate.

When the user starts scrolling, this indicator should fade away.

Do not make it large.

==================================================
5. HERO TRANSITION TO PORTFOLIO
==================================================

After the particle text dissolves, smoothly reveal my actual portfolio.

The transition should feel like the user is entering the portfolio through the particle field.

Do NOT simply jump to another page.

The particle animation and page scroll should feel like one continuous experience.

Possible sequence:

VISHNU VIKAS
       ↓
particles separate
       ↓
particles move outward/downward
       ↓
portfolio content fades/slides in
       ↓
ABOUT ME

The transition should be cinematic but not overdone.

==================================================
6. MY NAME / PERSONAL INFORMATION
==================================================

Full name:

Vishnu Vikas Maggam

Professional headline:

Computer Science Engineering Student | AI & ML Enthusiast | Developer

Short description:

Building intelligent solutions, exploring AI, and turning ideas into real-world applications.

Location:

Nellore, India 524313

Phone:

+91 6037357227

Email:

vishnumaggam@gmail.com

LinkedIn:

https://www.linkedin.com/in/vishnu-vikas-490549217

GitHub:

https://github.com/vishnuvikas2006

Website:

https://vishnuvikas.com

IMPORTANT:

Use the above information where appropriate.

Do not invent personal information.

==================================================
7. ABOUT SECTION
==================================================

Create a clean futuristic About section after the hero.

Use this information as the base:

"I am a B.Tech student focused on Artificial Intelligence and Machine Learning, interested in building useful software and AI-powered applications.

College hackathons have helped me develop practical problem-solving skills, teamwork, and the ability to work on real-world challenges.

I am actively learning and building in AI, software development, and modern developer tools."

Keep the writing professional and concise.

Do NOT make exaggerated claims.

==================================================
8. EDUCATION
==================================================

Education:

B.Tech - Artificial Intelligence / AI & ML

Mohan Babu University, Tirupati

2024 - 2028

Expected graduation:
May 2028

Also include:

Sri Sai Ram English Medium High School, Nellore

IMPORTANT:
Do not describe me as a second-year student anymore.
I am currently a third-year B.Tech student.

==================================================
9. SKILLS
==================================================

Create a modern interactive skills section.

Use the skills from my current resume/site, but organize them properly.

Languages:
- Python
- Java
- C++ if already present in my existing project/resume

Web:
- HTML
- CSS

Database:
- SQL
- MongoDB

Tools:
- VS Code
- Docker
- Git
- GitHub
- Coding Agents
- Claude / Claude Code

AI:
- Prompt Engineering
- AI Agents
- Generative AI basics
- LLM APIs
- RAG basics
- Multi-Agent Systems

Architecture:
- System Design

DSA:
- Basic Data Structures and Algorithms

IMPORTANT:
Do not falsely present beginner-level technologies as advanced expertise.

==================================================
10. PROJECTS SECTION
==================================================

Create a separate Projects section.

I will manually add my projects.

Create a dedicated data file:

src/data/projects.ts

(or an equivalent clean data folder based on the existing project architecture)

I should be able to add projects like this:

{
  title: "Project Name",
  description: "Short project description",
  liveDemo: "https://example.com",
  github: "https://github.com/example/project",
  image: "/projects/project1.png",
  technologies: ["Python", "MongoDB", "AI"]
}

The website must automatically generate project cards from this array.

I should NOT need to edit the UI components every time I add a project.

Each project card should have:

- Project title
- Short description
- Technologies
- Project image (optional)
- Live Demo button
- GitHub button

If liveDemo is empty, hide the Live Demo button.

If github is empty, hide the GitHub button.

Allow any number of projects.

==================================================
11. CERTIFICATES SECTION
==================================================

Create a dedicated Certificates section.

This must be very easy for me to update.

Create:

src/data/certificates.ts

I will manually add certificate links there.

Example:

export const certificates = [
  {
    title: "Generative AI in Action",
    issuer: "IBM",
    date: "2026",
    certificateUrl: "https://example.com/certificate"
  },
  {
    title: "Certificate Name",
    issuer: "Organization Name",
    date: "2026",
    certificateUrl: "https://example.com/certificate"
  }
];

The UI must automatically create certificate cards from this array.

I should be able to add:

1 certificate
5 certificates
10 certificates
20 certificates

without changing any UI code.

Each certificate card should contain:

- Certificate title
- Issuing organization
- Date
- View Certificate button

Clicking "View Certificate" should open the certificate link in a new tab.

Optional support:

certificate image / preview:

image: "/certificates/certificate1.png"

If image exists, show a preview.

If no image exists, use a clean futuristic certificate placeholder.

==================================================
12. PROFILE IMAGE
==================================================

Create a dedicated profile image location so I can easily replace my photo.

Use:

public/profile/profile.png

or, if the current project structure has a better assets convention:

public/assets/profile/profile.png

Make the code reference this single predictable location.

IMPORTANT:

I should only have to replace:

profile.png

to update my profile photo.

Do not hardcode the image into a complicated component.

==================================================
13. FAVICON
==================================================

Create a dedicated favicon location.

Use:

public/favicon/favicon.png

or:

public/favicon.ico

Make the Next.js metadata reference this file.

I should be able to replace the favicon file without changing application code.

==================================================
14. EASY CONTENT MANAGEMENT
==================================================

Create a clean structure like:

src/
  data/
    projects.ts
    certificates.ts
    profile.ts

public/
  profile/
    profile.png

  certificates/
    certificate-1.png
    certificate-2.png

  projects/
    project-1.png
    project-2.png

  favicon/
    favicon.png

If the existing project has a better structure, adapt to it rather than unnecessarily restructuring everything.

Create a simple README or comments explaining:

HOW TO ADD A PROJECT
HOW TO ADD A CERTIFICATE
HOW TO CHANGE PROFILE IMAGE
HOW TO CHANGE FAVICON

I want future updates to be extremely easy.

==================================================
15. PROFILE DATA FILE
==================================================

Create:

src/data/profile.ts

Keep my editable personal information in one place.

Example:

export const profile = {
  name: "Vishnu Vikas Maggam",
  shortName: "Vishnu Vikas",
  headline: "Computer Science Engineering Student | AI & ML Enthusiast | Developer",
  location: "Nellore, India",
  email: "vishnumaggam@gmail.com",
  phone: "+91 6037357227",
  github: "https://github.com/vishnuvikas2006",
  linkedin: "https://www.linkedin.com/in/vishnu-vikas-490549217",
  website: "https://vishnuvikas.com",
  profileImage: "/profile/profile.png"
};

Use this throughout the website instead of repeating hardcoded values.

==================================================
16. NAVIGATION
==================================================

Create a minimal navigation.

Possible navigation:

Home
About
Skills
Projects
Certificates
Contact

Keep it minimal.

During the initial particle hero, navigation should be subtle and not distract from the "VISHNU VIKAS" particle text.

Navigation can become more visible after the hero transition.

==================================================
17. DESIGN LANGUAGE
==================================================

The entire website should look like a premium futuristic developer portfolio.

Use:

- Near-black background
- Dark navy tones
- White typography
- Subtle blue/violet glow
- Thin borders
- Glass effects only where appropriate
- Large typography
- Generous spacing
- Smooth animations
- Minimal UI

Avoid:

- Bright colorful gradients everywhere
- Excessive cards
- Generic template appearance
- Stock galaxy backgrounds
- Large planets
- Movie holograms
- Excessive neon
- Unnecessary 3D objects
- Generic portfolio animations

The particle hero is the main visual identity.

==================================================
18. RESPONSIVENESS
==================================================

The website must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

On mobile:

- Reduce particle count if required
- Maintain readable "VISHNU VIKAS"
- Maintain smooth interaction
- Support touch drag/swipe
- Do not break page scrolling

Desktop can use a higher particle count.

Implement performance-aware particle rendering.

==================================================
19. PERFORMANCE
==================================================

This is very important.

Do not create thousands of React DOM elements.

Use:

- Three.js Points
- BufferGeometry
- shaders where useful
- efficient animation loops

Avoid unnecessary React re-renders.

Use requestAnimationFrame / Three.js animation appropriately.

Handle resize correctly.

Clean up WebGL resources when components unmount.

The portfolio should remain smooth.

Target:

60 FPS where possible.

If device performance is low, automatically reduce particle count.

==================================================
20. ACCESSIBILITY
==================================================

Add:

- semantic HTML
- keyboard-accessible buttons
- proper aria-labels
- accessible navigation
- readable contrast
- reduced-motion support

If the user has prefers-reduced-motion enabled:

Reduce or disable intense particle animation while keeping the website functional.

==================================================
21. EXISTING WEBSITE CONTENT
==================================================

Before changing anything:

Inspect my current portfolio website/project.

My current website:

https://vishnuvikas.com

Use it as a content/reference source.

Preserve useful existing information.

Do NOT blindly copy the old UI.

The new design should be a significant visual upgrade.

Current site information includes:

- Vishnu Vikas Maggam
- Computer Science Engineering Student
- AI & ML Enthusiast
- Developer
- Nellore, India
- B.Tech AI / AI & ML
- Mohan Babu University
- 2024 - 2028
- Expected May 2028
- Python
- AI Application Development
- Vibe Coding
- HTML
- CSS
- Git
- MongoDB
- Core Java
- DATA Club Coordinator
- Hackathon participation
- Internship interest

Use this as reference and improve the presentation.

==================================================
22. LINKEDIN
==================================================

Use this exact LinkedIn URL:

https://www.linkedin.com/in/vishnu-vikas-490549217

Add LinkedIn icon/button in the appropriate places.

Do not use a different Vishnu Vikas LinkedIn profile.

==================================================
23. GITHUB
==================================================

Use:

https://github.com/vishnuvikas2006

Add GitHub link in the appropriate places.

==================================================
24. CONTACT SECTION
==================================================

Create a clean final Contact section.

Heading:

Let's build something together.

Text should communicate that I am interested in:

- internships
- AI/software development opportunities
- real-world projects
- learning and collaboration

Buttons:

Email Me
LinkedIn
GitHub

==================================================
25. IMPORTANT PARTICLE IMPLEMENTATION
==================================================

The particle text should preferably be generated dynamically.

Recommended approach:

1. Render "VISHNU VIKAS" using an offscreen canvas.
2. Sample pixel positions from the text.
3. Convert sampled pixels into particle positions.
4. Create a Three.js BufferGeometry.
5. Store:
   - original text position
   - random position
   - velocity
   - depth
   - size
   - opacity
6. Use scroll/drag progress to interpolate between:
   originalPosition → explodedPosition.
7. Add subtle noise.
8. Add slight mouse movement/parallax.
9. Use easing for the transition.

Concept:

particlePosition =
    lerp(originalTextPosition, explodedPosition, scrollProgress)

But make the explosion visually organic rather than simply moving every particle in the same direction.

Particles should scatter in different directions.

Some particles should move toward the camera.

Some should move away.

Some should drift sideways.

This creates a 3D particle dissolution effect.

==================================================
26. MOUSE / TOUCH INTERACTION
==================================================

Desktop:

Mouse movement should create subtle particle parallax.

Dragging downward should influence the hero transition.

Mobile:

Touch swipe should control the same transition.

Do not make mouse interaction too strong.

The website must remain elegant.

==================================================
27. SCROLL ARCHITECTURE
==================================================

Do NOT lock the browser in a way that prevents normal scrolling.

Create a scroll-driven experience.

The hero can be a sticky/pinned visual section while the scroll progress controls the particle transition.

Suggested structure:

Hero scroll container
    ↓
Sticky particle canvas
    ↓
Scroll progress
    ↓
Particle dissolve
    ↓
Hero exits
    ↓
About section
    ↓
Skills
    ↓
Projects
    ↓
Certificates
    ↓
Contact

The transition must feel natural.

==================================================
28. PROJECT/CERTIFICATE LINK SAFETY
==================================================

All external links should:

target="_blank"
rel="noopener noreferrer"

Validate URLs where appropriate.

Do not allow broken links to crash the UI.

If a URL is missing, hide the corresponding button.

==================================================
29. DO NOT BREAK EXISTING FUNCTIONALITY
==================================================

Before modifying:

Inspect package.json.

Inspect current dependencies.

Inspect existing pages/components.

Inspect existing CSS.

Inspect current Next.js version.

Reuse existing dependencies when possible.

Do NOT install unnecessary libraries.

Do NOT remove working functionality unless it is explicitly part of the redesign.

Do NOT remove existing content without replacing it appropriately.

==================================================
30. CLEAN CODE
==================================================

Separate responsibilities.

Suggested components:

components/
  hero/
    ParticleHero.tsx
    ParticleText.tsx
    ParticleScene.tsx

  sections/
    About.tsx
    Skills.tsx
    Projects.tsx
    Certificates.tsx
    Contact.tsx

  navigation/
    Navbar.tsx

data/
  profile.ts
  projects.ts
  certificates.ts

Use the project's existing structure if it differs.

Do not create giant 1000+ line components.

==================================================
31. FINAL VISUAL FLOW
==================================================

The final experience should feel approximately like:

OPEN WEBSITE

        ↓

BLACK SPACE

        ✦
    ·        ·
       ✧

     VISHNU VIKAS
   formed from stars

        ↓
     DRAG DOWN

        ↓

USER DRAGS DOWN

        ↓

letters begin breaking

V I S H N U   V I K A S

particles separate

        ↓

particles scatter

        ↓

particles transition away

        ↓

ABOUT

"Hello, I'm Vishnu Vikas Maggam"

        ↓

SKILLS

        ↓

PROJECTS

        ↓

CERTIFICATES

        ↓

CONTACT

==================================================
32. IMPORTANT: DO NOT DO THESE
==================================================

DO NOT:

- use a static image for VISHNU VIKAS
- use a giant galaxy background
- add a planet
- add a movie hologram
- make the hero look like a generic space wallpaper
- use excessive neon
- make the particles unreadable
- immediately destroy the text on scroll
- make particles simply fade out
- make the page slow
- create unnecessary backend/API calls
- add authentication
- add a database
- add CMS
- add an admin panel
- add unnecessary dependencies
- invent certificates
- invent projects
- invent achievements
- invent job experience

The particle text and its scroll/drag dissolution should be the signature feature.

==================================================
33. IMPLEMENTATION PROCESS
==================================================

Follow this process:

STEP 1:
Inspect the entire existing project.

STEP 2:
Identify current framework and dependencies.

STEP 3:
Identify existing portfolio sections and content.

STEP 4:
Create the new particle hero.

STEP 5:
Implement scroll/drag-controlled particle dissolution.

STEP 6:
Connect the hero to the existing portfolio content.

STEP 7:
Create editable data files:

- profile.ts
- projects.ts
- certificates.ts

STEP 8:
Create predictable asset folders:

public/profile/
public/projects/
public/certificates/
public/favicon/

STEP 9:
Implement responsive design.

STEP 10:
Optimize particle rendering.

STEP 11:
Run the project.

STEP 12:
Check for:

- TypeScript errors
- ESLint errors
- console errors
- hydration errors
- WebGL errors
- broken links
- mobile layout issues
- scrolling issues

STEP 13:
Fix all issues.

STEP 14:
Run production build.

STEP 15:
Only after the build succeeds, summarize the files changed.

==================================================
34. FINAL REQUIREMENT
==================================================

I want this to look like a professionally designed portfolio, not an AI-generated generic portfolio template.

The FIRST IMPRESSION must be:

"VISHNU VIKAS"

formed from thousands of stars.

The interaction must make the visitor want to drag/scroll down to see what happens.

The particle dissolution should be smooth, cinematic, and technically impressive.

Do not sacrifice usability for visual effects.

Now inspect my existing codebase and implement this design directly in the current project.