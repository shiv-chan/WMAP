//Create seat icons when the page is loaded.
window.addEventListener("DOMContentLoaded", addSeatIcons);

/**
 * Create and add seat icons
 */
function addSeatIcons() {
  const leftSide = document.querySelector(".left-side");
  const rightSide = document.querySelector(".right-side");
  const middle = document.querySelector(".middle");
  const rowSide = document.createElement("div");
  rowSide.classList.add("row");

  for (let i = 0; i < 6; i++) {
    leftSide.insertAdjacentHTML(
      "beforeend",
      '<div class="row"><div class="seat-icon"></div><div class="seat-icon"></div></div>'
    );
    rightSide.insertAdjacentHTML(
      "beforeend",
      '<div class="row"><div class="seat-icon"></div><div class="seat-icon"></div></div>'
    );
    middle.insertAdjacentHTML(
      "beforeend",
      '<div class="row"><div class="seat-icon"></div><div class="seat-icon"></div><div class="seat-icon"></div><div class="seat-icon"></div></div>'
    );
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
