export const ASSISTANT_NAME = "Assistant";

export type Readiness = boolean | null;

export const GREETING_STARTING = "Starting up — the model list arrives in a moment.";

export const GREETING_SETUP =
  "This chat needs a model before it can answer. Pick one right here, then ask anything.";

export const GREETING_READY =
  "Ready when you are. Ask anything — and pick a personality in thread settings if you want a different register.";

export const MODEL_SETUP_TITLE = "Set up the model this chat uses";

export const MODEL_SETUP_NOTE =
  "One provider, one key, one model. It is stored by Ponpoko on this machine and never leaves it except to reach the provider you pick.";

export function assistantGreeting(readiness: Readiness): string {
  if (readiness === null) return GREETING_STARTING;
  return readiness ? GREETING_READY : GREETING_SETUP;
}

export function assistantNeedsSetup(readiness: Readiness): boolean {
  return readiness === false;
}
