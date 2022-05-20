/**
 * This is the less exoteric way to perform "pig-latinization" of a sentence;
 * 
 * @param string sentence Ex.: "Hello World" => "elloHay orldWay"
 */
const pigtItSimpler = (sentence) => {

  const suffix = "ay";

  const pigLatinizer = (word) => {
    let firstLetter = word[0];
    let otherLetters = word.slice(1);
    return otherLetters + firstLetter + suffix;
  }

  return sentence.replace(/([A-Za-z]+)/g, pigLatinizer);
};

/**
 * Compact form of pigItSimpler
 *
 * @param string s The sentence to process
 */
const pigIt = s => s.replace(/([A-Za-z]+)/g, w => w.slice(1) + w[0] + "ay");

// // Testing
// console.log(
//   [
//     'Just a plain period',
//     'Let\'s add some punctuation, shall we?',
//     'Pig latin is cool, mate!'
//   ].map(pigIt).reduce((tests, test) => tests += `${test}\n`, '')
// );

// Results
// ustJaayy a laypay eriodpay
// etLay'say ddaay omesay unctuationpay, hallsay eway?
// igPay atinlay siay oolcay, atemay!
