/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Avatar, CircularProgress, Alert } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { type SiteSettings } from '../pages/SettingsPage'; // Import the updated SiteSettings interface
import { type AxiosInstance, isAxiosError } from 'axios';

interface ImageManagementSettingsFormProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  apiClient: AxiosInstance;
  feedback: { message: string; severity: 'success' | 'error' } | null;
  setFeedback: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error' } | null>>;
}

const ImageManagementSettingsForm: React.FC<ImageManagementSettingsFormProps> = ({
  settings,
  setSettings,
  apiClient,
  feedback,
  setFeedback,
}) => {
  const [selectedFileLogo, setSelectedFileLogo] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState<boolean>(false);
  const [uploadErrorLogo, setUploadErrorLogo] = useState<string | null>(null);

  const [selectedFileIcon, setSelectedFileIcon] = useState<File | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState<boolean>(false);
  const [uploadErrorIcon, setUploadErrorIcon] = useState<string | null>(null);

  const [selectedFileAboutUs, setSelectedFileAboutUs] = useState<File | null>(null);
  const [uploadingAboutUs, setUploadingAboutUs] = useState<boolean>(false);
  const [uploadErrorAboutUs, setUploadErrorAboutUs] = useState<string | null>(null);

  const [selectedFileMailingList, setSelectedFileMailingList] = useState<File | null>(null); // Changed from FeaturedSection
  const [uploadingMailingList, setUploadingMailingList] = useState<boolean>(false); // Changed from FeaturedSection
  const [uploadErrorMailingList, setUploadErrorMailingList] = useState<string | null>(null); // Changed from FeaturedSection


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImageFile: React.Dispatch<React.SetStateAction<File | null>>, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUploadImage = async (
    imageType: 'logo' | 'icon' | 'aboutUs' | 'mailingList', // Updated imageType
    selectedFile: File | null,
    setSpecificUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setUploadError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (!selectedFile) {
      setUploadError('Por favor, selecione um arquivo para upload.');
      return;
    }

    setSpecificUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await apiClient.post<{ url: string }>('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings };
        if (imageType === 'logo') updatedSettings.logoUrl = response.data.url;
        if (imageType === 'icon') updatedSettings.iconUrl = response.data.url;
        if (imageType === 'aboutUs') updatedSettings.aboutUsImageUrl = response.data.url;
        if (imageType === 'mailingList') updatedSettings.mailingListImageUrl = response.data.url; // Updated for mailingList
        return updatedSettings;
      });
      setFeedback({ message: `${imageType} enviada com sucesso!`, severity: 'success' });
      // Clear specific file after successful upload
      if (imageType === 'logo') setSelectedFileLogo(null);
      if (imageType === 'icon') setSelectedFileIcon(null);
      // Removed homepageHero clear logic
      if (imageType === 'aboutUs') setSelectedFileAboutUs(null);
      if (imageType === 'mailingList') setSelectedFileMailingList(null); // Updated for mailingList
      
    } catch (err) {
      setUploadError(isAxiosError(err) && err.response ? err.response.data.message : `Erro ao enviar a ${imageType}.`);
      console.error(`Error uploading ${imageType}:`, err);
      setFeedback({ message: `Erro ao enviar a ${imageType}.`, severity: 'error' });
    } finally {
      setSpecificUploading(false);
    }
  };

  const renderImageUploadSection = (
    label: string,
    imageType: 'logo' | 'icon' | 'aboutUs' | 'mailingList', // Updated imageType
    currentImageUrl: string,
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    uploading: boolean,
    uploadError: string | null,
    setSpecificUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setUploadError: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <Box>
      <Typography variant="subtitle1" gutterBottom>{label}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={'http://localhost:3001' + currentImageUrl} variant="rounded" sx={{ width: 56, height: 56 }} />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`raised-button-file-${imageType}`}
          type="file"
          onChange={(e) => handleFileChange(e, setSelectedFile, setUploadError)}
        />
        <label htmlFor={`raised-button-file-${imageType}`}>
          <Button variant="outlined" component="span" startIcon={<FileUploadIcon />}>
            {selectedFile ? selectedFile.name : "Selecionar Arquivo"}
          </Button>
        </label>
        <Button
          variant="contained"
          onClick={() => handleUploadImage(imageType, selectedFile, setSpecificUploading, setUploadError)} // Pass renamed parameter
          disabled={!selectedFile || uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : undefined}
        >
          {uploading ? 'Enviando...' : `Enviar ${label.split(' ')[0]}`}
        </Button>
      </Stack>
      {currentImageUrl && <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>URL Atual: {currentImageUrl}</Typography>}
      {uploadError && <Alert severity="error" sx={{ mt: 1 }}>{uploadError}</Alert>}
    </Box>
  );


  return (
    <Box sx={{ mt: 2 }}>
      {renderImageUploadSection(
        "Logo do Site",
        "logo",
        settings.logoUrl,
        selectedFileLogo,
        setSelectedFileLogo,
        uploadingLogo,
        uploadErrorLogo,
        setUploadingLogo,
        setUploadErrorLogo
      )}
      {renderImageUploadSection(
        "Ícone do Site",
        "icon",
        settings.iconUrl,
        selectedFileIcon,
        setSelectedFileIcon,
        uploadingIcon,
        uploadErrorIcon,
        setUploadingIcon,
        setUploadErrorIcon
      )}
      {/* Removed homepageHero section */}
      {renderImageUploadSection(
        "Imagem da Seção 'Quem Somos'",
        "aboutUs",
        settings.aboutUsImageUrl,
        selectedFileAboutUs,
        setSelectedFileAboutUs,
        uploadingAboutUs,
        uploadErrorAboutUs,
        setUploadingAboutUs,
        setUploadErrorAboutUs
      )}
      {renderImageUploadSection(
        "Imagem da Seção de Lista de Emails", // Changed Label
        "mailingList", // Changed imageType
        settings.mailingListImageUrl, // Changed imageUrl source
        selectedFileMailingList, // Changed selectedFile state
        setSelectedFileMailingList, // Changed setSelectedFile setter
        uploadingMailingList, // Changed uploading state
        uploadErrorMailingList, // Changed uploadError state
        setUploadingMailingList, // Changed setSpecificUploading setter
        setUploadErrorMailingList // Changed setUploadError setter
      )}
    </Box>
  );
};

export default ImageManagementSettingsForm;