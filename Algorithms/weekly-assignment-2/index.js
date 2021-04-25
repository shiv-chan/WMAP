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
  createSeatIcons();

  // grab the seat icons (which are now inserted)

  const seatIcons = giveAllSeatsUniqueId();

  // display the number of the selected seats & price in a sentence at the bottom

  const selectedNums = document.querySelector(".selected-nums");
  const sumPrice = document.querySelector(".sum-price");
  const dropdownList = document.querySelector("#movie");

  // initialize variables we'll display
  let displaySeatNum = 0;
  let displayPrice = 0;

  let occupiedIndicesArray =
    JSON.parse(localStorage.getItem("selectedSeatId")) || [];

  findAndShowOccupiedSeats(seatIcons, occupiedIndicesArray);

  /**
   * Change the color when the icon's selected.
   * Increase the number of seats and a price.
   * Set a selected seats' id to the local storage.
   */
  function handleClickIcon() {
    // get the price from the dropdown
    let price = parseInt(dropdownList.selectedOptions[0].dataset.price);

    let selectedSeatId = this.getAttribute("id");

    this.classList.toggle("selected");

    const areWeSelecting = this.classList.contains("selected");

    if (areWeSelecting) {
      // update the number of seats, price,
      displaySeatNum++;
      displayPrice += price;
      // add it to the list if it's not already in there
      if (!occupiedIndicesArray.includes(selectedSeatId)) {
        occupiedIndicesArray.push(selectedSeatId);
      }
    } else {
      // if we're deselecting, update the number of seats, price
      displaySeatNum--;
      displayPrice -= price;
      // remove it from the array
      if (occupiedIndicesArray.includes(selectedSeatId)) {
        occupiedIndicesArray = occupiedIndicesArray.filter(
          (seatId) => seatId !== selectedSeatId
        );
      }
    }

    // updating the display values with the new values
    selectedNums.textContent = displaySeatNum;
    sumPrice.textContent = displayPrice;

    // deduplicate the selected seats id because...
    // if you click the same seat, we'll add it to the array and we'll get e.g. [1,2,3,3,3,3,...]
    // ? this might be fine without -  fixed on line 56?
    let dataStored = occupiedIndicesArray.filter(
      (value, index, array) => array.indexOf(value) == index
    );
    localStorage.setItem("selectedSeatId", JSON.stringify(dataStored));
  }

  const NUM_HEADER_SECTION_ICONS = 3;

  /**
   * Reset all selected seats to n/a and the paragraph
   */
  function reset() {
    for (let i = NUM_HEADER_SECTION_ICONS; i < seatIcons.length; i++) {
      if (seatIcons[i].classList.contains("selected")) {
        seatIcons[i].classList.remove("selected");
      }
      displaySeatNum = 0;
      displayPrice = 0;
      selectedNums.textContent = displaySeatNum;
      sumPrice.textContent = displayPrice;
    }
  }

  // add click handlers to seat icons
  for (let i = NUM_HEADER_SECTION_ICONS; i < seatIcons.length; i++) {
    if (!seatIcons[i].classList.contains("occupied")) {
      seatIcons[i].addEventListener("click", handleClickIcon);
    }
  }

  // add Drop down list changed handler
  dropdownList.addEventListener("change", reset);
}

function findAndShowOccupiedSeats(seatIcons, occupiedIndicesArray) {
  // Set occupied seats
  for (let index of occupiedIndicesArray) {
    seatIcons[index].classList.add("occupied");
  }
}

function giveAllSeatsUniqueId() {
  const seatIcons = document.getElementsByClassName("seat-icon");

  // ? do we need to do this if we can already loop through them??
  // add unique id to all seats
  Array.from(seatIcons).forEach((seatIcon, idx) => {
    seatIcon.setAttribute("id", `${idx}`);
  });
  return seatIcons;
}

function createSeatIcons() {
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
}
