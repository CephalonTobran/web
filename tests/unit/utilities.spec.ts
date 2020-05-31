import { percentage } from "@/utilities"

describe("percentage", () => {
  it("returns the correct percentage", () => {
    const testResult = percentage(10, 50)
    expect(testResult).toStrictEqual(20)
  })

  it("returns an integer", () => {
    const testResult = percentage(11, 87)
    expect(testResult).toStrictEqual(12)
  })

  it("returns 0 when total is less than 1", () => {
    const testResult = percentage(10, -1)
    expect(testResult).toStrictEqual(0)
  })

  it("returns 0 when number is less than 1", () => {
    const testResult = percentage(-1, 50)
    expect(testResult).toStrictEqual(0)
  })
})
