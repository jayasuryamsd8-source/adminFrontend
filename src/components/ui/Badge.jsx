export default function Badge({ variant = "default", children }) {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-success-subtle text-success",
    warning: "bg-warning-subtle text-warning",
    danger: "bg-danger-subtle text-danger",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}
