import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button
      onClick={handleClick}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
    >
      <HiEllipsisVertical className="text-xl" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  if (openId !== id) return null;

  return createPortal(
    <>
      {/* Invisible backdrop to close menu */}
      <div className="fixed inset-0 z-40" onClick={close} />

      {/* Menu */}
      <ul
        className="fixed bg-bg-secondary border border-border rounded-xl 
                     py-2 shadow-lg z-50 min-w-40"
        style={{ right: position.x, top: position.y }}
      >
        {children}
      </ul>
    </>,
    document.body
  );
}

function Button({ children, icon, onClick, danger = false }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <button
        onClick={handleClick}
        className={`flex items-center gap-3 w-full px-4 py-2 text-left text-sm
                     hover:bg-white/5 transition-colors
                     ${danger ? "text-danger hover:bg-danger/10" : ""}`}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
