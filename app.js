const libraryContainer = document.querySelector(".library-container")
const addBookBtn = document.querySelector("#add-book");
const addBookModal = document.querySelector("#add-book-modal");
const closeAddModal = document.querySelector("#close-add-modal");
const addBookForm = document.querySelector("#add-book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");

const reviewInput = document.querySelector("#review");



let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 304,
        read: "read",
        review: "Loved It",
    },
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        pages: 423,
        read: "unread",
        review: "Liked It",
    }
];


function Book(title, author, pages, read, review) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.review = review;
}



function addBook(title, author, pages, read, review) {
    myLibrary.push(new Book(title, author, pages, read, review));
}


function updateLibraryDisplay() {
    libraryContainer.innerHTML = "";
    myLibrary
        .slice()
        .reverse()
        .forEach(function (book, index) {
            let newCardMarkup = `
                <div class="book-card" data-index="${index}">
                <h1 class="book-title">${book.title}</h1>
                <h2 class="book-author">${book.author}</h2>
                <p class="book-pages">${book.pages} pages</p>
            `;
            if (book.read === "read") {
                newCardMarkup += `
                <img src="img/closed-book.png" alt="closed book">
                <p class="book-review">${book.review}</p>
                <p class="book-read">Read</p>  
                </div>
            `;
            } else {
                newCardMarkup += `
                <img src="img/open-book.png" alt="open book">
                <p class="book-review">${book.review}</p>
                <p class="book-read">Unread</p>  
                </div>
            `}
            libraryContainer.innerHTML += newCardMarkup;
        })
}

updateLibraryDisplay();

addBookBtn.addEventListener("click", () => addBookModal.style.display = "block");
closeAddModal.addEventListener("click", () => addBookModal.style.display = "none");
addBookForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const readInput = document.querySelector("input[name=read]:checked");
    myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value, reviewInput.value));
    updateLibraryDisplay();
    addBookForm.reset();
    addBookModal.style.display = "none";
});

