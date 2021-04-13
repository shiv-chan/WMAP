// EXERCISE NUMBER 6


let spaceship = {
  'Fuel Type' : 'Turbo Fuel',
  homePlanet : 'Earth'
};


//Write a function greenEnergy() that has an object as a parameter and sets that object’s 'Fuel Type' property to 'avocado oil'.
//Write a function remotelyDisable() that has an object as a parameter and sets (or reassigns) that object’s disabled property to true.
//Call your two functions with the spaceship object in the code editor, then console.log() the spaceship object to confirm those properties were changed/added.


function greenEnergy(obj) {
  obj['Fuel Type'] = 'avocado oil';
}

function remotelyDisable(obj) {
  obj.disabled = true;
}

greenEnergy(spaceship);
remotelyDisable(spaceship);

console.log(spaceship);

//*******************************************************

// EXERCISE NUMBER 7

let spaceship = {
    crew: {
    captain: { 
        name: 'Lily', 
        degree: 'Computer Engineering', 
        cheerTeam() { console.log('You got this!') } 
        },
    'chief officer': { 
        name: 'Dan', 
        degree: 'Aerospace Engineering', 
        agree() { console.log('I agree, captain!') } 
        },
    medic: { 
        name: 'Clementine', 
        degree: 'Physics', 
        announce() { console.log(`Jets on!`) } },
    translator: {
        name: 'Shauna', 
        degree: 'Conservation Science', 
        powerFuel() { console.log('The tank is full!') } 
        }
    }
}; 


//Using for...in, iterate through the spaceship.crew object in the code editor and console.log() a list of crew roles and names in the following format: '[crew member's role]: [crew member's name]', e.g.,'chief officer: Dan'.
//Using for...in, iterate through the spaceship.crew object in the code editor and console.log() a list of crew names and degrees in the following format: '[crew member's name]: [crew member's degree]', i.e.,'Lily: Computer Engineering'.

for(const crewMember in spaceship.crew) {
  let role = crewMember;
  let name = spaceship.crew[crewMember].name;
  console.log(`${role}: ${name}`);
}

for(const crewMember in spaceship.crew) {
  let name = spaceship.crew[crewMember].name;
  let degree = spaceship.crew[crewMember].degree;
  console.log(`${name}: ${degree}`);
}


// Let’s REVIEW what we learned in this lesson:

// Objects store collections of key-value pairs.
// Each key-value pair is a property—when a property is a function it is known as a method.
// An object literal is composed of comma-separated key-value pairs surrounded by curly braces.
// You can access, add or edit a property within an object by using dot notation or bracket notation.
// We can add methods to our object literals using key-value syntax with anonymous function expressions as values or by using the new ES6 method syntax.
// We can navigate complex, nested objects by chaining operators.
// Objects are mutable—we can change their properties even when they’re declared with const.
// Objects are passed by reference— when we make changes to an object passed into a function, those changes are permanent.
// We can iterate through objects using the For...in syntax.




// ADVANCED OBJECTS!!!!

// const robot = {
  
// };



// 1)Let’s create a new object to practice using this.

// In main.js there is an object robot, add a property of model and assign to it a value of '1E78V2'. Add another property, energyLevel and assign to it a value of 100.

robot.model = '1E78V2';
robot.energyLevel = 100;

console.log(robot);

// 2)Inside the robot object, add a method named provideInfo. Inside the body of provideInfo(), return the following string by using interpolation:

// I am MODEL and my current energy level is ENERGYLEVEL.  
// Replace ‘MODEL’ and ‘ENERGYLEVEL’ with the calling object’s model and energyLevel property. Remember, to get the access to the calling object’s properties inside a method, you have to use the this keyword!
robot.provideInfo = function() {
  return `I am ${this.model} and my current energy level is ${this.energyLevel}`;
}


// 3)Now to check .provideInfo() has access to the internal properties of robot. Log the result of calling .provideInfo() method on robot to the console.
console.log(robot.provideInfo());



//ARROW FUNCTION & 'THIS'

// const goat = {
//   dietType: 'herbivore',
//   makeSound() {
//     console.log('baaa');
//   },
//   diet: () => {
//     console.log(this.dietType);
//   }
// };
 
// goat.diet(); 
// Prints undefined!!!!!!!!!!

