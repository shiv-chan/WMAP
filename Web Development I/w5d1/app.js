// 1) Write a JavaScript program that capitalizes all the letters in a given string.
function allCaps(str) {
	console.log(str.toUpperCase());
}

allCaps('hello world!');

// 2) Write a JavaScript program where the program takes a random integer between 1 to 10, the user is then prompted to input a guess number. If the user input matches with guess number, the program will display a message "Good Work" otherwise display a message "Not matched".

function guessNum() {
	var guess = prompt(
		'Guess the integer between 1 to 10.',
		'Enter your guessing integer here.'
	); //return as string.
	var num = Math.floor(Math.random() * 10 + 1);
	if (guess == num) {
		alert('Good Work');
	} else {
		alert('Not matched');
	}
}

guessNum();

// 3) Write a JavaScript program to replace all the numbers with a specified number of a given array of integers.
var nums = [1, 2, 3, 3, 5, 3];

function replaceNums(arr, oldNum, newNum) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === oldNum) {
			arr[i] = newNum;
		}
	}
	console.log(arr);
}

replaceNums(nums, 3, 8);

// 4) Write a JavaScript program that sorts a given array.
var ranNum = [1, 4, 7, 2, 5, 6, 9, 3, 8, 0];

console.log(ranNum.sort());

// 5) Write a JavaScript program that reverses a given array
console.log(ranNum.reverse());

// 6) Create an array “customer” objects. Each customer object should have at least 3 fields: “name”, “email”, “order”. Create at least 3 such objects.
var customer = [
	{
		name: 'Jane Doe',
		email: 'jdoe@email.com',
		order: 3,
	},
	{
		name: 'John Doe',
		email: 'johnd@email.com',
		order: 10,
	},
	{
		name: 'Sue Smith',
		email: 'ss@email.com',
		order: 5,
	},
];

// 7) Filter the customers array to show the customer with the most expensive order.
function loyalCustomer(arr) {
	var orders = [];
	for (let i = 0; i < arr.length; i++) {
		orders.push(arr[i].order);
	}
	console.log(Math.max(...orders));
}

loyalCustomer(customer);

// 8) Write a JavaScript program to find the area of a triangle where lengths of the three of its sides are 5, 6, 7.
// Heron's formula
function heron(a, b, c) {
	var s = (a + b + c) / 2;
	var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
	console.log(area);
}

// heron(5, 6, 7);

// 9) Write a JavaScript program to compute the sum of cubes of all integer from 1 to a given integer.
function sumOfCubes(int) {
	var sum = 0;
	for (let i = 1; i <= int; i++) {
		sum += Math.pow(i, 3);
	}
	console.log(sum);
}

// sumOfCubes(3);
