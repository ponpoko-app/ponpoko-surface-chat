import { Sparkles } from "lucide-react";
import { ASSISTANT_NAME } from "../lib/identity";

export function AssistantAvatar(props: { size?: "sm" | "md" }) {
  const dimension = props.size === "md" ? "h-9 w-9" : "h-7 w-7";
  const icon = props.size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <span
      aria-hidden
      className={`assistant-avatar relative flex ${dimension} shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent`}
    >
      <Sparkles className={icon} strokeWidth={1.8} />
    </span>
  );
}

export function AssistantVoice(props: { text: string }) {
  return (
    <figure className="assistant-voice flex w-full max-w-lg items-start gap-3 rounded-2xl border border-border bg-panel/50 px-4 py-3.5 text-left">
      <AssistantAvatar size="md" />
      <div className="min-w-0">
        <figcaption className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
          {ASSISTANT_NAME}
        </figcaption>
        <p className="mt-1 text-xs leading-relaxed text-fg">{props.text}</p>
      </div>
    </figure>
  );
}
