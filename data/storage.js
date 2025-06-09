import { Book } from '../classes/Book.js';

const STORAGE_KEY = 'state';

export function loadState(booksDefault) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved).map(
        b => new Book(b.title, b.autor, b.year, b.genre, b.rating_)
      );
    } catch {
      return booksDefault;
    }
  }
  return booksDefault;
}

export function saveState(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}