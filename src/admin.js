import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

let books;
const booksURL = 'https://632b4aa31090510116d6319b.mockapi.io/books';
const loader = document.querySelector('.loader')
const tableDiv = document.querySelector('.tableDiv');

tableDiv.addEventListener('click', (e) => {
	if (e.target.classList.contains("remove")) {
		const bookId = e.target.getAttribute('data-product-id');
		removeBook(bookId);
	}
});

const createTable = () => {
	document.querySelector('.tableDiv').innerHTML = `
		<table class="table">
			<tr>
				<th>Image</th>
				<th>Title</th>
				<th>Author</th>
				<th>Genre</th>
				<th>Stock</th>
				<th>Price</th>
				<th>Id</th>
				<th>Edit</th>
				<th>Remove</th>
			</tr>
		</table>`;
	const table = document.querySelector('.table');
	books.forEach(book => {
		let row = table.insertRow(1);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		let cell6 = row.insertCell(5);
		let cell7 = row.insertCell(6);
		let cell8 = row.insertCell(7);
		let cell9 = row.insertCell(8);
		cell1.innerHTML = `<a href="details.html?id=${book.id}">
			<img class="cartImg" src=${book.book_image}></img></a>`;
		cell2.textContent = book.title.toLowerCase();
		cell3.textContent = book.author;
		cell4.textContent = book.genre;
		cell5.textContent = book.stock;
		cell6.innerHTML = `<p class="greenText">$${book.price}</p>`;
		cell7.textContent = book.id;
		cell8.innerHTML = `<a href="form.html?id=${book.id}" class="yellowBtn edit" 
			data-product-id=${book.id} target="_blank">
			<i class="fa-solid fa-pen-to-square marginRight edit" data-product-id=${book.id}></i>Edit</a>`;
		cell9.innerHTML = `<a class="redBtn remove" data-product-id=${book.id}>
			<i class="fa-solid fa-trash marginRight remove" data-product-id=${book.id}></i>Remove</a>`;
	});
};

const showBooks = async () => {
	// Show loader
	tableDiv.style.display = 'none';
	loader.style.display = 'block';

	// Show books
	const result = await fetch(booksURL);
	books = await result.json();
	createTable();

	// Hide loader
	loader.style.display = 'none';
	tableDiv.style.display = 'block';
};

window.addEventListener('DOMContentLoaded', showBooks);

const removeBook = async (bookId) => {
	// Show loader
	tableDiv.style.display = 'none';
	loader.style.display = 'block';

	// Remove book
	let response = await fetch(`${booksURL}/${bookId}`, {method: 'DELETE'});
	console.log(response);
	showBooks();
}