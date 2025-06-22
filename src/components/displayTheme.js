import React, { useEffect, useState } from "react";
import axios from "axios";

const ThemeDisplay = () => {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await axios.get("https://api.malidag.com/themes/");
        setThemes(res.data.themes || []);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Available Themes</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        {themes.map((theme) => (
          <div
  key={theme.id}
  style={{
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff"
  }}
>
  {theme.image ? (
    <>
      <img
        src={theme.image}
        alt={theme.theme}
        style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "4px" }}
      />
      <div style={{ marginTop: "0.5rem" }}>
        <a
          href={theme.image}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.75rem", color: "blue", textDecoration: "underline" }}
        >
          Copy Image URL
        </a>
      </div>
    </>
  ) : (
    <div style={{ padding: "1rem", textAlign: "center", color: "#999" }}>
      No Image
    </div>
  )}
  <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", fontWeight: "bold" }}>
    {theme.theme}
  </div>
  <div style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
    <strong>ID:</strong> {theme.id}
  </div>
  <div style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
    <strong>Types:</strong> {theme.types.join(", ")}
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default ThemeDisplay;
