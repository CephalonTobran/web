import { percentage, compareStrings, compareNumbers } from "@/utilities"

describe("percentage", () => {
  it("returns the correct percentage", () => {
    const testResult = percentage(10, 50)
    expect(testResult).toBe(20)
  })

  it("returns 0 when total is less than 1", () => {
    const testResult = percentage(10, -1)
    expect(testResult).toBe(0)
  })

  it("returns 0 when number is less than 1", () => {
    const testResult = percentage(-1, 50)
    expect(testResult).toBe(0)
  })
})

describe("sort compare", () => {
  describe("for strings", () => {
    it("should sort ascending", () => {
      const testResult = compareStrings("alpha", "beta")
      expect(testResult).toBeLessThan(0)
    })

    it("should sort descending", () => {
      const testResult = compareStrings("alpha", "beta", false)
      expect(testResult).toBeGreaterThan(0)
    })

    it("should not sort when identical", () => {
      const testResult = compareStrings("same", "same")
      expect(testResult).toBe(0)
    })
  })

  describe("for numbers", () => {
    it("should sort ascending", () => {
      const testResult = compareNumbers(5, 10)
      expect(testResult).toBeLessThan(0)
    })

    it("should sort descending", () => {
      const testResult = compareNumbers(5, 10, false)
      expect(testResult).toBeGreaterThan(0)
    })

    it("should not sort when identical", () => {
      const testResult = compareNumbers(1, 1)
      expect(testResult).toBe(0)
    })
  })
})
