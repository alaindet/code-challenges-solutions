<?php

// https://www.codewars.com/kata/52449b062fb80683ec000024/train/php

define('CHARACTERS_LIMIT', 140);

/**
 * Turns any string in an hashtag
 * - If input is missing or string is too long (140 characters), returns false
 * - The result is a string starting with # in TitleCase
 *
 * @param string $input
 * @return string|false
 */
function generateHashtag(string $input = '')
{
    // 1) Turn any sequence of 2+ spaces to 1
    // 2) Remove leading and trailing spaces
    $input = trim(preg_replace('/\s+/', ' ', $input));

    // ERROR: Invalid input
    if ($input === "" || strlen($input) >= CHARACTERS_LIMIT) {
        return false;
    }

    return "#" . str_replace(" ", "", ucwords($input));
}

// ==== TEST ==================================================================
class Test
{
    public $expected;
    public $input;
    public $message;

    public function __construct($expected, $input, string $message = null)
    {
        $this->expected = $expected;

        if (!is_array($input)) {
            $input = [$input];
        }

        $this->input = $input;

        if (isset($message)) {
            $this->message = $message;
        }
    }
}

class Tests
{
    public $cases = [];
    public $log = "";
    public $counter = 0;
    public $funcName = "";

    public function addCase(Test $case): void
    {
        $this->cases[] = $case;
    }

    public function run(): string
    {
        $this->counter = 0;
        $this->log = "";
        $func = $this->funcName;
        $o = [];
        
        foreach ($this->cases as $case) {
            $this->counter++;
            $assertion = $func(...$case->input);
            if ($case->expected === $assertion) {
                $o[] = "Test #{$this->counter}: PASSED";
            } else {
                $o[] = implode("\n", [
                    "\n===",
                    "Test #{$this->counter}",
                    "NOT PASSED",
                    "Assertion: {$assertion}",
                    "Expected: {$case->expected}",
                    "Message: " . $case->message ?? "No error message",
                    "===\n"
                ]);
            }
        }

        return $this->log = implode("\n", $o);
    }
}

$tests = new Tests();
$tests->funcName = "generateHashtag";

$tests->addCase(new Test(false, ""));
$tests->addCase(new Test(false, str_repeat(" ", 200)));
$tests->addCase(new Test("#Codewars", "codewars"));
$tests->addCase(new Test("#CodewarsIsNice", "codewars is nice"));
$tests->addCase(new Test("#CodeWars", "Code" . str_repeat(" ", 140) . "wars"));
$tests->addCase(new Test(false, "L".str_repeat("o", 150)."ng Cat"));
$tests->addCase(new Test("#A" . str_repeat("a", 138), str_repeat("a", 139)));
$tests->addCase(new Test(false, str_repeat("f", 140)));

echo $tests->run();
