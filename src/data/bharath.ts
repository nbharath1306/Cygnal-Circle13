import { TeamMember } from "./types";

const bharath: TeamMember = {
  slug: "bharath",
  name: "N Bharath",
  title: "CEO & Founder",
  company: "Circle13",
  bio: "Building at the intersection of AI, consciousness & human experience",
  photo: "/images/team/bharath.webp",
  status: "Building in public",
  sections: [
    {
      id: "connect",
      title: "Connect With Me",
      links: [
        {
          label: "WhatsApp",
          url: "https://wa.me/91XXXXXXXXXX?text=Hey%20Bharath%2C%20we%20just%20met%20at%20an%20event.%20Let's%20connect!",
          icon: "MessageCircle",
          description: "Quick chat",
          isPrimary: true,
        },
        {
          label: "LinkedIn",
          url: "https://linkedin.com/in/bharath",
          icon: "Linkedin",
          description: "Professional network",
        },
        {
          label: "Discord",
          url: "https://discord.gg/circle13",
          icon: "MessageSquare",
          description: "Join our community",
        },
        {
          label: "GitHub",
          url: "https://github.com/bharath",
          icon: "Github",
          description: "See what I'm building",
        },
        {
          label: "Email",
          url: "mailto:bharath@circle13.space",
          icon: "Mail",
        },
      ],
    },
    {
      id: "content",
      title: "Beyond The Noise",
      links: [
        {
          label: "WhatsApp Channel",
          url: "https://whatsapp.com/channel/circle13",
          icon: "Radio",
          description: "Psychology, AI, Consciousness & more",
        },
        {
          label: "Podcast (Coming Soon)",
          url: "#",
          icon: "Mic",
          description: "Long-form conversations",
        },
      ],
    },
    {
      id: "work",
      title: "Ventures",
      links: [
        {
          label: "Circle13",
          url: "https://circle13.space",
          icon: "Globe",
          description: "Our company — building products that matter",
          isPrimary: true,
        },
        {
          label: "archzOS",
          url: "https://archzos.com",
          icon: "Layers",
          description: "Founding Team Engineer",
        },
      ],
    },
  ],
  products: [
    {
      name: "HalfTold",
      tagline: "Cycle tracking, reimagined for couples",
      url: "https://circle13.space/halftold",
      status: "Coming Soon",
    },
  ],
};

export default bharath;
