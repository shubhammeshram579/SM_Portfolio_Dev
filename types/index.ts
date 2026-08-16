export interface Project {
  _id?: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  image?: string;
  category: "fullstack" | "frontend" | "backend" | "other";
  featured?: boolean;
  created_at?: Date;
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at?: Date;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  price_range?: string;
  features: string[];
  icon?: string;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  tags: string[];
  published: boolean;
  created_at?: Date;
}

export interface NavItem {
  label: string;
  href: string;
}
