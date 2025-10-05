import { ReactNode } from "react";

export interface SocialLink {
  name: string;
  url: string;
  icon?: ReactNode;
}

interface SocialIconsProps {
  links: SocialLink[];
  className?: string;
}

export default function SocialIcons({
  links,
  className = "",
}: SocialIconsProps) {
  return (
    <div className={`flex items-center justify-center gap-x-2 ${className}`}>
      {links.map((link) => {
        return (
          <a
            key={link.name}
            rel="noopener noreferrer"
            target="_blank"
            href={link.url}
            className="hover:opacity-80 transition-opacity"
          >
            {link.icon}
          </a>
        );
      })}
    </div>
  );
}
