<?php

function camel_case(string $input): string {
  return implode('', array_map('ucfirst', explode(' ', $input)));
}
