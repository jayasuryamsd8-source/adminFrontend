export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="
        w-full rounded-md border border-border bg-surface
        px-3 py-2 text-sm
        focus:outline-none focus-visible:shadow-focus
      "
    >
      {children}
    </select>
  );
}
