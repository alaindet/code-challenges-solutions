<?php
// https://www.codewars.com/kata/decode-the-morse-code

class MorseDecoder
{
    private $betweenLetters = ' ';
    private $betweenWords = '   ';
    private $morse;
    private $morseToEnglish;

    public function __construct(string $morse = null)
    {
        $this->morse($morse);
        $this->morseToEnglish = MORSE_CODE;
    }

    public function morse(string $morse = null): MorseDecoder
    {
        if (isset($morse)) {
            $this->morse = trim($morse);
        }
        return $this;
    }

    private function translateWord(string $word): string
    {
        return implode('', array_map(
            [$this, 'translateLetter'],
            explode($this->betweenLetters, $word)
        ));
    }

    private function translateLetter(string $letter): string
    {
        return $this->morseToEnglish[$letter] ?? '';
    }

    public function translateToEnglish(): string
    {
        return implode(' ', array_map(
            [$this, 'translateWord'],
            explode($this->betweenWords, trim($this->morse))
        ));
    }
}


function decode_morse(string $morse)
{
    return (new MorseDecoder)->morse($morse)->translateToEnglish();
}

// Testing
echo decode_morse('.... . -.--   .--- ..- -.. .')."\n";
echo "HEY JUDE\n";
