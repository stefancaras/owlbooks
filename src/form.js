import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

let response;
const form = document.querySelector('.form');
const confirm = document.querySelector(".confirm");
const searchParams = new URLSearchParams(window.location.search);
const bookId = searchParams.get('id');
const bookURL = `https://632b4aa31090510116d6319b.mockapi.io/books`;
let book =  {
    "author": "",
    "book_image": "",
    "description": "",
    "price": "",
    "primary_isbn13": "",
    "publisher": "",
    "title": "",
    "genre": "",
    "stock": ""
};

const createForm = (book) => {
    return `<label>Title: </label>
            <input id="inputTitle" type="text" value='${book.title}' required>
            <label>Author: </label>
            <input id="inputAuthor" type="text" value='${book.author}' required>
            <label>Stock: </label>
            <input id="inputStock" type="number" value='${book.stock}' required>
            <label>Description: </label>
            <textarea id="inputDescription" rows="4" cols="50" required>${book.description}</textarea>
            <label>Book image URL: </label>
            <input id="inputImage" type="text" value='${book.book_image}' required>
            <label>Price: </label>
            <input id="inputPrice" type="number" value='${book.price}' required>
            <label>Publisher: </label>
            <input id="inputPublisher" type="text" value='${book.publisher}' required>
            <label>Genre: </label>
            <input id="inputGenre" type="text" value='${book.genre}' required>
            <label>ISBN13: </label>
            <input id="inputIsbn13" type="text" value='${book.primary_isbn13}' required>
            <div class="centerText">
                <button type="submit" class="greenBtn newBookBtn">
                    <i class="fa-solid fa-square-plus marginRight"></i>Add book
                </button>
                <button type="submit" class="yellowBtn updateBookBtn">
                    <i class="fa fa-refresh marginRight"></i>Update book
                </button>
            </div>`
};

const showForm = async () => {
	// Show loader
	form.style.display = 'none';
	document.querySelector('.loader').style.display = 'block';

	// Show book
    if (bookId) {
        const result = await fetch(`https://632b4aa31090510116d6319b.mockapi.io/books/${bookId}`);
        book = await result.json();
    }
    form.innerHTML = createForm(book);

    // Event listener for new book button and update book button
    document.querySelector('.newBookBtn').addEventListener('click', () => {
        if (form.checkValidity()) addOrEditBook(bookURL, "POST", "added")});
    document.querySelector('.updateBookBtn').addEventListener('click', () => {
        if (form.checkValidity()) addOrEditBook(`${bookURL}/${bookId}`, "PUT", "updated")});

	// Hide loader
	document.querySelector('.loader').style.display = 'none';
	form.style.display = 'flex';
};

window.addEventListener('DOMContentLoaded', showForm);

const addOrEditBook = async (URL, methodHTTP, msgConfirm) => {
	response = await fetch(URL, {
		method: methodHTTP,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			author: document.querySelector('#inputAuthor').value,
            book_image: document.querySelector('#inputImage').value,
            description: document.querySelector('#inputDescription').value,
            price: document.querySelector('#inputPrice').value,
            primary_isbn13: document.querySelector('#inputIsbn13').value,
            publisher: document.querySelector('#inputPublisher').value,
            title: document.querySelector('#inputTitle').value,
            genre: document.querySelector('#inputGenre').value.toLowerCase(),
            stock: document.querySelector('#inputStock').value,
		}),
	});
	let data = await response.json();
	console.log(msgConfirm, data);
    confirmMsg(msgConfirm);
}

const confirmMsg = (string) => {
    if (response.ok) {
        confirm.textContent = `The book has been ${string}.`
    } else {
        confirm.classList.add("redBg");
        confirm.textContent = "There was a problem, view console log."
    }
    confirm.style.display = "block";
    setTimeout(() => {confirm.style.display = "none"}, 1000);
}