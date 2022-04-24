import './styles.css';

import SAMPLE_JSON from './sample.json';

const READY_TEXT = 'Generate birthday cards';
const LOADING_TEXT = 'Doing hard work... Please wait...';

const jsonInput = document.querySelector('#input');
jsonInput.value = JSON.stringify(SAMPLE_JSON);

const button = document.querySelector('#generate-button');

// this is a demo key just for that project
// (!) please don't use it in your projects
// to create your own API key please go here: https://polotno.com/cabinet
const KEY = 'nFA5H9elEytDyPyvKL7T';

button.addEventListener('click', async () => {
  const names = document.querySelector('#names').value.split(',');

  document.querySelector('#images-container').innerHTML = '';
  button.innerHTML = LOADING_TEXT;

  names.forEach(async (name) => {
    const json = jsonInput.value;
    const req = await fetch('https://api.polotno.com/api/render?KEY=' + KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        design: JSON.parse(json.replace('NAME', name)),
        exportOptions: {
          // use pixelRatio < 1 to have much smaller image at the result
          pixelRatio: 0.2,
        },
        outputFormat: 'dataURL',
      }),
    });
    button.innerHTML = READY_TEXT;

    const { url } = await req.json();
    const img = document.createElement('img');
    img.src = url;

    document.querySelector('#images-container').appendChild(img);
  });
});
