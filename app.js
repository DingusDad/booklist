// SELECTORS

const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookLanguage = document.querySelector('#language');
const bookRead = document.getElementById('read');
const addBookButton = document.querySelector('#add-book');
const bookShelf = document.querySelector('.book-shelf');

const totalBooks = document.querySelector('#total-books');
const totalNotRead = document.querySelector('#books-not-read');
const totalReadBooks = document.querySelector('#books-read');

let isBookRead  = "Not Read";
let myLibrary = [];

//EVENT LISTENERS

addBookButton.addEventListener('click', addBookToLibrary);
bookRead.addEventListener('click', updateCheck);
bookShelf.addEventListener('click', editInLibrary);


//FUNCTIONS

function updateCheck(event) {
    let checkStatus = bookRead.checked;
    if (checkStatus == true) {
        isBookRead = "Read";
    } else if ( checkStatus == false) {
        isBookRead = "Not Read";
    }
}

function Book(title, author, pages, language, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.read = read;
    
    console.log(this.title);
    console.log(this.author);
    console.log(this.pages);
    console.log(this.language);
    console.log(this.read);
}

function addBookToLibrary(event) {
    if (
    document.getElementById('title').checkValidity() == true &&
    document.getElementById('author').checkValidity() == true &&
    document.getElementById('pages').checkValidity()== true &&
    document.getElementById('language').checkValidity() == true
    ) {
    event.preventDefault();

    let newBookTitle = toTitleCase(bookTitle.value);
    let newBookAuthor = toTitleCase(bookAuthor.value);
    let newBookPages = bookPages.value;
    let newBookLanguage = toTitleCase(bookLanguage.value);
    let newBookRead = isBookRead;
    let book = new Book(newBookTitle, newBookAuthor, newBookPages, newBookLanguage, newBookRead);

    myLibrary.push(book);
    addToBookShelf(book);

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookLanguage.value = "";
    bookRead.value = "";
    }
}

function addToBookShelf(object) {
    //CREATE CARDS
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("cards");
    //ADD TITLE TO CARD
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("card-title");
    const h2Title = document.createElement("h2");
    let newBookTitle = toTitleCase(bookTitle.value);
    h2Title.innerText = newBookTitle;
    titleDiv.appendChild(h2Title);
    cardDiv.appendChild(titleDiv);
    //ADD AUTHOR TO CARD
    const authorDiv = document.createElement("div");
    let newBookAuthor = toTitleCase(bookAuthor.value);
    authorDiv.innerText = newBookAuthor;
    authorDiv.classList.add("card-author");
    cardDiv.appendChild(authorDiv); 
    //ADD PAGE COUNT TO CARD
    const pageDiv = document.createElement("div");
    pageDiv.innerText = bookPages.value + " Pages";
    pageDiv.classList.add("card-pages");
    cardDiv.appendChild(pageDiv); 
    //ADD LANGUAGE TO CARD
    const languageDiv = document.createElement("div");
    let newBookLanguage = toTitleCase(bookLanguage.value);
    languageDiv.innerText = newBookLanguage;
    languageDiv.classList.add("card-language");
    cardDiv.appendChild(languageDiv);
    //ADD READ STATUS TO CARD
    const readDiv = document.createElement("div");
    readDiv.innerText = isBookRead;
    if (isBookRead === "Read") {
        readDiv.classList.add("read-it");
    } else if (isBookRead === "Not Read") {
        readDiv.classList.add("not-read-it");
    }
    cardDiv.appendChild(readDiv);
    //ADD TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    cardDiv.appendChild(trashButton);
    //ADD TO BOOKSHELF
    bookShelf.appendChild(cardDiv);
    totalBooksInLibrary();
    booksRead();
}

function editInLibrary(e) {
    const item = e.target;
    //REMOVE BOOK FROM LIBRARY
    if (item.classList[0] === "trash-btn") {
        const bookCard = item.parentElement;
        bookCard.remove();

        removeBookFromLibrary(bookCard);

        totalBooksInLibrary();
        booksRead();
    }
    //CHANGE READ STATUS OF BOOK
    if (item.classList[0] === "read-it") {
        item.innerText = "Not Read";
        item.classList.remove("read-it");
        item.classList.add("not-read-it");
        changeReadStatus(item);
        return;
    }
    if (item.classList[0] === "not-read-it") {
        item.innerText = "Read";
        item.classList.remove("not-read-it");
        item.classList.add("read-it"); 
        changeReadStatus(item);
    }
} 

function toTitleCase(string) {
    let newString = string.toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
    return newString;
}

function totalBooksInLibrary() {
    let totalLibrayBooks = myLibrary.length;
    totalBooks.innerText = totalLibrayBooks;
}

function booksRead() {
    let result = myLibrary.filter(x => x.read === "Not Read").length;
    totalNotRead.innerText = result;
    totalReadBooks.innerText = myLibrary.length - result;
}

function removeBookFromLibrary(bookCard) {
    let card = bookCard.children[0].innerText;
    myLibrary.splice(myLibrary.findIndex(x => x.title === card), 1);
    totalBooksInLibrary();
    booksRead();
}

function changeReadStatus(item) {
    let bookTitle = item.parentElement.children[0].innerText;
    let shelfSpace = myLibrary.findIndex(x => x.title === bookTitle);
    let updatedReadStatus = item.parentElement.children[4].innerText;
    myLibrary[shelfSpace]["read"] = updatedReadStatus;
    booksRead();
}