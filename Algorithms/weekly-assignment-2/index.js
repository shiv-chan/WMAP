//create seat icons when the page is loaded.
window.addEventListener('DOMContentLoaded', addSeatIcons);

/**
 * Create seat icons
 */
function addSeatIcons() {
	const leftSide = document.querySelector('.left-side');
	const rightSide = document.querySelector('.right-side');
	const middle = document.querySelector('.middle');
	const rowSide = document.createElement('div');
	rowSide.classList.add('row');

	for (let i = 0; i < 6; i++) {
		leftSide.insertAdjacentHTML(
			'beforeend',
			'<div class="row"><div class="seat-icon"></div><div class="seat-icon"></div></div>'
		);
		rightSide.insertAdjacentHTML(
			'beforeend',
			'<div class="row"><div class="seat-icon"></div><div class="seat-icon"></div></div>'
		);
		middle.insertAdjacentHTML(
			'beforeend',
			'<div class="row"><div class="seat-icon"></div><div class="seat-icon"></div><div class="seat-icon"></div><div class="seat-icon"></div></div>'
		);
	}
}

const seatIcons = document.getElementsByClassName('seat-icon');
const selectedNums = document.getElementsByClassName('selected-nums');
const sumPrice = document.getElementsByClassName('sum-price');

/**
 * Change the color when the icon's selected.
 * Increase the number of seats and a price.
 */
function selectedIcon() {
	this.classList.toggle('selected');
}

for (let i = 3; i < seatIcons.length; i++) {
	seatIcons[i].addEventListener('click', selectedIcon);
}
