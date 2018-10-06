<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/4kyu/permutations.php';

class PermutationsTest extends \PHPUnit\Framework\TestCase
{
    private function assertEquivalent(array $expected, array $actual)
    {
        sort($expected);
        sort($actual);
        $this->assertEquals($expected, $actual);
    }
    public function testPermutations()
    {
        $this->assertEquivalent(['a'], permutations('a'));

        $this->assertEquivalent(['ab', 'ba'], permutations('ab'));

        $this->assertEquivalent(
            ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa'],
            permutations('aabb')
        );
    }
}
