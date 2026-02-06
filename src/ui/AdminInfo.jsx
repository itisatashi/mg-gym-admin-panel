function AdminInfo() {
  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-cyan-400 flex items-center justify-center font-semibold">
          A
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-sm">Admin</span>
          <span className="text-xs text-text-muted ">Manager</span>
        </div>
      </div>
    </div>
  );
}

export default AdminInfo;
