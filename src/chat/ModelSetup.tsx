import { useState } from "react";
import { Loader2, Settings2 } from "lucide-react";
import { openSettings, type Host } from "../app/host";
import { MODEL_SETUP_NOTE, MODEL_SETUP_TITLE } from "../lib/identity";
import { AssistantAvatar } from "./Assistant";

export function ModelSetup(props: { host: Host; notify: (message: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = async () => {
    setBusy(true);
    setError(null);
    try {
      await openSettings(props.host, "model");
      props.notify(
        "Ponpoko's Chat model settings are open in the host window — a provider, a key and a model are all it needs.",
      );
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      aria-label={MODEL_SETUP_TITLE}
      className="model-setup mt-4 w-full max-w-lg rounded-2xl border border-accent/35 bg-panel/60 px-4 py-4 text-left"
    >
      <div className="flex items-start gap-3">
        <AssistantAvatar />
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-semibold text-fg">{MODEL_SETUP_TITLE}</h2>
          <p className="mt-1 text-xs leading-relaxed text-fg-muted">{MODEL_SETUP_NOTE}</p>
        </div>
      </div>

      <p className="mt-3 rounded-lg border border-border/70 bg-base/40 px-2.5 py-2 text-xs leading-relaxed text-fg-muted">
        The provider, its key and the model belong to Ponpoko, not to this Chat window: no key ever
        enters this page, and the answer is composed by the model you choose there.
      </p>

      {error && (
        <p role="alert" className="mt-2 rounded-lg border border-danger/40 bg-danger/10 px-2.5 py-2 text-xs text-danger">
          {error}
        </p>
      )}

      <div className="mt-3 flex items-center justify-end">
        <button
          type="button"
          disabled={busy}
          onClick={() => void open()}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent via-accent-lime to-accent-gold px-3 py-1.5 text-xs font-semibold text-on-accent transition-opacity disabled:opacity-35"
        >
          {busy ? <Loader2 size={12} className="animate-spin" /> : <Settings2 size={12} />}
          Open Chat model settings
        </button>
      </div>
    </section>
  );
}
