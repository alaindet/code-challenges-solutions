<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/6kyu/rectangle-into-squares.php';

class RectangleIntoSquaresTest extends \PHPUnit\Framework\TestCase
{
    public function testBasics() {
        $this->assertEquals(sqInRect(5, 5), null);
        $this->assertEquals(sqInRect(5, 3), [3, 2, 1, 1]);
        $this->assertEquals(sqInRect(3, 5), [3, 2, 1, 1]);
        $this->assertEquals(sqInRect(20, 14), [14, 6, 6, 2, 2, 2]);
    }
}
