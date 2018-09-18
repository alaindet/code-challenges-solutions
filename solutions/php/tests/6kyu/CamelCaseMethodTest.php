<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/6kyu/camelcase-method.php';

class CamelCaseTest extends \PHPUnit\Framework\TestCase
{
  public function testFixed()
  {
    $this->assertEquals("TestCase", camel_case("test case"));
    $this->assertEquals("CamelCaseMethod", camel_case("camel case method"));
    $this->assertEquals("SayHello", camel_case("say hello "));
    $this->assertEquals("CamelCaseWord", camel_case(" camel case word"));
    $this->assertEquals("", camel_case(""));
  }
}
