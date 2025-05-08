import React, { useState } from 'react';

const UpdateThemeImage = () => {
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !image) {
      setMessage('❌ Please provide both ID and image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch(`https://api.malidag.com/themes/${id}/image`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Image updated successfully!');
        setImageUrl(data.theme.image);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Update Theme Image by ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Theme ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>
        <br />
        <button type="submit">Update Image</button>
      </form>
      {message && <p>{message}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Updated Theme"
          style={{ width: '300px', marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default UpdateThemeImage;
