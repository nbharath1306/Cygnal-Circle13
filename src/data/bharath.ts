import { TeamMember } from "./types";

const bharath: TeamMember = {
  slug: "bharath",
  name: "N Bharath",
  title: "CEO & Founder",
  company: "Circle13",
  bio: "Exploring AI, ML, and entrepreneurship. Find my projects, thoughts, and creations here.",
  photo: "/images/team/bharath.webp",
  coverPhoto: "/images/team/bharath-cover.webp",
  status: "Building in public",
  socials: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/nbharath1306", icon: "Linkedin" },
    { platform: "WhatsApp", url: "https://wa.me/91XXXXXXXXXX", icon: "MessageCircle" },
    { platform: "Instagram", url: "https://instagram.com/circle13.signal", icon: "Instagram" },
    { platform: "X", url: "https://x.com/nbharath1306", icon: "Twitter" },
    { platform: "Threads", url: "https://threads.net/@circle13.signal", icon: "AtSign" },
  ],
  sections: [
    {
      id: "ventures",
      title: "Ventures",
      links: [
        {
          label: "Build Labs",
          url: "https://circle13.space",
          icon: "Rocket",
          description: "Where ideas become products",
          isPrimary: true,
        },
        {
          label: "HallowTwin",
          url: "https://hallow-twin-circle13.vercel.app",
          icon: "Sparkles",
          description: "Synthetic Customer Simulation for Indian Startups",
        },
        {
          label: "HalfTold",
          url: "https://circle13.space/halftold",
          icon: "Heart",
          description: "The half she never says.",
        },
      ],
    },
    {
      id: "connect",
      title: "Connect",
      links: [
        {
          label: "Instagram",
          url: "https://instagram.com/circle13.signal",
          icon: "Instagram",
          description: "@circle13.signal",
        },
        {
          label: "Email",
          url: "mailto:bharath@circle13.space",
          icon: "Mail",
          description: "Get in touch",
        },
        {
          label: "Personal Website",
          url: "https://circle13.space",
          icon: "Globe",
          description: "circle13.space",
        },
      ],
    },
  ],
  products: [
    {
      name: "HallowTwin",
      tagline: "Synthetic Customer Simulation for Indian Startups",
      url: "https://hallow-twin-circle13.vercel.app",
      status: "Live",
    },
    {
      name: "HalfTold",
      tagline: "The half she never says.",
      url: "https://circle13.space/halftold",
      status: "Coming Soon",
    },
  ],
};

export default bharath;
