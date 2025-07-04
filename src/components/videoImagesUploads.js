import React, { useState, useEffect } from "react";

const API_BASE = "https://api.malidag.com/learn";

const VideoManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_BASE}/videos/list`);
      const data = await res.json();
      setVideos(data.files || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Upload a file
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await res.json();
      setSelectedFile(null);
      fetchVideos(); // Refresh list
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete video
  const handleDelete = async (fileName) => {
    try {
      const res = await fetch(`${API_BASE}/delete/${fileName}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchVideos(); // Refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>📤 Upload a Video or Image</h2>
      <input
        type="file"
        accept="video/mp4,video/webm,image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading || !selectedFile}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <hr />

      <h2>📜 Uploaded Files</h2>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.name} style={{ marginBottom: 10 }}>
              {video.name}{" "}
              <a href={`https://api.malidag.com${video.url}`} target="_blank" rel="noopener noreferrer">
                View
              </a>{" "}
              <button onClick={() => handleDelete(video.name)} style={{ marginLeft: 10 }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoManager;
