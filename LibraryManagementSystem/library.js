let users = [];
let currentUser = null


// REGISTER A USER
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const id = document.getElementById('register-id').value;
    const password = document.getElementById('register-password').value;
    const existingUser = users.includes(name)
    if (!name || !id || !password ) {
      alert("Enter your details please")
      return;
    } if (existingUser === true) {
      alert ("User already exist")
      console.log(existingUser);
      return;
    } else {
      users.push({ name, id, password });
      alert('User registered successfully!');
    }
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('login-section').style.display = 'block';
    console.log(users)
});  

// LOGIN A USER
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;
    const user = users.find((user) => user.id === id && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        document.getElementById('borrow-section').style.display = 'block';
        document.getElementById('add-section').style.display = 'block';
        document.getElementById('return-section').style.display = 'block';
        alert('Login successful!');
    } else {
        alert('Invalid ID or password!');
    }
    console.log(`${id} Successfully logged in...`);
    console.log(users);
});

// BORROW A BOOK
document.getElementById('borrow-book-form').addEventListener('submit', (e) => {
    if (!currentUser) {
        alert('You must be logged in to borrow a book!');
        return;
    }  e.preventDefault();
    const isbn = document.getElementById('isbn').value;
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
        // Add book to user's borrowed books list
        currentUser.borrowedBooks = currentUser.borrowedBooks || [];
        currentUser.borrowedBooks.push(book);
        alert(`You have borrowed ${book.title} by ${book.author}!`);
        console.log(`You have successfully borrowed: ${book.title}`)
    } else {
        alert('Book not found!');
    }
});

// RETURN A BOOK
document.getElementById('return-book-form').addEventListener('submit', (e) => {
  if (!currentUser) {
    alert('You must be logged in to return a book!');
    return;
  }
  e.preventDefault();
  const isbn = document.getElementById('return-isbn').value;
  const book = currentUser.borrowedBooks.find((book) => book.isbn === isbn);
  if (book) {
    // Remove book from user's borrowed books list
    const index = currentUser.borrowedBooks.indexOf(book);
    currentUser.borrowedBooks.splice(index, 1);
    alert(`You have returned ${book.title} by ${book.author}!`);
    console.log(`You have returned ${book.title} by ${book.author}!`);
  } else if (isbn != books.find(books.isbn)) {
    alert ("Invalid Book");
  }else {
    alert('You do not have this book borrowed!');
  }
  document.getElementById('isbn').value = '';
});

// ADD A BOOK
document.getElementById('add-book-form').addEventListener('submit', (e) => {
    if (!currentUser) {
        alert('You must be logged in to add a book!');
        return;
    }
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('add-isbn').value;
    books.push({ title, author, isbn });
    document.getElementById('book-list').innerHTML += `<li>${title} by ${author} (ISBN: ${isbn})</li>`;
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    alert("You have successfully added a new book")
    console.log(`${title} has been added to book list`)
    
});

// DISPLAY LIST OF BOOKS
let books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565" },
    { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780486280511" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769174" },
    { title: "1984", author: "George Orwell", isbn: "9780451524935" },
    // Add more books to the list...
  ];

  document.addEventListener("DOMContentLoaded", function() {
    const bookListElement = document.getElementById("book-list");
    books.forEach((book) => {
      const bookListItem = document.createElement("li");
      bookListItem.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;
      bookListElement.appendChild(bookListItem);
      console.log(book)
    });
  });