<?php

/**
 * Age ratio (DAD/SON) starts from infinity (ex.: 30/0) and will tend to 1+
 * Realistically it will reach ~1.3
 * Returns a positive integer anyway
 * 
 * @param integer $dad Dad's age
 * @param integer $son Son's age
 * @return integer Years difference from now when the dad is twice as old as son
 */
function twice_as_old(int $dad, int $son): int
{
    $ratio = 2;
    $years = 0;

    // Special case (division by zero!)
    if ($son === 0) {
        $years++;
        $son+=$years;
        $dad+=$years;
    }

    $direction = (($dad / $son) > $ratio) ? 1 : -1; // +1 forward, -1 back

    while ($dad / $son !== $ratio) {
        $years++;
        $dad += $direction;
        $son += $direction;
    }

    return $years < 0 ? -$years : $years;
}

// Testing
echo array_reduce([
    twice_as_old(36,  7) === 22,
    twice_as_old(55, 30) ===  5,
    twice_as_old(42, 21) ===  0,
    twice_as_old(22,  1) === 20,
], function ($log, $test) {
    return $log .= ($test ? '' : 'not ') . "passed\n";
});
