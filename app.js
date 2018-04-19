var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var dice_1 = Math.floor(Math.random() * 6) + 1;
    var dice_2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById('dice_1').style.display = 'block';
    document.getElementById('dice_2').style.display = 'block';
    document.getElementById('dice_1').src = 'dice-' + dice_1 + '.png';
    document.getElementById('dice_2').src = 'dice-' + dice_2 + '.png';

    if (dice_1 === 1 || dice_2 === 1) {
      //Next player
      nextPlayer();
    } else {
      //Add score
      roundScore += dice_1 + dice_2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  }
});


document.querySelector('.btn-hold').addEventListener('click',function() {
  if (gamePlaying) {

    var input = document.getElementById('goal').value;
    var goalScore;

    // undefined, 0, null, "", COERCED to false
    if (input) {
      goalScore = input;
    } else {
      goalScore = 100;
    }

    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // check if player won the Game
    if (scores[activePlayer] >= goalScore) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.getElementById('dice_1').style.display = 'none';
      document.getElementById('dice_2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});


function nextPlayer() {
  //Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice_1').style.display = 'none';
  document.getElementById('dice_2').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  // reset the scores
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById('dice_1').style.display = 'none';
  document.getElementById('dice_2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  // no active classes anywhere before adding it
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}
