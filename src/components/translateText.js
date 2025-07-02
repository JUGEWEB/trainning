import React, { useState } from "react";

const TriggerTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTranslate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://api.malidag.com/translate/brand-media/auto-translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetLanguages: ["af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "ceb", "co", "cs", "cy",
  "da", "de", "el", "en", "eo", "es", "et", "eu", "fa", "fi", "fr", "fy", "ga",
  "gd", "gl", "gu", "ha", "haw", "he", "hi", "hmn", "hr", "ht", "hu", "hy", "id",
  "ig", "is", "it", "ja", "jw", "ka", "kk", "km", "kn", "ko", "ku", "ky", "la",
  "lb", "lo", "lt", "lv", "mg", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my",
  "ne", "nl", "no", "ny", "pa", "pl", "ps", "pt", "ro", "ru", "rw", "sd", "si",
  "sk", "sl", "sm", "sn", "so", "sq", "sr", "st", "su", "sv", "sw", "ta", "te",
  "tg", "th", "tk", "tl", "tr", "tt", "ug", "uk", "ur", "uz", "vi", "xh", "yi",
  "yo", "zh", "zu"], // customize this list if needed
          force: true, // set to false if you want to skip already translated
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Translation failed:", error);
      setResult({ error: "Failed to trigger translation." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleTranslate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Translating..." : "Start Translation"}
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TriggerTranslation;
