import React, { useState } from 'react';
import axios from 'axios';

function ItemDetail() {
  const [itemId, setItemId] = useState(''); // State for user input (item ID)
  const [item, setItem] = useState(null); // State to store fetched item details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Handle change in the input field
  const handleInputChange = (e) => {
    setItemId(e.target.value);
  };

  // Handle form submission (fetch item details by ID)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Reset error message

    try {
      // Make GET request to fetch item details by ID
      const response = await axios.get(`https://api.malidag.com/item/${itemId}`);
      setItem(response.data); // Set the item data
    } catch (err) {
      setError('Item not found or failed to fetch data');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <h1>Search Item by ID</h1>
      
      {/* Input form to enter item ID */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemId}
          onChange={handleInputChange}
          placeholder="Enter Item ID"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Item'}
        </button>
      </form>

      {/* Display error if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Display item details if fetched successfully */}
      {item && !loading && !error && (
        <div>
          <h2>{item.item.name}</h2>
          <p><strong>Category:</strong> {item.item.category}</p>
          <p><strong>ItemId:</strong> {item.itemId}</p>
          <p><strong>Description:</strong> {item.item.description}</p>
          <p><strong>Price (USD):</strong> {item.item.usdPrice}</p>
          <p><strong>Original Price:</strong> {item.item.originalPrice}</p>
          <p><strong>Cryptocurrency:</strong> {item.item.cryptocurrency}</p>
          <p><strong>Network:</strong> {item.item.network}</p>
          <p><strong>Genre:</strong> {item.item.genre}</p>
          <p><strong>Type:</strong> {item.item.type}</p>
          <p><strong>Size:</strong> {item.item.size}</p>
          <p><strong>Sold:</strong> {item.item.sold}</p>

          {/* Render images */}
          <div>
            <h3>Images</h3>
            {item.item.images.length > 0 ? (
              item.item.images.map((image, index) => (
                <img key={index} src={image} alt={`Item ${index}`} style={{ width: '200px', margin: '10px' }} />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Render videos */}
          <div>
            <h3>Videos</h3>
            {item.item.videos && item.item.videos.length > 0 ? (
              item.item.videos.map((video, index) => (
                <video key={index} width="400" controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))
            ) : (
              <p>No videos available</p>
            )}
          </div>

          {/* Render additional details */}
          <div>
            <h3>Additional Details</h3>
            <p><strong>Product Detail 01:</strong> {item.item.productDetail01}</p>
            <p><strong>Product Detail 02:</strong> {item.item.productDetail02}</p>
            <p><strong>Link:</strong> <a href={item.item.link} target="_blank" rel="noopener noreferrer">{item.item.link}</a></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
