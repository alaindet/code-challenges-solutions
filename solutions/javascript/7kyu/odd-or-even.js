/**
 * Given an array of numbers(a list in groovy), determine whether
 * the sum of all of the numbers is odd or even.
 * Give your answer in string format as 'odd' or 'even'.
 * If the input array is empty consider it as: [0](array with a zero).
 * 
 * @param array numbers 
 * @return string 'even' or 'odd'
 */
const oddOrEven = (n) => (n||[0]).reduce((s,i)=>s+=i,0)%2===0?'even':'odd';

// Testing
console.log(oddOrEven([2, 5, 34, 6]));
