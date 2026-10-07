 I want to reorganize my portfolio certificate system so that Hackathon certificates are stored separately from my normal certificates.

IMPORTANT:
First inspect my existing project structure, especially:
- existing certificates data file
- Certificates component
- navbar/navigation component
- existing certificate card component
- existing certificate image modal/lightbox
- routing structure
- data folder structure
- current styling and animations

Do not blindly create duplicate components. Reuse my existing components and styling wherever possible.

==================================================
1. CREATE A SEPARATE hackaton.ts FILE
==================================================

Create a new file named:

hackaton.ts

Place it in the same data folder where my current certificates data file exists.

Use EXACTLY this structure:

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  image?: string;
};

// Add hackathon certificates here. Cards are created automatically by the Hackathon Certificates section.

export const certificates: Certificate[] = [
  {
    title: "Hackathon Name",
    issuer: "Organization Name",
    date: "2026",
    certificateUrl: "",
    image: "CERTIFICATE_IMAGE_URL",
  },
];

IMPORTANT:
- Keep the structure simple.
- Do not add unnecessary fields.
- Do not add category fields.
- Hackathon certificates are identified simply because they are stored in hackaton.ts.
- I should be able to add new hackathon certificates by only adding another object to this array.

Example:

{
  title: "Smart India Hackathon",
  issuer: "Organization Name",
  date: "2026",
  certificateUrl: "",
  image: "https://example.com/certificate.png",
},

When I add another certificate later, the UI should automatically display it.

==================================================
2. KEEP NORMAL CERTIFICATES SEPARATE
==================================================

DO NOT move my existing normal certificates into hackaton.ts.

Keep my existing certificates file unchanged in concept.

For example, my existing normal certificates can remain like:

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  image?: string;
};

export const certificates: Certificate[] = [
  {
    title: "AI for Sustainability Virtual Internship",
    issuer: "1M1B (One Million for One Billion)",
    date: "22 September 2026",
    certificateUrl: "",
    image:
      "https://www.image2url.com/r2/default/images/1791285724759-df562cf7-7b72-4767-b053-59f24c260253.png",
  },
  {
    title: "AI Coder: Complete Claude Code & Coding Agents Course",
    issuer: "Udemy",
    date: "August 24, 2026",
    certificateUrl: "",
    image:
      "https://www.image2url.com/r2/default/images/1791286415938-9eb9cd84-938d-46c6-9bac-04aafaf0f5b3.png",
  },
];

Do not delete these certificates.

==================================================
3. HACKATHON CERTIFICATES SECTION
==================================================

Create/use a Hackathon Certificates view that imports the certificates from hackaton.ts.

Use the correct import path based on my actual project structure.

For example, if the data folder is:

data/hackaton.ts

then use:

import { certificates } from "@/data/hackaton";

But inspect my project first and use the correct path if my structure is different.

Do NOT hardcode hackathon certificates directly inside the UI.

The Hackathon Certificates UI must always use the data from hackaton.ts.

==================================================
4. MAIN CERTIFICATES SECTION
==================================================

Keep my existing Certificates section design.

Do not redesign the whole Certificates section.

Keep the current:
- dark/starry background
- card design
- borders
- glow effects
- typography
- animations
- spacing
- responsive behavior

The main Certificates section should continue showing my normal/featured certificates.

Below the certificate cards, add a button:

"View All Hackathon Certificates →"

This button should open the complete Hackathon Certificates view.

The main page should NOT display every hackathon certificate because I have many of them and it makes the page cluttered.

==================================================
5. TOP NAVIGATION
==================================================

Add a navigation item to my existing top navbar:

"Hackathons"

or:

"Hackathon Certificates"

Prefer:

"Hackathons"

because it is shorter and cleaner.

When the user clicks "Hackathons", it must open the SAME Hackathon Certificates view used by the:

"View All Hackathon Certificates →"

button.

IMPORTANT:
Do not create two separate implementations.

Both:

Navbar → Hackathons

and:

Certificates section → View All Hackathon Certificates

must open the exact same component/view/state/route.

==================================================
6. HACKATHON CERTIFICATES VIEW
==================================================

Create a clean full-screen view/modal/page for all hackathon certificates.

Header:

Hackathon Certificates

Subtitle:

"A collection of my hackathon participation and achievement certificates."

Add a close/back button.

Display every certificate from hackaton.ts automatically.

Use a responsive grid.

Desktop:
- 2 or 3 cards per row depending on available width.

Tablet:
- 2 cards per row.

Mobile:
- 1 card per row.

Do not make certificates extremely small.

The certificate image should be large and clearly readable.

==================================================
7. CERTIFICATE CARD DESIGN
==================================================

Use the same certificate card style already used in my current Certificates section.

Each card should contain:

1. Full certificate image
2. Issuer
3. Date
4. Certificate title

Example:

[ FULL CERTIFICATE IMAGE ]

[ HACKATHON ORGANIZATION / DATE ]

Hackathon Certificate Title

Keep the existing visual style.

Do not create a completely different card design.

==================================================
8. CERTIFICATE IMAGE REQUIREMENTS
==================================================

This is very important.

The full certificate must be visible.

DO NOT:
- crop the certificate
- stretch the certificate
- distort the certificate
- cut off the top
- cut off the bottom
- cut off the left/right edges

Preserve the original certificate aspect ratio.

Use:

