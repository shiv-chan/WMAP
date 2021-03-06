let meal = [
	{
		name: 'Pizza',
		price: 14,
		popularity: 'high',
	},
	{
		name: 'Hamburger',
		price: 8,
		popularity: 'high',
	},
	{
		name: 'Meat Pasta',
		price: 10,
		popularity: 'average',
	},
];

const table = document.querySelector('table');
const updateBtn = document.getElementById('updateBtn');
const tableRows = document.getElementsByTagName('tr');
const dataItems = document.getElementsByTagName('td');
const submitBtn = document.getElementById('submitBtn');

//if there are tr elements, delete all.
// When iterating over an array and modifying it, start at the last index to avoid side effects to the current index position when you remove items
function removeDataItems(el){
  for(let i = el.length - 1; i > 0; i--){
    el[i].remove();
  }
}


function updateTable(arr) {
    removeDataItems(tableRows);
  for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement('tr');
		for (let key in arr[i]) {
			let td = document.createElement('td');
			td.innerHTML = arr[i][key];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

function hoverDatas(){
  for(let i = 0; i < dataItems.length; i++){
    dataItems[i].addEventListener('mouseover', function(){
      this.style.backgroundColor = "orangered";
    });
    dataItems[i].addEventListener('mouseout', function(){
      this.style.backgroundColor = "initial";
    });
  }
}


updateBtn.addEventListener('click', function(){
  updateTable(meal);
  hoverDatas();
});


submitBtn.addEventListener('click', function(){
  let nameInput = document.getElementById('name').value;
  let priceInput = document.getElementById('price').value;
  let popularityInput = document.getElementById('popularity').value;
  const obj = {};
  obj.name = nameInput;
  obj.price = priceInput;
  obj.popularity = popularityInput;
  meal.push(obj);
  alert(`You entered the following:\n・Name: ${nameInput}\n・Price: ${priceInput}\n・Popularity: ${popularityInput}`);
  document.mealForm.reset();
  updateTable(meal);
  hoverDatas();
});

