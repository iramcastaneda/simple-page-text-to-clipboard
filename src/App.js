import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState(""); // State for input text
  const [textList, setTextList] = useState([]); // State to hold the list of text
  const [dialogVisible, setDialogVisible] = useState(false); // State for dialog visibility

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle add button click
  const handleAddText = () => {
    if (inputText.trim()) {
      setTextList([...textList, inputText]);
      setInputText(""); // Clear input after adding
    }
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setDialogVisible(true); // Show dialog when text is copied
      setTimeout(() => {
        setDialogVisible(false); // Hide the dialog after 2 seconds
      }, 3000); // 3000 milliseconds = 3 seconds
    });
  };

  // Handle remove item from the list
  const handleRemoveText = (index) => {
    const updatedList = textList.filter((_, i) => i !== index);
    setTextList(updatedList);
  };

  // Handle file input change for importing
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const items = text.split("\n").map((item) => item.trim()).filter((item) => item); // Split by new lines and remove empty items
        setTextList([...textList, ...items]); // Add the new items to the list
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>Copy to Clipboard</h1>

      {/* Dialog to show after copying text */}
      {dialogVisible && (
        <div className="dialog">
          <p>Text copied to clipboard!</p>
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
        <button onClick={handleAddText}>Add Text</button>

        {/* Import button */}
        <label htmlFor="file-input" className="import-button">
          Import
        </label>
        <input
          id="file-input"
          type="file"
          accept=".txt"
          style={{ display: "none" }}
          onChange={handleImport}
        />
      </div>

      <div className="text-list">
        {textList.map((text, index) => (
          <div key={index} className="text-item">
            <span>{text}</span>
            <div>
              <button onClick={() => handleCopyToClipboard(text)}>
                Copy to Clipboard
              </button>
              <button onClick={() => handleRemoveText(index)} style={{ marginLeft: "10px" }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
