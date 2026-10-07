export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  image?: string;
};

// Add certificates here. Cards are created automatically by the Certificates section.

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