object-fit: contain;

where appropriate.

The certificate container should have enough space so the complete certificate is visible.

==================================================
9. FULL-SCREEN CERTIFICATE VIEWER
==================================================

When the user clicks any certificate:

Open the certificate in a large full-screen modal/lightbox.

The complete certificate must be visible.

Use:

object-fit: contain;

Preserve the original aspect ratio.

Do not crop or stretch.

The modal should have a clean dark background that matches the portfolio.

Add:

- X close button
- outside-click close
- Escape-key close

Prevent unnecessary background scrolling while the full-screen viewer is open.

The certificate should be displayed as large as possible while still showing the entire image.

==================================================
10. REUSE EXISTING IMAGE VIEWER
==================================================

Before creating a new lightbox/modal:

Check whether my portfolio already has a certificate image viewer/modal.

If one already exists:

REUSE IT.

Do not create a duplicate viewer.

The Hackathon Certificates should use the same image viewer behavior as the existing certificates.

==================================================
11. DATA BEHAVIOR
==================================================

The most important requirement is that hackathon certificates are completely data-driven.

The Hackathon Certificates component should effectively work like:

import { certificates } from "@/data/hackaton";

Then map over them.

For example:

certificates.map((certificate) => ...)

Do not manually list certificate names in the component.

If I later add:

{
  title: "Another Hackathon",
  issuer: "ABC Organization",
  date: "2026",
  certificateUrl: "",
  image: "IMAGE_URL",
},

to hackaton.ts,

it should automatically appear in the Hackathon Certificates view.

No UI modification should be required.

==================================================
12. EMPTY STATE
==================================================

If hackaton.ts contains no certificates, show a clean message such as:

"No hackathon certificates added yet."

Do not show a broken grid.

==================================================
13. RESPONSIVE DESIGN
==================================================

Make everything responsive.

Desktop:
- clean wide layout
- certificates should be large and readable

Tablet:
- responsive grid

Mobile:
- one certificate per row
- image remains fully visible
- no horizontal scrolling
- buttons remain easy to tap
- navbar should remain usable

Do not allow certificate images to overflow the screen.

==================================================
14. ACCESSIBILITY
==================================================

Make the new functionality accessible.

Use:
- meaningful button labels
- useful image alt text
- keyboard-accessible buttons
- Escape key to close the viewer
- visible focus states where appropriate

Do not make the certificate image the only way to understand what the card represents.

==================================================
15. NAVIGATION / URL
==================================================

First inspect how my portfolio currently handles navigation.

If my project already uses routes/sections/anchors, follow the existing architecture.

Do not introduce a completely different routing system.

If appropriate, create a clean route such as:

/hackathons

But only do this if it fits the current project architecture.

If the portfolio is currently a single-page application with section navigation, use the existing navigation pattern instead.

The important requirement is:

Navbar "Hackathons"
        ↓
Hackathon Certificates view

and:

"View All Hackathon Certificates"
        ↓
Hackathon Certificates view

Both must lead to the same experience.

==================================================
16. DESIGN REQUIREMENTS
==================================================

The existing portfolio has a dark/starry visual design.

Keep that design.

The Hackathon Certificates view should feel like a natural extension of the portfolio.

Use:
- existing fonts
- existing animations
- existing borders
- existing glow effects
- existing spacing system
- existing colors
- existing UI components

Do not introduce random new colors or unrelated styling.

Keep it professional and premium.

==================================================
17. IMPORTANT: DO NOT BREAK EXISTING FEATURES
==================================================

Do not break:

- existing Certificates section
- existing navbar
- existing navigation
- existing animations
- existing certificate viewer
- existing mobile layout
- existing portfolio sections
- existing certificate data
- existing styling

Do not delete existing files unless absolutely necessary.

Do not rename existing components unnecessarily.

Do not duplicate code unnecessarily.

==================================================
18. FINAL FILE STRUCTURE
==================================================

Aim for a structure similar to:

data/
  certificates.ts
  hackaton.ts

components/
  Certificates.tsx
  ...existing components...

Use my actual project structure if it differs.

==================================================
19. EXAMPLE hackaton.ts
==================================================

The final hackaton.ts should look like:

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  image?: string;
};

// Add hackathon certificates here. Cards are created automatically by the Hackathon Certificates section.

export const certificates: Certificate[] = [
  {
    title: "Hackathon Name",
    issuer: "Organization Name",
    date: "2026",
    certificateUrl: "",
    image: "CERTIFICATE_IMAGE_URL",
  },

  {
    title: "Another Hackathon",
    issuer: "Another Organization",
    date: "2026",
    certificateUrl: "",
    image: "CERTIFICATE_IMAGE_URL",
  },
];

==================================================
20. FINAL CHECK
==================================================

After implementing everything:

1. Check all imports.
2. Check TypeScript types.
3. Check that hackaton.ts is correctly imported.
4. Check that all certificates from hackaton.ts appear automatically.
5. Check navbar "Hackathons".
6. Check "View All Hackathon Certificates →".
7. Check certificate cards.
8. Check full-screen certificate viewer.
9. Check Escape key.
10. Check outside click.
11. Check mobile layout.
12. Check desktop layout.
13. Check that certificate images are never cropped or stretched.
14. Run the project's TypeScript/build/lint checks.
15. Fix all errors.

Do not just describe the changes.

Actually implement the changes in my project.