import React, { useState } from 'react';

const AddTheme = () => {
  const [themeData, setThemeData] = useState({
    theme: '',
    mode: 'default',
    types: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setThemeData({
      ...themeData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('theme', themeData.theme);
      formData.append('mode', themeData.mode);
      formData.append('types', themeData.types);
      if (imageFile) {
        formData.append('image', imageFile); // Add image file to the FormData
      }

      const response = await fetch('https://api.malidag.com/themes/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Theme added successfully: ${data.theme.theme}`);
        setThemeData({ theme: '', mode: 'default', types: '' });
        setImageFile(null);
        setImageUrl(data.theme.image); // Set the image URL from the response
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2>Add a New Theme</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Theme:
          <input
            type="text"
            name="theme"
            value={themeData.theme}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <label>
          Mode:
          <select name="mode" value={themeData.mode} onChange={handleChange}>
            <option value="default">Default</option>
            <option value="full">Full</option>
            <option value="large">large</option>
            <option value="product">product</option>
            <option value="large-circle">large-circle</option>
            <option value="text-image">text-image</option>
          </select>
        </label>
        <br />
        <label>
          Types (comma-separated):
          <input
            type="text"
            name="types"
            value={themeData.types}
            onChange={handleChange}
            placeholder="Type1,Type2,Type3"
          />
        </label>
        <br />
        <button type="submit">Add Theme</button>
      </form>
      {message && <p>{message}</p>}
      
      {/* Display the uploaded image */}
      {imageUrl && <img src={imageUrl} alt="Uploaded Theme" style={{ width: '300px', marginTop: '20px' }} />}
    </div>
  );
};

export default AddTheme;
