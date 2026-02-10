import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";

function AdminInfo() {
  const { user } = useUser();
  const { logoutUser, isLoggingOut } = useLogout();

  const name = user?.profile?.fullName || user?.email || "Admin";
  const initial = name.charAt(0).toUpperCase();
  const role = user?.profile?.role === "owner" ? "Owner" : "Staff";

  return (
    <div className="p-4 border-t border-border shrink-0">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-cyan-400 flex items-center justify-center font-semibold shrink-0">
          {initial}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-semibold text-sm truncate" title={name}>
            {name}
          </span>
          <span className="text-xs text-text-muted truncate">{role}</span>
        </div>

        <button
          onClick={logoutUser}
          disabled={isLoggingOut}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-muted hover:text-danger shrink-0"
          title="Logout"
        >
          <HiArrowRightOnRectangle className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default AdminInfo;
