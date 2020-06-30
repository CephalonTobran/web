import router from "@/router"
import VueRouter from "vue-router"

describe("router", () => {
  it("should be an instance of VueRouter", () => {
    expect(router).toBeInstanceOf(VueRouter)
  })
})
