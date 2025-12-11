import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  Box,
  Typography,
  Avatar,
  Stack, // Added for image preview
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload'; // Added for upload button icon
import apiClient from '../api/axios';
import { isAxiosError } from 'axios';

export interface Game { // Exported for potential reuse
    _id: string;
    title: string;
    slug: string;
    image: string;
    video: string;
    description: string;
    detailedDescription: string;
    developer: string;
    price: number;
    genre: string[];
    rating: number;
    releaseDate: string; // Using string for date input
    players: string;
    platforms: string[];
    storeLinks: { [key: string]: string };
}
interface GameFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Generic callback for success
  gameToEdit?: Game | null; // Optional prop for editing
}

const initialFormData = {
  title: '',
  slug: '',
  image: '',
  video: '',
  description: '',
  detailedDescription: '',
  developer: '',
  price: 0,
  genre: [],
  rating: 0,
  releaseDate: '',
  players: '',
  platforms: [],
  storeLinks: {},
};

const GameFormModal: React.FC<GameFormModalProps> = ({ open, onClose, onSuccess, gameToEdit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [currentPlatform, setCurrentPlatform] = useState<string>('');
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [currentStoreName, setCurrentStoreName] = useState<string>('');
  const [currentStoreLink, setCurrentStoreLink] = useState<string>('');

  // States for image upload
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadImageError, setUploadImageError] = useState<string | null>(null);

  // States for video upload
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);
  const [uploadVideoError, setUploadVideoError] = useState<string | null>(null);

  const isEditMode = !!gameToEdit;

  useEffect(() => {
    if (open) {
      if (isEditMode && gameToEdit) {
        // If editing, populate form with game data
        setFormData({
            ...initialFormData,
            ...gameToEdit,
            releaseDate: gameToEdit.releaseDate ? new Date(gameToEdit.releaseDate).toISOString().split('T')[0] : '', // Format for date input
        });
      } else {
        // If adding, reset to initial state
        setFormData(initialFormData);
      }
      setError(null);
      setSuccessMessage(null);
      setCurrentPlatform('');
      setCurrentGenre('');
      setCurrentStoreName('');
      setCurrentStoreLink('');
      // Reset file upload states
      setSelectedImageFile(null);
      setUploadingImage(false);
      setUploadImageError(null);
      setSelectedVideoFile(null);
      setUploadingVideo(false);
      setUploadVideoError(null);
    }
  }, [open, gameToEdit, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>, setUploadError: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUploadFile = async (
    fileType: 'image' | 'video',
    selectedFile: File | null,
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setUploadError: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedFileState: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (!selectedFile) {
      setUploadError('Por favor, selecione um arquivo para upload.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formDataToUpload = new FormData();
    formDataToUpload.append(fileType, selectedFile);

    try {
      const response = await apiClient.post<{ url: string }>(`/upload/${fileType}`, formDataToUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData((prev) => ({ ...prev, [fileType]: response.data.url }));
      setSuccessMessage(`${fileType === 'image' ? 'Imagem' : 'Vídeo'} enviada com sucesso!`);
      setSelectedFileState(null);
    } catch (err) {
      let errorMessage = `Erro desconhecido ao enviar o ${fileType === 'image' ? 'imagem' : 'vídeo'}.`;
      if (isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || `Erro do servidor: ${JSON.stringify(err.response.data)}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setUploadError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleAddChip = (value: string, field: 'platforms' | 'genre') => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()],
      }));
    }
  };

  const handleDeleteChip = (valueToDelete: string, field: 'platforms' | 'genre') => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((v) => v !== valueToDelete),
    }));
  };

  const handleAddStoreLink = () => {
    if (currentStoreName.trim() && currentStoreLink.trim()) {
      setFormData((prev) => ({
        ...prev,
        storeLinks: {
          ...prev.storeLinks,
          [currentStoreName.trim()]: currentStoreLink.trim(),
        },
      }));
      setCurrentStoreName('');
      setCurrentStoreLink('');
    }
  };

  const handleDeleteStoreLink = (storeNameToDelete: string) => {
    setFormData((prev) => {
      const newStoreLinks = { ...prev.storeLinks };
      delete newStoreLinks[storeNameToDelete];
      return { ...prev, storeLinks: newStoreLinks };
    });
  };

  const renderFileUploadSection = (
    label: string,
    fileType: 'image' | 'video',
    currentFileUrl: string,
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    isUploading: boolean,
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    currentUploadError: string | null,
    setUploadError: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>{label}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        {fileType === 'image' && <Avatar src={currentFileUrl ? ('http://localhost:3001' + currentFileUrl) : ''} variant="rounded" sx={{ width: 56, height: 56 }} />}
        {fileType === 'video' && currentFileUrl && (
            <video src={'http://localhost:3001' + currentFileUrl} controls width="100" height="56" style={{ borderRadius: 4 }} />
        )}
        <input
          accept={fileType === 'image' ? "image/*" : "video/*"}
          style={{ display: 'none' }}
          id={`raised-button-file-${fileType}`}
          type="file"
          onChange={(e) => handleFileChange(e, setSelectedFile, setUploadError)}
        />
        <label htmlFor={`raised-button-file-${fileType}`}>
          <Button variant="outlined" component="span" startIcon={<FileUploadIcon />}>
            {selectedFile ? selectedFile.name : "Selecionar Arquivo"}
          </Button>
        </label>
        <Button
          variant="contained"
          onClick={() => handleUploadFile(fileType, selectedFile, setUploading, setUploadError, setSelectedFile)}
          disabled={!selectedFile || isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : undefined}
        >
          {isUploading ? 'Enviando...' : `Enviar ${fileType === 'image' ? 'Imagem' : 'Vídeo'}`}
        </Button>
      </Stack>
      {currentFileUrl && <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>URL Atual: {currentFileUrl}</Typography>}
      {currentUploadError && <Alert severity="error" sx={{ mt: 1 }}>{currentUploadError}</Alert>}
    </Box>
  );

  const renderChipInput = (
    label: string,
    field: 'platforms' | 'genre',
    currentValue: string,
    setCurrentValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <TextField
          label={`Novo ${field === 'platforms' ? 'Plataforma' : 'Gênero'}`}
          variant="outlined"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddChip(currentValue, field);
              setCurrentValue('');
            }
          }}
          sx={{ mr: 1, flexGrow: 1 }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            handleAddChip(currentValue, field);
            setCurrentValue('');
          }}
          startIcon={<AddIcon />}
        >
          Adicionar
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {formData[field]?.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() => handleDeleteChip(value, field)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );

  const handleSubmit = async () => {
    if (selectedImageFile || selectedVideoFile) {
      setError('Por favor, envie todos os arquivos selecionados antes de salvar.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (isEditMode) {
        await apiClient.put(`/games/${gameToEdit.slug}`, formData);
        setSuccessMessage('Jogo atualizado com sucesso!');
      } else {
        await apiClient.post('/games', formData);
        setSuccessMessage('Jogo criado com sucesso!');
      }
      onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Ocorreu um erro.');
      } else {
        setError('Erro de rede ou desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditMode ? 'Editar Jogo' : 'Adicionar Novo Jogo'}</DialogTitle>
        <DialogContent dividers>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="slug"
            label="Slug (URL amigável)"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.slug}
            onChange={handleChange}
            required
            disabled={isEditMode}
            sx={{ mb: 2 }}
          />
            <TextField
                margin="dense"
                name="developer"
                label="Desenvolvedor"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.developer}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                margin="dense"
                name="price"
                label="Preço"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.price}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                margin="dense"
                name="rating"
                label="Avaliação (0-5)"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.rating}
                onChange={handleChange}
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                sx={{ mb: 2 }}
            />
            <TextField
                margin="dense"
                name="players"
                label="Jogadores"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.players}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
             <TextField
                margin="dense"
                name="releaseDate"
                label="Data de Lançamento"
                type="date"
                fullWidth
                variant="outlined"
                value={formData.releaseDate}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 2 }}
            />

          {renderFileUploadSection("Imagem de Capa", "image", formData.image, selectedImageFile, setSelectedImageFile, uploadingImage, setUploadingImage, uploadImageError, setUploadImageError)}
          {renderFileUploadSection("Vídeo de Preview", "video", formData.video, selectedVideoFile, setSelectedVideoFile, uploadingVideo, setUploadingVideo, uploadVideoError, setUploadVideoError)}

          <TextField
            margin="dense"
            name="description"
            label="Descrição Curta"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="detailedDescription"
            label="Descrição Detalhada"
            type="text"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={formData.detailedDescription}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {renderChipInput('Gêneros', 'genre', currentGenre, setCurrentGenre)}
          {renderChipInput('Plataformas', 'platforms', currentPlatform, setCurrentPlatform)}
          
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Links de Loja</Typography>
            <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
              <TextField label="Nome da Loja (ex: Steam)" variant="outlined" value={currentStoreName} onChange={(e) => setCurrentStoreName(e.target.value)} sx={{ flexGrow: 1 }} />
              <TextField label="URL da Loja" variant="outlined" value={currentStoreLink} onChange={(e) => setCurrentStoreLink(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddStoreLink()} sx={{ flexGrow: 2 }} />
              <Button variant="outlined" onClick={handleAddStoreLink} startIcon={<AddIcon />}>Adicionar</Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(formData.storeLinks).map(([name, link]) => (
                <Chip key={name} label={`${name}: ${link}`} onDelete={() => handleDeleteStoreLink(name)} color="secondary" variant="outlined" />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Jogo')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GameFormModal;
