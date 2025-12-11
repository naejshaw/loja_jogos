import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert, Snackbar } from '@mui/material';
import apiClient from '../api/axios';
import GameFormModal from '../components/GameFormModal';
import ConfirmationDialog from '../components/ConfirmationDialog';

interface Game {
  _id: string;
  title: string;
  slug: string;
  image: string;
  video: string;
  description: string;
  platforms: string[];
  storeLinks: { [key: string]: string };
}

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  // State for editing
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);

  // State for delete confirmation
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const fetchGames = useCallback(async () => {
    try {
      if (!loading) setLoading(true);
      const response = await apiClient.get('/games');
      setGames(response.data);
      setError(null);
    } catch (err) {
      setError('Falha ao buscar jogos. Verifique se o backend está rodando e acessível.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial fetch only

  const handleOpenAddModal = () => {
    setGameToEdit(null); // Ensure we are in "add" mode
    setOpenModal(true);
  };

  const handleOpenEditModal = (game: Game) => {
    setGameToEdit(game);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setGameToEdit(null); // Clear edit state on close
  };

  const handleSaveSuccess = (message: string) => {
    handleCloseModal();
    setFeedback({ message, severity: 'success' });
    fetchGames();
  };

  const handleDeleteClick = (game: Game) => {
    setGameToDelete(game);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setGameToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!gameToDelete) return;

    try {
      await apiClient.delete(`/games/${gameToDelete.slug}`);
      setFeedback({ message: 'Jogo excluído com sucesso!', severity: 'success' });
      fetchGames();
    } catch (err) {
      setFeedback({ message: 'Erro ao excluir o jogo.', severity: 'error' });
      console.error(err);
    } finally {
      handleDeleteCancel();
    }
  };


  if (loading && games.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && games.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerenciar Jogos
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenAddModal}>
        Adicionar Novo Jogo
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="games table">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Plataformas</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow
                key={game._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {game.title}
                </TableCell>
                <TableCell>{game.slug}</TableCell>
                <TableCell>{game.platforms.join(', ')}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleOpenEditModal(game)}>
                    Editar
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteClick(game)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {games.length === 0 && !loading && !error && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Nenhum jogo encontrado.
        </Typography>
      )}

      <GameFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={() => handleSaveSuccess(gameToEdit ? 'Jogo atualizado com sucesso!' : 'Jogo adicionado com sucesso!')}
        gameToEdit={gameToEdit}
      />
      {gameToDelete && (
        <ConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Confirmar Exclusão"
          message={`Tem certeza de que deseja excluir o jogo "${gameToDelete.title}"? Esta ação não pode ser desfeita.`}
        />
      )}
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

export default GamesPage;
