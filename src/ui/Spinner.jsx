export default function Spinner({ size = 40 }) {
  return (
    <div className="flex items-center justify-center h-110  w-full">
      <div
        className="animate-spin rounded-full border-8 border-white/10 border-t-indigo-500"
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
