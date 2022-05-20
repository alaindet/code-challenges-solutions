<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/6kyu/backwards-read-primes.php';

class BackwardsReadPrimesTest extends \PHPUnit\Framework\TestCase
{
    public function testBackwardsReadPrimes()
    {
        $this->assertEquals(
            [7027, 7043, 7057],
            backwardsPrime(7000, 7100)
        );

        $this->assertEquals(
            [70001, 70009, 70061, 70079, 70121, 70141, 70163, 70207, 70241],
            backwardsPrime(70000, 70245)
        );

        $this->assertEquals(
            [70489, 70507, 70529, 70573, 70589],
            backwardsPrime(70485, 70600)
        );
    }
}
