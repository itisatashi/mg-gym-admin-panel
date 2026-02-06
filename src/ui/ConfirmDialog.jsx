import { HiExclamationTriangle } from "react-icons/hi2";

function ConfirmDialog({
  title = "Delete",
  message = "Are you sure? This action cannot be undone.",
  confirmText = "Delete",
  onConfirm,
  onCloseModal, // ← comes from Modal.Window's cloneElement
  disabled = false,
}) {
  function handleConfirm() {
    onConfirm();
    onCloseModal?.();
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Icon + Message */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-danger/20 rounded-full">
          <HiExclamationTriangle className="text-2xl text-danger" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-text-secondary text-sm mt-1">{message}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          onClick={onCloseModal}
          className="btn-ghost"
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-danger hover:bg-danger/90 text-white 
                     font-semibold rounded-xl transition-colors"
          disabled={disabled}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDialog;
