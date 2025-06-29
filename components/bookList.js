export function renderBookList(state, bookList, openModal, saveState, renderBookList) {
  bookList.innerHTML = '';
  state.books.forEach((book, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${book.title}</span>
      <span class="secondary-color">${book.autor}</span>
      <span class="secondary-color">${book.year}</span>
      <span class="secondary-color">${book.genre}</span>
      <span>${book.rating_}</span>
      <span class="actionsBtns">
        <button class="editBtn" data-idx="${idx}" title="Редактировать"></button>
        <button class="deleteBtn" data-idx="${idx}" title="Удалить"></button>
      </span>
    `;
    bookList.append(li);
  });

  // Навешиваем обработчики на кнопки
  bookList.querySelectorAll('.editBtn').forEach(btn => {
    btn.onclick = () => openModal('edit', Number(btn.dataset.idx));
  });
  bookList.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.onclick = () => {
      state.books.splice(Number(btn.dataset.idx), 1);
      saveState(state.books);
      renderBookList();
    };
  });
}