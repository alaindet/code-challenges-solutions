<?php

function findCommon(array $array)
{
    if ($array[0] === $array[1]) { return $array[0]; }
    if ($array[1] === $array[2]) { return $array[1]; }
    return $array[2];
}

function find_uniq(array $array)
{
    $common = findCommon($array);

    foreach ($array as &$value) {
        if ($value !== $common) {
            return $value;
        }
    }
}
