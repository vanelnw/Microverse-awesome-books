let booksContent = document.querySelector(".books-content");
const form = document.getElementById("form");

let awesomeBooks = JSON.parse(localStorage.getItem("awesomeBooks")) || [];

let id = 0;

function renderBooks() {
  awesomeBooks.forEach((book) => {
    booksContent.innerHTML += `
            <div class="single-book" id="Book${book.id}">
      <div class="title">${book.title}</div>
      <div class="author">${book.author}</div>
      <button onclick="removeBook(${book.id})">remove</button>
    </div>
        `;
  });
}

renderBooks();

function addBook(event) {
  event.preventDefault();

  if (awesomeBooks.length > 0) {
    id = awesomeBooks[awesomeBooks.length - 1].id + 1;
  }

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  const book = {
    id,
    title,
    author,
  };

  awesomeBooks.push(book);

  booksContent.innerHTML += `
              <div class="single-book" id="Book${book.id}">
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <button onclick="removeBook(${book.id})">remove</button>
      </div>
          `;

  localStorage.setItem("awesomeBooks", JSON.stringify(awesomeBooks));
}

function removeBook(id) {
    console.log(id)
  awesomeBooks = awesomeBooks.filter((book) => book.id != id);
  document.querySelector(`#Book${id}`).remove();
  localStorage.setItem("awesomeBooks", JSON.stringify(awesomeBooks));
}

form.addEventListener("submit", addBook);
