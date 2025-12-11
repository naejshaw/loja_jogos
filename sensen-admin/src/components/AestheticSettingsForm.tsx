import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { type SelectChangeEvent } from '@mui/material';
import { type SiteSettings } from '../pages/SettingsPage'; // Import the updated SiteSettings interface

interface AestheticSettingsFormProps {
  settings: SiteSettings;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
}

const webSafeFonts = [
  'Arial',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
];

const AestheticSettingsForm: React.FC<AestheticSettingsFormProps> = ({ settings, handleChange }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Cor Primária"
          name="primaryColor"
          type="color"
          value={settings.primaryColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Cor Secundária"
          name="secondaryColor"
          type="color"
          value={settings.secondaryColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Cor Geral do Texto"
          name="generalTextColor"
          type="color"
          value={settings.generalTextColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Cor de Fundo da Página"
          name="pageBackgroundColor"
          type="color"
          value={settings.pageBackgroundColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Cor Geral do Fundo"
          name="generalBackgroundColor"
          type="color"
          value={settings.generalBackgroundColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Cor de Fundo do Cabeçalho"
          name="headerBackgroundColor"
          type="color"
          value={settings.headerBackgroundColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Cor de Fundo do Rodapé"
          name="footerBackgroundColor"
          type="color"
          value={settings.footerBackgroundColor}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="fontFamily-label">Família da Fonte</InputLabel>
          <Select
            labelId="fontFamily-label"
            id="fontFamily-select"
            name="fontFamily"
            value={settings.fontFamily}
            onChange={handleChange}
            label="Família da Fonte"
          >
            {webSafeFonts.map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default AestheticSettingsForm;
