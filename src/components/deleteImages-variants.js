import React, { useState } from "react";
import axios from "axios";

const DeleteImagesVariants = () => {
  const [folderId, setFolderId] = useState("");
  const [status, setStatus] = useState(null);
  const API_URL = "https://api.malidag.com"; // Or your proxy path if behind NGINX

  const handleDelete = async () => {
    if (!folderId.trim()) {
      return setStatus("❌ Please provide a folderId.");
    }

    try {
      const response = await axios.delete(`${API_URL}/delete-variants/${folderId}`);
      setStatus(`✅ ${response.data.message}`);
    } catch (error) {
      console.error("Delete error:", error);
      setStatus("❌ Failed to delete images-variants.");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}>
      <h2>🧹 Delete images-variants Folder</h2>
      <input
        type="text"
        placeholder="Enter Folder ID"
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleDelete} style={{ padding: "10px 20px" }}>
        Delete Variants
      </button>

      {status && (
        <p style={{ marginTop: "1rem", color: status.startsWith("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default DeleteImagesVariants;
