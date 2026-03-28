import { describe, it, expect } from "vitest";

describe("LieferserviceGruenden — Data Layer", () => {
  it("STATS has exactly 4 entries with required fields", async () => {
    const { STATS } = await import("../pages/LieferserviceGruendenPage");
    expect(STATS).toHaveLength(4);
    STATS.forEach((s: { value: string; label: string; source: string; href: string }) => {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
      expect(s.source).toBeTruthy();
      expect(s.href).toMatch(/^https?:\/\//);
    });
  });

  it("STEPS has exactly 4 entries, step 4 is featured with products", async () => {
    const { STEPS } = await import("../pages/LieferserviceGruendenPage");
    expect(STEPS).toHaveLength(4);
    expect(STEPS[3].featured).toBe(true);
    expect(STEPS[3].products).toHaveLength(4);
    STEPS[3].products!.forEach((p: { label: string; href: string }) => {
      expect(p.href).toMatch(/^\/produkte\//);
    });
  });

  it("COMPARE_ROWS has exactly 8 entries with required boolean flags", async () => {
    const { COMPARE_ROWS } = await import("../pages/LieferserviceGruendenPage");
    expect(COMPARE_ROWS).toHaveLength(8);
    COMPARE_ROWS.forEach((r: { label: string; own: string; ownGood: boolean; platform: string; platformBad: boolean }) => {
      expect(r.label).toBeTruthy();
      expect(typeof r.ownGood).toBe("boolean");
      expect(typeof r.platformBad).toBe("boolean");
    });
  });

  it("FAQ_ITEMS has exactly 5 entries with non-empty q and a", async () => {
    const { FAQ_ITEMS } = await import("../pages/LieferserviceGruendenPage");
    expect(FAQ_ITEMS).toHaveLength(5);
    FAQ_ITEMS.forEach((f: { q: string; a: string }) => {
      expect(f.q.length).toBeGreaterThan(10);
      expect(f.a.length).toBeGreaterThan(50);
    });
  });
});
