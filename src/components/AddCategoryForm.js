import React, { useState } from 'react';
import { addCategory } from './api'; // Import the API function

const AddCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCategory(categoryName);
            setMessage(`Success: ${response.message}`);
            setCategoryName(''); // Clear the input field
        } catch (error) {
            setMessage(`Error: ${error.error || error}`);
        }
    };

    return (
        <div>
            <h1>Add Category</h1>
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
                <button type="submit">Add Category</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCategoryForm;
