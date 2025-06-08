import React, { useState, useEffect } from "react";

// Language mapping
const keyValues = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  pa: "Punjabi",
  ur: "Urdu",
  as: "Assamese",
  or: "Oriya",
  sa: "Sanskrit",
};

export default function Bot() {
  const [languagesData, setLanguagesData] = useState([]);
  const [sourceLang, setSourceLang] = useState("hi");
  const [targetLang, setTargetLang] = useState("en");
  const [blogInput, setBlogInput] = useState("");
  const [postedBlog, setPostedBlog] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [showTargetModal, setShowTargetModal] = useState(false); // optional, not used
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  // Fetch languages on mount
  useEffect(() => {
    async function fetchLanguages() {
      const res = await fetch(
        "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline",
        {
          headers: {
            userID: "9f55ae82e8204e4c86625573098e7707",
            ulcaApiKey: "52d075f861-561b-42fe-8b00-8a034acb4deb",
          },
          method: "POST",
          body: JSON.stringify({
            pipelineTasks: [{ taskType: "translation" }],
            pipelineRequestConfig: {
              pipelineId: "64392f96daac500b55c543cd",
            },
          }),
        }
      );
      const data = await res.json();
      setLanguagesData(data.languages || []);
    }

    fetchLanguages();
  }, []);

  // Auto-set first available target language when source changes
  useEffect(() => {
    const match = languagesData.find((l) => l.sourceLanguage === sourceLang);
    if (match?.targetLanguageList.length) {
      setTargetLang(match.targetLanguageList[0]);
    }
  }, [languagesData, sourceLang]);

  const handlePost = () => {
    if (!blogInput.trim()) {
      alert("Please write a blog post!");
      return;
    }
    setPostedBlog(blogInput);
    setTranslatedText("");
    setChat((prev) => [...prev, { text: blogInput, type: "user" }]);
    setBlogInput("");
  };

  const handleTranslate = async () => {
    if (!postedBlog) return;
    setLoading(true);
    setTranslatedText("");
    setShowTargetModal(false); // placeholder, not implemented

    try {
      const res = await fetch("scaler/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_language: sourceLang,
          content: postedBlog,
          target_language: targetLang,
        }),
      });

      const data = await res.json();
      const translated = data.translated_content || "Translation failed.";
      setTranslatedText(translated);
      setChat((prev) => [...prev, { text: translated, type: "bot" }]);
    } catch (err) {
      console.error(err);
      alert("Translation error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatArea}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.type === "user" ? styles.userMsg : styles.botMsg),
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.spinner} />}
      </div>

      <div style={styles.inputPanel}>
        <div style={styles.inputContainer}>
          <label htmlFor="source-language">Select Your Language:</label>
          <select
            id="source-language"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            style={styles.select}
          >
            {Object.entries(keyValues).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="blog-text">Your Blog Post:</label>
          <textarea
            id="blog-text"
            rows="3"
            value={blogInput}
            onChange={(e) => setBlogInput(e.target.value)}
            placeholder="Write your blog..."
            style={styles.textarea}
          />
        </div>

        <div style={styles.buttonRow}>
          <button onClick={handlePost} style={styles.button}>
            Post
          </button>
          <button onClick={handleTranslate} style={styles.buttonAlt}>
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 900,
    height: "100vh",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  chatArea: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    backgroundColor: "#eaf2f8",
    display: "flex",
    flexDirection: "column",
  },
  inputPanel: {
    borderTop: "1px solid #ddd",
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 15,
  },
  select: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  textarea: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    border: "1px solid #ccc",
    borderRadius: 5,
    resize: "none",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    flex: 1,
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonAlt: {
    flex: 1,
    backgroundColor: "#2196f3",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
  },
  spinner: {
    alignSelf: "center",
    margin: 10,
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    width: 30,
    height: 30,
    animation: "spin 1s linear infinite",
  },
  message: {
    maxWidth: "70%",
    padding: "12px 15px",
    margin: "10px",
    borderRadius: "15px",
    fontSize: 16,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  userMsg: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
    textAlign: "right",
  },
  botMsg: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
    textAlign: "left",
  },
};
