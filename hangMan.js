function restartPhrase() {
  let newElement = document.createElement('h2');
  newElement.setAttribute('id', 'places');
  phraseAnchor.replaceChild(newElement, phraseAnchor.firstElementChild);
  for (let i = 0; i < phrase.length; ++i) {
    // TODO = consider doing this newElement.setAttribute('id', i);
    if (" " === phrase[i]) {
      phraseAnchor.firstElementChild.insertAdjacentHTML('beforeend',
        "<div class='horizontalAlign'><h2>&nbsp&nbsp</h2></div>");
    } else {
      phraseAnchor.firstElementChild.insertAdjacentHTML('beforeend',
        "<div class='horizontalAlign'><h2><u>&nbsp&nbsp</u></h2></div> ");
    }
  }
}

function restartWrongLetters() {
  let newElement = document.createElement('p');
  newElement.setAttribute('id', 'wrong');
  newElement.textContent = "-";
  wrongAnchor.replaceChild(newElement, wrongAnchor.lastElementChild);
}

function start() {
  console.log(phrase.join(""))
  restartPhrase();
  restartWrongLetters();
  pointsAnchor.lastChild.textContent = 0;
}

function change() {
  console.log('change phrase');
}

function hint() {
  console.log('hint');
  let index = Math.floor(Math.random() * phrase.length)
  console.log(index);
  if (" " !== phrase[index]){
    insertLetter(phrase[index]);
    updatePoints(-1);
  } 
  // else {
  //   hint();
  // }
}

function updatePoints(val) {
  console.log(pointsAnchor.textContent)
  console.log(pointsAnchor.lastChild.textContent)
  points += val;
  pointsAnchor.lastChild.textContent = points; //TODO
  console.log(pointsAnchor.lastChild.textContent)
}

function findAllIndices(input) {
  let arr = [];
  for (let i = 0; i < phrase.length; ++i) {
    if (input === phrase[i]) {
      arr.push(i);
    }
  }
  return arr;
}

function insertLetter(input) {
  let allI = findAllIndices(input);
  console.log('findAllIndices: '+allI)
  for (let i = 0; i < allI.length; ++i) {
    let index = allI[i];
    console.log("index: " + index)
    phraseAnchor.firstElementChild.children[index].firstChild.remove();
    phraseAnchor.firstElementChild.children[index].insertAdjacentHTML('beforeend',
    "<div class='horizontalAlign'><h2><u>" + input + "</u></h2></div>");
    // updatePoints(2);
  }
  
}

function letter() {
  let input = prompt('Give me a letter please');
  console.log("your letter is: " + input);
  let i = 0;
  let flag = false;
  // search the letter in the phrase
  while (i < phrase.length && !flag) {
    // if (correctArray.includes(i)){
    //   console.log('iiiiiiiii ' + i);
    //   ++i;
    // } else 
    if (phrase[i] === input) {
      flag = true;
    }
    ++i;
  }
  // see if phrase contains letter
  if (flag) {
    console.log('Correct Guess - Well Done!');
    alert('\n\n Correct Guess - Well Done! \n\n\n');
    insertLetter(input);
    updatePoints(2);
  } else {
    console.log('Wrong Guess - Try Again.');
    alert('\n\n Wrong Guess - Try Again. \n\n\n');
    wrongAnchor.lastElementChild.insertAdjacentHTML('afterbegin', '<i> - ' + input + ' </i>');
    updatePoints(-1)
  }
}

let phrase = "where is my mind".split('');
let phraseAnchor = document.getElementById('phrase');
let wrongAnchor = document.getElementById('wrong');
let pointsAnchor = document.getElementById('points');
let points = 5;