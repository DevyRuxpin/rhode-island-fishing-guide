import { JournalEntry, FishCaught } from '@/types/fishing';

class JournalService {
  private storageKey = 'fishing-journal-entries';
  private fishStorageKey = 'fish-caught-gallery';

  // Journal Entries
  getJournalEntries(): JournalEntry[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading journal entries:', error);
      return [];
    }
  }

  saveJournalEntry(entry: JournalEntry): void {
    if (typeof window === 'undefined') return;

    try {
      const entries = this.getJournalEntries();
      const existingIndex = entries.findIndex(e => e.id === entry.id);
      
      if (existingIndex >= 0) {
        entries[existingIndex] = entry;
      } else {
        entries.unshift(entry); // Add new entries to the beginning
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  }

  deleteJournalEntry(id: string): void {
    if (typeof window === 'undefined') return;

    try {
      const entries = this.getJournalEntries();
      const filtered = entries.filter(e => e.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  }

  // Fish Caught Gallery
  getFishCaught(): FishCaught[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.fishStorageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading fish caught:', error);
      return [];
    }
  }

  addFishCaught(fish: FishCaught): void {
    if (typeof window === 'undefined') return;

    try {
      const fishCaught = this.getFishCaught();
      fishCaught.unshift(fish); // Add new fish to the beginning
      localStorage.setItem(this.fishStorageKey, JSON.stringify(fishCaught));
    } catch (error) {
      console.error('Error adding fish caught:', error);
    }
  }

  deleteFishCaught(id: string): void {
    if (typeof window === 'undefined') return;

    try {
      const fishCaught = this.getFishCaught();
      const filtered = fishCaught.filter(f => f.id !== id);
      localStorage.setItem(this.fishStorageKey, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting fish caught:', error);
    }
  }

  // Utility functions
  generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Convert file to base64
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Get fish caught by journal entry
  getFishCaughtByJournalEntry(journalEntryId: string): FishCaught[] {
    return this.getFishCaught().filter(fish => fish.journalEntryId === journalEntryId);
  }
}

export const journalService = new JournalService();
