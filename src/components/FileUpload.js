import React, { useState, useEffect } from "react";
import { storage, auth } from "./firebaseConfig"; // Import the auth and storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import "./FileUpload.css"; // Import the CSS file for styling

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null); // Store the download URL here
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Store error message here

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      // You can add file validations here (size, type, etc.)
      setFile(selectedFile);
      setErrorMessage(""); // Clear any previous error message
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      setErrorMessage("Please choose the file first.");
      return;
    }

    if (!user) {
      setErrorMessage("You need to be logged in to upload files.");
      return;
    }

    const storageRef = ref(storage, "uploads/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error: ", error);
        setErrorMessage("Error during upload. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url); // Set the download URL after successful upload
          alert("File uploaded successfully! Copy the URL below.");
        });
      }
    );
  };

  return (
    <div className="file-upload-container">
      <input
        className={`file-input ${!file ? 'file-input-error' : ''}`}
        type="file"
        onChange={handleFileChange}
      />
      {!file && errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="upload-button" onClick={handleFileUpload}>Upload</button>
      {progress > 0 && <p className="progress-text">Upload progress: {progress}%</p>}
      {downloadURL && (
        <div className="download-url-container">
          <p>File uploaded! Copy the URL below:</p>
          <textarea className="url-textarea" value={downloadURL} readOnly rows={4} cols={50}></textarea>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
