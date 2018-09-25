<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/5kyu/directions-reduction.php';

class DirectionsReductionTest extends \PHPUnit\Framework\TestCase
{
    public function testDirectionsReduction()
    {
        $this->assertEquals(
            ['WEST'],
            dirReduc(['NORTH','SOUTH','SOUTH','EAST','WEST','NORTH','WEST'])
        );

        $this->assertEquals(
            [],
            dirReduc(['NORTH','SOUTH','SOUTH','EAST','WEST','NORTH'])
        );

        $this->assertEquals(
            ['NORTH'],
            dirReduc(['NORTH','SOUTH','SOUTH','EAST','WEST','NORTH','NORTH'])
        );
    }
}
