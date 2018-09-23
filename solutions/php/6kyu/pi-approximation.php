<?php

function iterPi(float $epsilon): array
{
    $calculatedPi = 0;
    $referencePi = pi();
    $i = 0;

    while (abs($referencePi - $calculatedPi) > $epsilon) {
        $calculatedPi += (((-1)**$i) * 4) / (2*$i + 1);
        $i++;
    }

    return [$i, number_format($calculatedPi, 10)];
}
