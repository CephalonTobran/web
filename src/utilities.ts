/**
 * Calculate the percentage of two numbers
 *
 * @export
 * @param {number} number
 * @param {number} total
 * @returns
 */
export function percentage(number: number, total: number) {
  if (total < 1 || typeof total !== "number") return 0
  if (number < 0 || typeof number !== "number") number = 0
  return Math.floor((number / total) * 100)
}
