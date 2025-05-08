import axios from 'axios';

// Define the server URL
const SERVER_URL = 'https://api.malidag.com'; // Replace with your server's base URL

// Function to add a type to a category
export const addTypeToCategory = async (categoryName, typeName, imageUrl) => {
    try {
        const response = await axios.post(`${SERVER_URL}/add-type`, {
            categoryName,
            typeName,
            imageUrl
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Throw the error message
    }
};

export const addCategory = async (categoryName) => {
    try {
        const response = await axios.post(`${SERVER_URL}/add-category`, { categoryName });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

