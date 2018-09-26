<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/5kyu/where-my-anagrams-at.php';

class WhereMyAnagramsAtTest extends \PHPUnit\Framework\TestCase
{
    public function testDirectionsReduction()
    {
        $this->assertEquals(
            ['a'],
            anagrams('a', ['a', 'b', 'c', 'd'])
        );

        $this->assertEquals(
            ['carer', 'arcre', 'carre'],
            anagrams(
                'racer',
                ['carer', 'arcre', 'carre', 'racrs', 'racers', 'arceer', 'raccer', 'carrer', 'cerarr']
            )
        );

        $this->assertEquals(
            ['aabb', 'bbaa'],
            anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])
        );

        $this->assertEquals(
            ['carer', 'racer'],
            anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])
        );
        
        $this->assertEquals(
            [],
            anagrams('laser', ['lazing', 'lazy',  'lacer'])
        );
    }
}
