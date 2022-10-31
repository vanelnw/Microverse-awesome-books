class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Library {
  #id = 0;
  constructor(Books) {
    this.Books = Books;
  }

  // get Books() {
  //   return this._Books
  // }

  addBook(data) {
    let id = this.id;
    const book = new Book(id, data.get("title"), data.get("author"));
    this.Books.push(book);
    this.addBookInLocalStorage();
    displayBook(book);
    this.id++;
  }

  addBookInLocalStorage() {
    localStorage.setItem("awesomeBooks", JSON.stringify(this.Books));
  }

  removeBook(id) {
    const newBooks = this.Books.filter((b) => b.id !== id);
    this.Books = newBooks;
    document.querySelector(`#Book${id}`).remove();
    localStorage.setItem("awesomeBooks", JSON.stringify(this.Books));
  }
}

const MyLibrary = new Library(
  JSON.parse(localStorage.getItem("awesomeBooks")) || []
);

let booksContent = document.querySelector(".books-content");
const form = document.getElementById("form");
const navLi = document.querySelectorAll("nav ul li");
const sections = document.querySelectorAll("section");

function displayBook(book) {
  booksContent.innerHTML += `
              <div class="single-book" id="Book${book.id}">
        <div class="title">${book.title} by ${book.author}</div>
        <button onclick="MyLibrary.removeBook(${book.id})">remove</button>
      </div>
          `;
}

function renderBooks() {
  MyLibrary.Books.forEach((book) => {
    displayBook(book);
  });
}

renderBooks();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  MyLibrary.addBook(new FormData(form));
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains('nav-link')) {
    navLi.forEach((li) => {
      li.classList.remove("active");
      e.target.parentNode.classList.add("active");
    });

     sections.forEach((section) => {
       section.classList = "hide-section";

       if (e.target.getAttribute("id").includes(section.getAttribute("id"))) {
         section.classList = "show-section";
       }
     });
  }
});

function setCurrentTime() {
  const n = new Date();
  const y = n.getFullYear();
  const m = n.toLocaleString("default", { month: "long" });
  const d = n.getDate();

  const h = n.getHours();
  let mm = n.getMinutes();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  let s = n.getSeconds();
  if (s < 10) {
    s = `0${s}`;
  }

  document.querySelector(
    "#date_time"
  ).textContent = `${m} ${d}th ${y}, ${h}:${mm}:${s}`;
}

setInterval(() => {
  setCurrentTime();
}, 1000);