// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise the card deck representation as an array of objects
var deck = makeDeck();

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

var displayEmoji = function (suit) {
  var emoji = {
    hearts: "♥",
    diamonds: "♦",
    spades: "♠",
    clubs: "♣",
  };
  return emoji[suit];
};

var twoCardScore = function (cards) {
  var score = 0;
  var countAce = 0;
  for (var i = 0; i < cards.length; i++) {
    // add 10 if card is a Jack, Queen, or King
    // add 11 on the first Ace only
    // add rank if any other card
    if (cards[i].rank == 11 || cards[i].rank == 12 || cards[i].rank == 13) {
      score = score + 10;
    } else if (cards[i].rank == 1 && countAce == 0) {
      score = score + 11;
      countAce = countAce + 1;
    } else {
      score = score + cards[i].rank;
    }
  }
  return score;
};

var hitScore = function (twoCardScore, cards) {
  var score = 0;
  var countAce = 0;
  if (twoCardScore > 10) {
    for (var i = 0; i < cards.length; i++) {
      // add 10 if card is a Jack, Queen, or King
      // add rank if any other card
      if (cards[i].rank == 11 || cards[i].rank == 12 || cards[i].rank == 13) {
        score = score + 10;
      } else {
        score = score + cards[i].rank;
      }
    }
  } else {
    for (var i = 0; i < cards.length; i++) {
      // add 10 if card is a Jack, Queen, or King
      // add 11 on the first Ace only
      // add rank if any other card
      if (cards[i].rank == 11 || cards[i].rank == 12 || cards[i].rank == 13) {
        score = score + 10;
      } else if (cards[i].rank == 1 && countAce == 0) {
        score = score + 11;
        countAce = countAce + 1;
      } else {
        score = score + cards[i].rank;
      }
    }
  }
  return score;
};

var findWinner = function (playerScore, dealerScore) {
  if (playerScore > 21 && dealerScore > 21) {
    return "Player and dealer bust! It's a draw!";
  } else if (playerScore == 21) {
    return "Player wins by black jack!";
  } else if (dealerScore == 21) {
    return "Dealer wins by black jack!";
  } else if (playerScore > 21) {
    return "Player busts! Dealer wins!";
  } else if (dealerScore > 21) {
    return "Dealer busts! Player wins!";
  } else if (playerScore > dealerScore) {
    return `Player wins with score of ${playerScore} vs dealer's score of ${dealerScore}!`;
  } else if (playerScore < dealerScore) {
    return `Dealer wins with score of ${dealerScore} vs player's score of ${playerScore}!`;
  } else if (playerScore == dealerScore) {
    return `Both players make the same score! It's a draw!`;
  }
  return "";
};

// initiate global variables
var dealer = [];
var player = [];
var playerScore = 0;
var dealerScore = 0;
var playerOutput = "";
var dealerOutput = "";

var main = function (input) {
  if (input != "hit" && input != "stand") {
    // Draw 2 cards each from the top of the deck
    dealer = [shuffledDeck.pop(), shuffledDeck.pop()];
    player = [shuffledDeck.pop(), shuffledDeck.pop()];
    // Calculate score for both player and dealer
    playerScore = twoCardScore(player);
    dealerScore = twoCardScore(dealer);
    // Construct an output string to communicate which cards were drawn
    playerOutput =
      "Player hand: " +
      player[0].name +
      " of " +
      displayEmoji(player[0].suit) +
      ", " +
      player[1].name +
      " of " +
      displayEmoji(player[1].suit);

    dealerOutput =
      "Dealer hand: " +
      dealer[0].name +
      " of " +
      displayEmoji(dealer[0].suit) +
      ", " +
      dealer[1].name +
      " of " +
      displayEmoji(dealer[1].suit);
    // check for blackjack
    if (playerScore == 21) {
      var myOutputValue =
        playerOutput +
        "<br>" +
        dealerOutput +
        "<br>" +
        "Player wins by black jack!";
    } else if (dealerScore == 21) {
      var myOutputValue =
        playerOutput +
        "<br>" +
        dealerOutput +
        "<br>" +
        "Dealer wins by black jack!";
    } else {
      var myOutputValue = playerOutput + "<br>" + dealerOutput;
    }
  } else if (input == "hit") {
    // player draws one card
    player = player.concat(shuffledDeck.pop());
    // update player score
    playerScore = playerScore + hitScore(playerScore, player.slice(-1));

    // dealer hits if his score is less than 17
    while (dealerScore < 17) {
      // dealer draws one card
      dealer = dealer.concat(shuffledDeck.pop());
      // update dealer score
      dealerScore = dealerScore + hitScore(dealerScore, dealer.slice(-1));
      // update dealer output
      dealerOutput =
        dealerOutput +
        ", " +
        dealer.slice(-1)[0].name +
        " of " +
        displayEmoji(dealer.slice(-1)[0].suit);
    }

    console.log(playerScore);
    console.log(dealerScore);
    playerOutput =
      playerOutput +
      ", " +
      player.slice(-1)[0].name +
      " of " +
      displayEmoji(player.slice(-1)[0].suit);

    myOutputValue =
      playerOutput +
      "<br>" +
      dealerOutput +
      "<br>" +
      findWinner(playerScore, dealerScore);
  } else if (input == "stand") {
    // dealer hits if his score is less than 17
    while (dealerScore < 17) {
      // dealer draws one card
      dealer = dealer.concat(shuffledDeck.pop());
      //update dealer score
      dealerScore = dealerScore + hitScore(dealerScore, dealer.slice(-1));
      //update dealer output
      dealerOutput =
        dealerOutput +
        ", " +
        dealer.slice(-1)[0].name +
        " of " +
        displayEmoji(dealer.slice(-1)[0].suit);
    }
    myOutputValue =
      playerOutput +
      "<br>" +
      dealerOutput +
      "<br>" +
      findWinner(playerScore, dealerScore);
  }

  // Return the fully-constructed output string
  return myOutputValue;
};
