<?php

function read(string $x, array &$dict): int
{
    return is_numeric($x) ? (int) $x : $dict[$x];
}

function simple_assembler(array $program): array
{
    $dict = [];

    for ($i = 0, $len = count($program); $i < $len; $i++) {
        $bits = explode(' ', $program[$i]);
        $name = $bits[0];
        $reg = $bits[1];
        $arg = $bits[2] ?? null;
        if ($name === 'mov') $dict[$reg] = read($arg, $dict);
        if ($name === 'inc') $dict[$reg]++;
        if ($name === 'dec') $dict[$reg]--;
        if ($name === 'jnz') $i += read($reg, $dict) !== 0 ? (int) $arg - 1 : 0;
    }

    ksort($dict);
    return $dict;
}
