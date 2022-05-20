// https://www.codewars.com/kata/54b724efac3d5402db00065e/train/typescript

import { MORSE_CODE } from './preloaded';

export const decodeMorse = (morse: string): string => {

  const words = morse.trim().split(' '.repeat(3));

  const decodedWords = words.map((word: string): string => {
    const letters = word.split(' ');
    const decodedLetters = letters.map(
      (letter: string): string => MORSE_CODE[letter]
    );
    return decodedLetters.join('');
  });

  return decodedWords.join(' ');
};
