import React from 'react';

const Button = ({ showResult }) => {
  const [result, setResult] = React.useState(null);
  React.useEffect(() => {
    if (document.getElementById('polotno-button')) {
      return;
    }
    const script = document.createElement('script');
    script.id = 'polotno-button';

    script.src = 'https://embed.polotno.com/button-v1.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        className="button button--primary"
        onClick={() => {
          window.createPolotnoEditor({
            jsonUrl:
              'https://api.polotno.dev/templates/2021-10-25-instagram-post-sunday-reminder.json',
            onPublish: ({ dataURL }) => {
              setResult(dataURL);
            },
          });
        }}
      >
        Open Polotno Editor
      </button>
      {result && showResult && (
        <>
          <p>Result:</p>
          <img id="result" src={result} style={{ height: '200px' }} />
        </>
      )}
    </div>
  );
};
export default Button;
