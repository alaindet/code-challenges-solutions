<?php // https://www.codewars.com/kata/550f22f4d758534c1100025a/train/php

function dirReduc(array $moves): array
{
    $reduced = [];
    for ($i = 0, $len = count($moves); $i < $len; $i++) {
        if (
            isset($moves[$i+1]) && (
                ($moves[$i] === 'NORTH' && $moves[$i+1] === 'SOUTH') ||
                ($moves[$i] === 'EAST'  && $moves[$i+1] === 'WEST')  ||
                ($moves[$i] === 'SOUTH' && $moves[$i+1] === 'NORTH') ||
                ($moves[$i] === 'WEST'  && $moves[$i+1] === 'EAST')
            )
        ) {
            $i++;
        } else {
            $reduced[] = $moves[$i];
        }
    }

    return (count($reduced) === count($moves)) ? $reduced : dirReduc($reduced);
}
