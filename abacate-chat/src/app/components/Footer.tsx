import IconGithub from "@icons/github";
import SocialIcons, { SocialLink } from "./SocialIcons";
import Link from "next/link";
import IconYoutube from "@icons/youtube";
import IconTwitter from "@icons/twitter";
import IconInstagram from "@icons/instagram";
import IconDiscord from "@icons/discord";

export default function Footer() {
  const socialLinks: SocialLink[] = [
    {
      icon: <IconDiscord color="var(--primary)" />,
      name: "discord",
      url: "https://discord.gg/sD7tXPVWUm"
    },
    {
      icon: <IconInstagram color="var(--primary)" />,
      name: "instagram", 
      url: "https://www.instagram.com/abacatepay"
    },
    {
      icon: <IconTwitter color="var(--primary)" />,
      name: "twitter",
      url: "https://x.com/abacatepay"
    },
    {
      icon: <IconYoutube color="var(--primary)" />,
      name: "youtube",
      url: "https://www.youtube.com/@abacatepay"
    },
    {
      icon: <IconGithub color="var(--primary)" />,
      name: "github",
      url: "https://github.com/AbacatePay/abacate-chat"
    }
  ];

  return (
    <footer className="flex flex-col md:flex-row items-center px-20 mt-2 w-full text-primary md:justify-between">
      <div>
        <p className="font-semibold text-4 text-right align-middle text-primary">
          AbacatePay @ {new Date().getFullYear()}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-0 md:gap-4">
        
      <ul className="flex items-center gap-4 mt-1  md:[&>li:last-child]:border-r-2 md:[&>li:last-child]:border-primary md:[&>li:last-child]:pr-4 max-md:[&>li:not(:first-child)]:border-l-2 max-md:[&>li:not(:first-child)]:border-primary max-md:[&>li:not(:first-child)]:pl-4">
        <li className="font-semibold text-4 text-right align-middle text-primary">
          <Link href="https://www.abacatepay.com/termos" target="_blank" rel="noopener noreferrer">Termos e condições</Link>
        </li>
        <li className="font-semibold text-4 text-right align-middle text-primary">
          <Link href="#">Privacidade</Link>
        </li>
      </ul>
      <SocialIcons links={socialLinks} />
      </div>
    </footer>
  );
}
