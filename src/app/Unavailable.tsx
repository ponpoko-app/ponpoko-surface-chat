import type { BootFailure } from "./boot";

export function Unavailable(props: { failure: BootFailure }) {
  const { failure } = props;
  return (
    <div className="unavailable">
      <div className="unavailable-mark" aria-hidden>
        Chat
      </div>
      <h1>{failure.title}</h1>
      <p>{failure.detail}</p>
      <p className="unavailable-recovery">{failure.recovery}</p>
      <p className="unavailable-kind" data-failure-kind={failure.kind}>
        {failure.kind}
      </p>
    </div>
  );
}
