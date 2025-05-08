const API_URL = 'https://api.malidag.com/api/zoom-setting-save';

export const saveZoomType = async (itemId, color, imageNumber, zoomType) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, color, imageNumber, zoomType }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving zoom type:', error);
    return { message: 'Error saving zoom type' };
  }
};
