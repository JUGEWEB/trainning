import React, { useState } from "react";
import axios from "axios";

function RemoveSizes() {
  const [folderId, setFolderId] = useState(""); // ID of the folder to modify
  const [sizes, setSizes] = useState({}); // Current sizes object
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchSizes = async () => {
    try {
      const response = await axios.get(`https://api.malidag.com/info/${folderId}`);
      if (response.data.textFields?.sizes) {
        setSizes(response.data.textFields.sizes);
        setError("");
      } else {
        setError("Sizes data not found for this folder.");
        setSizes({});
      }
    } catch (err) {
      console.error("Error fetching sizes:", err);
      setError("Failed to fetch sizes data.");
    }
  };

  const handleRemoveSize = async (color, size) => {
    try {
      const response = await axios.delete(`https://api.malidag.com/remove-size/${folderId}`, {
        data: { color, size },
      });
      setSizes(response.data.updatedSizes); // Update state with the new sizes
      setMessage(`Size "${size}" removed from color "${color}" successfully.`);
    } catch (err) {
      console.error("Error removing size:", err);
      setMessage("Failed to remove size.");
    }
  };

  const handleRemoveColor = async (color) => {
    try {
      const response = await axios.delete(`https://api.malidag.com/remove-size/${folderId}`, {
        data: { color },
      });
      setSizes(response.data.updatedSizes); // Update state with the new sizes
      setMessage(`Color "${color}" removed successfully.`);
    } catch (err) {
      console.error("Error removing color:", err);
      setMessage("Failed to remove color.");
    }
  };

  return (
    <div>
      <h2>Remove Sizes and Colors</h2>

      {/* Folder ID */}
      <div>
        <label>Folder ID:</label>
        <input
          type="text"
          placeholder="Enter folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
        />
        <button onClick={fetchSizes}>Fetch Sizes</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Current Sizes */}
      {Object.keys(sizes).length > 0 ? (
        <div>
          <h3>Current Sizes and Colors:</h3>
          {Object.entries(sizes).map(([color, sizeArray]) => (
            <div key={color}>
              <strong>{color}</strong>
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveColor(color)}
              >
                Remove Color
              </button>
              <div>
                {sizeArray.map((size) => (
                  <span
                    key={size}
                    style={{
                      display: "inline-block",
                      margin: "5px",
                      padding: "5px",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveSize(color, size)}
                  >
                    {size} ✕
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No sizes available to display.</p>
      )}

      {/* Success or Failure Message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default RemoveSizes;
