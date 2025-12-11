import React from 'react';
import { Box, TextField, Stack } from '@mui/material';
import { type SelectChangeEvent } from '@mui/material'; // Required for handleChange type
import { type SiteSettings } from '../pages/SettingsPage'; // Import the updated SiteSettings interface

interface TextContentSettingsFormProps {
  settings: SiteSettings;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
}

const TextContentSettingsForm: React.FC<TextContentSettingsFormProps> = ({ settings, handleChange }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Nome do Site"
          name="siteName"
          value={settings.siteName}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Título da Página Inicial"
          name="homepageTitle"
          value={settings.homepageTitle}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="Título da Página de Catálogo"
          name="catalogPageTitle"
          value={settings.catalogPageTitle}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="Título da Seção de Destaques"
          name="homepageFeaturedSectionTitle"
          value={settings.homepageFeaturedSectionTitle}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Título da Seção 'Quem Somos'"
          name="homepageAboutUsTitle"
          value={settings.homepageAboutUsTitle}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Texto da Seção 'Quem Somos'"
          name="homepageAboutUsText"
          value={settings.homepageAboutUsText}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Título da Seção de Mailing List"
          name="homepageMailingListTitle"
          value={settings.homepageMailingListTitle}
          onChange={handleChange}
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default TextContentSettingsForm;
