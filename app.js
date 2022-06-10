
const libraryContainer = document.querySelector(".library-container")
let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 304,
        read: true,
        review: "Loved It",
    },
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        pages: 423,
        read: true,
        review: "Loved It",
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
    myLibrary.forEach(function (book, index) {
        const newCardMarkupRead = `
<div class="book-card" data-index="${index}">
<h1 class="book-title">${book.title}</h1>
<h2 class="book-author">${book.author}</h2>
<p class="book-pages">${book.pages} pages</p>
<img src="img/closed-book.png" alt="closed book">
<p class="book-review">${book.review}</p>
<p class="book-read">Read</p>  
</div>
`;
        libraryContainer.innerHTML += newCardMarkupRead;
    })
}

updateLibraryDisplay();


