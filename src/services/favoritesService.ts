interface FavoriteTeacher {
  teacherId: string;
  userId: string;
  addedAt: Date;
}

class FavoritesService {
  private favorites: Map<string, string[]> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('teachbnb_favorites');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.favorites = new Map(Object.entries(data));
      } catch (error) {
        console.error('Failed to load favorites from storage:', error);
      }
    }
  }

  private saveToStorage() {
    const data = Object.fromEntries(this.favorites);
    localStorage.setItem('teachbnb_favorites', JSON.stringify(data));
  }

  // Event system
  on(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  async addFavorite(userId: string, teacherId: string): Promise<void> {
    const userFavorites = this.favorites.get(userId) || [];
    if (!userFavorites.includes(teacherId)) {
      userFavorites.push(teacherId);
      this.favorites.set(userId, userFavorites);
      this.saveToStorage();
      this.emit('favorite:added', { userId, teacherId });
    }
  }

  async removeFavorite(userId: string, teacherId: string): Promise<void> {
    const userFavorites = this.favorites.get(userId) || [];
    const updatedFavorites = userFavorites.filter(id => id !== teacherId);
    this.favorites.set(userId, updatedFavorites);
    this.saveToStorage();
    this.emit('favorite:removed', { userId, teacherId });
  }

  async getFavorites(userId: string): Promise<string[]> {
    return this.favorites.get(userId) || [];
  }

  async isFavorite(userId: string, teacherId: string): Promise<boolean> {
    const userFavorites = this.favorites.get(userId) || [];
    return userFavorites.includes(teacherId);
  }

  async toggleFavorite(userId: string, teacherId: string): Promise<boolean> {
    const isFav = await this.isFavorite(userId, teacherId);
    if (isFav) {
      await this.removeFavorite(userId, teacherId);
      return false;
    } else {
      await this.addFavorite(userId, teacherId);
      return true;
    }
  }
}

export const favoritesService = new FavoritesService();