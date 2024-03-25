import { gilbreathShuffle, cutDeck } from './dist/index.mjs';

const cards = [];

// Initialize deck in an alternating state
// This a simple deck of Nim Zero cards.
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 4; j++) {
        cards.push(j);
    }
}

const cut = cutDeck(cards, 10);
console.log(gilbreathShuffle(cut, 21));
