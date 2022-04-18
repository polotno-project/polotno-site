---
title: Set page size
---

## How to set your own default page sizes?

If you don't like default size panel, you cal always make your own from scratch. You just need to define new Sizes section. In can be like this:

```js
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import { Button } from '@blueprintjs/core';
import { GiResize } from 'react-icons/gi';

const AVAILABLE_SIZES = [
  { width: 500, height: 500 },
  { width: 1000, height: 1000 },
  { width: 1500, height: 1500 },
];

// define the new custom section
const CustomSizesPanel = {
  name: 'sizes',
  Tab: (props) => (
    <SectionTab name="Sizes" {...props}>
      <GiResize icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        {AVAILABLE_SIZES.map(({ width, height }, i) => (
          <Button
            key={i}
            style={{ width: '100%', marginBottom: '20px' }}
            onClick={() => {
              store.setSize(width, height);
            }}
          >
            {width}x{height}
          </Button>
        ))}
      </div>
    );
  }),
};
```
