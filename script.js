const form = document.querySelector("#guess-form");
const input = document.querySelector("#guess-input");
const message = document.querySelector("#game-message");
const attemptCount = document.querySelector("#attempt-count");
const newGameButton = document.querySelector("#new-game");

let secretNumber;
let attempts;
let finished;

function startNewGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  finished = false;
  attemptCount.textContent = "0";
  input.value = "";
  input.disabled = false;
  form.querySelector("button[type='submit']").disabled = false;
  message.textContent = "Make your first guess to get started.";
  message.dataset.state = "";
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (finished) return;

  const guess = Number(input.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    message.textContent = "Enter a whole number from 1 to 100.";
    message.dataset.state = "error";
    input.focus();
    return;
  }

  attempts += 1;
  attemptCount.textContent = String(attempts);

  if (guess === secretNumber) {
    message.textContent = `You got it! ${secretNumber} was the lucky number. ✨`;
    message.dataset.state = "won";
    finished = true;
    input.disabled = true;
    form.querySelector("button[type='submit']").disabled = true;
  } else if (guess < secretNumber) {
    message.textContent = "A little higher — try another number.";
    message.dataset.state = "low";
    input.select();
  } else {
    message.textContent = "A little lower — try another number.";
    message.dataset.state = "high";
    input.select();
  }
});

newGameButton.addEventListener("click", startNewGame);
startNewGame();
