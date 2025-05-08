import React, { useEffect, useState } from "react";

function MissingVariantsChecker() {
  const [missingVariants, setMissingVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMissingVariants = async () => {
      const serverUrl = "https://api.malidag.com"; // Backend server URL

      try {
        const response = await fetch(`${serverUrl}/check-variants`);
        if (!response.ok) {
          throw new Error("Error fetching missing variants");
        }

        const data = await response.json();
        setLoading(false);

        if (data.missingVariants && data.missingVariants.length > 0) {
          setMissingVariants(data.missingVariants);
        } else {
          setMissingVariants([]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error checking missing variants:", error);
        alert("Error fetching missing variants.");
      }
    };

    checkMissingVariants();
  }, []);

  return (
    <div>
      <h2>Missing Variants Checker</h2>
      {loading ? (
        <p>Loading...</p>
      ) : missingVariants.length > 0 ? (
        <div style={{ backgroundColor: "#ffcccc", padding: "10px", borderRadius: "5px" }}>
          <h3 style={{ color: "#d9534f" }}>⚠️ Warning: Missing Variants Found!</h3>
          <p>The following folders are missing <strong>images-variants</strong>:</p>
          <ul>
            {missingVariants.map((folderId) => (
              <li key={folderId}>{folderId}</li>
            ))}
          </ul>
          <p style={{ fontStyle: "italic", color: "#b22222" }}>
            Please add <strong>images-variants</strong> for these folders.
          </p>
        </div>
      ) : (
        <p style={{ color: "#5cb85c" }}>✅ All folders have images-variants.</p>
      )}
    </div>
  );
}

export default MissingVariantsChecker;
