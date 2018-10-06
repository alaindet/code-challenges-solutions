<?php

// Kata https://www.codewars.com/kata/5254ca2719453dcc0b00027d/train/php
// Thanks to https://stackoverflow.com/a/39928045/5653974

/**
 * Mimics Array.prototype.indexOf from JavaScript
 *
 * @param string $word
 * @param string $char
 * @return integer Index of given character in the word, or -1
 */
function indexOfCharacter(string $word, string $char): int
{
    for ($i = 0, $len = strlen($word); $i < $len; $i++) {
        if ($word[$i] === $char) return $i;
    }
    return -1;
}

/**
 * Returns a subset of a word removing a character at given index (0-based)
 *
 * @param string $word
 * @param integer $index
 * @return string Subset of input word, 1 character removed
 */
function removeCharacter(string $word, int $index): string
{
    $result = '';
    for ($i = 0, $len = strlen($word); $i < $len; $i++) {
        if ($i !== $index) $result .= $word[$i];
    }
    return $result;
}

/**
 * Permutes all characters in a word and returns all permutations as an array
 *
 * @param string $word
 * @return array Permutations of the word's characters
 */
function permutations(string $word): array
{
    $wordLength = strlen($word);
    if ($wordLength < 2) return [$word];
    $permutations = [];
    for ($i = 0; $i < $wordLength; $i++) {
        $char = $word[$i];
        if (indexOfCharacter($word, $char) !== $i) continue;
        $subWord = removeCharacter($word, $i);
        foreach (permutations($subWord) as $subPermutation) {
            $permutations[] = $char . $subPermutation;
        }
    }
    return $permutations;
}
