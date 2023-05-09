import selectors from './modules/selectors.js';
import Book from './modules/book-class.js';
import Books from './modules/books-class.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const { inputOne } = selectors;
const { inputTwo } = selectors;
const { addButton } = selectors;
const { listLink } = selectors;
const { mainContainer } = selectors;
const { addLink } = selectors;
const { contactLink } = selectors;
const { formContainer } = selectors;
const { contactSection } = selectors;
const { textLink } = selectors;
const { errorMsgDiv } = selectors;
const { dateTimeDiv } = selectors;

const myBooks = new Books();

addButton.addEventListener('click', () => {
  const inputOneValue = inputOne.value.trim();
  const inputTwoValue = inputTwo.value.trim();

  if (inputOneValue === '' || inputTwoValue === '') {
    const existingErrorMsg = errorMsgDiv.querySelector('.error-msg');
    if (existingErrorMsg) {
      return;
    }
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('error-msg');
    errorMsg.innerHTML = 'Please fill both inputs';
    errorMsgDiv.appendChild(errorMsg);
  } else {
    errorMsgDiv.innerHTML = '';
    const newBook = new Book(inputOneValue, inputTwoValue);
    myBooks.addBook(newBook);
    myBooks.addNewMsg();
  }

  inputOne.value = '';
  inputTwo.value = '';
});

const updateTime = () => {
  const now = DateTime.local();
  const formattedDateTime = now.toLocaleString(DateTime.DATETIME_FULL);
  dateTimeDiv.innerHTML = formattedDateTime;
};

updateTime();
setInterval(updateTime, 1000);

myBooks.writeBooks();

// Listeners to navbar sections

listLink.addEventListener('click', () => {
  listLink.style.color = 'blue';
  listLink.style.textDecoration = 'underline';
  addLink.style.color = 'black';
  addLink.style.textDecoration = 'none';
  contactLink.style.color = 'black';
  contactLink.style.textDecoration = 'none';
  mainContainer.style.display = 'flex';
  formContainer.style.display = 'none';
  contactSection.style.display = 'none';
});

addLink.addEventListener('click', () => {
  listLink.style.color = 'black';
  listLink.style.textDecoration = 'none';
  addLink.style.color = 'blue';
  addLink.style.textDecoration = 'underline';
  contactLink.style.color = 'black';
  contactLink.style.textDecoration = 'none';
  mainContainer.style.display = 'none';
  formContainer.style.display = 'flex';
  contactSection.style.display = 'none';
});

textLink.addEventListener('click', () => {
  listLink.style.color = 'black';
  listLink.style.textDecoration = 'none';
  addLink.style.color = 'blue';
  addLink.style.textDecoration = 'underline';
  mainContainer.style.display = 'none';
  formContainer.style.display = 'flex';
  contactSection.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  contactLink.style.color = 'blue';
  contactLink.style.textDecoration = 'underline';
  listLink.style.color = 'black';
  listLink.style.textDecoration = 'none';
  addLink.style.color = 'black';
  addLink.style.textDecoration = 'none';
  mainContainer.style.display = 'none';
  formContainer.style.display = 'none';
  contactSection.style.display = 'flex';
});