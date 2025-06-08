import React, { useState, useEffect } from "react";

const Text = () => {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [definitions, setDefinitions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onMouseUp = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (text && text.split(" ").length === 1) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(text);
        setPosition({ x: rect.left + window.scrollX, y: rect.bottom + window.scrollY });
        setShowButton(true);
        setDefinitions([]);
        setCurrentIndex(0);
        setAudioSrc("");
        setError("");
      } else {
        setShowButton(false);
        setDefinitions([]);
        setAudioSrc("");
        setError("");
      }
    };

    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, []);

  const fetchDefinitions = async () => {
    setError("");
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`
      );
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("No definitions found.");
        setDefinitions([]);
        setShowButton(false);
        return;
      }

      const defs = [];
      let foundAudio = "";

      // Collect all definitions and first available audio
      data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
          meaning.definitions.forEach((def) => {
            defs.push({
              partOfSpeech: meaning.partOfSpeech,
              definition: def.definition,
              example: def.example || "",
            });
          });
        });

        if (!foundAudio) {
          const audioObj = entry.phonetics.find((p) => p.audio && p.audio.trim() !== "");
          if (audioObj) foundAudio = audioObj.audio;
        }
      });

      if (defs.length === 0) {
        setError("No definitions found.");
        setDefinitions([]);
        setShowButton(false);
        return;
      }

      setDefinitions(defs);
      setAudioSrc(foundAudio);
      setCurrentIndex(0);
      setShowButton(false);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch definitions.");
      setDefinitions([]);
      setShowButton(false);
    }
  };

  const showNextDefinition = () => {
    if (definitions.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % definitions.length);
    }
  };

  return (
    <>
      {showButton && (
        <div
          style={{
            position: "absolute",
            top: position.y + 5,
            left: position.x,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 9999,
            userSelect: "none",
          }}
        >
          <button
            onClick={definitions.length ? showNextDefinition : fetchDefinitions}
            style={{ cursor: "pointer" }}
          >
            {definitions.length ? "Next Definition" : `Define "${selectedText}"`}
          </button>
        </div>
      )}

      {(definitions.length > 0 || error) && (
        <div
          style={{
            position: "absolute",
            top: position.y + 35,
            left: position.x,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            maxWidth: 350,
            padding: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 9998,
          }}
        >
          <strong>Definition of "{selectedText}"</strong>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <>
              <p>
                <em>{definitions[currentIndex].partOfSpeech}</em>:{" "}
                {definitions[currentIndex].definition}
              </p>
              {definitions[currentIndex].example && (
                <p style={{ fontStyle: "italic", marginTop: 6 }}>
                  "{definitions[currentIndex].example}"
                </p>
              )}
              {audioSrc && (
                <audio
                  controls
                  src={audioSrc}
                  style={{ marginTop: 10, width: "100%" }}
                >
                  Your browser does not support the audio element.
                </audio>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Text;
