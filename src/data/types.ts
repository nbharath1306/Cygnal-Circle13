export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  photo: string;
  coverPhoto?: string;
  status?: string;
  socials: SocialLink[];
  sections: LinkSection[];
  products?: Product[];
}

export interface LinkSection {
  id: string;
  title: string;
  links: Link[];
}

export interface Link {
  label: string;
  url: string;
  icon: string;
  description?: string;
  isPrimary?: boolean;
}

export interface Product {
  name: string;
  tagline: string;
  url: string;
  logo?: string;
  status?: "Coming Soon" | "Live" | "Beta";
}
