import React, { useState } from "react";
import axios from "axios";
import "./uploadFolder.css";

function UploadFolder() {
  const [folderId, setFolderId] = useState(Date.now().toString()); // Unique folder ID
  const [imagesFolder, setImagesFolder] = useState([]);
  const [video, setVideo] = useState(null);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [soldText, setSoldText] = useState("");
  const [numberItemText, setNumberItemText] = useState("");
  const [currencyText, setCurrencyText] = useState("");
  const [usdText, setUsdText] = useState("");
  const [itemDetailText, setItemDetailText] = useState("");
  const [link, setLink] = useState("")
  const [originalPrice, setOriginalPrice] = useState("");
  const [network, setNetwork] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");
  const [mode, setMode] = useState("");
  const [country, setCountry] = useState("");
  const [productDetail01, setProductDetail01] = useState("");
  const [productDetail02, setProductDetail02] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState({}); // Sizes state
  const [brand, setBrand] = useState("");
const [department, setDepartment] = useState("");
const [brandType, setBrandType] = useState("");

  

  // Handle images folder selection
  const handleImagesFolderChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesFolder(files);
  };

  // Handle video selection
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideo(files);
  };

  // Handle adding sizes for a color
  const handleAddSize = (color, size) => {
    setSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      if (!updatedSizes[color]) updatedSizes[color] = [];
      if (!updatedSizes[color].includes(size)) updatedSizes[color].push(size);
      return updatedSizes;
    });
  };

   // Handle removing a size for a color
   const handleRemoveSize = (color, size) => {
    setSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      updatedSizes[color] = updatedSizes[color].filter((s) => s !== size);
      if (updatedSizes[color].length === 0) delete updatedSizes[color];
      return updatedSizes;
    });
  };

  // Handle color size input
  const handleSizeInput = (e, color) => {
    if (e.key === "Enter") {
      const size = e.target.value.trim();
      if (size) {
        handleAddSize(color, size);
        e.target.value = ""; // Clear input
      }
    }
  };

  const uploadFiles = async () => {
    const formData = new FormData();

    // Add folder ID
    formData.append("folderId", folderId);

    // Append images folder files
    imagesFolder.forEach((file) => {
      formData.append("images", file);
    });

    // Append video
     video.forEach((file) => {
      formData.append("video", file);
    })

    // Append item name and category
    formData.append("itemName", itemName);
    formData.append("category", category);

    // Append text fields
    formData.append("soldText", soldText);
    formData.append("numberItemText", numberItemText);
    formData.append("currencyText", currencyText);
    formData.append("usdText", usdText);
    formData.append("itemDetailText", itemDetailText);
    formData.append("link", link);
    formData.append("network", network);
    formData.append("originalPrice", originalPrice);
    formData.append("genre", genre);
    formData.append("type", type);
    formData.append("country", country)
    formData.append("productDetail01", productDetail01);
    formData.append("productDetail02", productDetail02);
    formData.append("description", description);
    formData.append("theme", theme);
    formData.append("mode", mode);

      // Append new fields
    formData.append("brand", brand);
    formData.append("department", department);
    formData.append("brandType", brandType);

    // Append sizes
    formData.append("sizes", JSON.stringify(sizes)); // Serialize sizes object

    try {
      const response = await axios.post("https://api.malidag.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <h2>Upload Folder</h2>

      {/* Select Images Folder */}
      <div>
        <label>Select Images Folder:</label>
        <input type="file" webkitdirectory="true" multiple onChange={handleImagesFolderChange} />
      </div>

      {/* Select Video */}
      <div>
        <label>Select Video:</label>
        <input type="file" webkitdirectory="true" multiple onChange={handleVideoChange} />
      </div>

      {/* Item Name */}
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label>Category:</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Text Fields */}
      <div>
        <label>Sold Text:</label>
        <input type="text" value={soldText} onChange={(e) => setSoldText(e.target.value)} />

        <label>Theme:</label>
        <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />

        <label>Mode:</label>
        <input type="text" value={mode} onChange={(e) => setMode(e.target.value)} />

        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />

        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />

        <label>country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />

        <label>Number Item Text:</label>
        <input type="text" value={numberItemText} onChange={(e) => setNumberItemText(e.target.value)} />

        <label>Currency Text:</label>
        <input type="text" value={currencyText} onChange={(e) => setCurrencyText(e.target.value)} />

        <label>USD Text:</label>
        <input type="text" value={usdText} onChange={(e) => setUsdText(e.target.value)} />

        <label>Item Detail Text:</label>
        <textarea
          value={itemDetailText}
          onChange={(e) => setItemDetailText(e.target.value)}
        />

        <label>product detail 1:</label>
        <textarea
          value={productDetail01}
          onChange={(e) => setProductDetail01(e.target.value)}
        />

        <label>product detail 2:</label>
        <textarea
          value={productDetail02}
          onChange={(e) => setProductDetail02(e.target.value)}
        />

        <label>description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Network:</label>
        <textarea
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
        />

        <label>Original Price:</label>
        <textarea
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        <label>Link:</label>
        <textarea
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      {/* Brand */}
<div>
  <label>Brand:</label>
  <input
    type="text"
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
  />
</div>

{/* Department */}
<div>
  <label>Department:</label>
  <input
    type="text"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
  />
</div>

{/* Brand Type */}
<div>
  <label>Brand Type:</label>
  <input
    type="text"
    value={brandType}
    onChange={(e) => setBrandType(e.target.value)}
  />
</div>


       {/* Sizes */}
       <div>
        <h3>Sizes</h3>
        {Object.keys(sizes).map((color) => (
          <div key={color}>
            <h4>{color}</h4>
            <ul>
              {sizes[color].map((size) => (
                <li key={size}>
                  {size}
                  <button onClick={() => handleRemoveSize(color, size)}>Remove</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder={`Add size for ${color}`}
              onKeyDown={(e) => handleSizeInput(e, color)}
            />
          </div>
        ))}
        <input
          type="text"
          placeholder="Enter new color"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const color = e.target.value.trim();
              if (color && !sizes[color]) {
                setSizes((prev) => ({ ...prev, [color]: [] }));
                e.target.value = ""; // Clear input
              }
            }
          }}
        />
      </div>

      {/* Upload Button */}
      <button onClick={uploadFiles}>Upload</button>
    </div>
  );
}

export default UploadFolder;
