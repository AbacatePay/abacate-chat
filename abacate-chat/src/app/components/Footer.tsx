import IconDiscord from "@icons/discord";
import IconYoutube from "@icons/youtube";
import IconInstagram from "@icons/instagram";
import IconTwitter from "@icons/twitter";
import IconGithub from "@icons/github";

export default function Footer() {
  return (
    <footer className="flex items-center px-8 gap-4 mt-2 w-full justify-between text-gray-text">
      <div>
        <p className="font-semibold text-4 text-right align-middle">
          AbacatePay @ {new Date().getFullYear()}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="font-semibold text-4 text-right align-middle">
          Termos e condições
        </p>
        <p className="font-semibold text-4 text-right align-middle">
          Privacidade
        </p>
        <hr className="w-1px h-5 bg-gray-border" />
        <a target="_blank" href="https://discord.gg/sD7tXPVWUm">
          <IconDiscord />
        </a>
        <a target="_blank" href="https://www.instagram.com/abacatepay">
          <IconInstagram />
        </a>
        <a target="_blank" href="https://x.com/abacatepay">
          <IconTwitter />
        </a>
        <a target="_blank" href="https://www.youtube.com/@abacatepay">
          <IconYoutube />
        </a>
        <a target="_blank" href="https://github.com/AbacatePay/abacate-chat">
          <IconGithub />
        </a>
      </div>
    </footer>
  );
}
