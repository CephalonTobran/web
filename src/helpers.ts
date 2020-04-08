/**
 * Calculate the percentage of two numbers
 *
 * @export
 * @param {number} number
 * @param {number} total
 * @returns
 */
export function percentage(number: number, total: number) {
  if (number < 0) number = 0
  return Math.floor((number / total) * 100)
}
