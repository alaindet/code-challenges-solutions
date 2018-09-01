const validParentheses = (str) => {
  if (
    str.length < 0 ||
    str.length > 100 ||
    str[0] === ')'||
    str[str.length - 1] === '(' ||
    ((str.split('(').length-1) !== str.length / 2)
  ) {
    return false;
  }

  return true;
};

// Testing
console.log(validParentheses("()"));             // true
console.log(validParentheses(")(()))"));         // false
console.log(validParentheses("("));              // false
console.log(validParentheses("(())((()())())")); // true
