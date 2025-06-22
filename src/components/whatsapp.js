export const sendWhatsApp = async (phoneNumber) => {
  const response = await fetch('http://localhost:3003/api/whatsapp/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber }),
  });

  return response.json();
};
