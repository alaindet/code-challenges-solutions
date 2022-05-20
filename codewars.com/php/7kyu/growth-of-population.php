<?php // https://www.codewars.com/kata/563b662a59afc2b5120000c6

/**
 * Given a town with initial population of $p0,
 * every year the population increments by a fixed percentage ($percentGrowth),
 * plus a fixed value $fixedGrowth, (ex.: 50 people).
 * 
 * This functions returns the number of years needed to reach a population $p
 *
 * @param integer $populationInitial
 * @param float $growthPercentage
 * @param integer $growthFixed
 * @param integer $populationFinal
 * @return integer
 */
function nbYear(
    int $populationInitial,
    float $growthPercentage,
    int $growthFixed,
    int $populationFinal
): int
{
    $years = 0;
    $populationGrowing = $populationInitial;
    $growthFactor = (100 + $growthPercentage)/100;

    while ($populationGrowing < $populationFinal) {
        $populationGrowing = $growthFactor * $populationGrowing + $growthFixed;
        $years++;
    }

    return $years;
}


/**
 * Shorter version of nbYear
 *
 * @param integer $p0
 * @param float $percent
 * @param integer $fixed
 * @param integer $p
 * @return integer
 */
function nbYearShorter(int $p0, float $percent, int $fixed, int $p): int
{
    $y = 0; $pop = $p0; $f = (100 + $percent) / 100;
    while ($pop < $p) { $pop = $f * $pop + $fixed; $y++; }
    return $y;
}

// Testing
echo nbYear2(1500000, 2.5, 10000, 2000000)."\n"; // 10
echo nbYear2(1500, 5, 100, 5000)."\n"; // 15
