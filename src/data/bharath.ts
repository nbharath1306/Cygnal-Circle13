import { TeamMember } from "./types";

const bharath: TeamMember = {
  slug: "bharath",
  name: "N Bharath",
  title: "CEO & Founder",
  company: "Circle13",
  bio: "Exploring AI, ML, and entrepreneurship. Find my projects, thoughts, and creations here.",
  photo: "/images/team/bharath.jpeg",
  coverPhoto: "/images/team/bharath-cover.jpeg",
  status: "Building in public",
  socials: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/n-bharath-2b86311b9/", icon: "Linkedin" },
    { platform: "WhatsApp", url: "https://wa.me/918618698941", icon: "WhatsApp" },
    { platform: "Instagram", url: "https://www.instagram.com/bharath_theunassailable/", icon: "Instagram" },
    { platform: "X", url: "https://x.com/nbharath_1306", icon: "Twitter" },
    { platform: "Email", url: "mailto:n.bharath3430@gmail.com", icon: "Mail" },
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
          url: "https://www.instagram.com/circle13.signal/",
          icon: "Instagram",
          description: "@circle13.signal",
        },
        {
          label: "Email",
          url: "mailto:n.bharath3430@gmail.com",
          icon: "Mail",
          description: "n.bharath3430@gmail.com",
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
