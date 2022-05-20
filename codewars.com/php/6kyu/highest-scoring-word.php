<?php
// https://www.codewars.com/kata/57eb8fcdf670e99d9b000272/train/php

function wordScore(string $word): int
{
    $alphabetString = 'abcdefghijklmnopqrstuvwxyz';
    $alphabet = array_flip(str_split($alphabetString));
    $letters = str_split(strtolower($word));

    return array_reduce($letters, function ($result, $letter) use ($alphabet) {
        return $result += $alphabet[$letter] + 1;
    }, 0);
}

function high(string $sentence): string
{
    $words = explode(' ', $sentence);
    $best = ['score' => 0, 'word' => ''];

    foreach ($words as &$word) {
        $score = wordScore($word);
        if ($score > $best['score']) {
            $best['score'] = $score;
            $best['word'] = $word;
        }
    }

    return $best['word'];
}
