<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/6kyu/pi-approximation.php';

class PiApproximationTest extends \PHPUnit\Framework\TestCase
{
    public function testPiApproximation()
    {
        $this->assertEquals([10, 3.0418396189], iterPi(0.1));
        $this->assertEquals([100, 3.1315929036], iterPi(0.01));
        $this->assertEquals([1000, 3.1405926538], iterPi(0.001));
    }
}
