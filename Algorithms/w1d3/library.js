class Media {
  constructor(title){
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  //getter
  get title(){
    return this._title;
  }
  get isCheckedOut(){
    return this._isCheckedOut;
  }
  get ratings(){
    return this._ratings;
  }

  //method
  toggleCheckOutStatus(){
    this._isCheckedOut = !this._isCheckedOut;
  }

  getAverageRating(){
    let sum = this._ratings.reduce((accum, value) => accum + value);
    return (sum / this._ratings.length).toFixed(2);
  }

  addRating(rating){
    if(rating > 0 && rating < 6){
      this._ratings.push(rating);
    } else {
      console.log(`Please put the rating from 1 to 5.`);
    }
  }

  //setter
  set isCheckedOut(status){
    this._isCheckedOut = status;
  }
}


class Book extends Media {
  constructor(author, title, pages){
    super(title);
    this._author = author;
    this._pages = pages;
  }

  //getter
  get author(){
    return this._author;
  }
  get pages(){
    return this._pages;
  }
}


class Movie extends Media {
  constructor(director, title, runTime){
    super(title);
    this._director = director;
    this._runTime = runTime;
  }

  //getter
  get director(){
    return this._director;
  }
  get runTime(){
    return this._runTime;
  }
}


class CD extends Media {
  constructor(artist, title, songs){
    super(title);
    this._artist = artist;
    this._songs = songs;
  }

  //getter
  get artist(){
    return this._artist;
  }
  get songs(){
    return this._songs;
  }

  shuffle(){
    //fisher-yates algorithm
    for(let i = this._songs.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this._songs[i];
      this._songs[i] = this._songs[j];
      this._songs[j] = temp;
    }
    return this._songs;
  }
}

class Catalog {
  constructor() {
    this._all = [];
  }

  addItem(instance){
    this._all.push(instance);
  }

  get getAll(){
    return this._all;
  }
}

//TEST
/* BOOK
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
console.log(historyOfEverything)
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);

historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);

const averageRate = historyOfEverything.getAverageRating();
console.log(averageRate);
*/

/* MOVIE
const speed = new Movie('Jan de Bont', 'Speed', 116);
speed.toggleCheckOutStatus();
console.log(speed.isCheckedOut);

speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
const averageRate = speed.getAverageRating();
console.log(averageRate);
*/

/* CD
const letGo = new CD('Avril Lavigne', 'Let Go', ['Losing Grip', 'Complicated', 'Sk8er Boi', 'I\'m with You']);
console.log(letGo);
console.log(letGo.shuffle());
*/

/* CATALOG
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
const speed = new Movie('Jan de Bont', 'Speed', 116);
const frozen = new Movie('Chris Buck, Jennifer Lee, Stevie Wermers, Kevin Deters', 'Frozen', 109);
const letGo = new CD('Avril Lavigne', 'Let Go', ['Losing Grip', 'Complicated', 'Sk8er Boi', 'I\'m with You']);

const all = new Catalog();
all.addItem(historyOfEverything);
all.addItem(speed);
all.addItem(frozen);
all.addItem(letGo);

console.log(all.getAll);
*/
