
/**
 * 滑动的方向
 *
 * @param {number} x
 * @param {number} y
 * @return {*} 
 */
export function getDirection(x: number, y: number) {
  const MIN_DISTANCE = 10;

  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}


export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
