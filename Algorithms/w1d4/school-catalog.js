class School {
  constructor(name, level, numberOfStudents){
    this._name = name;
    this._level = level;
    this._numberOfStudents = numberOfStudents;
  }

  get name(){
    return this._name;
  }
  get level(){
    return this._level;
  }
  get numberOfStudents(){
    return this._numberOfStudents;
  }
  
  set numberOfStudent(num){
    if(isNaN(num)){
      this._numberOfStudents = num;
    } else {
      console.log('Invalid input: numberOfStudents must be set to a Number.');
    }
  }

  quickFacts(){
    console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this._level} school level.`);
  }

  static pickSubstituteTeacher(substituteTeachers){
    let randIndex = Math.floor(Math.random() * substituteTeachers.length);
    return substituteTeachers[randIndex];
  }
}


class Primary extends School {
  constructor(name, numberOfStudents, pickupPolicy){
    super(name, 'primary', numberOfStudents);
    this._pickupPolicy = pickupPolicy;
  }

  get pickupPolicy(){
    return this._pickupPolicy;
  }
}


class High extends School {
  constructor(name, numberOfStudents, sportsTeams = []){
    super(name, 'high', numberOfStudents);
    this._sportsTeams = sportsTeams;
  }

  get sportsTeams(){
    for(let sportsTeam of this._sportsTeams){
      console.log(sportsTeam);
    }
  }
}

class Middle extends School {}

/* PRIMARY
const  lorraineHansbury = new Primary('Lorraine Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13.');

lorraineHansbury.quickFacts();

const substituteTeachers = ['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli'];
console.log(School.pickSubstituteTeacher(substituteTeachers));
*/

/* HIGH SCHOOL
const alSmith = new High('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);
alSmith.sportsTeams;
*/