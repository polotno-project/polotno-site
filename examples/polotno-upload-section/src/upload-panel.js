import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { ImagesGrid } from 'polotno/side-panel';
import { getImageSize } from 'polotno/utils/image';
import { localFileToURL } from 'polotno/utils/file';

import { getImages, saveImage, deleteImage } from './api';

export const UploadPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);
  const [isUploading, setUploading] = React.useState(false);

  const load = async () => {
    const json = await getImages();
    setImages(json.images);
  };

  const handleFileInput = async (e) => {
    const { target } = e;
    setUploading(true);
    for (const file of target.files) {
      const url = await localFileToURL(file);
      await saveImage(url);
    }
    await load();
    setUploading(false);
    target.value = null;
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="input-file">
          <Button
            icon="upload"
            style={{ width: '100%' }}
            onClick={() => {
              document.querySelector('#input-file')?.click();
            }}
            loading={isUploading}
          >
            Upload Image (use small image for demo)
          </Button>
          <input
            type="file"
            id="input-file"
            style={{ display: 'none' }}
            onChange={handleFileInput}
            multiple
          />
        </label>
      </div>
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        crossOrigin="anonymous"
        getCredit={(image) => (
          <div>
            <Button
              icon="trash"
              onClick={async (e) => {
                e.stopPropagation();
                if (
                  window.confirm('Are you sure you want to delete the image?')
                ) {
                  await deleteImage(image.id);
                  await load();
                }
              }}
            ></Button>
          </div>
        )}
        onSelect={async (image, pos, element) => {
          const { url } = image;
          let { width, height } = await getImageSize(url);
          const isSVG = url.indexOf('svg+xml') >= 0 || url.indexOf('.svg') >= 0;

          const type = isSVG ? 'svg' : 'image';

          if (
            element &&
            element.type === 'svg' &&
            !element.locked &&
            type === 'image'
          ) {
            element.set({ maskSrc: url });
            return;
          }

          if (
            element &&
            element.type === 'image' &&
            !element.locked &&
            type === 'image'
          ) {
            element.set({ src: url });
            return;
          }

          const scale = Math.min(store.width / width, store.height / height, 1);
          width = width * scale;
          height = height * scale;

          const x = (pos?.x || store.width / 2) - width / 2;
          const y = (pos?.y || store.height / 2) - height / 2;

          store.activePage?.addElement({
            type,
            src: url,
            x,
            y,
            width,
            height,
          });
        }}
      />
    </div>
  );
});
