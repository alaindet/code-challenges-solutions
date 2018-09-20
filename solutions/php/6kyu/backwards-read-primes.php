<?php // https://www.codewars.com/kata/backwards-read-primes/train/php

function isPrime(int $n): bool
{
    if ($n === 0) {
        return false;
    }

    if ($n === 1) {
        return true;
    }

    for ($i = 2, $len = ceil(sqrt($n)); $i < $len; $i++) {
        if ($n % $i === 0) {
            return false;
        }
    }

    return true;
}

function reverseNumber(int $n): int
{
    return (int) implode('', array_reverse(str_split((string) $n)));
}

function backwardsPrime(int $start, int $stop): array
{
    $result = [];

    for ($i = $start; $i <= $stop; $i++) {
        if (isPrime($i) && isPrime(reverseNumber($i))) {
            $result[] = $i;
        }
    }

    sort($result);

    return $result;
}


var_dump(backwardsPrime(70485, 70600));
