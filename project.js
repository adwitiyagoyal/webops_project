
const card1 = document.querySelectorAll('.card1');
const card2 = document.querySelectorAll('.front');
const card3 = document.querySelectorAll('.back');
const likeButtons = document.querySelectorAll('.like-button');
const favoriteList = document.querySelector('#favorite-list');
const favoriteList1 = document.querySelector('#favorite-list1');

let audio = new Audio("tone.mp4");

function flipcard(i) {
    card1[i].classList.toggle("flipcard");
    audio.play();
}


//joke
async function getjoke1(i) {
    const jokeData = await fetch("https://official-joke-api.appspot.com/random_joke", {
        headers: {
            'Accept': 'application/json'
        }
    });
    const jokeobj = await jokeData.json();
    card2[i].innerHTML = jokeobj.setup + jokeobj.punchline;
}
//Quote
async function getquote(i) {
    const quoteData = await fetch("https://api.quotable.io/random", {
        headers: {
            'Accept': 'application/json'
        }
    });
    const quoteobj = await quoteData.json();
    card3[i].innerHTML = quoteobj.content + quoteobj.author;
}


//Like feature
function likeCard(i, isJoke) { 
    const likedCardElement = document.createElement('div');
    likedCardElement.innerHTML = isJoke ? card2[i].innerHTML : card3[i].innerHTML;

    //check if it is a joke
    if (isJoke) {               
        favoriteList.appendChild(likedCardElement);
    } else {
        favoriteList1.appendChild(likedCardElement);
    }
}

//FUNCTION CALL
for (let i = 0; i < card1.length; i++) {
    card1[i].addEventListener('click', () => flipcard(i));
    card2[i].addEventListener('click', () => getjoke1(i));
    card3[i].addEventListener('click', () => getquote(i));

    likeButtons[i].addEventListener('click', (e) => {
        e.stopPropagation();
        //check it is joke by presense of setup and punchline
        const isJoke = card2[i].innerHTML.includes('setup') && card2[i].innerHTML.includes('punchline');
        likeCard(i, isJoke);
    });
}
