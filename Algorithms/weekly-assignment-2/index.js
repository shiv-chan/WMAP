//Create seat icons when the page is loaded.
window.addEventListener("DOMContentLoaded", addSeatIcons);

const NUM_ROWS = 6;

const SEAT_ICON_DIV = `<div class="seat-icon"></div>`;
const ROW_WITH_TWO_SEATS_DIV = `<div class="row">${SEAT_ICON_DIV}${SEAT_ICON_DIV}`;
const ROW_WITH_FOUR_SEATS_DIV = `<div class="row">${SEAT_ICON_DIV}${SEAT_ICON_DIV}${SEAT_ICON_DIV}${SEAT_ICON_DIV}`;

/**
 * Create and add seat icons
 */
function addSeatIcons() {
  // -- grab the elements --
  const leftSide = document.querySelector(".left-side");
  const rightSide = document.querySelector(".right-side");
  const middle = document.querySelector(".middle");

  // create a row div
  const rowSide = document.createElement("div");
  rowSide.classList.add("row");

  // add rows (subtract 1 because there's already one on the page)
  for (let i = 0; i < NUM_ROWS - 1; i++) {
    // TODO: try this instead?
    // leftSide.innerHTML = leftSide.innerHTML + `${ROW_WITH_TWO_SEATS_DIV}`

    leftSide.insertAdjacentHTML("beforeend", `${ROW_WITH_TWO_SEATS_DIV}</div>`);
    rightSide.insertAdjacentHTML(
      "beforeend",
      `${ROW_WITH_TWO_SEATS_DIV}</div>`
    );
    middle.insertAdjacentHTML("beforeend", `${ROW_WITH_FOUR_SEATS_DIV}</div>`);
  }

  const seatIcons = document.getElementsByClassName("seat-icon");

  //add unique id to all seats
  for (let i = 0; i < seatIcons.length; i++) {
    seatIcons[i].setAttribute("id", `${i}`);
  }

  const selectedNums = document.querySelector(".selected-nums");
  const sumPrice = document.querySelector(".sum-price");
  const dropdownList = document.querySelector("#movie");
  let displaySeatNum = 0;
  let displayPrice = 0;
  let occupiedIndex = JSON.parse(localStorage.getItem("selectedSeatsId")) || [];

  //Set occupied seats
  for (let index of occupiedIndex) {
    seatIcons[index].classList.add("occupied");
  }

  /**
   * Change the color when the icon's selected.
   * Increase the number of seats and a price.
   * Set a selected seats' id to the local storage.
   */
  function selectedIcon() {
    let price = parseInt(dropdownList.selectedOptions[0].dataset.price);
    let selectedSeatsId = this.getAttribute("id");
    this.classList.toggle("selected");

    if (this.classList.contains("selected")) {
      displaySeatNum++;
      displayPrice += price;
      occupiedIndex.push(selectedSeatsId);
    } else {
      displaySeatNum--;
      displayPrice -= price;
    }
    selectedNums.textContent = displaySeatNum;
    sumPrice.textContent = displayPrice;

    //deduplicate the selected seats id
    let dataStored = occupiedIndex.filter(
      (value, index, array) => array.indexOf(value) == index
    );
    localStorage.setItem("selectedSeatsId", JSON.stringify(dataStored));
  }

  /**
   * Reset all selected seats to n/a and the paragraph
   */
  function reset() {
    for (let i = 3; i < seatIcons.length; i++) {
      if (seatIcons[i].classList.contains("selected")) {
        seatIcons[i].classList.remove("selected");
      }
      displaySeatNum = 0;
      displayPrice = 0;
      selectedNums.textContent = displaySeatNum;
      sumPrice.textContent = displayPrice;
    }
  }

  //Seat icons clicked
  for (let i = 3; i < seatIcons.length; i++) {
    if (!seatIcons[i].classList.contains("occupied")) {
      seatIcons[i].addEventListener("click", selectedIcon);
    }
  }

  //Drop down list changed
  dropdownList.addEventListener("change", reset);
}
