import type { ToolActivity } from "./types";
import { AssistantAvatar } from "./Assistant";
import { ASSISTANT_NAME } from "../lib/identity";

export function AssistantThinking(props: { activities?: ToolActivity[] }) {
  const recent = props.activities?.length
    ? props.activities[props.activities.length - 1]
    : null;
  const doing = recent
    ? `${recent.tool} — ${recent.summary}`
    : "reading what you asked for";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${ASSISTANT_NAME} is thinking`}
      className="assistant-thinking flex items-start gap-3"
    >
      <AssistantAvatar size="md" />
      <div className="min-w-0">
        <p className="flex items-baseline gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-fg">
            {ASSISTANT_NAME}
          </span>
          <span className="text-xs text-fg-muted">
            {recent ? "is using a tool" : "is thinking"}
          </span>
        </p>
        <p className="mt-1.5 flex items-center gap-1.5">
          <span aria-hidden className="assistant-dot" />
          <span aria-hidden className="assistant-dot" />
          <span aria-hidden className="assistant-dot" />
          <span className="ml-1.5 min-w-0 truncate text-xs text-fg-muted">{doing}</span>
        </p>
      </div>
    </div>
  );
}