//So what happened? Notice that in the .diet() is defined using an arrow function.
//Arrow functions inherently bind, or tie, an already defined this value to the function itself that is NOT the calling object. In the code snippet above, the value of this is the global object, or an object that exists in the global scope, which doesn’t have a dietType property and therefore returns undefined.



//EXERCISE NUMBER 8

const robot = {
  energyLevel: 100,
  checkEnergy: () => {
    console.log(`Energy is currently at ${this.energyLevel}%.`)
  }
}

robot.checkEnergy();


// 1) Currently the .checkEnergy() method is not producing the correct output because it is using arrow function syntax.

// Refactor, or change, the method to use a function expression. You can write the function using either longhand or shorthand format.

robot.checkEnergy = function() {
  console.log(`Energy is currently at ${this.energyLevel}%.`);
}
// After refactoring the method, notice that .checkEnergy() has access to the other internal properties of the robot object.

robot.checkEnergy();






//EXERCISE NUMBER 9

// Here’s an example of using _ to prepend a property.

// const bankAccount = {
//   _amount: 1000
// }
// In the example above, the _amount is not intended to be directly manipulated.

// Even so, it is still possible to reassign _amount:

// bankAccount._amount = 1000000;






//*******************************************************
//*******************************************************
//*******************************************************
//*******************************************************




//GETTER METHODS

// const person = {
//   _firstName: 'John',
//   _lastName: 'Doe',
//   get fullName() {
//     if (this._firstName && this._lastName){
//       return `${this._firstName} ${this._lastName}`;
//     } else {
//       return 'Missing a first name or a last name.';
//     }
//   }
// }
 
// To call the getter method: 
// person.fullName; 
// 'John Doe'


//////////////////////////////
//GETTER EXAMPLE

const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  get energyLevel() {
    if(typeof this._energyLevel === 'number'){
      return `My current energy level is ${this._energyLevel}`;
    } else {
      return 'System malfunction: cannot retrieve energy level';
    }
  }
};

console.log(robot.energyLevel)

//1)In robot, create a getter method named energyLevel using the get keyword. Leave function body blank for now.

//2)Inside the getter method, add an if statement to check if this._energyLevel is a number using the typeof operator. If that condition is truthy, return 'My current energy level is ENERGYLEVEL'. Replace ENERGYLEVEL with the value of this._energyLevel.


//Make sure you return the string and not logging it to the console.


//3) If this._energyLevel isn’t a number it could be that the _energyLevel property was altered. Let’s add a default return statement for when such a scenario arises.

//Add an else statement that returns 'System malfunction: cannot retrieve energy level'.


//4) Log the result of calling the getter method energyLevel on robot to the console.

//Notice that the method will return a formatted response rather than just accessing a property!



//SETTER METHODS!!!!!!

//Along with getter methods, we can also create setter methods which reassign values of existing properties within an object. Let’s see an example of a setter method:

// const person = {
//   _age: 37,
//   set age(newAge){
//     if (typeof newAge === 'number'){
//       this._age = newAge;
//     } else {
//       console.log('You must assign a number to age');
//     }
//   }
// };



//EXAMPLE SETTERS
const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  _numOfSensors: 15,
  get numOfSensors(){
    if(typeof this._numOfSensors === 'number'){
      return this._numOfSensors;
    } else {
      return 'Sensors are currently down.'
    }
  },
  set numOfSensors(num){
    if(typeof num === 'number' && num >= 0){
      this._numOfSensors = num;
    } else {
      console.log('Pass in a number that is greater than or equal to 0');
    }
  }
  
};

robot.numOfSensors = 100;
console.log(robot.numOfSensors);


//1)Currently, in robot there is a getter method for numOfSensors but no setter method! What if we need to add or remove some sensors? Let’s fix that problem.
//Add a setter method named numOfSensors using the set keyword. Provide a parameter of num. Leave the function body empty for now.

//2)There are a couple of things we should do in the setter method:
// Add a check to see if num is a number using the typeof operator.
// num should also be greater than or equal to 0.
// If both conditions are met, reassign this._numOfSensors to num.

// Now add an else that logs 'Pass in a number that is greater than or equal to 0' to the console.
// Use the numOfSensors setter method on robot to assign _numOfSensors to 100.
// To check that the setter method worked, console.log() robot.numOfSensors.
