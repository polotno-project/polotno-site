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
  const [fps, setFps] = React.useState(24);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [htmlTextRenderEnabled, setHtmlTextRenderEnabled] =
    React.useState(false);
  const [includeBleed, setIncludeBleed] = React.useState(false);
  const [textVerticalResizeEnabled, setTextVerticalResizeEnabled] =
    React.useState(false);
  const [webhook, setWebhook] = React.useState('');
  const [ignoreBackground, setIgnoreBackground] = React.useState(false);
  const [skipFontError, setSkipFontError] = React.useState(false);
  const [skipImageError, setSkipImageError] = React.useState(false);
  const [textOverflow, setTextOverflow] = React.useState('change-font-size');
  const [progress, setProgress] = React.useState(0);
  const [vector, setVector] = React.useState(false);
  const [colorSpace, setColorSpace] = React.useState('RGB');
  const [profile, setProfile] = React.useState('FOGRA39');

  // UI related state
  const [jsonText, setJsonText] = React.useState(
    JSON.stringify(DEFAULT_JSON, null, 2)
  );
  const [jsonError, setJsonError] = React.useState(null);

  const textareaRef = React.useRef(null);

  const handleDownload = async () => {
    setLoading(true);
    setImage(null);
    setProgress(0);
    try {
      let json;
      try {
        json = JSON.parse(jsonText);
        setJsonError(null);
      } catch (e) {
        setJsonError(e.message);
        textareaRef.current?.focus();
        setLoading(false);
        setProgress(0);
        return;
      }
      const req = await fetch(
        'https://api.polotno.com/api/renders?KEY=' + KEY,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Prefer: 'wait',
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
            vector,
            textOverflow,
            color: {
              space: colorSpace,
              profile: colorSpace === 'CMYK' ? profile : undefined,
            },
          }),
        }
      );
      const job = await req.json();
      if (job.status === 'error') {
        alert('Error: ' + job.error);
        setLoading(false);
        setProgress(0);
        return;
      }
      if (job.status === 'done') {
        const url = job.output;
        if (type === 'pdf' || type === 'mp4' || type === 'gif') {
          downloadFile(url, 'export.' + type);
        } else {
          setImage(url);
        }
        setLoading(false);
        setProgress(0);
        return;
      }
      const jobId = job.id;
      for (let i = 0; i < 100; i++) {
        const req = await fetch(
          'https://api.polotno.com/api/renders/' + jobId + '?KEY=' + KEY
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
          if (type === 'pdf' || type === 'mp4' || type === 'gif') {
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
      // general error, not JSON related
      alert('Something went wrong...');
    }
    setLoading(false);
    setProgress(0);
  };

  return (
    <>
      <div className="layout">
        <div className="pane json-pane">
          <div className="textarea-header">
            <h4 style={{ margin: 0 }}>Template JSON</h4>
            {jsonError && <span className="error">{jsonError}</span>}
          </div>
          <textarea
            ref={textareaRef}
            className="json-input"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            onBlur={() => {
              try {
                JSON.parse(jsonText);
                setJsonError(null);
              } catch (e) {
                setJsonError(e.message);
              }
            }}
            style={{ width: '100%', height: '100%', resize: 'vertical' }}
          />
        </div>
        <div className="pane preview-pane">
          <h4 style={{ marginTop: 0 }}>Preview</h4>
          {image ? (
            <img
              src={image}
              alt="Rendered output"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div className="preview-placeholder"></div>
          )}
        </div>
      </div>

      {/* Primary visible options */}
      <div className="primary-options">
        <div className="option">
          <label>File type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="gif">GIF</option>
            <option value="pdf">PDF</option>
            <option value="mp4">mp4</option>
          </select>
        </div>
        <div className="option">
          <label>Pixel ratio: {pixelRatio}</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={pixelRatio}
            onChange={(e) => setPixelRatio(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Advanced options */}
      <details className="advanced-options">
        <summary>Advanced options</summary>
        <div className="options-grid">
          {type === 'pdf' && (
            <>
              <div className="option">
                <label>DPI: {dpi}</label>
                <input
                  type="range"
                  min="72"
                  max="300"
                  step="1"
                  value={dpi}
                  onChange={(e) => setDPI(parseFloat(e.target.value))}
                />
              </div>
              <div className="option">
                <label>Vector:</label>
                <input
                  type="checkbox"
                  checked={vector}
                  onChange={(e) => setVector(e.target.checked)}
                />
              </div>
            </>
          )}

          {type === 'mp4' && (
            <div className="option">
              <label>FPS: {fps}</label>
              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={fps}
                onChange={(e) => setFps(parseFloat(e.target.value))}
              />
            </div>
          )}

          <div className="option">
            <label>HTML Text Render:</label>
            <input
              type="checkbox"
              checked={htmlTextRenderEnabled}
              onChange={(e) => setHtmlTextRenderEnabled(e.target.checked)}
            />
          </div>

          <div className="option">
            <label>Include Bleed:</label>
            <input
              type="checkbox"
              checked={includeBleed}
              onChange={(e) => setIncludeBleed(e.target.checked)}
            />
          </div>

          <div className="option">
            <label>Text Vertical Resize:</label>
            <input
              type="checkbox"
              checked={textVerticalResizeEnabled}
              onChange={(e) => setTextVerticalResizeEnabled(e.target.checked)}
            />
          </div>

          <div className="option">
            <label>Webhook URL:</label>
            <input
              type="text"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
            />
          </div>

          <div className="option">
            <label>Ignore Background:</label>
            <input
              type="checkbox"
              checked={ignoreBackground}
              onChange={(e) => setIgnoreBackground(e.target.checked)}
            />
          </div>

          <div className="option">
            <label>Skip Font Error:</label>
            <input
              type="checkbox"
              checked={skipFontError}
              onChange={(e) => setSkipFontError(e.target.checked)}
            />
          </div>

          <div className="option">
            <label>Skip Image Error:</label>
            <input
              type="checkbox"
              checked={skipImageError}
              onChange={(e) => setSkipImageError(e.target.checked)}
            />
          </div>

          {(type === 'jpeg' || type === 'pdf') && (
            <div className="option">
              <label>Color Space:</label>
              <select
                value={colorSpace}
                onChange={(e) => setColorSpace(e.target.value)}
              >
                <option value="RGB">RGB</option>
                <option value="CMYK">CMYK</option>
              </select>
            </div>
          )}

          {(type === 'jpeg' || type === 'pdf') && colorSpace === 'CMYK' && (
            <div className="option">
              <label>Profile:</label>
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              >
                <option value="FOGRA39">FOGRA39</option>
                <option value="USWebCoatedSWOP">USWebCoatedSWOP</option>
              </select>
            </div>
          )}

          <div className="option">
            <label>Text Overflow:</label>
            <select
              value={textOverflow}
              onChange={(e) => setTextOverflow(e.target.value)}
            >
              <option value="change-font-size">Change Font Size</option>
              <option value="resize">Resize</option>
              <option value="ellipsis">Ellipsis</option>
            </select>
          </div>
        </div>
      </details>

      {/* Sticky action bar */}
      <div className="action-bar">
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
            : type === 'pdf' || type === 'mp4' || type === 'gif'
            ? 'Render & Download'
            : 'Render'}
        </button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
