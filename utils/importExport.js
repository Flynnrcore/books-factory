import { Book } from '../classes/Book.js';

export function setupImport(importJSONBtn, state, saveState, renderBookList) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result)
          .map(b => new Book(b.title, b.autor, b.year, b.genre, b.rating_));
        state.books = data;
        saveState(state.books);
        renderBookList();
      } catch (err) {
        alert('Ошибка импорта JSON');
      }
    };
    reader.readAsText(file);
  });
  importJSONBtn.addEventListener('click', () => fileInput.click());
}

export function setupExport(exportJSONBtn, state) {
  exportJSONBtn.addEventListener('click', () => {
    const json = JSON.stringify(state.books);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'books.json';
    link.click();
    URL.revokeObjectURL(url);
  });
}