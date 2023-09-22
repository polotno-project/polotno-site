import React from 'react';

const DEFAULT_JSON = {
  width: 1080,
  height: 1080,
  fonts: [],
  pages: [
    {
      id: 'w76qNOu-sr',
      children: [
        {
          id: 'voQ9zYqhvt',
          type: 'image',
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          blurEnabled: false,
          blurRadius: 10,
          brightnessEnabled: false,
          brightness: 0,
          sepiaEnabled: false,
          grayscaleEnabled: false,
          shadowEnabled: false,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'black',
          selectable: true,
          alwaysOnTop: false,
          showInExport: true,
          width: 1080,
          height: 1080,
          src: 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTY5OTZ8MHwxfHNlYXJjaHwyfHxwYXN0ZWwlMjBiYWxsb29ufGVufDB8fHx8MTYzMDk5ODE4OQ&ixlib=rb-1.2.1&q=80&w=1080',
          cropX: 0,
          cropY: 0,
          cropWidth: 1,
          cropHeight: 1,
          cornerRadius: 0,
          flipX: false,
          flipY: false,
          clipSrc: '',
          borderColor: 'black',
          borderSize: 0,
        },
        {
          id: '_UpqKWLYBM',
          type: 'text',
          x: 189.1818723754583,
          y: 129.75903614457823,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          blurEnabled: false,
          blurRadius: 10,
          brightnessEnabled: false,
          brightness: 0,
          sepiaEnabled: false,
          grayscaleEnabled: false,
          shadowEnabled: false,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'black',
          selectable: true,
          alwaysOnTop: false,
          showInExport: true,
          text: 'Birthday',
          placeholder: '',
          fontSize: 250,
          fontFamily: 'Cookie',
          fontStyle: 'normal',
          fontWeight: 'normal',
          textDecoration: '',
          fill: 'black',
          align: 'center',
          width: 736.0987892604895,
          height: 300,
          strokeWidth: 0,
          stroke: 'black',
          lineHeight: 1.2,
          letterSpacing: 0,
        },
        {
          id: 'nAzzW9iZFy',
          type: 'text',
          x: 269.9999999899999,
          y: 46.899390591100996,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          blurEnabled: false,
          blurRadius: 10,
          brightnessEnabled: false,
          brightness: 0,
          sepiaEnabled: false,
          grayscaleEnabled: false,
          shadowEnabled: false,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'black',
          selectable: true,
          alwaysOnTop: false,
          showInExport: true,
          text: 'HAPPY',
          placeholder: '',
          fontSize: 80,
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 'normal',
          textDecoration: '',
          fill: 'black',
          align: 'center',
          width: 540,
          height: 96,
          strokeWidth: 0,
          stroke: 'black',
          lineHeight: 1.2,
          letterSpacing: 0,
        },
        {
          id: 'v-QGa2tA1V',
          type: 'text',
          x: 287.2312670057029,
          y: 429.7590361445782,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          blurEnabled: false,
          blurRadius: 10,
          brightnessEnabled: false,
          brightness: 0,
          sepiaEnabled: false,
          grayscaleEnabled: false,
          shadowEnabled: false,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'black',
          selectable: true,
          alwaysOnTop: false,
          showInExport: true,
          text: 'TO YOU',
          placeholder: '',
          fontSize: 80,
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 'normal',
          textDecoration: '',
          fill: 'black',
          align: 'center',
          width: 540,
          height: 96,
          strokeWidth: 0,
          stroke: 'black',
          lineHeight: 1.2,
          letterSpacing: 0,
        },
        {
          id: 'Z40u2lixXW',
          type: 'text',
          x: 125.99999999999994,
          y: 690.3979211431999,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          blurEnabled: false,
          blurRadius: 10,
          brightnessEnabled: false,
          brightness: 0,
          sepiaEnabled: false,
          grayscaleEnabled: false,
          shadowEnabled: false,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'black',
          selectable: true,
          alwaysOnTop: false,
          showInExport: true,
          text: 'Anton',
          placeholder: '',
          fontSize: 184,
          fontFamily: 'Alata',
          fontStyle: 'normal',
          fontWeight: 'normal',
          textDecoration: '',
          fill: 'black',
          align: 'center',
          width: 828,
          height: 220.79999999999998,
          strokeWidth: 0,
          stroke: 'black',
          lineHeight: 1.2,
          letterSpacing: 0,
        },
      ],
      background: 'white',
    },
  ],
};

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

const CloudRenderDemo = () => {
  const [pixelRatio, setPixelRatio] = React.useState(1);
  const [type, setType] = React.useState('png');
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

export default CloudRenderDemo;
