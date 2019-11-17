const ulDataList = document.querySelector('#ul-leaderbord-data-sheet');
const classList = [];
const playerArrayList = [];

const myStorage = Window.localStorage;
let parsedJSONdata = JSON.parse(localStorage.getItem('items'));

checkTopPlayerPerClass();
determineRanking();


function renderPlayerList(array) {
  let count=1;
  if(array) {
    for(let item of array) {
      const liDataList = document.createElement('li');
      liDataList.classList = "li-data";
      const ul = document.createElement('ul');
      ul.innerHTML = `
          <li class="li-rank">${count}</li>
          <li class="li-memberName">${item.name}</li>
          <li class="li-scores">${item.score}</li>
          <li class="li-class">${(item.class)}</li>
          <li class="li-datePlayed">${item.datePlayed}</li>
      `;
      liDataList.appendChild(ul);
      ulDataList.appendChild(liDataList);
      count++;
    }
  }
}

function determineRanking() {
  playerArrayList.sort(function(a, b){return b.score - a.score;});
  renderPlayerList(playerArrayList);
}
function determineTopPlayerPerClass(className) {
  let newArray =  parsedJSONdata
    .filter((item) => {
      return item.class == className;
    })
  return newArray[0];
}

function checkTopPlayerPerClass() {
  for(let item of parsedJSONdata) {
    if(classList.includes(item.class))
      continue;
    else {
      classList.push(item.class);
      let player = determineTopPlayerPerClass(item.class);
      playerArrayList.push(player);
    }
  }
}

