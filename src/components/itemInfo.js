import React, { useState } from "react";

const ItemInfo = () => {
  const [folderId, setFolderId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth: "500px", overflowX: "auto", height: "auto"}}>
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

          <h3>Text Fields</h3>
          <pre>{JSON.stringify(data.textFields, null, 2)}</pre>

          <h3>Images</h3>
          {data.images.length > 0 ? (
            data.images.map((image, index) => (
              <img
                key={index}
                src={`https://api.malidag.com${image}`}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: "200px", margin: "10px" }}
              />
            ))
          ) : (
            <p>No images available.</p>
          )}

          <h3>Videos</h3>
          {data.videos.length > 0 ? (
            data.videos.map((video, index) => (
              <video
                key={index}
                controls
                style={{ maxWidth: "400px", margin: "10px" }}
              >
                <source src={`https://api.malidag.com${video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemInfo;
