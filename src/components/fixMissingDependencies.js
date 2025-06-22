import React from "react";
import axios from "axios";

const FixMissingBrandFields = () => {
  const handleFix = async () => {
    try {
      const res = await axios.post("https://api.malidag.com/api/update-missing-brand-fields");
      console.log("Update success:", res.data);
      alert("Items updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update items.");
    }
  };

  return <button onClick={handleFix}>Fix Missing Brand Fields</button>;
};

export default FixMissingBrandFields;
