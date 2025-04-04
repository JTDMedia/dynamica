import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/access?url=${encodeURIComponent(url)}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Simple Proxy</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ width: '300px', padding: '10px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px' }}>Go</button>
      </form>
    </div>
  );
};

export default App;
