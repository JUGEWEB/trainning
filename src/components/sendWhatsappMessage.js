import React, { useState } from 'react';
import { sendWhatsApp } from './whatsapp';

export default function SendWhatsAppMessage() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(null);

  const handleSend = async () => {
    try {
      const res = await sendWhatsApp(phone);
      setStatus(res.success ? '✅ Message sent!' : `❌ Error: ${res.error}`);
    } catch (err) {
      setStatus(`❌ Exception: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={phone}
        placeholder="+1 555 123 4567"
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleSend} className="bg-green-500 text-white px-4 py-2 rounded">
        Send WhatsApp Message
      </button>
      {status && <div className="mt-4">{status}</div>}
    </div>
  );
}
