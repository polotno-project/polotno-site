---
title: Building a library of templates with Polotno
---

You can use `Polotno` tools and ability to customize side panel to make your own library of templates.

![Templates image](/img/templates.jpg)

In order to make a templates library you will need:

1. Create a design in the `Polotno` Editor
2. Use [`store.toJSON()`](/docs/store-overview#storetojson) to save the design state on computer as `.json` file
3. (Optionally) Use [`store.saveAsImage()`](/docs/store-overview#saveasimage) to save preview file of a design
4. Repeat 1-4 as many times as you need in order to make a library of templates
5. If you skipped step number 3 you can use [`polotno-node`](/docs/server-side) to generate previews automatically
6. Make server side API to access list of templates
7. Create a custom side panel to display list of templates from that API
8. Use [`store.loadJSON()`](/docs/store-overview#storeloadjson)

## (1-4) Making designs library

These are manual steps with human creativity involved. You should use your own polotno-made editor. Or you can use https://studio.polotno.dev/ if you want. You can use "Save" button to download `.json` file.

Now you need to create as many files as you need for your library.

## (5) Generating previews

We can use `polotno-node` API to quickly generate small previews the whole library.
I will show you a quick NodeJS script that will read load directory and create previews for every json file in it.
When script is finished we will have a folder where designs (json files) and previews (png files).

If you prefer not to use NodeJS, you can use [`Polotno Cloud API`](/docs/cloud-render) to generate previews with your own backend language.

```js
import fs from 'fs';
import path from 'path';
import { createInstance } from 'polotno-node';

// we will look for local directory for templates
const FOLDER_NAME = 'templates';

async function run() {
  // create working instance
  const instance = await createInstance({
    // this is a demo key just for that project
    // (!) please don't use it in your projects
    // to create your own API key please go here: https://polotno.dev/cabinet
    key: 'nFA5H9elEytDyPyvKL7T',
  });

  // read all files in the directory
  const files = fs.readdirSync(folder);
  for (const file of files) {
    // if it is not a json file - skip it
    if (file.indexOf('.json') === -1) {
      continue;
    }

    // load file
    const data = fs.readFileSync(path.join(folder, file)).toString();
    const json = JSON.parse(data);

    // convert JSON into image preview
    const imageBase64 = await instance.run(async (json) => {
      store.loadJSON(json);
      await store.waitLoading();
      // set width of previews
      // we usually don't need original size there
      const maxWidth = 200;
      const scale = maxWidth / store.width;
      const url = await store.toDataURL({ pixelRatio: scale });
      return url.split('base64,')[1];
    }, json);

    // save images locally into the same folder
    fs.writeFileSync(
      path.join(folder, file.split('.')[0] + '.png'),
      imageBase64,
      'base64'
    );
    console.log(`Finished ${folder} ${file}`);
  }
  // close instance
  instance.close();
}

run();
```

### (6) Making backend API to load templates

This step is out of polotno scope. You can use any backend stack you like. Most likely you will need API to get a list of available templates. For every design you will need to share public path to `json` file and `png` preview.

**For the demo bellow I will just mock API with static json.**

### (7 and 8) Displaying templates on side panel

As soon as you have backend API to get list of templates, you can use [Side Panel Customization](/docs/side-panel) to display that list on the page.
In the demo we will use `<ImagesGrid />` component and `useInfiniteAPI` hook ([Docs for them](/docs/side-panel-utils)). You don't have to use them in your app. You can make your own implementation. But these modules may save you a lot of time, because they are designed for such use cases. Polotno uses them internally for default side panels.

The side panel may look like this:

```js
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInfiniteAPI } from 'polotno/utils/use-api';

import { SectionTab } from 'polotno/side-panel';
import MdPhotoLibrary from '@meronex/icons/md/MdPhotoLibrary';

import { ImagesGrid } from 'polotno/side-panel/images-grid';

export const TemplatesPanel = observer(({ store }) => {
  // load data
  const { data, isLoading } = useInfiniteAPI({
    getAPI: ({ page }) => `templates/page${page}.json`,
  });

  return (
    <div style={{ height: '100%' }}>
      <ImagesGrid
        shadowEnabled={false}
        images={data?.map((data) => data.items).flat()}
        getPreview={(item) => `/templates/${item.preview}`}
        isLoading={isLoading}
        onSelect={async (item) => {
          // download selected json
          const req = await fetch(`/templates/${item.json}`);
          const json = await req.json();
          // just inject it into store
          store.loadJSON(json);
        }}
        rowsNumber={1}
      />
    </div>
  );
});

// define the new custom section
export const TemplatesSection = {
  name: 'custom-templates',
  Tab: (props) => (
    <SectionTab name="Custom templates" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: TemplatesPanel,
};
```

## Demo

https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-templates-library

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-templates-library?fontsize=14&hidenavigation=1&theme=dark&view=preview"
    style={{
      width: '100%',
      height: '700px',
      border: 0,
      overflow: 'hidden',
    }}
    title="Polotno demo"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-downloads"
  ></iframe>
