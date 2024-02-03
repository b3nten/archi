import * as vi from "vitest"

import { test } from "./index"

vi.test("test", () => {
  vi.expect(test()).toBe("hello, friend :)")
}) 