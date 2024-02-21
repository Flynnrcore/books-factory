// Класс book позволяющий создавать сущности с помощью оператора new
class Book {
  constructor(title, autor, year, genre, rating_) {
    this.title = title;
    this.autor = autor;
    this.year = year;
    this.genre = genre;
    this.rating_ = rating_;
  }
  
  getAll() {
    return `${this.title}, ${this.autor}, ${this.year}, ${this.genre}, ${this.rating_}`; 
  }
  
  rating(newRating) {
    if (newRating >= 0 && newRating <= 10) {
      this.rating_ = newRating;
    }else {
      throw new Error('Рейтинг должен быть не меньше нуля и не больше десяти!');
    }
  }
  
  toString() {
    return this.getAll;
  }
}

// Создание сущностей с помощью класса Book и массива с книгами
const book1 = new Book('Грокаем алгоритмы', 'Адитья Бхаргава', '2017', 'учебная литература', '8');
const book2 = new Book('Преступление и наказание', 'Федор Достоевский', '1866', 'классическая литература', '10');
const book3 = new Book('Приключения Тома Сойера', 'Марк Твен', '1875', 'детская литература', '7');
const book4 = new Book('Рок соло на электрогитаре', 'Сергей Седых', '2001', 'учебная литература', '5');
const book5 = new Book('Записки юного врача', 'Михаил Булгаков', '1926', 'классическая литература', '7');
const book6 = new Book('Гарри Поттер и философский камень', 'Джоан Роулинг', '1995', 'детская литература', '6');

const books = [book1, book2, book3, book4, book5, book6];

// Функции сортировки по рейтингу и поиска по названию книги, жанру
function sortBooksByRating(booksArr) {
  return booksArr.slice().sort((a, b) => Number(b.rating_) -Number(a.rating_));
}

function filterBooksByGenre(booksArr, requiredGenre) {
  return booksArr.filter(({genre}) => requiredGenre === genre);
}

function findBookByTitle(booksArr, requiredTitle) {
  const findResult = booksArr.find((bookItem) => bookItem.title === requiredTitle);
  return findResult ? findResult : null;
}

// Вызов функций с передачей в качестве аргумента массива книг
console.log(sortBooksByRating(books));
console.log(filterBooksByGenre(books, 'классика'));
console.log(findBookByTitle(books, 'Приключения Тома Сойера'));

// GUI интерфейс
// Функция для загрузки состояния из localStorage
function loadState() {
  const savedState = localStorage.getItem('state');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    const booksFromLocalStorage = parsedState.map(bookData => new Book(bookData.title, bookData.autor, bookData.year, bookData.genre, bookData.rating_));
    return booksFromLocalStorage;
  }
    return books;
}

// Функция для сохранения состояния в localStorage
function saveState(newState) {
  localStorage.setItem('state', JSON.stringify(newState));
}

const state = { books: loadState() };

function deleteList (listId) {
  state.books = state.books.filter((_book, index) => index !== Number(listId));
  saveState(state.books);

  renderBookList();
};

// Функция рендеринга списка книг на странице
const bookList = document.querySelector('.bookList');
function renderBookList() {
  bookList.innerHTML = '';
  state.books.forEach((bookItem, index) => {
    const liEl = document.createElement('li');
    liEl.textContent = bookItem.getAll();
// Добавления кнопки удаления
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteBtn');
    deleteButton.setAttribute('id', index);
    deleteButton.setAttribute('value', 'delete');
    liEl.append(deleteButton);

    deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteList(e.target.id);
   });

    bookList.append(liEl);
  });
}

renderBookList();

// Функционал добавления новой книги
const addBookModalBtn = document.querySelectorAll('.addBookModalBtn');
const addBookModal = document.querySelector('#addBookForm');
const addBookForm2 = document.querySelector('form');

addBookModalBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
  addBookModal.classList.toggle('hide');
  });
}); 

addBookForm2.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newBook = new Book(...formData.values());
  state.books = [...state.books, newBook];
  saveState(state.books);
  addBookModal.classList.toggle('hide');
  renderBookList();
});

// Функционал сортировки списка книг
const sortingForm = document.querySelector('.sortingForm');

sortingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const sortingFormData = new FormData(e.target);
  const sortBy = sortingFormData.get('sortBy');
  const sortType = sortingFormData.get('sortType');
  if (sortType === 'increase') {
    state.books = sortBy === 'year' || sortBy ==='rating_' ? state.books.slice().sort((a, b) => a[sortBy] - b[sortBy]) : state.books.slice().sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  } else {
    state.books = sortBy === 'year' || sortBy ==='rating_' ? state.books.slice().sort((a, b) => b[sortBy] - a[sortBy]) : state.books.slice().sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
  }
  renderBookList();
});

// Функционал кнопки импорта данных JSON
const handleFileSelect = (event) => {
  const file = event.target.files[0];

  const readerFile = new FileReader();
  readerFile.onload = (e) => {
    try {
      const data = JSON
        .parse(e.target.result)
        .map(bookData => new Book(bookData.title, bookData.autor, bookData.year, bookData.genre, bookData.rating_));
      state.books = data;
      saveState(state.books);
      renderBookList();      
    } catch (error) {
      console.error('Ошибка обработки JSON', error);
    }
  };

  readerFile.readAsText(file);
};

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json';
fileInput.addEventListener('change', handleFileSelect);

const importJSONBtn = document.querySelector('.importJSONBtn');
importJSONBtn.addEventListener('click', () => {
  fileInput.click();
});

// Функционал кнопки экспорта данных в JSON
const exportJSONBtn = document.querySelector('.exportJSONBtn');
exportJSONBtn.addEventListener('click', () => {
  const json = JSON.stringify(state.books);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const linkJSON = document.createElement('a');
  linkJSON.href = url;
  linkJSON.download = 'data.json';
  linkJSON.click();
  URL.revokeObjectURL(url);
});