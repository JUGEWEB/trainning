import React, { useState } from "react";
import axios from "axios";

function Header() {
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    genre: "",
    type: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("");

    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadStatus("Please select at least one file.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    Array.from(selectedFiles).forEach((file) => {
      data.append("files", file);
    });

    try {
      const response = await axios.post(
        "https://api.malidag.com/upload-header",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadStatus("✅ Upload successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("❌ Error uploading files. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Upload Header Images</h1>
      <form onSubmit={handleSubmit}>
        {["id", "category", "genre", "type"].map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label style={{ textTransform: "capitalize" }}>{field}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "10px" }}>
          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Upload
        </button>
      </form>

      {uploadStatus && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{uploadStatus}</p>
      )}
    </div>
  );
}

export default Header;
