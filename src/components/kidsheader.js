import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://api.malidag.com";

const KidsHeader = () => {
  const [selectedType, setSelectedType] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kidTypes, setKidTypes] = useState([]);

  useEffect(() => {
    const fetchKidTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        const data = response.data.items;

        const allowedGenres = ["boy", "girl", "baby boy", "baby girl"];
        
        const kidsItems = data.filter((item) => {
          const genre = item.item?.genre?.toLowerCase();
          const type = item.item?.type?.toLowerCase();
          return allowedGenres.includes(genre) && !!type;
        });

        // Log filtered items for debugging
        console.log("✅ Filtered Kids Items:", kidsItems);

        const uniquePairs = [...new Set(
          kidsItems.map((item) =>
            `${item.item.genre.toLowerCase()}-${item.item.type.toLowerCase()}`
          )
        )];

        setKidTypes(uniquePairs);
      } catch (error) {
        console.error("❌ Error fetching kids items:", error);
      }
    };

    fetchKidTypes();
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setImageUrl(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedType) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/kids/${selectedType}/image`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('❌ Error uploading image:', error.response?.data || error.message);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Kids Header Upload</h1>

      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select Genre-Type</option>
        {kidTypes.map((pair) => (
          <option key={pair} value={pair}>
            {pair.replace(/-/g, ' ')}
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

export default KidsHeader;
