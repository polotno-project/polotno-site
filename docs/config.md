---
title: Editor configuration
---

### How to change image upload behavior?

The default [SidePanel Component](/docs/side-panel) has `Upload` tab to import local images into the project. By default `polotno` just converting local file into base64 string. Resulted URL strings are using for `image` elements. Using base64 string may produce projects with a large size, since images will be fully encoded inside JSON.

**It is very recommended to upload images into your server!** It will make JSON much smaller and easier to read. Also it will improve the performance of the editor a lot!

If you want to upload local images to your server you can do this:

```js
import { setUploadFunc } from 'polotno/config';

// define our upload function
// you have to write your own logic, that fits your API
async function upload(localFile) {
  const formData = new FormData();
  formData.append('files[]', localFile);
  const res = await fetch(yourServerURL, {
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  const { url } = json;
  // return simple and short url
  return url;
}

// set new function
setUploadFunc(upload);
```

### How to translate UI?

If you want to translate UI into a different language or change some labels you can use this:

```js
import { setTranslations } from 'polotno/config';
setTranslations({
  sidePanel: {
    text: 'Текст',
    myFonts: 'Мои шрифты',
  },
});
```

If you need to know full scheme of translation object you can use:

```js
import { getTranslations } from 'polotno/config';

// log full translations object
console.log(getTranslations());
```

**If you are working on a translation for any language or just changing default labels, please share your results with anton@polotno.com or on [discord](https://discord.gg/W2VeKgsr9J). It will help to make better defaults for UI and to make ready-to-use translations. Thanks.**

Also you can use the same translation API to translate your custom components.

```js
import { observer } from 'mobx-react-lite';
import { t } from 'polotno/utils/l10n';

// in your component
const App = observer(() => {
  return <div>{t('sidePanel.yourLabel')}</div>; // sidePanel.yourLabel is a key in translations object
});
```

### How to change available fonts?

There are three types of fonts in `Polotno`:

1. Google fonts
2. User fonts defined in `store.fonts`
3. Global fonts

#### (1) Google fonts usage

In the default text toolbar, `Polotno` is using a very large list of google fonts. If you don't want to enable the full list or if you want to disable it you can use this:

```js
import { setGoogleFonts } from 'polotno/config';
// pass an array with google fonts names
setGoogleFonts(['Roboto']);
// pass empty array if you don't want to see google fonts in available fonts
setGoogleFonts([]);

// restore default loading of google fonts using Polotno API
setGoogleFonts('default');
```

By default Polotno will load regular, italic, bold and bold italic styles from the font. If you want to customize this and change default styles you can use this:

```js
import { setGoogleFontsVariants } from 'polotno/config';

// default is
setGoogleFontsVariants('400,400italic,700,700italic');

// load only regular and thin styles
setGoogleFontsVariants('400,100');
```

#### (2) User fonts

If you want to add/remove fonts specific for the user you can use [Store Fonts API](/docs/store-overview#working-with-fonts).

Fonts added into `store` directly will be included into JSON export via `store.toJSON()`.

A user can add/remove fonts from the default "Text" side-panel inside "fonts" tab.

#### (3) Global fonts

If you want to add fonts that you want to enable for all users you can use global API. Fonts added via global API will be NOT added into JSON export.

```js
import { addGlobalFont } from 'polotno/config';

// add font by its URL
addGlobalFont({
  fontFamily: 'MyCustomFont',
  url: url,
});

// more control over fonts
addGlobalFont({
  fontFamily: 'MyCustomFont',
  styles: [
    {
      src: 'url(pathToNormalFile.ttf)',
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    {
      src: 'url(pathToBoldFile.ttf)',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
  ],
});

// if a font is already added into the page by some CSS
// you can register it inside polotno
// so it can be listed in available fonts in the toolbar

addGlobalFont({
  fontFamily: 'MyCustomFont',
});
```

### Hot to get API endpoints to get a list of available google fonts?

```js
import { getGoogleFontsListAPI, getGoogleFontImage } from 'polotno/config';

// returns an URL to api.polotno.com
const url = getGoogleFontsListAPI();
// when you fetch the list you can show preview of every font in the list
// to get image path you can use this:
<img src={getGoogleFontImage('Roboto')} />;
```

## Change default preset colors in color picker

By default color picker generates preset colors from (1) used colors in the design and (2) default colors. You can change your logic with your own presets

```js
import { setColorsPresetFunc } from 'polotno/config';

// define your own function
setColorsPresetFunc((store) => {
  // return array of colors
  return ['#000', '#fff'];
});
```
