# Vishnu Vikas portfolio

This is a Vite + React + TypeScript portfolio. The opening name is not an image: it is sampled from offscreen canvas text and rendered as particles in one performant `<canvas>`.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Update your profile

Edit [src/data/profile.ts](src/data/profile.ts) for contact details, social links, or headline text.

To update the profile photo, replace or add `public/profile/profile.png`. The site always reads that one path. Until a photo is supplied, the interface shows a small `VV` fallback.

## Add a project

Add an object to the `projects` array in [src/data/projects.ts](src/data/projects.ts):

```ts
{
  title: 'Project Name',
  description: 'Short project description',
  liveDemo: 'https://example.com', // omit or leave empty to hide this button
  github: 'https://github.com/example/project', // omit or leave empty to hide this button
  image: '/projects/project-1.png', // optional
  technologies: ['Python', 'MongoDB', 'AI'],
}
```

Put an optional project preview in `public/projects/`. Cards are generated automatically for any number of entries.

## Add a certificate

Add an object to the `certificates` array in [src/data/certificates.ts](src/data/certificates.ts):

```ts
{
  title: 'Certificate Name',
  issuer: 'Organization Name',
  date: '2026',
  certificateUrl: 'https://example.com/certificate', // optional
  image: '/certificates/certificate-1.png', // optional
}
```

Put optional certificate previews in `public/certificates/`. Without an image, a built-in minimal certificate placeholder is shown.

## Change the favicon

The favicon uses `public/profile/profile.png`, so replacing your profile image updates both the portrait and browser icon automatically.
