import React, { useState } from "react";

const UploadItem = () => {
  const [files, setFiles] = useState([]);
  const [folderID, setFolderID] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];

    if (selectedFiles.length === 0) return;

    // **Allow multiple files only for slide_images**
    if (type === "slide_images") {
      setFiles(selectedFiles);
    } else {
      setFiles([selectedFiles[0]]); // Only keep the first file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!folderID || !type || files.length === 0) {
      alert("Please fill all fields and select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("folderID", folderID);
    formData.append("type", type);
    formData.append("text", text);
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("https://api.malidag.com/api/items/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Files uploaded successfully!");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Upload failed.");
    }
  };
  //image-Left_with_text

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upload Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Folder ID"
          value={folderID}
          onChange={(e) => setFolderID(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Type</option>
          <option value="slide_images">Slide Images (Multiple Allowed)</option>
          <option value="image_with_text">Image with Text</option>
          <option value="single_image">Single Image</option>
          <option value="image-Left_with_text">Left-Image with Text</option>
          <option value="video_with_text">Video with Text</option>
          <option value="single_video">Single Video</option>
        </select>
        <textarea
          placeholder="Text (optional)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full"
        ></textarea>

        {/* Conditionally allow multiple files only for slide_images */}
        <input
          type="file"
          multiple={type === "slide_images"} // Only allow multiple if type is slide_images
          accept={type.includes("video") ? "video/*" : "image/*"} // Restrict file types
          onChange={handleFileChange}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload Item
        </button>
      </form>
    </div>
  );
};

export default UploadItem;
