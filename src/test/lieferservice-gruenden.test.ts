import { describe, it, expect } from "vitest";
import data from "../../public/locales/de/lieferservice-gruenden.json";

describe("LieferserviceGruenden — Data Layer", () => {
  const STATS = data.stats.items;
  const STEPS = data.steps.items;
  const COMPARE_ROWS = data.compare.rows;
  const FAQ_ITEMS = data.faq.items;

  it("STATS has exactly 4 entries with required fields", () => {
    expect(STATS).toHaveLength(4);
    STATS.forEach((s) => {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
      expect(s.source).toBeTruthy();
      expect(s.href).toMatch(/^https?:\/\//);
    });
  });

  it("STEPS has exactly 4 entries, step 4 is featured with products", () => {
    expect(STEPS).toHaveLength(4);
    expect(STEPS[0].featured).toBe(true);
    expect(STEPS[0].products).toHaveLength(4);
    STEPS[0].products!.forEach((p) => {
      expect(p.href).toMatch(/^\/produkte\//);
    });
  });

  it("COMPARE_ROWS has exactly 8 entries with required boolean flags", () => {
    expect(COMPARE_ROWS).toHaveLength(8);
    COMPARE_ROWS.forEach((r) => {
      expect(r.label).toBeTruthy();
      expect(typeof r.ownGood).toBe("boolean");
      expect(typeof r.platformBad).toBe("boolean");
    });
  });

  it("FAQ_ITEMS has exactly 5 entries with non-empty q and a", () => {
    expect(FAQ_ITEMS).toHaveLength(5);
    FAQ_ITEMS.forEach((f) => {
      expect(f.q.length).toBeGreaterThan(10);
      expect(f.a.length).toBeGreaterThan(50);
    });
  });
});
