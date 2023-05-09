import selectors from './selectors.js';

const { booksSection } = selectors;

export default class Books {
  constructor() {
    this.bookList = [];
    if (localStorage.getItem('bookList')) {
      this.bookList = JSON.parse(localStorage.getItem('bookList'));
    }
    this.mainText = document.querySelector('.main-text');
  }

  addBook(book) {
    this.bookList.push(book);
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    this.writeBooks();
  }

  removeBook(title) {
    this.bookList = this.bookList.filter((book) => book.title !== title);
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    this.writeBooks();
    this.addNewMsg();
  }

  writeBooks() {
    booksSection.innerHTML = '';
    const list = document.createElement('ul');
    list.classList.add('books-list');
    this.bookList.forEach((book, index) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.innerHTML = `
        <div class="books-info">
          <h2 class="li-title">"${book.title}"</h2>
          <p class="li-text">by ${book.author}</p>
        </div>
          <button class="remove-btn" id="${index}">Remove</button>
        `;
      list.appendChild(li);
      booksSection.appendChild(list);

      const removeBtn = document.getElementById(`${index}`);
      removeBtn.addEventListener('click', () => this.removeBook(book.title));
    });
  }

  addNewMsg() {
    if (booksSection.children.length > 0) {
      this.mainText.style.display = 'none';
    } else if (booksSection.children.length <= 0) {
      this.mainText.style.display = 'block';
    }
  }
}
