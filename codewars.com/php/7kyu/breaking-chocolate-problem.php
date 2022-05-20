<?php

/**
 * Accepts two sizes of a chocolate bar,
 * Returns minimum number of breaks needed to divide it in 1x1 squares
 *
 * @param int $n
 * @param int $m
 * @return int
 */
function breakChocolate(int $n, int $m): int
{
    return $n * $m  - 1;
}

// Testing
echo array_reduce([
    breakChocolate(5, 5) === 24,
    breakChocolate(1, 1) === 0,
    breakChocolate(2, 1) === 1,
    breakChocolate(1, 2) === 1,
], function ($log, $test) {
    return $log .= ($test ? '' : 'not ') . "passed\n";
});
