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
  const [fps, setFps] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [htmlTextRenderEnabled, setHtmlTextRenderEnabled] =
    React.useState(true);
  const [includeBleed, setIncludeBleed] = React.useState(true);
  const [textVerticalResizeEnabled, setTextVerticalResizeEnabled] =
    React.useState(true);
  const [webhook, setWebhook] = React.useState('');
  const [ignoreBackground, setIgnoreBackground] = React.useState(false);
  const [skipFontError, setSkipFontError] = React.useState(false);
  const [skipImageError, setSkipImageError] = React.useState(false);
  const [textOverflow, setTextOverflow] = React.useState('change-font-size');
  const [progress, setProgress] = React.useState(0);

  const handleDownload = async () => {
    setLoading(true);
    setImage(null);
    setProgress(0);
    try {
      const json = JSON.parse(document.getElementById('input').value);
      const req = await fetch(
        'https://api.polotno.com/api/renders?KEY=' + KEY,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            design: json,
            // use pixelRatio < 1 to have much smaller image at the result
            pixelRatio,
            dpi,
            fps,
            format: type,
            outputFormat: 'url',
            htmlTextRenderEnabled,
            includeBleed,
            textVerticalResizeEnabled,
            webhook,
            ignoreBackground,
            skipFontError,
            skipImageError,
            textOverflow,
          }),
        }
      );
      const { id } = await req.json();
      for (let i = 0; i < 100; i++) {
        const req = await fetch(
          'https://api.polotno.com/api/renders/' + id + '?KEY=' + KEY
        );
        const job = await req.json();
        if (job.status === 'error') {
          alert('Error: ' + job.error);
          break;
        }
        if (job.status === 'progress') {
          setProgress(job.progress);
        }
        if (job.status === 'done') {
          const url = job.output;
          if (type === 'pdf' || type === 'mp4') {
            downloadFile(url, 'export.' + type);
          } else {
            setImage(url);
          }
          break;
        }
        // wait a bit
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong...');
    }
    setLoading(false);
    setProgress(0);
  };

  return (
    <div className="container">
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
          <option value="mp4">mp4</option>
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
      {type === 'mp4' && (
        <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
          <div style={{ width: '100px' }}>FPS:</div>
          <input
            type="range"
            id="quality"
            min="5"
            max="60"
            step="1"
            value={fps}
            onChange={(e) => {
              setFps(parseFloat(e.target.value));
            }}
          />{' '}
          {fps}
        </div>
      )}
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>HTML Text Render:</div>
        <input
          type="checkbox"
          checked={htmlTextRenderEnabled}
          onChange={(e) => setHtmlTextRenderEnabled(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Include Bleed:</div>
        <input
          type="checkbox"
          checked={includeBleed}
          onChange={(e) => setIncludeBleed(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Text Vertical Resize:</div>
        <input
          type="checkbox"
          checked={textVerticalResizeEnabled}
          onChange={(e) => setTextVerticalResizeEnabled(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Webhook URL:</div>
        <input
          type="text"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Ignore Background:</div>
        <input
          type="checkbox"
          checked={ignoreBackground}
          onChange={(e) => setIgnoreBackground(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Skip Font Error:</div>
        <input
          type="checkbox"
          checked={skipFontError}
          onChange={(e) => setSkipFontError(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Skip Image Error:</div>
        <input
          type="checkbox"
          checked={skipImageError}
          onChange={(e) => setSkipImageError(e.target.checked)}
        />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <div style={{ width: '200px' }}>Text Overflow:</div>
        <select
          value={textOverflow}
          onChange={(e) => setTextOverflow(e.target.value)}
        >
          <option value="change-font-size">Change Font Size</option>
          <option value="resize">Resize</option>
          <option value="ellipsis">Ellipsis</option>
        </select>
      </div>
      <p>
        <button
          id="generate-button"
          className="button button--primary"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading
            ? progress > 0
              ? `Rendering... ${progress}%`
              : 'Rendering...'
            : type === 'pdf' || type === 'mp4'
            ? 'Render and Download'
            : 'Render'}
        </button>
      </p>
      {image && (
        <img
          style={{ maxWidth: '100%' }}
          src={image}
          alt="Rendered output"
        ></img>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
