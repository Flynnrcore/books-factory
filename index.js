import { Book } from './classes/Book.js';
import { loadState, saveState } from './data/storage.js';
import { renderBookList } from './components/bookList.js';
import { openModal, closeModal } from './components/modal.js';
import { setupImport, setupExport } from './utils/importExport.js';
import { setupSorting } from './utils/sort.js';
import { initialData } from './data/initialData.js';

// -- Переменные состояния --
let editIndex = { value: null };
let state = {
  books: loadState(initialData),
};

// -- DOM-элементы --
const bookList = document.querySelector('.bookList');
const bookModal = document.getElementById('bookModal');
const modalOverlay = document.getElementById('modalOverlay');
const addBookModalBtn = document.querySelector('.addBookModalBtn');
const importJSONBtn = document.querySelector('.importJSONBtn');
const exportJSONBtn = document.querySelector('.exportJSONBtn');
const sortingForm = document.querySelector('.sortingForm');
const modalTitle = document.getElementById('modalTitle');
const bookForm = document.getElementById('bookForm');
const modalSubmitBtn = document.getElementById('modalSubmitBtn');
const closeModalBtns = document.querySelectorAll('.closeModalBtn');

// -- Рендеринг списка книг --
function rerender() {
  renderBookList(state, bookList, (mode, idx) => {
    if (mode === 'edit') editIndex.value = idx;
    openModal(mode, state, editIndex, bookModal, modalOverlay, modalTitle, modalSubmitBtn, bookForm);
  }, saveState, rerender);
}

// -- Универсальное модальное окно --
addBookModalBtn.addEventListener('click', () => {
  openModal('add', state, editIndex, bookModal, modalOverlay, modalTitle, modalSubmitBtn, bookForm);
});

closeModalBtns.forEach(btn => btn.addEventListener('click', () => {
  closeModal(bookModal, modalOverlay, editIndex);
}));

modalOverlay.addEventListener('click', () => {
  closeModal(bookModal, modalOverlay, editIndex);
});

// -- Добавление/редактирование книги --
bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(bookForm);
  const book = new Book(
    formData.get('title'),
    formData.get('autor'),
    formData.get('year'),
    formData.get('genre'),
    formData.get('rating_')
  );
  if (editIndex.value === null) {
    state.books.push(book);
  } else {
    state.books[editIndex.value] = book;
  }
  saveState(state.books);
  closeModal(bookModal, modalOverlay, editIndex);
  rerender();
});

// -- Сортировка --
setupSorting(sortingForm, state, rerender);

// -- Импорт/экспорт --
setupImport(importJSONBtn, state, saveState, rerender);
setupExport(exportJSONBtn, state);

// -- Инициализация --
rerender();