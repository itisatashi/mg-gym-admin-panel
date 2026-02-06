import { NavLink } from "react-router-dom";

function NavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${
          isActive
            ? "bg-accent/20 text-white border border-accent/30"
            : "text-text-secondary hover:bg-white/5 hover:text-white hover:translate-x-1"
        }  
      `
      }
    >
      <span>{icon}</span>
      <span className="font-medium">{children}</span>
    </NavLink>
  );
}

export default NavItem;
