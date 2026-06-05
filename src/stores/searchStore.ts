import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  query: string;
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: '',
  setOpen: (open) => set({ isOpen: open, query: '' }),
  setQuery: (query) => set({ query }),
}));
