import React from 'react';
import { Button, Classes, Dialog, InputGroup } from '@blueprintjs/core';

// this is a demo key just for that project
// (!) please don't use it in your projects
// to create your own API key please go here: https://polotno.com/cabinet
const KEY = 'nFA5H9elEytDyPyvKL7T';

const ExportModal = ({ isOpen, store, onClose }) => {
  const [input, setInput] = React.useState('Anton, Olga, Mark, Lavr');
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);

  const handleGenerate = async () => {
    setLoading(true);
    const json = store.toJSON();
    const jsonString = JSON.stringify(json);

    const names = input.split(',').map((t) => t.trim());
    const newImages = await Promise.all(
      names.map(async (name) => {
        const newJSON = JSON.parse(jsonString.replace('{name}', name));
        const req = await fetch(
          'https://api.polotno.com/api/render?KEY=' + KEY,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              design: newJSON,
              exportOptions: {
                // use pixelRatio < 1 to have much smaller image at the result
                pixelRatio: 0.2,
              },
              outputFormat: 'dataURL',
            }),
          }
        );
        const { url } = await req.json();
        return url;
      })
    );
    setImages(newImages);
    setLoading(false);
  };

  return (
    <Dialog
      icon="info-sign"
      onClose={onClose}
      title="Generate Previews"
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        List of names to generate previews:
        <InputGroup
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div style={{ display: 'flex', overflow: 'auto' }}>
          {images.map((url, index) => (
            <img
              src={url}
              key={index}
              style={{ display: 'inline-block', margin: '10px' }}
            />
          ))}
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleGenerate} intent="primary" loading={loading}>
            Generate
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export const PreviewButton = ({ store }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <Button
        intent="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        Preview
      </Button>
      <ExportModal
        store={store}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};
