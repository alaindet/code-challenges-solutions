<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/6kyu/find-the-unique-number.php';

class FindUniqueNumberTest extends \PHPUnit\Framework\TestCase
{
  public function testExamples()
  {
    $this->assertEquals(2, find_uniq([1, 1, 1, 2, 1, 1]));
    $this->assertEquals(0.55, find_uniq([0, 0, 0.55, 0, 0]));
    $this->assertEquals(1, find_uniq([0, 1, 0]));
  }
}
