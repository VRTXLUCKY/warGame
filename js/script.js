$(document).ready(function () {

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  let deck = [];

  /////////////////////////////////////////////////////
  // CREATE DECK
  /////////////////////////////////////////////////////

  for (let suit of suits) {

    for (let num = 2; num <= 13; num++) {

      deck.push([num, suit]);
    }
  }

  /////////////////////////////////////////////////////
  // SHUFFLE
  /////////////////////////////////////////////////////

  function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(deck);

  /////////////////////////////////////////////////////
  // SPLIT DECK
  /////////////////////////////////////////////////////

  let firstPlayer = deck.slice(0, 26);

  let secondPlayer = deck.slice(26);

  let playedCards = [];

  /////////////////////////////////////////////////////
  // START COUNTS
  /////////////////////////////////////////////////////

  $('#player1Count').html(firstPlayer.length);

  $('#player2Count').html(secondPlayer.length);

  /////////////////////////////////////////////////////
  // SUIT DISPLAY
  /////////////////////////////////////////////////////

  function getSuitImage(suit) {

    if (suit === 'hearts') return '❤️';

    if (suit === 'diamonds') return '♦️';

    if (suit === 'clubs') return '♣️';

    if (suit === 'spades') return '♠️';
  }

  /////////////////////////////////////////////////////
  // CARD DISPLAY
  /////////////////////////////////////////////////////

  function getCardDisplay(number) {

    if (number < 11) return number;

    if (number === 11) return "<img src='./images/jack.png'>";

    if (number === 12) return "<img src='./images/queen.png'>";

    if (number === 13) return "<img src='./images/king.png'>";
  }

  /////////////////////////////////////////////////////
  // SOUND
  /////////////////////////////////////////////////////

  function playSound(delay) {

    setTimeout(function () {

      let sound = new Audio('card.mp3');

      sound.play();

    }, delay);
  }

  /////////////////////////////////////////////////////
  // UPDATE COUNTS
  /////////////////////////////////////////////////////

  function updateCounts() {

    $('#player1Count').html(firstPlayer.length);

    $('#player2Count').html(secondPlayer.length);
  }

  /////////////////////////////////////////////////////
  // END GAME
  /////////////////////////////////////////////////////

  function endGame() {

    if (firstPlayer.length === 0) {

      $('#winner').html("🏆 SECOND PLAYER WINS THE GAME!");

    }

    else if (secondPlayer.length === 0) {

      $('#winner').html("🏆 FIRST PLAYER WINS THE GAME!");
    }

    // DISABLE BUTTON

    $('#draw').prop('disabled', true);

    $('#draw').css('opacity', '.5');
  }

  /////////////////////////////////////////////////////
  // DRAW CARD
  /////////////////////////////////////////////////////

  function drawCard() {

    // RESET BORDERS

    $('#firstPlayer').css('border-color', 'black');

    $('#secondPlayer').css('border-color', 'black');

    // CHECK GAME OVER

    if (firstPlayer.length === 0 || secondPlayer.length === 0) {

      endGame();

      return;
    }

    $('#firstPlayerSuit').empty();

    $('#secondPlayerSuit').empty();

    let card1 = firstPlayer.shift();

    let card2 = secondPlayer.shift();

    let number1 = card1[0];

    let suit1 = card1[1];

    let number2 = card2[0];

    let suit2 = card2[1];

    /////////////////////////////////////////////////////
    // SHOW CARDS
    /////////////////////////////////////////////////////

    $('#firstPlayerNumber').html(getCardDisplay(number1));

    $('#secondPlayerNumber').html(getCardDisplay(number2));

    let suitCount1 = number1 < 11 ? number1 : 1;

    let suitCount2 = number2 < 11 ? number2 : 1;

    for (let i = 0; i < suitCount1; i++) {

      $('#firstPlayerSuit').append(getSuitImage(suit1));
    }

    for (let i = 0; i < suitCount2; i++) {

      $('#secondPlayerSuit').append(getSuitImage(suit2));
    }

    /////////////////////////////////////////////////////
    // STORE PLAYED CARDS
    /////////////////////////////////////////////////////

    playedCards.push(card1, card2);

    /////////////////////////////////////////////////////
    // CHECK WINNER
    /////////////////////////////////////////////////////

    if (number1 > number2) {

      firstPlayer.push(...playedCards);

      $('#winner').html("First Player Wins Round");

      // RED BORDER

      $('#firstPlayer').css('border-color', 'red');

      playedCards = [];
    }

    else if (number2 > number1) {

      secondPlayer.push(...playedCards);

      $('#winner').html("Second Player Wins Round");

      // RED BORDER

      $('#secondPlayer').css('border-color', 'red');

      playedCards = [];
    }

    else {

      $('#winner').html("WAR!");

      handleWar();
    }

    updateCounts();

    /////////////////////////////////////////////////////
    // GAME OVER CHECK
    /////////////////////////////////////////////////////

    if (firstPlayer.length === 0 || secondPlayer.length === 0) {

      endGame();
    }
  }

  /////////////////////////////////////////////////////
  // WAR FUNCTION
  /////////////////////////////////////////////////////

  function handleWar() {

    /////////////////////////////////////////////////////
    // CHECK ENOUGH CARDS
    /////////////////////////////////////////////////////

    if (firstPlayer.length < 4) {

      firstPlayer = [];

      $('#winner').html(
        "Player 1 does not have enough cards. Player 2 Wins!"
      );

      endGame();

      return;
    }

    if (secondPlayer.length < 4) {

      secondPlayer = [];

      $('#winner').html(
        "Player 2 does not have enough cards. Player 1 Wins!"
      );

      endGame();

      return;
    }

    /////////////////////////////////////////////////////
    // HIDE SUITS
    /////////////////////////////////////////////////////

    $('#firstPlayerSuit').hide();

    $('#secondPlayerSuit').hide();

    /////////////////////////////////////////////////////
    // CARD BACKS
    /////////////////////////////////////////////////////

    let backImg =
      "<img style='height:14rem;' src='./images/cards.png'/>";

    $('#firstPlayerNumber').html(backImg);

    $('#secondPlayerNumber').html(backImg);

    /////////////////////////////////////////////////////
    // PLAY SOUNDS
    /////////////////////////////////////////////////////

    playSound(0);

    playSound(1000);

    playSound(1800);

    /////////////////////////////////////////////////////
    // FACE DOWN CARDS
    /////////////////////////////////////////////////////

    for (let i = 0; i < 3; i++) {

      playedCards.push(firstPlayer.shift());

      playedCards.push(secondPlayer.shift());
    }

    updateCounts();

    /////////////////////////////////////////////////////
    // DECIDING CARD
    /////////////////////////////////////////////////////

    setTimeout(function () {

      $('#firstPlayerSuit').show();

      $('#secondPlayerSuit').show();

      let card1 = firstPlayer.shift();

      let card2 = secondPlayer.shift();

      let number1 = card1[0];

      let suit1 = card1[1];

      let number2 = card2[0];

      let suit2 = card2[1];

      $('#firstPlayerNumber').html(getCardDisplay(number1));

      $('#secondPlayerNumber').html(getCardDisplay(number2));

      $('#firstPlayerSuit').html(getSuitImage(suit1));

      $('#secondPlayerSuit').html(getSuitImage(suit2));

      playedCards.push(card1, card2);

      /////////////////////////////////////////////////////
      // WAR WINNER
      /////////////////////////////////////////////////////

      if (number1 > number2) {

        $('#winner').html("First Player Wins WAR!");

        $('#firstPlayer').css('border-color', 'red');

        firstPlayer.push(...playedCards);

        playedCards = [];
      }

      else if (number2 > number1) {

        $('#winner').html("Second Player Wins WAR!");

        $('#secondPlayer').css('border-color', 'red');

        secondPlayer.push(...playedCards);

        playedCards = [];
      }

      else {

        $('#winner').html("WAR AGAIN!");

        handleWar();
      }

      updateCounts();

      /////////////////////////////////////////////////////
      // FINAL GAME CHECK
      /////////////////////////////////////////////////////

      if (firstPlayer.length === 0 || secondPlayer.length === 0) {

        endGame();
      }

    }, 2500);
  }

  /////////////////////////////////////////////////////
  // BUTTON CLICK
  /////////////////////////////////////////////////////

  $('#draw').on('click', function () {

    drawCard();
  });

});
