<?php // https://www.codewars.com/kata/maximum-length-difference

function mxdiflg($a1, $a2) {

    if (empty($a1) || empty($a2)) {
        return -1;
    }

    $maxDiff = 0;
    foreach ($a1 as $word1) {
      foreach ($a2 as $word2) {
        $diff = abs(strlen($word2) - strlen($word1));
        if ($diff > $maxDiff) {
          $maxDiff = $diff;
        }
      }
    }
    return $maxDiff;
}

// Testing
$s1 = ["hoqq", "bbllkw", "oox", "ejjuyyy", "plmiis", "xxxzgpsssa", "xxwwkktt", "znnnnfqknaz", "qqquuhii", "dvvvwz"];
$s2 = ["cccooommaaqqoxii", "gggqaffhhh", "tttoowwwmmww"];
echo (mxdiflg($s1, $s2) === 13 ? "" : "not ")."passed\n";
