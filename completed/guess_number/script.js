"use strict";
const score = document.querySelector(".score");

let secret = Math.floor(Math.random() * 20 + 1);

let scoreValue = 20;

document.querySelector(".btn.again").addEventListener("click", () => {
	secret = Math.floor(Math.random() * 20 + 1);
	scoreValue = 20;
	score.textContent = scoreValue;
	document.querySelector(".message").textContent = "Start guessing...";
	document.querySelector(".number").textContent = "?";
	document.querySelector(".guess").value = "";
	document.body.style.backgroundColor = "#222";
});

document.querySelector(".btn.check").addEventListener("click", () => {
	let guess = parseInt(document.querySelector(".guess").value);

	if (guess < 1 || guess > 20) {
		alert("Invalid Number!");
		return;
	} else if (guess == secret) {
		document.querySelector(".message").textContent = "Correct Number!";
		document.querySelector(".number").textContent = secret;
		if (scoreValue > parseInt(document.querySelector(".highscore").textContent))
			document.querySelector(".highscore").textContent = scoreValue;
		document.body.style.backgroundColor = "#60b347";
	} else if (guess != secret) {
		if (scoreValue > 1) {
			document.querySelector(".message").textContent =
				guess > secret ? "Too high!" : "Too low!";
			scoreValue--;
			score.textContent = scoreValue;
		} else {
			document.querySelector(".message").textContent = "You lost the game!";
			score.textContent = 0;
		}
	}
});
