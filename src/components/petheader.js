import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://api.malidag.com";

const PetHeader = () => {
  const [selectedType, setSelectedType] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        const data = response.data.items;

        const petItems = data.filter((item) =>
          item.category?.toLowerCase() === "pet care"
        );

        const uniqueTypes = [
          ...new Set(petItems.map((item) => item.item.type?.toLowerCase()))
        ].filter(Boolean);

        setPetTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching pet items:", error);
      }
    };

    fetchPetTypes();
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setImageUrl(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!selectedType) {
      alert('Please select a pet type before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/pet/${selectedType}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pet Header Upload</h1>

      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select Pet Type</option>
        {petTypes.map((type) => (
          <option key={type} value={type}>
            {type.replace(/-/g, ' ')}
          </option>
        ))}
      </select>

      {selectedType && (
        <>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {loading && <p>Uploading...</p>}
        </>
      )}

      {imageUrl && (
        <div>
          <h2>Uploaded Image for {selectedType.replace(/-/g, ' ')}</h2>
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

export default PetHeader;
