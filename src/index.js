import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

const createCard = (book) => {
	return `<div class='card centerText'>
				<a href=${book.amazon_product_url} target="_blank"><img class="bookImage" src='${book.book_image}' /></a>
				<p class="capitalize blackText"><b>${book.title.toLowerCase()}</b></p>
				<p class="blackText">by ${book.author}</p>
				<div class="flexWrapCenter">
					<p class="greenText largeFont inline">$${book.price}</p>
					<a class="greenBtn marginLeft" href="details.html?id=${book.id}">
						<i class="fa fa-info-circle marginRight"></i>Details
					</a>
				</div>
          	</div>`;
};

const showBooks = async (property, value, price) => {
	scroll(0,0);
	// Show loader
	document.querySelector('.bookContainer').style.display = 'none';
	document.querySelector('.loader').style.display = 'block';
	// Fetch & filter books
	const result = await fetch(`https://632b4aa31090510116d6319b.mockapi.io/books`);
	const books = await result.json();
	let filteredBooks = books.filter((book) => book[property] === value);
	// Sort by price
	if (price === "priceup") {
		filteredBooks = filteredBooks.sort((a, b) => a.price - b.price);
	} else if (price === "pricedown") {
		filteredBooks = filteredBooks.sort((a, b) => b.price - a.price);
	}
	// Show books
	const bookCards = filteredBooks.map((book) => createCard(book));
	const cardString = bookCards.join('');
	document.querySelector('.bookContainer').innerHTML = cardString;
	// Hide loader
	document.querySelector('.loader').style.display = 'none';
	document.querySelector('.bookContainer').style.display = 'flex';
};

window.addEventListener('DOMContentLoaded', showBooks("genre", "fiction"));

document.querySelector("#sidebar").addEventListener('click', (event) => {
	const genreSelected = document.querySelector('input[name=genre]:checked').value;
	let priceSelected;
	if (document.querySelector('input[name=price]:checked') !== null) {
		priceSelected = document.querySelector('input[name=price]:checked').value;
	}
	if (event.target.classList.contains("radio")) {
		showBooks("genre", genreSelected, priceSelected);
	}
})