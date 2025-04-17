import { useState } from "react";
import "./App.css";
import axios from "axios"; 

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortlUrl] = useState("");

  const handleSubmit = (e) => {  // e is the event object of form submission
    e.preventDefault();  // Prevents the default form submission behaviour
    // axios.post('http://localhost:3001/api/short', { originalUrl }) 
    axios.post('https://url-shortner-huig.onrender.com/api/short', { originalUrl })
 // Send a POST request to the server
      .then((res) => { 
        setShortlUrl(res.data);  // Set the shortUrl in the state
        console.log(res.data);  // Log the response data
  })
      .catch((err) => console.log(err));
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
          {
              shortUrl && ( <div className="short-url"> 
              <a href={shortUrl?.shorturl} target="_blank" rel="noreferrer noopener">
              {shortUrl?.shorturl}</a>

              { shortUrl &&  <img src={shortUrl.qrcodeimage} alt="QR Code"></img> }

          </div>
           )
          }
        </form>
      </div>
    </div>
  );
}

export default App;