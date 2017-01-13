console.log('connected')

//////////////////// Global Variables ////////////////////
var pot	 = []
var suits = ['spades', 'hearts', 'clubs', 'diamonds']
var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
var deck = []

//////////////////// Create players ////////////////////

function getPlayerNames() {
	var user1 = prompt('Player 1, please enter your name')
	player1 = new Player(user1)
	var user2 = prompt('Player 2, please enter your name')
	player2 = new Player(user2)
}

function Player(name) {
	this.name = name
	this.hand = []
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
	shuffle()
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
	player1.hand = cards.splice(0, 26)
	player2.hand = cards
}

//////////////////// Game Play ////////////////////

function battle() {
	var card1 = player1.hand.shift()
	var card2 = player2.hand.shift()
	if (vals.indexOf(card1.value) > vals.indexOf(card2.value)) {
		player1.hand.push(card1, card2)
		console.log(player1.name + ' wins ' + card2.declare() + ' with ' + card1.declare())
	} else if (vals.indexOf(card2.value) > vals.indexOf(card1.value)) {
		player2.hand.push(card1, card2)
		console.log(player1.name + ' wins ' + card1.declare() + ' with ' + card2.declare())
	} else if (vals.indexOf(card1.value) === vals.indexOf(card2.value)) {
		console.log(player1.name + ' played ' + card1.declare() + ' and ' + player2.name + ' played ' + card2.declare() + '. THIS MEANS WAR!')
		war(card1, card2)
	}
	console.log(player1.name + ' has ' + player1.hand.length + ' cards.')
	console.log(player2.name + ' has ' + player2.hand.length + ' cards.')
	checkForWin()
}

function checkForWin() {
	if (player1.hand.length === 0 || player2.hand.length === 0) {
		var winner = player1.hand.length > 0 ? player1.name : player2.name
		console.log(winner + ' wins! Redealing cards...')
		newDeck()
	}
}

function war(card1, card2) {
	pot.push(card1, card2)
	wager(player1)
	wager(player2)
	var potList = declarePot()
	console.log('The pot at stake is ' + potList)
	if (player1.hand.length > 0 && player2.hand.length > 0) {
		var warCard1 = player1.hand.shift()
		var warCard2 = player2.hand.shift()
		if (vals.indexOf(warCard1.value) > vals.indexOf(warCard2.value)) {
			player1.hand.push(warCard1, warCard2)
			pot.forEach(function(prize){
				player1.hand.push(prize)
			})
			pot = []
		} else if (vals.indexOf(warCard2.value) > vals.indexOf(warCard1.value)) {
			player2.hand.push(warCard1, warCard2)
			pot.forEach(function(prize){
				player2.hand.push(prize)
			})
			pot = []
		} else if (vals.indexOf(warCard1.value) === vals.indexOf(warCard2.value)) {
			console.log(player1.name + ' played ' + warCard1.declare() + ' and ' + player2.name + ' played ' + warCard2.declare() + '. THIS MEANS WAR!')
			war(warCard1, warCard2)
		}
	}
}

function wager(player) {
	var wagerCount
	if (player.hand.length > 3) {
		wagerCount = 3
	} else if (player.hand.length > 0) {
		wagerCount = player.hand.length - 1
	} else {
		wagerCount = 0
	}
	for (var i = 0; i < wagerCount; i++) {
		pot.push(player.hand.shift())
	}
}

function declarePot() {
	var list = []
	pot.forEach(function(card) {
		list.push(card.declare())
	})
	return list.join(', ')
}
