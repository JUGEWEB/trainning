import React, { useState } from 'react';
import axios from 'axios';

const ModifyBrandData = () => {
  const [brandName, setBrandName] = useState('');
  const [formData, setFormData] = useState({
    newBrandName: '',
    headerImage: '',
    logo: '',
    theme: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!brandName) {
    setStatus('Please enter the current brand name to modify.');
    return;
  }

  // Build a body with only non-empty fields
  const updatedFields = {};
  for (const key in formData) {
    if (formData[key].trim() !== '') {
      updatedFields[key] = formData[key].trim();
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    setStatus('Please provide at least one field to update.');
    return;
  }

  try {
    const response = await axios.patch(
      `https://api.malidag.com/api/brands/update/${encodeURIComponent(brandName)}`,
      updatedFields
    );
    setStatus(`Brand updated successfully: ${response.data.brand.brandName}`);
  } catch (error) {
    console.error('Error updating brand:', error);
    setStatus('Error updating brand. Check the brand name or try again.');
  }
};


  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Modify Brand Data</h2>
      <form onSubmit={handleSubmit}>
        <label>Current Brand Name:</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />

        <label>New Brand Name:</label>
        <input
          type="text"
          name="newBrandName"
          value={formData.newBrandName}
          onChange={handleChange}
        />

        <label>Header Image URL:</label>
        <input
          type="text"
          name="headerImage"
          value={formData.headerImage}
          onChange={handleChange}
        />

        <label>Logo URL:</label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
        />

        <label>Theme:</label>
        <input
          type="text"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
        />

        <button type="submit">Update Brand</button>
      </form>

      {status && <p style={{ marginTop: '1rem', color: 'blue' }}>{status}</p>}
    </div>
  );
};

export default ModifyBrandData;
