import React, { useState } from "react";

function AdVariants() {
  const [folderId, setFolderId] = useState("");
  const [variantFiles, setVariantFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setVariantFiles(files);
    files.forEach((f) => console.log("Selected:", f.webkitRelativePath || f.name));

  };

  const handleUpload = async () => {
    if (!folderId || variantFiles.length === 0) {
      setMessage("Please enter folder ID and select variant images.");
      return;
    }

    const formData = new FormData();
    formData.append("folderId", folderId);

   


    variantFiles.forEach((file, index) => {
  formData.append("variants", file);
  formData.append(`paths[${index}]`, file.webkitRelativePath);
  console.log("Sending file:", file.name, "at", file.webkitRelativePath);
});


    try {
      setUploading(true);
      setMessage("Uploading...");
      const response = await fetch("https://api.malidag.com/upload-variants", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Upload successful: " + result.message);
        setVariantFiles([]);
      } else {
        setMessage("❌ Upload failed: " + result.message);
      }
    } catch (error) {
      console.error("Error uploading variants:", error);
      setMessage("❌ An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Upload Images-Variants Folder</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Folder ID:</label>
        <input
          type="text"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          placeholder="Enter folder ID"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Select images-variants folder (with subfolders):</label>
        <input
          type="file"
          webkitdirectory=""
          directory=""
          multiple
          onChange={handleFileChange}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <p style={{ marginTop: "1rem", color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AdVariants;
