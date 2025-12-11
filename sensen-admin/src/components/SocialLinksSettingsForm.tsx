import React from 'react';
import { Box, TextField, Button, Stack, Typography, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { type SiteSettings } from '../pages/SettingsPage'; // Import the updated SiteSettings interface

// Define SocialLink interface here or import if it's in a shared type file
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface SocialLinksSettingsFormProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  newSocialLink: SocialLink;
  setNewSocialLink: React.Dispatch<React.SetStateAction<SocialLink>>;
  editingSocialLinkIndex: number | null;
  setEditingSocialLinkIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleSocialLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveSocialLink: () => void;
  handleEditSocialLink: (link: SocialLink, index: number) => void;
  handleCancelEditSocialLink: () => void;
  handleRemoveSocialLink: (index: number) => void;
}

const SocialLinksSettingsForm: React.FC<SocialLinksSettingsFormProps> = ({
  settings,
  newSocialLink,
  editingSocialLinkIndex,
  handleSocialLinkChange,
  handleSaveSocialLink,
  handleEditSocialLink,
  handleCancelEditSocialLink,
  handleRemoveSocialLink,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Links Sociais</Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Nome (ex: Facebook)"
          name="name"
          value={newSocialLink.name}
          onChange={handleSocialLinkChange}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="URL"
          name="url"
          value={newSocialLink.url}
          onChange={handleSocialLinkChange}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 2 }}
        />
        <TextField
          label="Ícone (ex: FaFacebook)"
          name="icon"
          value={newSocialLink.icon}
          onChange={handleSocialLinkChange}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="outlined"
          onClick={handleSaveSocialLink}
          startIcon={editingSocialLinkIndex !== null ? <EditIcon /> : <AddIcon />}
          disabled={!newSocialLink.name || !newSocialLink.url || !newSocialLink.icon}
        >
          {editingSocialLinkIndex !== null ? 'Salvar Edição' : 'Adicionar'}
        </Button>
        {editingSocialLinkIndex !== null && (
          <Button variant="outlined" onClick={handleCancelEditSocialLink} startIcon={<CancelIcon />}>
            Cancelar
          </Button>
        )}
      </Stack>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {settings.socialLinks.map((link, index) => (
          <Chip
            key={index}
            label={`${link.name}: ${link.url}`}
            onDelete={() => handleRemoveSocialLink(index)}
            onClick={() => handleEditSocialLink(link, index)}
            color={editingSocialLinkIndex === index ? "primary" : "info"}
            variant="outlined"
            deleteIcon={editingSocialLinkIndex === index ? <CancelIcon /> : undefined}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SocialLinksSettingsForm;
