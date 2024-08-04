'use strict';

let scores = [0, 0];
let pScore = 0;
let activePlayer = 0;

document.querySelectorAll('.score').forEach(score => {
  score.textContent = 0;
});

const newGame = document.querySelector('.btn--new');
newGame.addEventListener('click', () => {
  scores = [0, 0];
  pScore = 0;
  activePlayer = 0;
  document.querySelectorAll('.score').forEach(score => {
    score.textContent = 0;
  });
  document.querySelectorAll('.current-score').forEach(current => {
    current.textContent = 0;
  });
  document.querySelectorAll('.player').forEach(player => {
    player.classList.remove('player--winner');
    player.classList.remove('player--active');
  });
  document.querySelector('.player--0').classList.add('player--active');
  diceroll.disabled = false;
  hold.disabled = false;
});

const diceroll = document.querySelector('.btn--roll');

diceroll.addEventListener('click', () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  const diceImage = document.querySelector('.dice');
  diceImage.src = `dice-${dice}.png`;

  if (dice !== 1) {
    pScore += dice;
    document.querySelector(`.current--${activePlayer}`).textContent = pScore;
  } else {
    pScore = 0;
    document.querySelector(`.current--${activePlayer}`).textContent = pScore;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    changePlayer();
  }
});

const hold = document.querySelector('.btn--hold');

hold.addEventListener('click', () => {
  scores[activePlayer] += pScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  checkScores(scores[activePlayer]);

  pScore = 0;
  document.querySelector(`.current--${activePlayer}`).textContent = pScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  changePlayer();
});

function changePlayer() {
  const player1 = document.querySelector('.player--0');
  const player2 = document.querySelector('.player--1');
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

function checkScores(score) {
  if (score >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceroll.disabled = true;
    hold.disabled = true;
  }
}
