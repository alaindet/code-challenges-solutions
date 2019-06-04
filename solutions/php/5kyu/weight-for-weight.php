<?php
/**
 * Weight for weight
 * https://www.codewars.com/kata/55c6126177c9441a570000cc/train/php
 * 
 * My friend John and I are members of the "Fat to Fit Club (FFC)". John is
 * worried because each month a list with the weights of members is published
 * and each month he is the last on the list which means he is the heaviest.
 * 
 * I am the one who establishes the list so I told him: "Don't worry any more,
 * I will modify the order of the list". It was decided to attribute a "weight"
 * to numbers. The weight of a number will be from now on the sum of its digits.
 * 
 * For example 99 will have "weight" 18, 100 will have "weight" 1 so in the
 * list 100 will come before 99. Given a string with the weights of FFC members
 * in normal order can you give this string ordered by "weights" of these
 * numbers?
 * 
 * Example:
 * "56 65 74 100 99 68 86 180 90"
 * ordered by numbers weights becomes:
 * "100 180 90 56 65 74 68 86 99"
 * 
 * When two numbers have the same "weight", let us class them as if they were
 * strings and not numbers: 100 is before 180 because its "weight" (1) is less
 * than the one of 180 (9) and 180 is before 90 since, having the same
 * "weight" (9), it comes before as a string
 * 
 * All numbers in the list are positive numbers and the list can be empty
 * 
 * Notes
 * =====
 * - It may happen that the input string have leading, trailing whitespaces and
 *   more than a unique whitespace between two consecutive numbers
 * - Don't modify the input
 */

function sumDigits(string $number): int
{
    $sum = 0;
    for ($i = 0, $len = strlen($number); $i < $len; $i++) {
        $digit = (int) $number[$i];
        $sum += $digit;
    }
    return $sum;
}

function sortDigits(string $a, string $b): int
{
    // Sort by sum of digits, ascendant
    $compareSumOfDigits = sumDigits($a) <=> sumDigits($b);
    if ($compareSumOfDigits !== 0) {
        return $compareSumOfDigits;
    }

    // Sort alphabetically, ascendant
    return strcmp($a, $b);
}

function orderWeight(string $list): string
{
    if ($list === "") {
        return "";
    }

    $rawNumbers = explode(" ", trim($list));

    if (empty($rawNumbers)) {
        return "";
    }

    $numbers = [];
    foreach ($rawNumbers as $rawNumber) {
        $numbers[] = trim($rawNumber);
    }

    usort($numbers, "sortDigits");
    return implode(" ", $numbers);
}

// TESTS ----------------------------------------------------------------------
$testCounter = 0;
echo array_reduce(

    // Tests
    [
        [
            "input" => "103 123 4444 99 2000",
            "expected" => "2000 103 123 4444 99",
        ],
        [
            "input" => "2000 10003 1234000 44444444 9999 11 11 22 123",
            "expected" => "11 11 2000 10003 22 123 1234000 44444444 9999",
        ],
    ],

    // Reducer
    function ($log, $test) use (&$testCounter)
    {
        $testCounter++;
        $asserted = orderWeight($test["input"]);
        $expected = $test["expected"];
        $outcome = ($asserted === $expected) ? "PASSED" : "NOT PASSED";

        $log .= "{$testCounter}. {$outcome}\n";

        if ($outcome === "NOT PASSED") {
            $log .= (
                "Expected: {$expected}\n".
                "Asserted: {$asserted}\n"
            );
        }

        return $log;
    },

    // Output
    $initialLog = ""
);
