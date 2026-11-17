export interface PersonalityPreset {
  id: string;
  name: string;
  description: string;
  preamble: string;
}

export const DEFAULT_PERSONALITY_ID = "general";

export const PERSONALITY_PRESETS: readonly PersonalityPreset[] = [
  {
    id: "general",
    name: "Balanced",
    description: "Direct and helpful, no persona",
    preamble:
      "Answer the question that was asked, in the register it was asked, at the length it deserves. Be direct and helpful, say what you know and what you do not, and stop when the answer is complete.",
  },
  {
    id: "friendly",
    name: "Friendly",
    description: "Warm, plain language, easy to follow",
    preamble:
      "Talk like a warm, patient person: plain language, short sentences, and no jargon unless the human uses it first. Be encouraging without flattering, and ask one clear question when you need something from the human.",
  },
  {
    id: "concise",
    name: "Concise",
    description: "As few words as the question allows",
    preamble:
      "Answer in as few words as the question allows. No preamble, no restating the question, no summary at the end. Prefer a short list or a small code block over a paragraph. If the answer genuinely needs length, use it — but never pad.",
  },
  {
    id: "expert",
    name: "Expert",
    description: "Precise, technical, names the trade-off",
    preamble:
      "Answer as a senior practitioner: precise terms, the smallest correct answer, and the trade-off you are accepting rather than only the benefit. Mark anything you could not verify as unverified.",
  },
  {
    id: "teacher",
    name: "Teacher",
    description: "Builds a mental model with one example",
    preamble:
      "Teach for a competent person who is new to this subject. Build a mental model before naming details, use one concrete example early, and state one honest caveat where the model stops being useful.",
  },
];

export function resolvePersonality(id: string | null | undefined): PersonalityPreset {
  return PERSONALITY_PRESETS.find((preset) => preset.id === id) ?? PERSONALITY_PRESETS[0]!;
}

export function personalityLabel(id: string | null | undefined): string {
  return resolvePersonality(id).name;
}

export function isPersonalityId(id: string | null | undefined): boolean {
  return PERSONALITY_PRESETS.some((preset) => preset.id === id);
}
