import { useEffect, useState } from "react";

export default function CountUp({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // ✅ Hard stop for zero (CRITICAL FIX)
    if (value === 0) {
      setDisplay(0);
      return;
    }

    let start = 0;
    const stepTime = Math.max(
      Math.floor(duration / value),
      16
    );

    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);

      if (start >= value) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{display}</span>;
}
