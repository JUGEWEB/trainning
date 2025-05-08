import React, { useState } from 'react';
import { addTypeToCategory } from './api'; // Import the utility function

const AddTypeForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [typeName, setTypeName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addTypeToCategory(categoryName, typeName, imageUrl);
            setMessage(`Success: ${response.message}`);
        } catch (error) {
            setMessage(`Error: ${error.error || error}`);
        }
    };

    return (
        <div>
            <h1>Add Type to Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name:</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Type Name:</label>
                    <input
                        type="text"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Type</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddTypeForm;
