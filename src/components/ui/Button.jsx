export default function Button({
  variant = "primary",
  className = "",
  disabled = false,
  children,
  ...props
}) {
  const base =
    "btn focus-visible:ring-2 focus-visible:ring-offset-2";

  if (variant === "primary") {
    return (
      <button
        {...props}
        disabled={disabled}
        className={`${base} btn-primary ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        {...props}
        disabled={disabled}
        className={`${base} btn-secondary ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === "destructive") {
    return (
      <button
        {...props}
        disabled={disabled}
        className={`${base} btn-danger ${className}`}
      >
        {children}
      </button>
    );
  }

  return null;
}
