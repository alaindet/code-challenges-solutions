<?php

/**
 * Gets an integer, processes it in chunks, then returns another integer
 * While processing a chunk,
 * If sum of cubed digits is divisible by 2, reverse chunk's digits
 * Else push the first digit to the end of the chunk
 *
 * @param string $string Integer number as a string
 * @param integer $size Size of the chunks
 * @return string
 */
function revRot(string $string, int $size): string
{
    // Error
    if ($size <= 0 || $size > strlen($string)) {
        return '';
    };

    // Split input string into digits,
    // Group them into chunks,
    // Remove the last chunk if shorter than the others
    $chunks = array_filter(
        array_chunk(str_split($string), $size),
        function ($chunk) use ($size) {
            return count($chunk) === $size;
        }
    );

    // Process the chunks and glue them together
    return implode('', array_map(function ($chunk) {

        // Sum of cubes of digits
        $cubed = array_reduce($chunk, function ($tot, $n) {
            return $tot+=$n**3;
        }, 0);

        // Reverse?
        if ($cubed % 2 === 0) {
            return implode('', array_reverse($chunk));
        }

        // Rotate?
        $first = array_shift($chunk);
        return implode('', $chunk) . $first;

    }, $chunks));
}
