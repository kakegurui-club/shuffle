import { describe, expect, it } from 'vitest';
import {
    shuffle,
    randomNumber,
    gilbreathShuffle,
    deal,
    cutDeck,
    riffleShuffle
} from '../src/index.js';

describe('shuffle', () => {
    it('shuffles properly', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const shuffled = shuffle(array.slice());

        expect(shuffled.length).toBe(array.length);
        expect(array === shuffled).toBe(false);
    });

    it('modifies array in place', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const shuffled = shuffle(array);

        expect(array === shuffled).toBe(true);
    });

    it('should contain all elements from the original array', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffle(originalArray);

        originalArray.forEach((element) => {
            expect(shuffledArray).toContain(element);
        });
    });
});

describe('randomNumber', () => {
    it('should return a random number within the specified range', () => {
        const start = 1;
        const end = 10;
        const result = randomNumber(start, end);

        expect(result).toBeGreaterThanOrEqual(start);
        expect(result).toBeLessThanOrEqual(end);
    });

    it('should throw an error if start value is greater than or equal to end value', () => {
        const start = 10;
        const end = 1;

        expect(() => randomNumber(start, end)).toThrow(
            'Start value cannot be greater than end value.'
        );
    });

    it('should return an integer', () => {
        const start = 1;
        const end = 10;
        const result = randomNumber(start, end);

        expect(result % 1).toEqual(0); // Check if the result is an integer
    });

    it('should return start value if start and end are equal', () => {
        const start = 5;
        const end = 5;
        const result = randomNumber(start, end);

        expect(result).toEqual(start);
    });
});

describe('Gilbreath Shuffle', () => {
    it('preserves the properties of the deck', () => {
        const cards = [];

        // Initialize deck in an alternating state
        // This a simple deck of Nim Zero cards.
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                cards.push(j);
            }
        }

        // Pick off 21 cards onto a separate pile and riffle shuffle them.
        const shuffled = gilbreathShuffle(cards.slice(), 21);

        // The deck must obviously change.
        expect(shuffle).not.toEqual(cards);

        for (let i = 0; i < shuffled.length; i += 4) {
            const sliced = shuffled.slice(i, i + 4);

            // Each 4 cards must still contain every number.
            [0, 1, 2, 3].forEach((element) => {
                expect(sliced).toContain(element);
            });
        }
    });
});

describe('deal', () => {
    it('should deal the specified number of cards from the top of the deck onto a separate pile (in reverse order)', () => {
        const cards = ['Ace', '2', '3', '4', '5'];
        const numCards = 3;
        const pile = deal(cards, numCards);

        expect(pile).toEqual(['3', '2', 'Ace']); // Dealt cards should be in reverse order
        expect(cards).toEqual(['4', '5']); // Original deck should have remaining cards
    });

    it('should throw an error if number of cards to deal exceeds deck size', () => {
        const cards = ['Ace', '2', '3'];
        const numCards = 4;
        expect(() => deal(cards, numCards)).toThrow(
            'Not enough cards to deal.'
        );
    });

    it('should return an empty array if number of cards to deal is zero', () => {
        const cards = ['Ace', '2', '3'];
        const numCards = 0;
        const pile = deal(cards, numCards);
        expect(pile).toEqual([]);
        expect(cards).toEqual(['Ace', '2', '3']); // Original deck should remain unchanged
    });
});

describe('cutDeck', () => {
    it('should shuffle the deck by cutting the specified number of times', () => {
        const cards = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        const cuts = 3; // Manually specify the number of cuts for testing
        const shuffledDeck = cutDeck(cards.slice(), cuts); // Make a copy of the deck to preserve the original

        expect(shuffledDeck).toHaveLength(cards.length); // Shuffled deck should have the same length as the original
        expect(shuffledDeck).to.include.members(cards); // Shuffled deck should contain all cards from the original
    });

    it('should work together with gilbreath shuffle and preserve the properties', () => {
        const cards = [];

        // Initialize deck in an alternating state
        // This a simple deck of Nim Zero cards.
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                cards.push(j);
            }
        }

        const cut = cutDeck(cards, randomNumber(1, 10));
        const shuffled = gilbreathShuffle(cut, 21);

        for (let i = 0; i < shuffled.length; i += 4) {
            const sliced = shuffled.slice(i, i + 4);

            // Each 4 cards must still contain every number.
            [0, 1, 2, 3].forEach((element) => {
                expect(sliced).toContain(element);
            });
        }
    });
});

describe('riffleShuffle', () => {
    it('should combine two decks with a riffle shuffle', () => {
        const deck1 = ['Ace', '2', '3', '4', '5'];
        const deck2 = ['6', '7', '8', '9', '10'];
        const shuffledDeck = riffleShuffle(deck1, deck2);

        expect(shuffledDeck).toHaveLength(deck1.length + deck2.length); // Shuffled deck should have the combined length
        expect(shuffledDeck).not.toEqual([...deck1, ...deck2]); // Shuffled deck should not be identical to the concatenated decks
        expect(shuffledDeck).to.include.members(deck1); // Shuffled deck should contain all cards from deck1
        expect(shuffledDeck).to.include.members(deck2); // Shuffled deck should contain all cards from deck2
    });

    it('should handle decks of different lengths', () => {
        const deck1 = ['Ace', '2', '3', '4', '5'];
        const deck2 = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        const shuffledDeck = riffleShuffle(deck1, deck2);

        expect(shuffledDeck).toHaveLength(deck1.length + deck2.length); // Shuffled deck should have the combined length
        expect(shuffledDeck).not.toEqual([...deck1, ...deck2]); // Shuffled deck should not be identical to the concatenated decks
        expect(shuffledDeck).to.include.members(deck1); // Shuffled deck should contain all cards from deck1
        expect(shuffledDeck).to.include.members(deck2); // Shuffled deck should contain all cards from deck2
    });

    it('should handle empty decks', () => {
        const deck1: string[] = [];
        const deck2: string[] = [];
        const shuffledDeck = riffleShuffle(deck1, deck2);

        expect(shuffledDeck).toHaveLength(0); // Shuffled deck should be empty
        expect(shuffledDeck).toEqual([]); // Shuffled deck should be an empty array
    });
});
