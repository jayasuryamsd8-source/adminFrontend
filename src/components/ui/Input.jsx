export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-md px-3 py-2 text-sm transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        ${className}`}
      style={{
        backgroundColor: "rgb(var(--surface))",
        color: "rgb(var(--text-primary))",
        border: "1px solid rgb(var(--border))",
      }}
    />
  );
}

export function Select({ className = "", ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-md px-3 py-2 text-sm transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        ${className}`}
      style={{
        backgroundColor: "rgb(var(--surface))",
        color: "rgb(var(--text-primary))",
        border: "1px solid rgb(var(--border))",
      }}
    >
      {props.children}
    </select>
  );
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-md px-3 py-2 text-sm transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        ${className}`}
      style={{
        backgroundColor: "rgb(var(--surface))",
        color: "rgb(var(--text-primary))",
        border: "1px solid rgb(var(--border))",
      }}
    />
  );
}
