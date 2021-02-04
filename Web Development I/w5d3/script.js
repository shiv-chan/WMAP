// 1) Create a function that takes two numbers as arguments and return their sum.
function sum(x, y) {
	return x + y;
}

// 2)Create a function that takes a number as an argument, increments the number by +1 and returns the result.
function plusOne(num) {
	num++;
	return num;
}

// 3)Write a function that takes an integer minutes and converts it to seconds.
function toSeconds(min) {
	let num = parseInt(min);
	return num * 60;
}

// 4)Create a function that takes two numbers as arguments (num, length) and returns an array of multiples of num up to length.
function arrayOfMultiples(num, length) {
	let array = [];
	for (let i = 1; i <= length; i++) {
		array.push(num * i);
	}
	return array;
}

// 5)Write a function that converts an object into an array, where each element represents a key-value pair.
function toArray(obj) {
	let arr = [];
	let arrItems = Object.entries(obj);
	for (const item of arrItems) {
		arr.push(item);
	}
	return arr;
}
