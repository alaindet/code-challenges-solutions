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

/**
 * Returns an array of lines according to the chars limit of each line
 * 
 * Ex.:
 * [
 *   ['Hello', 'word...'],
 *   ['How', 'are', 'you?'],
 * ]
 * 
 * @param string $input
 * @param int $limit
 */
function chopLines(string $input, int $limit): array
{
    $words = explode(' ', $input);

    $lines = [];
    $line = [];
    $chars = 0;

    foreach ($words as $word) {
        $len = strlen($word);

        if ($chars + $len > $limit) {
            $lines[] = $line;
            $line = [];
            $chars = 0;
        }

        $line[] = $word;
        $chars += $len + 1;
    }

    $lines[] = $line;

    return $lines;
}

function stretchWhitespace(array $words, int $limit): string
{
    $result = '';
    $currentLength = strlen(implode(' ', $words));
    $diff = $limit - $currentLength;
    $spaces = count($words) - 1;
    $min = $spaces === 0 ? 0 : intval($diff / $spaces);
    $rest = $spaces === 0 ? 0 : $diff % $spaces;

    foreach ($words as $word) {
        $minSpace = str_repeat(' ', $min);
        $spareSpace = '';
        if ($rest-- > 0) $spareSpace = ' ';
        $result .= "${word} ${minSpace}${spareSpace}";
    }

    return rtrim($result);
}

function justify(string $input, int $limit): string
{
    $stretchedLines = [];
    $lines = chopLines($input, $limit);
    $linesCount = count($lines);
    
    for ($i = 0; $i < $linesCount; $i++) {
        $line = $lines[$i];
        $last = $i === $linesCount - 1;
        $line = $last ? implode(' ', $line) : stretchWhitespace($line, $limit);
        $stretchedLines[] = $line;
    }

    return implode("\n", $stretchedLines);
}

$tests = [

    // Test #1
    [
        'given' => [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna.',
            30,
        ],
        'expected' => "Lorem  ipsum  dolor  sit amet,\nconsectetur  adipiscing  elit.\nVestibulum    sagittis   dolor\nmauris,  at  elementum  ligula\ntempor  eget.  In quis rhoncus\nnunc,  at  aliquet orci. Fusce\nat   dolor   sit   amet  felis\nsuscipit   tristique.   Nam  a\nimperdiet   tellus.  Nulla  eu\nvestibulum urna."
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
    $assertion = justify(...$test['given']);
    $outcome = $assertion === $test['expected'];

    if (!$outcome) {
        echo implode("\n", [
            "\n",
            'Assertion:',
            print_r($assertion, true),
            "\n\n",
            'Expected:',
            print_r($test['expected'], true),
            "\n",
            'FAILED',
        ]);
        continue;
    }

    echo "PASSED\n";
}
