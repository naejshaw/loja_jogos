import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Tabs,
  Tab,
  type SelectChangeEvent,
} from '@mui/material';
import apiClient from '../api/axios';
import { isAxiosError } from 'axios';
import AestheticSettingsForm from '../components/AestheticSettingsForm';
import TextContentSettingsForm from '../components/TextContentSettingsForm';
import SocialLinksSettingsForm from '../components/SocialLinksSettingsForm';
import ImageManagementSettingsForm from '../components/ImageManagementSettingsForm';

// Define SocialLink interface here or move to a shared types file
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SiteSettings { // Exported for use in child components
  _id: string;
  siteName: string;
  logoUrl: string;
  iconUrl: string; // New field for site icon
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  generalTextColor: string; // New aesthetic field
  pageBackgroundColor: string; // New aesthetic field
  generalBackgroundColor: string; // New aesthetic field
  headerBackgroundColor: string; // New aesthetic field
  footerBackgroundColor: string; // New aesthetic field
  homepageTitle: string;
  catalogPageTitle: string;
  homepageFeaturedSectionTitle: string; // New
  // homepageFeaturedSectionImageUrl: string; // Removed field
  homepageAboutUsTitle: string; // New
  homepageAboutUsText: string; // New
  aboutUsImageUrl: string; // New field for homepage hero image
  mailingListImageUrl: string; // New field for mailing list section image
  homepageMailingListTitle: string; // New
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

const defaultSiteSettings: SiteSettings = {
    _id: '', // Will be updated from fetched data
    siteName: 'My Awesome Site',
    logoUrl: '',
    iconUrl: '',
    primaryColor: '#1976d2', // Default Material-UI blue
    secondaryColor: '#dc004e', // Default Material-UI pink
    fontFamily: 'Arial',
    generalTextColor: '#000000',
    pageBackgroundColor: '#ffffff',
    generalBackgroundColor: '#f0f0f0',
    headerBackgroundColor: '#ffffff',
    footerBackgroundColor: '#ffffff',
    homepageTitle: 'Welcome to Our Site!',
    catalogPageTitle: 'Explore Our Catalog',
    homepageFeaturedSectionTitle: 'Featured Items',
    // homepageFeaturedSectionImageUrl: '', // Removed field
    homepageAboutUsTitle: 'About Us',
    homepageAboutUsText: 'Learn more about our company.',
    aboutUsImageUrl: '',
    mailingListImageUrl: '', // New default for mailing list image
    homepageMailingListTitle: 'Join Our Mailing List',
    socialLinks: [],
    createdAt: '',
    updatedAt: '',
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  const [selectedTab, setSelectedTab] = useState(0); // State for tab management

  // Social Link States and Handlers
  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({ name: '', url: '', icon: '' });
  const [editingSocialLinkIndex, setEditingSocialLinkIndex] = useState<number | null>(null);

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSocialLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url && newSocialLink.icon) { // settings check removed
      if (editingSocialLinkIndex !== null) {
        setSettings((prev) => {
          const updatedSocialLinks = [...prev.socialLinks];
          updatedSocialLinks[editingSocialLinkIndex] = newSocialLink;
          return { ...prev, socialLinks: updatedSocialLinks };
        });
        setEditingSocialLinkIndex(null);
      } else {
        setSettings((prev) => ({ ...prev, socialLinks: [...(prev.socialLinks || []), newSocialLink] }));
      }
      setNewSocialLink({ name: '', url: '', icon: '' });
    }
  };

  const handleEditSocialLink = (link: SocialLink, index: number) => {
    setNewSocialLink(link);
    setEditingSocialLinkIndex(index);
  };

  const handleCancelEditSocialLink = () => {
    setNewSocialLink({ name: '', url: '', icon: '' });
    setEditingSocialLinkIndex(null);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSettings((prev) => ({ ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== index) }));
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get<SiteSettings>('/settings');
        // Merge fetched data with default settings to ensure all fields are present
        const mergedSettings = {
            ...defaultSiteSettings, // Start with all defaults
            ...response.data, // Overlay with fetched data
            // Ensure socialLinks is an array, even if backend returns null/undefined
            socialLinks: response.data.socialLinks || [],
        };
        setSettings(mergedSettings);
      } catch (err) {
        setError(isAxiosError(err) && err.response ? err.response.data.message : 'Falha ao buscar configurações.');
        console.error('Error fetching settings:', err);
        // If fetch fails, keep default settings, but still set loading to false
        setSettings(defaultSiteSettings);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name as string]: value }));
  };
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // settings is always a valid object now, no need for null check
    setSaving(true);
    setError(null);
    try {
      const response = await apiClient.put<SiteSettings>('/settings', settings);
      setSettings(response.data); // Update with the response data (may contain new _id, createdAt, updatedAt)
      setFeedback({ message: 'Configurações salvas com sucesso!', severity: 'success' });
    } catch (err) {
      setError(isAxiosError(err) && err.response ? err.response.data.message : 'Erro ao salvar configurações.');
      console.error('Error saving settings:', err);
      setFeedback({ message: 'Erro ao salvar configurações.', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && settings) { // Keep error display for post-load errors
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Configurações do Site
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Gerencie as configurações gerais do site, como nome, logo, cores e textos de páginas.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="settings tabs" sx={{ mb: 3 }}>
        <Tab label="Conteúdo Textual" />
        <Tab label="Estética" />
        <Tab label="Imagens" />
        <Tab label="Links Sociais" />
      </Tabs>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {selectedTab === 0 && ( // Removed settings check
          <TextContentSettingsForm
            settings={settings}
            handleChange={handleChange}
          />
        )}
        {selectedTab === 1 && ( // Removed settings check
          <AestheticSettingsForm
            settings={settings}
            handleChange={handleChange}
          />
        )}
        {selectedTab === 2 && ( // Removed settings check
          <ImageManagementSettingsForm
            settings={settings}
            setSettings={setSettings}
            apiClient={apiClient}
            setFeedback={setFeedback}
          />
        )}
        {selectedTab === 3 && ( // Removed settings check
          <SocialLinksSettingsForm
            settings={settings}
            setSettings={setSettings}
            newSocialLink={newSocialLink}
            setNewSocialLink={setNewSocialLink}
            editingSocialLinkIndex={editingSocialLinkIndex}
            setEditingSocialLinkIndex={setEditingSocialLinkIndex}
            handleSocialLinkChange={handleSocialLinkChange}
            handleSaveSocialLink={handleSaveSocialLink}
            handleEditSocialLink={handleEditSocialLink}
            handleCancelEditSocialLink={handleCancelEditSocialLink}
            handleRemoveSocialLink={handleRemoveSocialLink}
          />
        )}
        
        <Button type="submit" variant="contained" color="primary" disabled={saving} sx={{ mt: 3 }}>
          {saving ? <CircularProgress size={24} /> : 'Salvar Configurações'}
        </Button>
      </Box>

      <Snackbar
        open={!!feedback}
        autoHideDuration={6000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setFeedback(null)} severity={feedback?.severity} sx={{ width: '100%' }}>
          {feedback?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;