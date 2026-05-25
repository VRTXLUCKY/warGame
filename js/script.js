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

  let player = deck.slice(0, 26);

  let computer = deck.slice(26);

  let playedCards = [];

  /////////////////////////////////////////////////////
  // COMPARE VARIABLES
  /////////////////////////////////////////////////////

  let compare = 0;

  let chosen = 0;

  let winner = 0;

  let integerChoice = 0;

  /////////////////////////////////////////////////////
  // ARITHMETIC VARIABLES
  /////////////////////////////////////////////////////

  let addition = 0;

  let subtraction = 0;

  let multiplication = 0;

  /////////////////////////////////////////////////////
  // CURRENT NUMBERS
  /////////////////////////////////////////////////////

  let currentNumber1 = 0;

  let currentNumber2 = 0;

  /////////////////////////////////////////////////////
  // START COUNTS
  /////////////////////////////////////////////////////

  $('#player1Count').html(player.length);

  $('#player2Count').html(computer.length);

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

    let absoluteValue = Math.abs(number);

    if (absoluteValue < 11) {

      return number;
    }

    if (absoluteValue === 11) {

      if (number < 0) {
        return "-<img src='./images/jack.png'>";
      }

      return "<img src='./images/jack.png'>";
    }

    if (absoluteValue === 12) {

      if (number < 0) {
        return "-<img src='./images/queen.png'>";
      }

      return "<img src='./images/queen.png'>";
    }

    if (absoluteValue === 13) {

      if (number < 0) {
        return "-<img src='./images/king.png'>";
      }

      return "<img src='./images/king.png'>";
    }
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

    $('#player1Count').html(player.length);

    $('#player2Count').html(computer.length);
  }

  /////////////////////////////////////////////////////
  // HIDE DIRECTIONS (UPDATED FOR MOBILE + DESKTOP)
  /////////////////////////////////////////////////////

  function hideDirections() {

    $('.compareDirections').addClass('hidden');

    $('.integerDirections').addClass('hidden');

    $('.addDirections').addClass('hidden');

    $('.subtractDirections').addClass('hidden');

    $('.multiplyDirections').addClass('hidden');
  }

  /////////////////////////////////////////////////////
  // END GAME
  /////////////////////////////////////////////////////

  function endGame() {

    if (player.length === 0) {

      $('#winner').html("🏆 COMPUTER WINS THE GAME!");
    }

    else if (computer.length === 0) {

      $('#winner').html("🏆 PLAYER WINS THE GAME!");
    }

    $('#draw').prop('disabled', true);

    $('#draw').css('opacity', '.5');
  }

  /////////////////////////////////////////////////////
  // COMPARE MATH
  /////////////////////////////////////////////////////

  function compareMath(number1, number2) {

    if (number1 > number2) {

      winner = 1;
    }

    else {

      winner = 2;
    }
  }

  /////////////////////////////////////////////////////
  // ARITHMETIC CHECK
  /////////////////////////////////////////////////////

  function arithmeticCheck() {

    let answer = $('#answer').val().trim();

    answer = Number(answer);

    let correctAnswer;

    if (addition == 1) {

      correctAnswer =
        currentNumber1 + currentNumber2;
    }

    else if (subtraction == 1) {

      correctAnswer =
        currentNumber1 - currentNumber2;
    }

    else if (multiplication == 1) {

      correctAnswer =
        currentNumber1 * currentNumber2;
    }

    if (answer === correctAnswer) {

      chosen = 1;
    }

    else {

      chosen = 2;
    }

    mathCheck(correctAnswer);

    $('#answer').val('');
  }

  /////////////////////////////////////////////////////
  // MATH CHECK
  /////////////////////////////////////////////////////

  function mathCheck(correctAnswer) {

    if (chosen === 1) {

      player.push(...playedCards);

      $('#winner').html("✅ Correct! Player Wins Round");

      $('#firstPlayer').css('border-color', 'red');
    }

    else {

      computer.push(...playedCards);

      $('#winner').html("❌ Wrong! Correct Answer Was " + correctAnswer);

      $('#secondPlayer').css('border-color', 'red');
    }

    playedCards = [];

    updateCounts();

    if (player.length === 0 || computer.length === 0) {

      endGame();
    }
  }

  /////////////////////////////////////////////////////
  // COMPARE CHECK
  /////////////////////////////////////////////////////

  function compareCheck() {

    if (chosen === winner) {

      player.push(...playedCards);

      $('#winner').html("Correct! Player Wins Round");

      $('#firstPlayer').css('border-color', 'red');
    }

    else {

      computer.push(...playedCards);

      $('#winner').html("Wrong! Computer Wins Round");

      $('#secondPlayer').css('border-color', 'red');
    }

    playedCards = [];

    updateCounts();

    if (player.length === 0 || computer.length === 0) {

      endGame();
    }
  }

  /////////////////////////////////////////////////////
  // DRAW CARD
  /////////////////////////////////////////////////////

  function drawCard() {

    $('#firstPlayer').css('border-color', 'black');

    $('#secondPlayer').css('border-color', 'black');

    if (player.length === 0 || computer.length === 0) {

      endGame();

      return;
    }

    $('#firstPlayerSuit').empty();

    $('#secondPlayerSuit').empty();

    let card1 = player.shift();

    let card2 = computer.shift();

    let number1 = card1[0];

    let suit1 = card1[1];

    let number2 = card2[0];

    let suit2 = card2[1];

    /////////////////////////////////////////////////////
    // INTEGER MODE
    /////////////////////////////////////////////////////

    if (integerChoice == 1) {

      if (suit1 == 'hearts' || suit1 == 'diamonds') {

        number1 = (-1) * number1;
      }

      if (suit2 == 'hearts' || suit2 == 'diamonds') {

        number2 = (-1) * number2;
      }
    }

    currentNumber1 = number1;

    currentNumber2 = number2;

    $('#firstPlayerNumber').html(getCardDisplay(number1));

    $('#secondPlayerNumber').html(getCardDisplay(number2));

    let suitCount1 = Math.abs(number1) < 11 ? Math.abs(number1) : 1;

    let suitCount2 = Math.abs(number2) < 11 ? Math.abs(number2) : 1;

    for (let i = 0; i < Math.abs(suitCount1); i++) {

      $('#firstPlayerSuit').append(getSuitImage(suit1));
    }

    for (let i = 0; i < Math.abs(suitCount2); i++) {

      $('#secondPlayerSuit').append(getSuitImage(suit2));
    }

    playedCards.push(card1, card2);

    if (compare === 1) {

      compareMath(number1, number2);

      $('#winner').html("Choose The Winning Card");
    }

    else if (addition == 1 || subtraction == 1 || multiplication == 1) {

      let symbol = "+";

      if (subtraction == 1) symbol = "-";

      if (multiplication == 1) symbol = "×";

      $('#winner').html("Solve: " + currentNumber1 + " " + symbol + " " + currentNumber2);
    }

    else {

      if (number1 > number2) {

        player.push(...playedCards);

        $('#winner').html("Player Wins Round");

        $('#firstPlayer').css('border-color', 'red');

        playedCards = [];
      }

      else if (number2 > number1) {

        computer.push(...playedCards);

        $('#winner').html("Computer Wins Round");

        $('#secondPlayer').css('border-color', 'red');

        playedCards = [];
      }

      else {

        $('#winner').html("WAR!");

        handleWar();
      }

      updateCounts();

      if (player.length === 0 || computer.length === 0) {

        endGame();
      }
    }
  }

  /////////////////////////////////////////////////////
  // WAR FUNCTION
  /////////////////////////////////////////////////////

  function handleWar() {

    if (player.length < 4) {

      player = [];

      $('#winner').html("Player does not have enough cards. Computer Wins!");

      endGame();

      return;
    }

    if (computer.length < 4) {

      computer = [];

      $('#winner').html("Computer does not have enough cards. Player Wins!");

      endGame();

      return;
    }

    for (let i = 0; i < 3; i++) {

      playedCards.push(player.shift());

      playedCards.push(computer.shift());
    }

    updateCounts();

    drawCard();
  }

  /////////////////////////////////////////////////////
  // BUTTONS (UNCHANGED LOGIC EXCEPT DIRECTIONS FIXED)
  /////////////////////////////////////////////////////

  $('#draw').on('click', function () {
    drawCard();
  });

  $('#mathButton').on('click', function () {
    $('#mathChoices').toggleClass('hidden');
  });

  $('#compareButton').on('click', function () {

    compare = 1;

    addition = 0;
    subtraction = 0;
    multiplication = 0;

    hideDirections();

    $('#integerChoices').removeClass('hidden');
    $('#winnerButtons').removeClass('hidden');
    $('#answerArea').addClass('hidden');

    $('.compareDirections').removeClass('hidden');

    $('#mathChoices').hide();
  });

  $('#arithmeticButton').on('click', function () {

    compare = 0;

    hideDirections();

    $('#integerChoices').removeClass('hidden');
    $('#arithmeticChoices').removeClass('hidden');
    $('#answerArea').removeClass('hidden');
    $('#winnerButtons').addClass('hidden');

    $('#mathChoices').hide();
  });

  $('#addButton').on('click', function () {

    addition = 1;
    subtraction = 0;
    multiplication = 0;

    hideDirections();

    $('.addDirections').removeClass('hidden');

    $('#arithmeticChoices').hide();
  });

  $('#subtractButton').on('click', function () {

    addition = 0;
    subtraction = 1;
    multiplication = 0;

    hideDirections();

    $('.subtractDirections').removeClass('hidden');

    $('#arithmeticChoices').hide();
  });

  $('#multiplyButton').on('click', function () {

    addition = 0;
    subtraction = 0;
    multiplication = 1;

    hideDirections();

    $('.multiplyDirections').removeClass('hidden');

    $('#arithmeticChoices').hide();
  });

  $('#integerButton').on('click', function () {

    integerChoice = 1;

    hideDirections();

    $('.integerDirections').removeClass('hidden');
  });

  $('#positiveButton').on('click', function () {

    integerChoice = 0;

    hideDirections();

    $('.compareDirections').removeClass('hidden');
  });

  $('#player1WinnerButton').on('click', function () {

    chosen = 1;
    compareCheck();
  });

  $('#player2WinnerButton').on('click', function () {

    chosen = 2;
    compareCheck();
  });

  $('#submitAnswerButton').on('click', function () {
    arithmeticCheck();
  });

});
