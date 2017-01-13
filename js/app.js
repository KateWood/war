console.log('connected')

// Create players

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

// Build deck of cards

var suits = ['spades', 'hearts', 'clubs', 'diamonds']
var vals = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
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

// Game Play

function draw(player) {
	var i = Math.floor(Math.random() * deck.length)
	var choice = deck.splice(i, 1)
	player.deck.unshift(choice[0])
	console.log(player.name + ' plays ' + choice[0].declare())
}

function play() {
	draw(player1)
	draw(player2)
	calculateWin()
}

function calculateWin() {
	if (vals.indexOf(player1.deck[0].value) > vals.indexOf(player2.deck[0].value)) {
		console.log(player1.name + ' wins with a(n) ' + player1.deck[0].value)
	} else if (vals.indexOf(player2.deck[0].value) > vals.indexOf(player1.deck[0].value)) {
		console.log(player2.name + ' wins with a(n) ' + player2.deck[0].value)
	} else if (vals.indexOf(player1.deck[0].value) === vals.indexOf(player2.deck[0].value)) {
		console.log('WAR!')
	}
}
