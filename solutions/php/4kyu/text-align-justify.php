<?php

/**
 * Kata https://www.codewars.com/kata/537e18b6147aa838f600001b/train/php
 * 
 * Here are the rules:
 * 
 * - Use spaces to fill in the gaps between words.
 * - Each line should contain as many words as possible.
 * - Use '\n' to separate lines.
 * - Gap between words can't differ by more than one space.
 * - Lines should end with a word not a space.
 * - '\n' is not included in the length of a line.
 * - Large gaps go first, then smaller ones ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 1 spaces)).
 * - Last line should not be justified, use only one space between words.
 * - Last line should not contain '\n'
 * - Strings with one word do not need gaps ('somelongword\n').
 */

function justify(string $str, int $len)
{
    return null;
}


$tests = [

    // Test #1
    [
        'given' => [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna.',
            30,
        ],
        'expected' => "Lorem  ipsum  dolor  sit amet,\nconsectetur  adipiscing  elit.Vestibulum    sagittis   dolor\nmauris,  at  elementum  ligula\ntempor  eget.  In quis rhoncus\nnunc,  at  aliquet orci. Fusce\nat   dolor   sit   amet  felissuscipit   tristique.   Nam  a\nimperdiet   tellus.  Nulla  eu\nvestibulum urna."
    ],

    // Test #2
    [
        'given' => [
            'This is an example row',
            7,
        ],
        'expected' => "This is\nan\nexample\nrow",
    ],

];

foreach ($tests as $test) {
    [$given, $expected] = [$test['given'], $test['expected']];
    $assertion = justify(...$given);
    echo $assertion === $expected ? 'PASSED' : 'FAILED';
    echo "\n";
}
