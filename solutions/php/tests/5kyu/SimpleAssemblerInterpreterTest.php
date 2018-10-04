<?php

// Load the function to test
require dirname(dirname(__DIR__)).'/5kyu/simple-assembler-interpreter.php';

class SimpleAssemblerInterpreterTest extends \PHPUnit\Framework\TestCase
{
    public function testSimpleAssemblerInterpreter()
    {
        $this->assertEquals(
            [
                'c' => 409600,
                'b' => 409600,
                'a' => 409600
            ],
            simple_assembler([
                'mov c 12',
                'mov b 0',
                'mov a 200',
                'dec a',
                'inc b',
                'jnz a -2',
                'dec c',
                'mov a b',
                'jnz c -5',
                'jnz 0 1',
                'mov c a'
            ])
        );
        
        $this->assertEquals(
            [
                'a' => 0,
                'b' => -20
            ],
            simple_assembler([
                'mov a -10',
                'mov b a',
                'inc a',
                'dec b',
                'jnz a -2'
            ])
        );
    
        $this->assertEquals(
            [
                'a' => 1
            ],
            simple_assembler([
                'mov a 5',
                'inc a',
                'dec a',
                'dec a',
                'jnz a -1',
                'inc a'
            ])
        );
    }
}
