// https://www.codewars.com/kata/5839edaa6754d6fec10000a2/train/typescript

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

const isUpperCase = (letter: string): boolean => {
  return letter !== letter.toLowerCase();
};

const findMissingLetter = (letters: string[]): string => {

  const firstLetter = letters[0];
  const alphabet = isUpperCase(firstLetter) ? ALPHABET.toUpperCase() : ALPHABET;
  const offset = alphabet.split('').findIndex(letter => letter === letters[0]);

  for (let i = 0; i < letters.length; i++) {
    if (alphabet[offset + i] !== letters[i]) {
      return alphabet[offset + i];
    }
  }

  return '';

};

console.log(
  findMissingLetter(['a', 'b', 'c', 'd', 'f']), // 'e'
  findMissingLetter(['O', 'Q', 'R', 'S']), // 'P'
);

export { findMissingLetter };
