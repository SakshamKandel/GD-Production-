import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://instagram.com", icon: <FaInstagram /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://facebook.com", icon: <FaFacebook /> },
  { href: "https://linkedin.com", icon: <FaLinkedin /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-obsidian-900 py-4 text-zinc-300">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©GD Production 2026. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
