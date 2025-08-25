import { Icon } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
  icon?: Icon;
}

export interface FooterSection {
  title: string;
  icon?: Icon;
  description?: string;
  links?: FooterLink[];
}

export interface FooterData {
  branding: {
    name: string;
    icon?: Icon;
    logo?: string;
    description: string;
    socialLinks: FooterLink[];
    storeCTA?: {
      text: string;
      description: string;
      href: string;
      icon?: Icon;
    };
  };
  sections: FooterSection[];
  copyright: string;
}
