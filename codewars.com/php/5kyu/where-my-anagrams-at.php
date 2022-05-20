<?php // https://www.codewars.com/kata/523a86aa4230ebb5420001e1

function sortLetters(string $word): string
{
    $letters = str_split($word);
    sort($letters);
    return implode('', $letters);
}

function anagrams(string $referenceWord, array $words): array
{
    $result = [];
    $referenceWord = sortLetters($referenceWord);

    foreach ($words as &$word) {
        if ($referenceWord === sortLetters($word)) {
            $result[] = $word;
        }
    }

    return $result;
}
