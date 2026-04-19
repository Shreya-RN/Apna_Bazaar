import { useToast } from "../context/ToastContext";

export default function InlineActions({
  onView,
  primaryLabel = "Quick View",
  secondaryLabel = "Contact",
}) {
  const { showToast } = useToast();

  return (
    <div className="inline-actions-row">
      <button className="glass-action-btn primary-glass-btn" onClick={onView}>
        {primaryLabel}
      </button>
      <button
        className="glass-action-btn secondary-glass-btn"
        onClick={() => showToast(`${secondaryLabel} action triggered`, "success")}
      >
        {secondaryLabel}
      </button>
    </div>
  );
}