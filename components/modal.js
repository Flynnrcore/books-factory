import { Book } from '../classes/Book.js';

export function openModal(mode, state, editIndexRef, bookModal, modalOverlay, modalTitle, modalSubmitBtn, bookForm) {
  bookModal.classList.remove('hide');
  modalOverlay.classList.remove('hide');
  if (mode === 'add') {
    modalTitle.textContent = 'Добавить новую книгу';
    modalSubmitBtn.textContent = 'Добавить';
    bookForm.reset();
    editIndexRef.value = null;
  } else if (mode === 'edit') {
    modalTitle.textContent = 'Редактировать книгу';
    modalSubmitBtn.textContent = 'Сохранить';
    const book = state.books[editIndexRef.value];
    bookForm.title.value = book.title;
    bookForm.autor.value = book.autor;
    bookForm.year.value = book.year;
    bookForm.genre.value = book.genre;
    bookForm.rating_.value = book.rating_;
  }
}

export function closeModal(bookModal, modalOverlay, editIndexRef) {
  bookModal.classList.add('hide');
  modalOverlay.classList.add('hide');
  editIndexRef.value = null;
}