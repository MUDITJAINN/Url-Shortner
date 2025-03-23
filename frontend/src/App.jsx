import { useState } from "react";
import "./App.css"; // Import CSS

function App() {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(originalUrl);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="url"
            placeholder="Enter URL to shorten"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;