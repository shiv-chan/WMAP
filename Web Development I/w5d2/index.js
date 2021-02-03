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
const dataItems = document.getElementsByTagName('td');
const submitBtn = document.getElementById('submitBtn');


function updateTable(arr) {
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


updateBtn.addEventListener('click', function(){
  updateTable(meal);
  for(let i = 0; i < dataItems.length; i++){
    dataItems[i].addEventListener('mouseover', function(){
      this.style.backgroundColor = "orangered";
    });
    dataItems[i].addEventListener('mouseout', function(){
      this.style.backgroundColor = "initial";
    });
  }
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
});

