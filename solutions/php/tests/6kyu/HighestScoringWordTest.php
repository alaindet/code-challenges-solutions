<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/6kyu/highest-scoring-word.php';

class HighestScoringWordTest extends \PHPUnit\Framework\TestCase
{
    public function testSampleTests()
    {
        $this->assertEquals(
            'taxi',
            high('man i need a taxi up to ubud')
        );

        $this->assertEquals(
            'volcano',
            high('what time are we climbing up the volcano')
        );

        $this->assertEquals(
            'semynak',
            high('take me to semynak')
        );
    }
}
