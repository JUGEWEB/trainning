import React, { useState } from "react";
import axios from "axios";

function ModifyData() {
  const [folderId, setFolderId] = useState(""); // ID of the folder to modify
  const [sizes, setSizes] = useState({}); // Sizes as an object, e.g., { "Red": ["L", "XL"] }
  const [message, setMessage] = useState("");

  const handleAddSize = (color, size) => {
    setSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      if (!updatedSizes[color]) {
        updatedSizes[color] = [];
      }
      updatedSizes[color].push(size);
      return updatedSizes;
    });
  };

   // Remove a size from the sizes object
   const handleRemoveSize = (color, size) => {
    setSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      if (updatedSizes[color]) {
        updatedSizes[color] = updatedSizes[color].filter((s) => s !== size);
        if (updatedSizes[color].length === 0) {
          delete updatedSizes[color];
        }
      }
      return updatedSizes;
    });
  };

  const handleModifyData = async () => {
    try {
      const response = await axios.put(`https://api.malidag.com/modify/${folderId}`, {
        sizes,
      });

      setMessage("Data updated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error modifying data:", error);
      setMessage("Failed to update data.");
    }
  };

  return (
    <div>
      <h2>Modify Data</h2>
      
      {/* Folder ID */}
      <div>
        <label>Folder ID:</label>
        <input
          type="text"
          placeholder="Enter folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
        />
      </div>

      {/* Sizes */}
      <div>
        <label>Add Sizes:</label>
        <div>
          <input
            type="text"
            placeholder="Color"
            id="colorInput"
          />
          <input
            type="text"
            placeholder="Size"
            id="sizeInput"
          />
          <button
            onClick={() => {
              const color = document.getElementById("colorInput").value;
              const size = document.getElementById("sizeInput").value;
              if (color && size) {
                handleAddSize(color, size);
                document.getElementById("colorInput").value = "";
                document.getElementById("sizeInput").value = "";
              }
            }}
          >
            Add Size
          </button>

           {/* Remove Sizes */}
      <div>
        <h3>Remove Sizes:</h3>
        {Object.keys(sizes).length > 0 ? (
          Object.entries(sizes).map(([color, sizeArray]) => (
            <div key={color}>
              <strong>{color}:</strong>
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
          ))
        ) : (
          <p>No sizes to remove.</p>
        )}
      </div>

        </div>
        <pre>{JSON.stringify(sizes, null, 2)}</pre>
      </div>

      {/* Submit Button */}
      <button onClick={handleModifyData}>Modify Data</button>

      {/* Message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ModifyData;
