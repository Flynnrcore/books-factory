export function setupSorting(sortingForm, state, renderBookList) {
  sortingForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(sortingForm);
    const sortBy = formData.get('sortBy');
    const sortType = formData.get('sortType');
    state.books.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (!isNaN(valA)) valA = Number(valA);
      if (!isNaN(valB)) valB = Number(valB);
      if (valA < valB) return sortType === 'increase' ? -1 : 1;
      if (valA > valB) return sortType === 'increase' ? 1 : -1;
      return 0;
    });
    renderBookList();
  });
}