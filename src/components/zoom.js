import React, { useState } from 'react';
import { saveZoomType } from './zoomapi'; // Import API function

const ZoomSettings = () => {
    // State for manually entering details
    const [itemId, setItemId] = useState('');
    const [color, setColor] = useState('');
    const [imageNumber, setImageNumber] = useState('');
    
    const handleSave = async (zoomType) => {
      if (!itemId || !color || !imageNumber) {
        alert('Please enter all details before saving.');
        return;
      }
  
      const result = await saveZoomType(itemId, color, imageNumber, zoomType);
      console.log(result.message); // Log response
    };
  
    return (
      <div>
        <h3>Set Zoom Type</h3>
        
        <label>Item ID:</label>
        <input type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} />
  
        <label>Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
  
        <label>Image Number:</label>
        <input type="number" value={imageNumber} onChange={(e) => setImageNumber(e.target.value)} />
  
        <div>
          <button onClick={() => handleSave('zoom')}>Zoom</button>
          <button onClick={() => handleSave('zoom1')}>Zoom1</button>
          <button onClick={() => handleSave('nozoom')}>No Zoom</button>
        </div>
      </div>
    );
  };
  
  export default ZoomSettings;