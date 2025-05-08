import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://api.malidag.com"; // Base URL for items API

const ElectronicHeader = () => {
  const [selectedType, setSelectedType] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [womenTypes, setWomenTypes] = useState([]); // Fetch beauty types dynamically

  useEffect(() => {
    // Fetch items and filter beauty types
    const fetchWomenTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        const data = response.data.items;

        // Filter beauty items and extract unique types
        const womenItems = data.filter((item) => item.category !== "Beauty" && item.category === "Electronic");
        const uniqueTypes = [...new Set(womenItems.map((item) => item.item.type.toLowerCase()))];

        setWomenTypes(uniqueTypes); // Update state with beauty types
      } catch (error) {
        console.error("Error fetching beauty items:", error);
      }
    };

    fetchWomenTypes();
  }, []);


  // Handle selecting beauty type
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setImageUrl(null); // Reset image if changing type
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!selectedType) {
      alert('Please select a beauty type before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.malidag.com/electronic/${selectedType}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: false // Ensure CORS does not block
        }
      );

      setImageUrl(response.data.imageUrl);
      setImage(file);
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Electronic Header</h1>

      {/* Select Beauty Type */}
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select electronic Type</option>
        {womenTypes.map((type) => (
          <option key={type} value={type}>
            {type.replace('-', ' ')} {/* Display as readable text */}
          </option>
        ))}
      </select>

      {/* Image Upload Section */}
      {selectedType && (
        <>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {loading && <p>Uploading...</p>}
        </>
      )}

      {/* Display the uploaded image */}
      {imageUrl && (
        <div>
          <h2>Uploaded Image for {selectedType.replace('-', ' ')}</h2>
          <img
            src={imageUrl}
            alt={selectedType}
            style={{ width: '1200px', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ElectronicHeader;
