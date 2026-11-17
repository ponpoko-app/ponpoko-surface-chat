import { describe, expect, test } from "bun:test";
import {
  DEFAULT_PERSONALITY_ID,
  PERSONALITY_PRESETS,
  isPersonalityId,
  personalityLabel,
  resolvePersonality,
} from "../src/lib/personality";
import { NEUTRAL_ASSISTANT_PROMPT, systemPrompt } from "../backend/turns";

const PERSONA = /\b(poko|tanuki)\b/i;
const LEGACY_STYLE_IDS = ["code", "review", "teach", "", "  ", "nope"];

describe("personality presets", () => {
  test("every preset is one simple choice with a stable id", () => {
    expect(PERSONALITY_PRESETS.length).toBeGreaterThanOrEqual(4);
    expect(PERSONALITY_PRESETS.length).toBeLessThanOrEqual(6);
    expect(new Set(PERSONALITY_PRESETS.map((preset) => preset.id)).size).toBe(
      PERSONALITY_PRESETS.length,
    );
    for (const preset of PERSONALITY_PRESETS) {
      expect(isPersonalityId(preset.id)).toBe(true);
      expect(resolvePersonality(preset.id).id).toBe(preset.id);
      expect(personalityLabel(preset.id)).toBe(preset.name);
      expect(preset.name.trim()).not.toBe("");
      expect(preset.description.trim()).not.toBe("");
      expect(preset.preamble.trim()).not.toBe("");
      expect(preset).not.toHaveProperty("prompt");
      expect(preset).not.toHaveProperty("instructions");
    }
    expect(PERSONALITY_PRESETS.map((preset) => preset.id)).toContain(DEFAULT_PERSONALITY_ID);
  });

  test("an unknown id, an old id or nothing at all resolves to the default preset", () => {
    const fallback = resolvePersonality(DEFAULT_PERSONALITY_ID);
    for (const id of [...LEGACY_STYLE_IDS, null, undefined]) {
      expect(isPersonalityId(id)).toBe(false);
      expect(resolvePersonality(id)).toBe(fallback);
    }
    expect(resolvePersonality(null).name).toBe(fallback.name);
  });
});

describe("the composed system prompt", () => {
  test("carries the selected preset and never a persona", () => {
    for (const preset of PERSONALITY_PRESETS) {
      const prompt = systemPrompt({ style_id: preset.id }, "th", "สวัสดี");
      expect(prompt.startsWith(NEUTRAL_ASSISTANT_PROMPT)).toBe(true);
      expect(prompt).toContain(preset.preamble);
      expect(prompt).toContain("Thai");
      expect(prompt).not.toMatch(PERSONA);
    }
  });

  test("never injects free-form instructions kept by an old thread", () => {
    const prompt = systemPrompt(
      { style_id: "general", system_prompt: "You are Poko the tanuki who builds surfaces." },
      "auto",
      "hello",
    );
    expect(prompt).not.toMatch(PERSONA);
    expect(prompt).not.toContain("builds surfaces");
    expect(prompt).not.toContain("surface_recommend");
  });

  test("an unknown style produces exactly the default preset's prompt", () => {
    expect(systemPrompt({ style_id: "code" }, "auto")).toBe(
      systemPrompt({ style_id: DEFAULT_PERSONALITY_ID }, "auto"),
    );
  });
});
