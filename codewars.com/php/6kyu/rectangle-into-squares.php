<?php

// https://www.codewars.com/kata/55466989aeecab5aac00003e/train/phps
function sqInRect($dimension1, $dimension2)
{
    // Edge case
    if ($dimension1 === $dimension2) {
        return null;
    }
    
    $result = [];
    $base = max($dimension1, $dimension2);
    $height = min($dimension1, $dimension2);
    $area = $base * $height;

    // Keep subtracting inner squares from the initial area until area = 0
    while ($area > 0) {

        $result[] = $height;
        $area -= $height * $height;

        // Update base and height to a smaller (inner) rectangle
        $temp = $height;
        $height = $base - $temp;
        $base = $temp;

        // Swap base and height (once every two iterations)
        if ($height > $base) {
            $swap = $height;
            $height = $base;
            $base = $swap;
        }
    }
    
    return $result;
}
