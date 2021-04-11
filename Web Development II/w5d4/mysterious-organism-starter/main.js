// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//create multiple object
const pAequorFactory = (num, dnaBaseArr) => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  let obj = {
    specimenNum: num,
    dna: dnaBaseArr,
    mutate : function(){
      const targetIndex = Math.floor(Math.random() * 15);
      let targetBase = this.dna[targetIndex]; //either A, T, C, G
      let dnaBaseIndex = dnaBases.indexOf(targetBase); //index num 0~3
      let randIndex = Math.floor(Math.random() * 4); //random num 0~3
      while(randIndex === dnaBaseIndex){
        randIndex = Math.floor(Math.random() * 4);
      }
      this.dna[targetIndex] = dnaBases[randIndex];
      return this.dna;
    },
    compareDNA : function(pAequor){
      //compare this.dna and pAequor
      let numsOfMatch = 0;
      for(let i = 0; i < 15; i++){
        if(this.dna[i] === pAequor.dna[i]) numsOfMatch++;
      }
      let percent = Math.floor(numsOfMatch / 15 * 100);
      console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percent}% DNA in common.`)
    },
    willLikelySurvive : function(){
      let numOfCG = 0;
      this.dna.map(base => {
        if(base === 'C' || base === 'G') numOfCG++;
      });
      let cgContains = numOfCG / 15;
      return cgContains >= 0.6 ? true : false;
    }
  }
  return obj;
}


//create and store 30 instance of pAequor that can survive
const survival_pAequor = [];
let specimenNum = 1;
while(survival_pAequor.length < 30){
  let instance = pAequorFactory(specimenNum, mockUpStrand());
  
  //check the instance could survive
  let canSurvive = instance.willLikelySurvive();
  if(canSurvive == true) {
    survival_pAequor.push(instance);
    specimenNum++;
  };
}

console.log(survival_pAequor);

//TEST FOR FUNCTIONS
/*
const ex1 = pAequorFactory(1, mockUpStrand());
const ex2 = pAequorFactory(2, mockUpStrand());
console.log(ex1.dna);
console.log(ex1.mutate());
ex1.compareDNA(ex2);
console.log(ex1.willLikelySurvive());
*/