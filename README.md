# `@kakegurui/shuffle`
This module implements shuffle utilities assisting in implementing card-based games as seen on the Anime series Kakegurui.

## Install

Use your favorite package manager:

```sh
$ npm install @kakegurui/shuffle
$ yarn add @kakegurui/shuffle
$ pnpm install @kakegurui/shuffle
```

Supports both ESM and CJS and is written in TypeScript.

## Usage

Import the function you need, currently there is:

- `shuffle` Basic shuffle using the [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm. This modifies the array in place.
- `riffleShuffle` Riffle shuffle between two decks.
- `gilbreathShuffle` Gilbreath shuffle as seen on the Nim Type Zero game in Kakegurui XX.
- `cutDeck` Shuffle a deck by 'cutting'
- `randomNumber` Get a random number within a given range.
- `riffleShuffle` Riffle shuffle two decks.
- `deal` Deals a number of cards onto a separate pile.

```ts
// ESM/TypeScript
import { shuffle } from '@kakegurui/shuffle';
// CommonJS
const { shuffle } = require('@kakegurui/shuffle');
```

### `shuffle(array)`

Shuffles an array in-place using the Fisher-Yates/Knuth Shuffle algorithm.

```ts
const array = [1, 2, 3, 4, 5];
const shuffled = shuffle(array);

// Array is shuffled in-place.
console.log(array === shuffled); // true

// If you would like to preserve the original array, pass a copy.
const array2 = [1, 2, 3, 4, 5];
const shuffled2 = shuffle(array2.slice());

console.log(array2 === shuffled2); // false
```

### `randomNumber(start, end)`

Generates a random integer between the given `start` and `end` ranges.

```ts
// Random number between 1 to 5
const num = randomNumber(1, 5);

console.log(num); // Either 1, 2, 3, 4 or 5
```

### `riffleShuffle(deck1, deck2)`

Combines two decks with a riffle shuffle

```ts
const deck1 = [1, 2, 3];
const deck2 = [4, 5, 6];

const shuffled = riffleShuffle(deck1, deck2);
```

### `cutDeck(cards, cuts)`

Shuffles a deck of `cards` by randomly cutting the deck `cuts` times. Array is modified in-place.

```ts
const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffled = cutDeck(deck, 10);

// Array is modified in-place.
console.log(deck === shuffled);

// You can cut the deck a random number of times using randomNumber.
const shuffled = cutDeck(deck, randomNumber(1, 10));
```

### `deal(cards, numCards)`

Deals `numCards` from the top of the `cards`, top here meaning the beginning of the array, it deals it one by one therefore the new pile will have the cards in reverse order.

```ts
const cards = [1, 2, 3, 4, 5, 6];
const pile = deal(cards, 3);

console.log(pile); // [3, 2, 1]
// Array is modified in-place.
console.log(cards); // [4, 5, 6]
```

## `gilbreathShuffle(cards, split)`

Performs a [Gilbreath Shuffle](https://en.wikipedia.org/wiki/Gilbreath_shuffle) on `cards` by first splitting the deck onto a separate piles of `split` cards and then riffle shuffling them together.

```ts
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffled = gilbreathShuffle(cards, 4);

// Array is modified in-place.
console.log(cards === shuffled);
```

For the true Kakegurui experience we recommend cutting the deck using `cutDeck` a few times as well before doing a `gilbreathShuffle`

## License
[MIT](LICENSE)
