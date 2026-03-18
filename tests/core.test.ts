import { describe, it, expect } from "vitest";
import { Processai } from "../src/core.js";
describe("Processai", () => {
  it("init", () => { expect(new Processai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Processai(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Processai(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
