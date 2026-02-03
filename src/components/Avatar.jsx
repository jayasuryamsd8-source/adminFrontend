import { API_BASE_URL } from "../config";

export default function Avatar({ name, photo, size = 40 }) {
  if (photo) {
    const isAbsolute = photo.startsWith("http");
    const src = isAbsolute ? photo : `${API_BASE_URL}/${photo}`;

    return (
      <img
        src={src}        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  }

  // Fallback: initials
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#E0F7FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        color: "#00796B",
      }}
    >
      {initial}
    </div>
  );
}
