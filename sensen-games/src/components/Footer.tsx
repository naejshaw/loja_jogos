import { FaTwitter, FaFacebook, FaInstagram, FaSteam, FaYoutube } from 'react-icons/fa'; // Added FaYoutube
import { useSettings } from '../context/SettingsContext';
import BlueskyIcon from './BlueskyIcon';

// Map icon names from settings to actual react-icons components
const socialIconMap: { [key: string]: React.ElementType } = {
  FaTwitter: FaTwitter,
  FaFacebook: FaFacebook,
  FaInstagram: FaInstagram,
  FaSteam: FaSteam,
  FaYoutube: FaYoutube, // Add FaYoutube to the map
  BlueskyIcon: BlueskyIcon,
};

const Footer = () => {
  const { settings, loading, error } = useSettings();

  if (loading || error || !settings) return null;

  // Fallback social links (restaurar 5 ícones caso as configurações do admin estejam vazias)
  interface SocialLink { name?: string; icon?: string; url?: string }
  const fallbackLinks: SocialLink[] = [
    { name: 'Twitter', icon: 'FaTwitter', url: 'https://twitter.com' },
    { name: 'Facebook', icon: 'FaFacebook', url: 'https://facebook.com' },
    { name: 'Instagram', icon: 'FaInstagram', url: 'https://instagram.com' },
    { name: 'Steam', icon: 'FaSteam', url: 'https://store.steampowered.com' },
    { name: 'YouTube', icon: 'FaYoutube', url: 'https://youtube.com' },
  ];

  const linksToRender: SocialLink[] = (settings.socialLinks && settings.socialLinks.length > 0) ? settings.socialLinks : fallbackLinks;
  return (
    <footer
      style={{
        backgroundColor: `var(--footer-background-color)`,
        color: `var(--general-text-color)`,
      }}
    >
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} {settings.siteName}. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-4">
            {linksToRender.map((link: SocialLink, index: number) => {
              const IconComponent = socialIconMap[link.icon ?? ''];
              // If the admin stored a plain name (eg 'Twitter') we might map it to component by trying prefixed key
              const resolvedIcon = IconComponent ?? socialIconMap[(link.icon ?? '').trim()] ?? socialIconMap['Fa' + (link.name ?? '')];
              if (!resolvedIcon) {
                console.warn(`Icon component not found for: ${link.icon ?? link.name}`);
                return (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 text-lg">
                    {link.name}
                  </a>
                );
              }
              const Resolved = resolvedIcon as React.ElementType;
              return (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  {link.icon === 'BlueskyIcon' || Resolved === BlueskyIcon ? (
                    <Resolved width={24} height={24} />
                  ) : (
                    // react-icons components accept 'size' prop
                    <Resolved size={24} />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
