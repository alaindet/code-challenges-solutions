<?php // https://www.codewars.com/kata/59a9735a485a4d807f00008a/train/php

function poohbear(string $input): string
{
    $output = '';
    $min = 0;
    $max = 256;
    $cells = [$min];
    $pointer = 0;
    $copy = null;
    $loops = [];
    $current =& $cells[$pointer];

    for ($i = 0, $len = strlen($input); $i < $len; $i++) {

        // Alias current character
        $char = $input[$i];

        // Basic arithmetic
        if ($char === '+') $current += 1;
        if ($char === 'L') $current += 2;
        if ($char === '-') $current -= 1;
        if ($char === 'I') $current -= 2;
        if ($char === 'T') $current *= 2;
        if ($char === 'Q') $current *= $current;
        if ($char === 'V') $current /= 2;

        // Deal with copied values
        if ($char === 'c') $copy = $current;
        if ($char === 'p' && isset($copy)) $current = $copy;
        if ($char === 'A' && isset($copy)) $current += $copy;
        if ($char === 'B' && isset($copy)) $current -= $copy;
        if ($char === 'Y' && isset($copy)) $current *= $copy;
        if ($char === '/' && isset($copy)) $current /= $copy;

        // Move pointer
        if ($char === '<' || $char === '>') {

            // Update the pointer
            $pointer += ($char === '>') ? 1 : -1;

            // Initialize new cell
            if (!isset($cells[$pointer])) $cells[$pointer] = $min;

            // Move the current cell alias to the new cell
            $current =& $cells[$pointer];
        }

        // Output stuff
        if ($char === 'P') $output .= chr($current);
        if ($char === 'N') $output .= $current;

        // Validate current value: parse as integer, wrap into 0-255
        $current = round($current);
        if ($current < $min) $current += $max;
        if ($current >= $max) $current -= $max;

        // Loops
        if ($char === 'W') $loops[] = $i;
        if ($char === 'E' && $current !== 0) $i = (array_pop($loops) ?? 0) - 1;
    }

    return $output;
}
