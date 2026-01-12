// https://www.codewars.com/kata/55dcdd2c5a73bdddcb000044/train/javascript

/**
 * @typedef {[number, number, number, number]} Rectangle
 * @typedef {number} RectangleArea
 */

/**
 * Solves the challenge of summing areas of N rectangles, excluding intersections
 *
 * @param {Rectangle[]} rectangles
 * @returns {RectangleArea}
 */
function calculate(rectangles) {
  let totalArea = 0;
  const rectanglesCount = rectangles.length;

  for (let i = 0; i < rectanglesCount; i++) {
    totalArea += calculateRectangleArea(rectangles[i]);
    for (let j = 0; j < rectanglesCount; j++) {
      totalArea -= intersectionArea(rectangles[i], rectangles[j]);
    }
  }

  return totalArea;
}

/**
 * Calculates the area of a rectangle
 *
 * @param {Rectangle} rectangle
 * @returns {RectangleArea}
 */
function calculateRectangleArea(rectangle) {
  // Short, but unreadable
  // return (rectangle[2] - rectangle[0]) * (rectangle[3] - rectangle[1]);

  const [bottomLeftX, bottomLeftY, topRightX, topRightY] = rectangle;
  const width = topRightX - bottomLeftX;
  const height = topRightY - bottomLeftY;
  return width * height;
}

/**
 * Returns the area of the intersection of two rectangles (0 = no intersection)
 *
 * @param {Rectangle} a
 * @param {Rectangle} b
 * @returns {RectangleArea}
 */
function intersectionArea(a, b) {
  const [aBottomLeftX, aBottomLeftY, aTopRightX, aTopRightY] = a;
  const [bBottomLeftX, bBottomLeftY, bTopRightX, bTopRightY] = b;

  /** @type {Rectangle} */
  const intersectionRectangle = [
    Math.max(aBottomLeftX, bBottomLeftX),
    Math.max(aBottomLeftY, bBottomLeftY),
    Math.min(aTopRightX, bTopRightX),
    Math.min(aTopRightY, bTopRightY),
  ];

  return calculateRectangleArea(intersectionRectangle);
}
