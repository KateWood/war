console.log('connected')

function Card(suit, value) {
	this.suit = suit
	this.value = value
	this.declare = function() {
		return (value + ' of ' + suit)
	}
}

var suits = ['spades', 'hearts', 'clubs', 'diamonds']
var vals = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
var deck = []

for(var i = 0; i < suits.length; i++) {
	for(var j = 0; j < vals.length; j++) {
		deck.push(new Card(suits[i], vals[j]))
	}
}

console.log(deck)

function draw() {
	var i = Math.floor(Math.random() * deck.length)
	var choice = deck.splice(i, 1)
	console.log(choice[0].declare())
}
