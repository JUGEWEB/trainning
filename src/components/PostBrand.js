import React, { useState } from "react";
import axios from "axios";

const PostBrand = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    headerImage: "",
    logo: "",
    theme: ""
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.malidag.com/api/brands/add", formData);
      if (response.data.success) {
        setStatus("Brand added successfully!");
        setFormData({ brandName: "", headerImage: "", logo: "", theme: "" });
      } else {
        setStatus("Failed to add brand.");
      }
    } catch (error) {
      console.error("Error posting brand:", error);
      setStatus("Error occurred while posting brand.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Add New Brand</h2>
      <form onSubmit={handleSubmit}>
        <label>Brand Name:</label>
        <input
          type="text"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          required
        /><br />

        <label>Header Image URL:</label>
        <input
          type="text"
          name="headerImage"
          value={formData.headerImage}
          onChange={handleChange}
          required
        /><br />

        <label>Logo URL:</label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          required
        /><br />

        <label>Theme:</label>
        <input
          type="text"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PostBrand;
