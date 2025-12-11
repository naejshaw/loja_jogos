import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import axios from 'axios';

interface SiteSettings {
  siteName: string;
  logoUrl: string;
  iconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  generalTextColor: string;
  pageBackgroundColor: string;
  generalBackgroundColor: string;
  headerBackgroundColor: string;
  footerBackgroundColor: string;
  homepageTitle: string;
  catalogPageTitle: string;
  homepageFeaturedSectionTitle: string;
  homepageFeaturedSectionImageUrl: string;
  homepageAboutUsTitle: string;
  homepageAboutUsText: string;
  homepageHeroImageUrl: string;
  aboutUsImageUrl: string;
  featuredSectionImageUrl: string;
  homepageMailingListTitle: string;
  mailingListImageUrl: string;
  socialLinks: SocialLink[];
  _id?: string;
}

interface SocialLink { // Also define SocialLink here for consistency
  name: string;
  url: string;
  icon: string;
}

interface SettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  refetchSettings: () => void; // Function to manually refetch settings
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<number>(0); // To manually refetch

  const refetchSettings = () => {
    setFetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/settings');
        setSettings(response.data);
      } catch (err) {
        setError('Failed to load site settings.');
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();

    const intervalId = setInterval(() => {
      fetchSettings();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [fetchTrigger]); // Re-fetch when fetchTrigger changes

  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', settings.primaryColor);
      root.style.setProperty('--secondary-color', settings.secondaryColor);
      root.style.setProperty('--general-text-color', settings.generalTextColor);
      root.style.setProperty('--page-background-color', settings.pageBackgroundColor);
      root.style.setProperty('--general-background-color', settings.generalBackgroundColor);
      root.style.setProperty('--header-background-color', settings.headerBackgroundColor);
      root.style.setProperty('--footer-background-color', settings.footerBackgroundColor);
      root.style.setProperty('--font-family', settings.fontFamily);
      // Add other dynamic styles here
    }
  }, [settings]); // Re-run when settings change

  const value = {
    settings,
    loading,
    error,
    refetchSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
