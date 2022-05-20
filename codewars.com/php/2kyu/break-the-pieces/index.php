<?php

require_once __DIR__ . '/dd.php';
require_once __DIR__ . '/BreakPieces.php';

$tests = [
    [
        'arg' => implode("\n", [
            "+------------+",
            "|            |",
            "|            |",
            "|            |",
            "+------+-----+",
            "|      |     |",
            "|      |     |",
            "+------+-----+",
        ]),
        'expected' => [
            // ...
        ],
    ],
];

foreach ($tests as $test) {
    $result = (new BreakPieces)->process($test['arg']);
    dd($result);
}
