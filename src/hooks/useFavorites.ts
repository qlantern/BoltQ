import { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';

export const useFavorites = (userId: string) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadFavorites();
      
      // Set up event listeners
      favoritesService.on('favorite:added', handleFavoriteAdded);
      favoritesService.on('favorite:removed', handleFavoriteRemoved);

      return () => {
        favoritesService.off('favorite:added', handleFavoriteAdded);
        favoritesService.off('favorite:removed', handleFavoriteRemoved);
      };
    }
  }, [userId]);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const userFavorites = await favoritesService.getFavorites(userId);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteAdded = ({ userId: favUserId, teacherId }: { userId: string; teacherId: string }) => {
    if (favUserId === userId) {
      setFavorites(prev => [...prev, teacherId]);
    }
  };

  const handleFavoriteRemoved = ({ userId: favUserId, teacherId }: { userId: string; teacherId: string }) => {
    if (favUserId === userId) {
      setFavorites(prev => prev.filter(id => id !== teacherId));
    }
  };

  const toggleFavorite = async (teacherId: string) => {
    try {
      return await favoritesService.toggleFavorite(userId, teacherId);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      return false;
    }
  };

  const isFavorite = (teacherId: string) => {
    return favorites.includes(teacherId);
  };

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite
  };
};