const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  const moveButtons = document.querySelectorAll('.move-button');
  moveButtons.forEach(button => {
    button.addEventListener('click', () => {
      const playerMove = button.getAttribute('data-move');
      playGame(playerMove);
    });
  });
  
  document.getElementById('reset-score').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').textContent = '';
    document.querySelector('.js-moves').textContent = '';
  });
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    let wonThisRound = false;
  
    if (playerMove === computerMove) {
      result = 'Tie.';
      score.ties++;
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      result = 'You win!';
      score.wins++;
      wonThisRound = true;
    } else {
      result = 'You lose!';
      score.losses++;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
  
    document.querySelector('.js-result').textContent = result;
    document.querySelector('.js-moves').textContent =
      `You → ${playerMove} | Computer → ${computerMove}`;
    updateScoreElement();
    showMessageIfNeeded(wonThisRound);
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score').textContent =
      `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
  function pickComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
  }
  
  function showMessageIfNeeded(wonThisRound) {
    if (!wonThisRound) return;
  
    const messageEl = document.querySelector('.js-result');
    const totalGames = score.wins + score.losses;
  
    if (totalGames === 0) return;
  
    const winRatio = score.wins / totalGames;
  
    if (winRatio > 0.9) {
      messageEl.textContent += ' 🌟 Fantastic!';
    } else if (winRatio > 0.5) {
      messageEl.textContent += ' 👍 Great job!';
    }
  }
  