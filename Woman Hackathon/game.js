
const submit = document.querySelector('#submit');
const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const inputMemberName = document.querySelector('.memberName');
const popup = document.querySelector('.popup');
const spanScore = document.querySelector('#score');
const inputClassName = document.querySelector('.className');

const myStorage = Window.localStorage;
let parsedJSONdata = JSON.parse(localStorage.getItem('items'));
const localLeaderboardArray = [];
const globalLeaderboardArray = [];
//assume that score is just a random number
let score = Math.floor(Math.random() * 1500) + 500;

submit.addEventListener('click', function() {
  var popup = document.querySelector('.popup');
  popup.classList.toggle('show');
  spanScore.textContent = score;
})

save.addEventListener('click', function() {
  let memberName = inputMemberName.value;
  let className = inputClassName.value;
  if(!memberName)
    memberName = "Player";
  if(!className)
    className = "No class";

  let stats = {
    name: memberName,
    class: className,
    score: score,
    datePlayed: new Date().toDateString()
  }
  localLeaderboardArray.push(stats);
  
  if(parsedJSONdata) {
    parsedJSONdata.push(stats);
  }
  else {
    parsedJSONdata = localLeaderboardArray;
  }
  localStorage.setItem('items', JSON.stringify(parsedJSONdata));
  window.location.href = "localLeaderboard.html";
})

cancel.addEventListener('click', function() {
  var popup = document.querySelector('.popup');
  popup.classList.toggle('hidden');
})