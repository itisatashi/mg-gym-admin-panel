import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: windowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(windowName) });
}

function Window({ children, name, title }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={close}
      />

      {/* Modal box  */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-bg-secondary border border-border rounded-2xl 
                    w-full max-w-lg z-50 shadow-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={close}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <HiXMark className="text-xl" />
          </button>
        </div>
        {/* Content */}
        <div className="p-5">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
