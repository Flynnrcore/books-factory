export class Book {
  constructor(title, autor, year, genre, rating_) {
    this.title = title;
    this.autor = autor;
    this.year = Number(year);
    this.genre = genre;
    this.rating_ = Number(rating_);
  }

  getAll() {
    return `${this.title}, ${this.autor}, ${this.year}, ${this.genre}, ${this.rating_}`; 
  }

  rating(newRating) {
    if (newRating >= 0 && newRating <= 10) {
      this.rating_ = newRating;
    } else {
      throw new Error('Рейтинг должен быть не меньше нуля и не больше десяти!');
    }
  }

  toString() {
    return this.getAll();
  }
}