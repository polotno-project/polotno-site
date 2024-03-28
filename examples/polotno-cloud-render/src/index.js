import React from 'react';
import ReactDOM from 'react-dom/client';
import { DEFAULT_JSON } from './sample';

const downloadFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  a.click();
};

// this is a demo key just for that project
// (!) please don't use it in your projects
// to create your own API key please go here: https://polotno.com/cabinet
const KEY = 'nFA5H9elEytDyPyvKL7T';

const App = () => {
  const [pixelRatio, setPixelRatio] = React.useState(1);
  const [type, setType] = React.useState('png');
  const [dpi, setDPI] = React.useState(72);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setImage(null);
    try {
      const json = JSON.parse(document.getElementById('input').value);
      const req = await fetch('https://api.polotno.com/api/render?KEY=' + KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          design: json,
          exportOptions: {
            // use pixelRatio < 1 to have much smaller image at the result
            pixelRatio,
            dpi,
          },
          format: type,
          outputFormat: 'dataURL',
        }),
      });
      const { url } = await req.json();
      if (type === 'pdf') {
        downloadFile(url, 'export.' + type);
      } else {
        setImage(url);
      }
    } catch (e) {
      console.error(e);
      alert('Somethings wen wrong...');
    }
    setLoading(false);
  };

  return (
    <div>
      <h4>Template JSON (result of store.toJSON() export):</h4>
      <textarea
        rows="10"
        id="input"
        style={{ width: '100%' }}
        defaultValue={JSON.stringify(DEFAULT_JSON, null, 2)}
      ></textarea>
      <h4>Output options:</h4>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '100px' }}>File type:</div>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="pdf">PDF</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '100px' }}>Pixel ratio:</div>
        <input
          type="range"
          id="quality"
          min="0.1"
          max="2"
          step="0.1"
          value={pixelRatio}
          onChange={(e) => {
            setPixelRatio(parseFloat(e.target.value));
          }}
        />{' '}
        {pixelRatio}
      </div>
      {type === 'pdf' && (
        <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
          <div style={{ width: '100px' }}>DPI:</div>
          <input
            type="range"
            id="quality"
            min="72"
            max="300"
            step="1"
            value={dpi}
            onChange={(e) => {
              setDPI(parseFloat(e.target.value));
            }}
          />{' '}
          {dpi}
        </div>
      )}
      <p>
        <button
          id="generate-button"
          className="button button--primary"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading
            ? 'Rendering...'
            : type === 'pdf'
            ? 'Render and Download'
            : 'Render'}
        </button>
      </p>
      {image && <img style={{ maxWidth: '100%' }} src={image}></img>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
