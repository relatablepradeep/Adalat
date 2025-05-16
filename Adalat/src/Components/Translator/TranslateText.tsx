import React, { useState } from 'react';

const TranslateText: React.FC = () => {
  const [content, setContent] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/scaler/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_language: sourceLang,
          target_language: targetLang,
          content: content,
        }),
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const text = await res.text();

      try {
        const data = JSON.parse(text);
        if (data.status_code === 200) {
          setResult(data.translated_content);
        } else {
          setResult(`❌ ${data.message}`);
        }
      } catch {
        setResult('❌ Invalid JSON from server');
      }
    } catch (err: any) {
      setResult(`❌ ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Language Translator</h2>

      <textarea
        placeholder="Enter text..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-3"
      />

      <div className="flex gap-2 mb-3">
        <input
          placeholder="Source (e.g. en)"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="flex-1 border p-2"
        />
        <input
          placeholder="Target (e.g. hi)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="flex-1 border p-2"
        />
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Result:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateText;
