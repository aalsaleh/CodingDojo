// Deck of Cards - BlackJack Game

// DeckConstructor
function Deck() {
  this.makeDeck();
}
// Instance methods for Deck
// Shuffle cards in Deck
Deck.prototype.shuffle = function () {
  var m = this.cards.length, t, i;

  while(m) {
    i = Math.floor(Math.random()*m--);
    t = this.cards[m];
    this.cards[m] = this.cards[i];
    this.cards[i] = t;
  }
};
// Reset deck to original and unshuffled state
Deck.prototype.reset = function () {
  this.makeDeck();
};
// Deal a card from deck
Deck.prototype.deal = function () {
  if(this.cards.length > 0) {
    var randomCardID = Math.floor(Math.random() * this.cards.length);
    var randomCard = this.cards[randomCardID];
    this.cards.splice(randomCardID, 1);
    return randomCard;
  }
  console.log("No more cards!");
};
// Prepare Deck with cards
Deck.prototype.makeDeck = function () {
  this.cards = [];
  var suits = ["Spades","Clubs","Hearts","Diamonds"];
  var rank = ["1","2","3","4","5","6","7","8","9","Joker","Queen","King","Ace"];

  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < rank.length; j++) {
      var card = {
        suit : suits[i],
        rank : rank[j]
      }
      this.cards.push(card);
    }
  }
};

// PlayerConstructor
function Player(name, hand) {
  this.name = name;
  this.hand = [];
}
// Instance methods for Player
// Take card from deck and add to hand
Player.prototype.takeCard = function (deck) {
  this.hand.push(deck.deal());
};
// Discard chosen card from hand
Player.prototype.discardCard = function (cardID) {
  if(cardID) {
    this.hand.splice(cardID, 1)
  }
  else console.log("No more cards in hand");
};


var newDeck = new Deck();
var newPlayer = new Player("Adam");

newDeck.shuffle();
// console.log("\n\nShuffled:");
// console.log(newDeck.cards);

newPlayer.takeCard(newDeck);
// console.log("\n\nHand:");
// console.log(newPlayer.hand);

newPlayer.discardCard(1);
// console.log("\n\nHand:");
// console.log(newPlayer.hand);

newDeck.reset();
// console.log("\n\nReset Deck:");
// console.log(newDeck.cards);
