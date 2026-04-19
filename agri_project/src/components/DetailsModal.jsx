import { motion, AnimatePresence } from "framer-motion";

export default function DetailsModal({
  open,
  onClose,
  title = "Details",
  fields = [],
  actions = null,
  extraContent = null,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="details-modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="details-modal-card iphone-glass liquid-shell"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="details-modal-header">
              <h2>{title}</h2>
              <button className="details-modal-close" onClick={onClose}>
                ×
              </button>
            </div>

            <div className="details-modal-body">
              {fields.map((field) => (
                <div className="details-modal-row" key={field.label}>
                  <span className="details-modal-label">{field.label}</span>
                  <span className="details-modal-value">{field.value || "—"}</span>
                </div>
              ))}
            </div>

            {extraContent}

            {actions ? <div className="details-modal-actions">{actions}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}