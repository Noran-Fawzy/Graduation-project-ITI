
const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");
const gameMessage = document.getElementById("gameMessage");
const livesContainer = document.getElementById("livesContainer");

let birds = [];
let deadBirds = 0;
let lives = 3;
let missedClicks = 0;
const maxMissedClicks = 3;
const birdCount = 5;

function updateLives() {
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement("span");
        heart.textContent = "❤️";
        heart.classList.add("heart");
        livesContainer.appendChild(heart);
    }
}

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameArea.style.display = "block";
    createBirds();
    updateLives();
});

function createBirds() {
    for (let i = 0; i < birdCount; i++) {
        let bird = document.createElement("img");
        bird.src = "images/alive-bird.gif";
        bird.classList.add("bird");
        bird.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        bird.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        gameArea.appendChild(bird);
        birds.push(bird);
        moveBird(bird);
        bird.addEventListener("click", (event) => {
            event.stopPropagation(); 
            killBird(bird);
        });
    }
}

function moveBird(bird) {
    setInterval(() => {
        if (!bird.classList.contains("dead")) {
            bird.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            bird.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        }
    }, 2000);
}

function killBird(bird) {
    bird.src = "images/dead-bird.png";
    bird.classList.add("dead");
    bird.style.transition = "top 2s linear";
    bird.style.top = `${window.innerHeight}px`;

    setTimeout(() => {
        bird.remove();
        deadBirds++;
        checkGameStatus();
    }, 2000);
}

function checkGameStatus() {
    if (deadBirds === birdCount) {
        gameMessage.innerText = "🎉YOU WON!🎉";
    }
}

document.addEventListener("click", (event) => {
    if (
        !event.target.classList.contains("bird") &&
        event.target.id !== "startButton"
    ) {
        missedClicks++;
        lives--;
        updateLives();

        if (lives <= 0 || missedClicks >= maxMissedClicks) {
            gameMessage.innerText = "❌GAME OVER❌";
        }
    }
});
