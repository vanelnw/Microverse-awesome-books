class Book {
  constructor(id, title, author) {
    this.id = id
      this.title = title
      this.author = author
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
    let id = this.id 
    
    // console.log(data)
    // console.log(data.get('title'))
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
    const newBooks = this.Books.filter(b => b.id !== id);
    this.Books = newBooks;
    document.querySelector(`#Book${id}`).remove();
    localStorage.setItem("awesomeBooks", JSON.stringify(this.Books));
  }

}

const MyLibrary = new Library(JSON.parse(localStorage.getItem("awesomeBooks")) || []);

console.log(MyLibrary);

let booksContent = document.querySelector(".books-content");
const form = document.getElementById("form");

// let awesomeBooks = JSON.parse(localStorage.getItem("awesomeBooks")) || [];


function displayBook(book) {
  booksContent.innerHTML += `
              <div class="single-book" id="Book${book.id}">
        <div class="title">${book.title} by ${book.author}</div>
        <button onclick="MyLibrary.removeBook(${book.id})">remove</button>
      </div>
          `;
}

function renderBooks() {
  MyLibrary.Books.forEach((book) => { displayBook(book);});
}

renderBooks();

// function addBook(event) {
//   event.preventDefault();

//   let id = 0;

//   if (MyLibrary.Books.length > 0) {
//     console.log(MyLibrary.Books.length);
//     id = MyLibrary.Books[MyLibrary.Books.length - 1].id + 1;
//   }

//   const title = document.getElementById("title").value;
//   const author = document.getElementById("author").value;

//   const book = {
//     id,
//     title,
//     author,
//   };

//   const book = new Book(id, title, author);

//   MyLibrary.addBook(book)
//   MyLibrary.addBookInLocalStorage();

//   displayBook(book);
//   awesomeBooks.push(book);

//  localStorage.setItem("awesomeBooks", JSON.stringify(MyLibrary.Books));

//   localStorage.setItem("awesomeBooks", JSON.stringify(awesomeBooks));
// }

// function removeBook(id) {
//   console.log(MyLibrary.Books);
//   MyLibrary.removeBook(id);
//   console.log(MyLibrary.Books)
//     console.log(id)
//   awesomeBooks = awesomeBooks.filter((book) => book.id != id);
//   document.querySelector(`#Book${id}`).remove();
//   localStorage.setItem("awesomeBooks", JSON.stringify(awesomeBooks));
// }

form.addEventListener("submit", (event) => {
  event.preventDefault();
  MyLibrary.addBook(new FormData(form));
})


  // MyLibrary.addBook(new FormData(form));