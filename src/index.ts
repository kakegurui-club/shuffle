/**
 * Performs a simple shuffle using the Fisher-Yates algorithm.
 * @param array Array of elements to shuffle.
 * @returns The given array, which has also been modified in place.
 */
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        // Swap elements at indices i and j in-place
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

/**
 * Gets a random number within the given range.
 * @param start The start range.
 * @param end The end range (inclusive).
 * @returns A random number within the given range.
 */
export function randomNumber(start: number, end: number): number {
    // Check if start and end are valid
    if (start > end) {
        throw new Error('Start value cannot be greater than end value.');
    }

    // Generate a random number within the range
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

/**
 * Performs a riffle shuffle to combine two decks.
 * @param deck1 The first deck
 * @param deck2 The second deck
 * @returns The two decks combined with a riffle shuffle.
 */
export function riffleShuffle<T>(deck1: T[], deck2: T[]): T[] {
    const shuffledDeck: T[] = [];
    let deck1Index = 0;
    let deck2Index = 0;

    while (deck1Index < deck1.length && deck2Index < deck2.length) {
        // Randomly choose whether to take a card from deck1 or from deck2
        if (Math.random() < 0.5) {
            shuffledDeck.push(deck1[deck1Index]);
            deck1Index++;
        } else {
            shuffledDeck.push(deck2[deck2Index]);
            deck2Index++;
        }
    }

    // Add any remaining cards from deck1 or deck2
    while (deck1Index < deck1.length) {
        shuffledDeck.push(deck1[deck1Index]);
        deck1Index++;
    }

    while (deck2Index < deck2.length) {
        shuffledDeck.push(deck2[deck2Index]);
        deck2Index++;
    }

    return shuffledDeck;
}

/**
 * Deals the specified number of cards onto a seperate pile.
 * From top to bottom, hence the new pile will be in reverse.
 * @param cards Deck of cards.
 * @param numCards Number of cards to deal, must not exceed cards.length
 * @returns A new pile containing the dealt cards, the original array has also been modified and the cards have been removed.
 */
export function deal<T>(cards: T[], numCards: number): T[] {
    if (numCards > cards.length) {
        throw new Error('Not enough cards to deal.');
    }

    // Deal off a specified number of cards into a second pile, reversing them
    const pile = [];

    for (let i = 0; i < numCards; i++) {
        pile.unshift(cards.shift()!); // Unshift to add to beginning and reverse
    }

    return pile;
}

/**
 * Shuffles a deck by cutting it by the specified amount of times.
 * @param cards Deck of cards.
 * @param cuts How many times to cut.
 * @returns The deck shuffled by cutting the specified number of times, the array is also modified in place.
 */
export function cutDeck<T>(cards: T[], cuts: number): T[] {
    // Cut the deck a few times
    for (let i = 0; i < cuts; i++) {
        const cutPoint = Math.floor(Math.random() * cards.length);
        const top = cards.slice(0, cutPoint);
        const bottom = cards.slice(cutPoint);
        cards = bottom.concat(top);
    }

    return cards;
}

/**
 * Performs a Gilbreath shuffle as seen in Nim Type Zero in Kakegurui XX.
 * @param cards Deck of cards
 * @param split How many cards should be dealt onto a separate pile.
 * @returns The pile of cards, dealt into two piles and riffle shuffled. The array is also modified in place.
 */
export function gilbreathShuffle<T>(cards: T[], split: number) {
    const pile = deal(cards, split);
    return riffleShuffle(pile, cards);
}
