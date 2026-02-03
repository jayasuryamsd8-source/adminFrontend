export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-surface rounded-xl shadow-sm border border-border ${className}`}>
      {children}
    </div>
  );
}
