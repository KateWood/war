console.log('connected')

//////////////////// Create players ////////////////////

function getPlayerNames() {
	user1 = prompt('Player 1, please enter your name')
	player1 = new Player(user1)
	user2 = prompt('Player 2, please enter your name')
	player2 = new Player(user2)

	function Player(name) {
		this.name = name
		this.score = 0
		this.deck = []
	}
}

getPlayerNames()

//////////////////// Build deck of cards ////////////////////

var suits = ['spades', 'hearts', 'clubs', 'diamonds']
var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
var deck = []

function Card(suit, value) {
	this.suit = suit
	this.value = value
	this.declare = function() {
		return (value + ' of ' + suit)
	}
}

function newDeck() {
	for(var i = 0; i < suits.length; i++) {
		for(var j = 0; j < vals.length; j++) {
			deck.push(new Card(suits[i], vals[j]))
		}
	}
}

newDeck()

function shuffle(cards) {
	var shuffledDeck = []
	var length = cards.length
	for (var i = 0; i < length; i++) {
		var pick = Math.floor(Math.random() * deck.length)
		shuffledDeck.push(deck.splice(pick, 1)[0])
	}
	deal(shuffledDeck)
}

function deal(cards) {
	player1.deck = cards.splice(0, 26)
	player2.deck = cards
}

shuffle(deck)

//////////////////// Game Play ////////////////////

function battle() {
	var card1 = player1.deck.shift()
	var card2 = player2.deck.shift()
	if (vals.indexOf(card1.value) > vals.indexOf(card2.value)) {
		player1.deck.push(card1, card2)
		console.log(player1.name + ' wins with a(n) ' + card1.value)
	} else if (vals.indexOf(card2.value) > vals.indexOf(card1.value)) {
		player1.deck.push(card1, card2)
		console.log(player2.name + ' wins with a(n) ' + card2.value)
	} else if (vals.indexOf(card1.value) === vals.indexOf(card2.value)) {
		console.log('WAR!')
	}
	console.log(player1.name + ' has ' + player1.deck.length + ' cards.')
	console.log(player2.name + ' has ' + player2.deck.length + ' cards.')
}

// var gameOver = false

// function draw(player) {
// 	if (deck.length > 0) {
// 		var i = Math.floor(Math.random() * deck.length)
// 		var choice = deck.splice(i, 1)
// 		player.deck.unshift(choice[0])
// 		console.log(player.name + ' plays ' + choice[0].declare())
// 	} else {
// 		console.log('The deck is finished!')
// 		gameOver = true
// 	}
// }
//
// function play() {
// 	draw(player1)
// 	draw(player2)
// 	if (!gameOver) {
// 		calculateWin()
// 	}
// }
//
// function calculateWin() {
// 	if (vals.indexOf(player1.deck[0].value) > vals.indexOf(player2.deck[0].value)) {
// 		console.log(player1.name + ' wins with a(n) ' + player1.deck[0].value)
// 	} else if (vals.indexOf(player2.deck[0].value) > vals.indexOf(player1.deck[0].value)) {
// 		console.log(player2.name + ' wins with a(n) ' + player2.deck[0].value)
// 	} else if (vals.indexOf(player1.deck[0].value) === vals.indexOf(player2.deck[0].value)) {
// 		console.log('WAR!')
// 	}
// }
