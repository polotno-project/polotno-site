import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import { jsonToSVG } from 'polotno/utils/to-svg';
import { svgToURL } from 'polotno/utils/svg';
import FaShapes from '@meronex/icons/fa/FaShapes';
import { Button } from '@blueprintjs/core';
import { ImagesGrid } from 'polotno/side-panel/images-grid';

const createVariation = (json) => {
  // Deep clone json to avoid mutating the original
  const clone = JSON.parse(JSON.stringify(json));
  for (const page of clone.pages) {
    for (const el of page.children) {
      if (el.type === 'text') {
        el.text = el.text.replace('{number}', Math.random());
      }
    }
  }
  return clone;
};

export const VariationsSection = {
  name: 'variations',
  Tab: (props) => (
    <SectionTab name="Variations" {...props}>
      <FaShapes />
    </SectionTab>
  ),
  Panel: observer(({ store }) => {
    const [svgs, setSvgs] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateVariations = async () => {
      setLoading(true);
      const json = store.toJSON();
      const urls = [];
      for (let i = 0; i < 10; i++) {
        const variation = createVariation(json);
        const svgString = await jsonToSVG({ json: variation });
        const url = svgToURL(svgString);
        urls.push({ name: `Variation ${i + 1}`, url });
      }
      setSvgs(urls);
      setLoading(false);
    };

    return (
      <div style={{ padding: 16, height: '100%' }}>
        <Button
          intent="primary"
          loading={loading}
          onClick={generateVariations}
          style={{ marginBottom: 16 }}
          fill
        >
          Generate Variations
        </Button>
        <ImagesGrid
          images={svgs}
          isLoading={loading}
          getPreview={(item) => item.url}
          onSelect={() => {}}
          rowsNumber={2}
          itemHeight={120}
        />
      </div>
    );
  }),
};
