console.log('connected')

//////////////////// Global Variables ////////////////////
var pot	 = []
var suits = ['spades', 'hearts', 'clubs', 'diamonds']
var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
var deck = []

//////////////////// Create players ////////////////////

function getPlayerNames() {
	// var user1 = prompt('Player 1, please enter your name')
	var user1 = 'Kate'
	player1 = new Player(user1)
	// var user2 = prompt('Player 2, please enter your name')
	var user2 = 'Merc'
	player2 = new Player(user2)

	function Player(name) {
		this.name = name
		this.score = 0
		this.deck = []
	}
}

getPlayerNames()

//////////////////// Build deck of cards ////////////////////

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

function shuffle() {
	var shuffledDeck = []
	var length = deck.length
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

shuffle()

//////////////////// Game Play ////////////////////

function battle() {
	var card1 = player1.deck.shift()
	var card2 = player2.deck.shift()
	if (vals.indexOf(card1.value) > vals.indexOf(card2.value)) {
		player1.deck.push(card1, card2)
		console.log(player1.name + ' wins with a(n) ' + card1.value)
	} else if (vals.indexOf(card2.value) > vals.indexOf(card1.value)) {
		player2.deck.push(card1, card2)
		console.log(player2.name + ' wins with a(n) ' + card2.value)
	} else if (vals.indexOf(card1.value) === vals.indexOf(card2.value)) {
		console.log('WAR!')
		war(card1, card2)
	}
	console.log(player1.name + ' has ' + player1.deck.length + ' cards.')
	console.log(player2.name + ' has ' + player2.deck.length + ' cards.')
	checkForWin()
}

function checkForWin() {
	if (player1.deck.length === 0 || player2.deck.length === 0) {
		var winner = player1.deck.length > 0 ? player1.name : player2.name
		console.log(winner + ' wins!')
		newDeck()
		shuffle(deck)
	}
}

function war(card1, card2) {
	pot.push(card1, card2)
	wager(player1)
	wager(player2)
	var potList = declarePot()
	console.log('The pot at stake is ' + potList)
	var warCard1 = player1.deck.shift()
	var warCard2 = player2.deck.shift()
	if (vals.indexOf(warCard1.value) > vals.indexOf(warCard2.value)) {
		player1.deck.push(warCard1, warCard2)
		pot.forEach(function(prize){
			player1.deck.push(prize)
		})
	} else if (vals.indexOf(warCard2.value) > vals.indexOf(warCard1.value)) {
		player2.deck.push(warCard1, warCard2)
		pot.forEach(function(prize){
			player2.deck.push(prize)
		})
	} else if (vals.indexOf(warCard1.value) === vals.indexOf(warCard2.value)) {
		console.log('DOUBLE WAR!')
		battle(warCard1, warCard2)
	}
	pot = []
}

function wager(player) {
	var wagerCount
	if (player.deck.length > 3) {
		wagerCount = 3
	} else {
		wagerCount = player.deck.length - 1
	}
	for (var i = 0; i < wagerCount; i++) {
		pot.push(player.deck.shift())
	}
}

function declarePot() {
	var list = []
	pot.forEach(function(card) {
		list.push(card.declare())
	})
	return list.join(', ')
}
