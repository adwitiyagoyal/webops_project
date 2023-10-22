
const card1 = document.querySelectorAll('.card1');
const card2 = document.querySelectorAll('.front');
const card3 = document.querySelectorAll('.back');
const likeButtons = document.querySelectorAll('.like-button');
const favoriteList = document.querySelector('#favorite-list1');
const favoriteList1 = document.querySelector('#favorite-list');

let audio = new Audio("tone.mp4");

function flipcard(i) {
    card1[i].classList.toggle("flipcard");
    audio.play();
}



async function getjoke1(i) {
    const jokeData = await fetch("https://official-joke-api.appspot.com/random_joke", {
        headers: {
            'Accept': 'application/json'
        }
    });
    const jokeobj = await jokeData.json();
    card2[i].innerHTML = jokeobj.setup + jokeobj.punchline;
}

async function getjoke1a(i) {
    const jokeData = await fetch("https://api.quotable.io/random", {
        headers: {
            'Accept': 'application/json'
        }
    });
    const jokeobj = await jokeData.json();
    card3[i].innerHTML = jokeobj.content + jokeobj.author;
}

// function likeCard(i) { 
//         const likedCardElement = document.createElement('div');
//         likedCardElement.innerHTML =card2[i].innerHTML;
//         favoriteList.appendChild(likedCardElement); 
// }

// function likeCardjoke(i) { 
//     const likedCardElementjoke = document.createElement('div');
//     likedCardElementjoke.innerHTML =card2[i].innerHTML;
//     favoriteList1.appendChild(likedCardElementjoke); 
// }

function likeCard(i, isJoke) { 
    const likedCardElement = document.createElement('div');
    likedCardElement.innerHTML = isJoke ? card2[i].innerHTML : card3[i].innerHTML;
    if (isJoke) {
        favoriteList.appendChild(likedCardElement);
    } else {
        favoriteList1.appendChild(likedCardElement);
    }
}


for (let i = 0; i < card1.length; i++) {
    card1[i].addEventListener('click', () => flipcard(i));
    card2[i].addEventListener('click', () => getjoke1(i));
    card3[i].addEventListener('click', () => getjoke1a(i));

    likeButtons[i].addEventListener('click', (e) => {
        e.stopPropagation();
        const isJoke = card2[i].innerHTML.includes('setup') && card2[i].innerHTML.includes('punchline');
        likeCard(i, isJoke);

    });
}
