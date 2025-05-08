import React, { useState } from "react";

const GetItemInfo = () => {
  const [folderId, setFolderId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFields, setSelectedFields] = useState({});
  const [updatedFields, setUpdatedFields] = useState({});

  const fetchFolderInfo = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`https://api.malidag.com/info/${folderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch folder information.");
      }
      const result = await response.json();
      setData(result);

      // Initialize selected fields and updated fields
      const initialFields = {};
      for (const key in result.textFields) {
        initialFields[key] = false;
      }
      setSelectedFields(initialFields);
      setUpdatedFields(result.textFields);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFieldSelection = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async () => {
    const fieldsToUpdate = Object.keys(selectedFields).reduce((acc, field) => {
      if (selectedFields[field]) {
        acc[field] = updatedFields[field];
      }
      return acc;
    }, {});

    try {
      const response = await fetch(`https://api.malidag.com/modify/${folderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldsToUpdate),
      });

      if (!response.ok) {
        throw new Error("Failed to update fields.");
      }

      alert("Fields updated successfully!");
    } catch (err) {
      alert("Error updating fields: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", overflowX: "auto", height: "auto" }}>
      <h1>Fetch Folder Information</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={fetchFolderInfo}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Get Folder Info
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {data && (
        <div>
          <h1>Folder Information</h1>
          <h2>Folder ID: {data.folderId}</h2>

          <h3>Modify Text Fields</h3>
          <div>
            {Object.keys(data.textFields).map((field) => (
              <div key={field} style={{ marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectedFields[field]}
                  onChange={() => handleFieldSelection(field)}
                />
                <label style={{ marginLeft: "8px" }}>{field}</label>
                <input
                  type="text"
                  value={updatedFields[field]}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  disabled={!selectedFields[field]}
                  style={{
                    marginLeft: "8px",
                    padding: "4px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 12px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default GetItemInfo;
