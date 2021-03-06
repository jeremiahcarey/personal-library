const libraryContainer = document.querySelector(".library-container");
const addBookBtn = document.querySelector("#add-book");
const clearAllBtn = document.querySelector("#clear-books");
const aboutBtn = document.querySelector("#about-project");
const aboutModal = document.querySelector("#about-project-modal");
const closeAboutModal = document.querySelector("#close-about-modal");
const addBookModal = document.querySelector("#add-book-modal");
const closeAddModal = document.querySelector("#close-add-modal");
const addBookForm = document.querySelector("#add-book-form");
const booksTotal = document.querySelector("#books-total");
const booksRead = document.querySelector("#books-read");
const pagesRead = document.querySelector("#pages-read");



let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

toggleRead = function (index) {
    if (myLibrary[index].read === "read") {
        myLibrary[index].read = "unread";
    } else {
        myLibrary[index].read = "read";
    }
}


const sumOfRead = function () {
    let sum = 0;
    myLibrary.forEach((book) => {
        if (book.read === "read") {
            sum += 1;
        }
    });
    return sum;
}

function saveLocal() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restoreLocalData() {
    if (!localStorage.myLibrary) {
        addBook("The Hobbit", "J.R.R. Tolkien", 304, "read");
        addBook("The Fellowship of the Ring", "J.R.R. Tolkien", 423, "unread");
        saveLocal();
        updateLibraryDisplay();
    } else {
        let localData = localStorage.getItem("myLibrary");
        localData = JSON.parse(localData);
        myLibrary = localData;
        updateLibraryDisplay();
    }
}

function updateLibraryDisplay() {
    booksTotal.innerText = `${myLibrary.length}`;
    booksRead.innerText = `${sumOfRead()}`;
    const sumOfPagesRead = myLibrary.reduce(function (acc, obj) {
        if (obj.read !== "read") {
            return acc;
        } else if (obj.read === "read") {
            return acc + obj.pages;
        }
    }, 0);
    pagesRead.innerText = `${sumOfPagesRead}`;
    libraryContainer.innerHTML = "";
    myLibrary.forEach(function (book, index) {
        let newCardMarkup = `
                <div class="book-card" data-index="${index}">
                <h1 class="book-title">${book.title}</h1>   
                <h2 class="book-author">${book.author}</h2>
                <p class="book-pages">${book.pages} pages</p>
            `;
        if (book.read === "read") {
            newCardMarkup += `
                <img src="img/closed-book.png" alt="closed book">
                <div class="card-bottom">
                <div class="hidden-help-div"> </div>
                <div class="read-wrapper">
                <span>Read   </span>
                <label class="switch">
                <input type="checkbox" checked>
                <span class="slider" data-index="${index}"></span>
                </label></div>
                <div class="delete-button"><img class="delete-card" src="img/trashbin.png" data-index="${index}"></div>
                </div>
                </div>
            `;
        } else {
            newCardMarkup += `
                <img src="img/open-book.png" alt="open book">
                <div class="card-bottom">
                <div class="hidden-help-div"> </div>
                <div class="read-wrapper">
                <span>Not read   </span>
                <label class="switch">
                <input type="checkbox">
                <span class="slider" data-index="${index}"></span>
                </label></div>
                <div class="delete-button"><img class="delete-card" src="img/trashbin.png" data-index="${index}"></div>
                </div>
                </div>
            `   }
        libraryContainer.innerHTML += newCardMarkup;

    })
}

addBookBtn.addEventListener("click", () => addBookModal.style.display = "block");
closeAddModal.addEventListener("click", () => addBookModal.style.display = "none");
aboutBtn.addEventListener("click", () => aboutModal.style.display = "block");
closeAboutModal.addEventListener("click", () => aboutModal.style.display = "none");

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newBookData = new FormData(addBookForm);
    const [title, author, pages, read] = [...newBookData.values()];
    myLibrary.push(new Book(title, author, parseInt(pages), read));
    updateLibraryDisplay();
    saveLocal();
    addBookForm.reset();
    addBookModal.style.display = "none";
});

clearAllBtn.addEventListener("click", () => {
    myLibrary.length = 0;
    localStorage.clear();
    updateLibraryDisplay();
});

libraryContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("slider")) {
        toggleRead(e.target.dataset.index);
        updateLibraryDisplay();
        saveLocal();
    } else if (e.target.classList.contains("delete-card")) {
        myLibrary.splice(e.target.dataset.index, 1);
        updateLibraryDisplay();
        saveLocal();
    }
});

restoreLocalData();