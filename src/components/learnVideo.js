import React from "react";
import './LearnVideo.css'; // Optional: custom styling

const LearnVideo = ({ title, videoUrl, description }) => {
  return (
    <div className="learn-video-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#222", marginBottom: "10px" }}>{title}</h2>
      <p style={{ color: "#555", marginBottom: "20px" }}>{description}</p>
      
      <div style={{ position: "relative", paddingTop: "56.25%" /* 16:9 aspect ratio */ }}>
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
      </div>
    </div>
  );
};

export default LearnVideo;
