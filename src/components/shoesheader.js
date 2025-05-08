import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://api.malidag.com"; // Base URL for items API

const ShoesHeader = () => {
  const [selectedType, setSelectedType] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genreTypePairs, setGenreTypePairs] = useState([]); // Store unique genre-type pairs

  useEffect(() => {
    // Fetch items and filter shoes types with genre
    const fetchGenreTypePairs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        const data = response.data.items;

        // Filter shoes items
        const shoesItems = data.filter((item) => item.category.toLowerCase() === "shoes");

        // Extract unique genre-type pairs
        const uniquePairs = [...new Set(shoesItems.map((item) => `${item.item.genre.toLowerCase()}-${item.item.type.toLowerCase()}`))];

        setGenreTypePairs(uniquePairs); // Update state with unique genre-type pairs
      } catch (error) {
        console.error("Error fetching shoes items:", error);
      }
    };

    fetchGenreTypePairs();
  }, []);

  // Handle selecting genre-type pair
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setImageUrl(null); // Reset image if changing genre-type pair
  };

  // Handle image upload for selected genre-type pair
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!selectedType) {
      alert('Please select a genre-type pair before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.malidag.com/shoes/${selectedType}/image`, // Adjust API endpoint
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
      <h1>Shoes Header</h1>

      {/* Select Genre-Type pair */}
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select Genre-Type</option>
        {genreTypePairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair.replace('-', ' ')} {/* Display as readable text (genre - type) */}
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

export default ShoesHeader;
