/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Polotno',
      collapsed: false,
      items: ['overview', 'config', 'frameworkless'],
    },
    {
      type: 'category',
      label: 'Store API',
      collapsed: false,
      items: ['store-overview', 'page-overview', 'element-overview'],
    },
    {
      type: 'category',
      label: 'UI components',
      collapsed: false,
      items: ['workspace', 'side-panel', 'toolbar'],
    },
    {
      type: 'category',
      label: 'Misc',
      collapsed: false,
      items: [
        'custom-element',
        'templates-library',
        'server-side',
        'vue-integration',
        'server-api',
        'cloud-render',
      ],
    },
    {
      type: 'category',
      label: 'Showcase',
      collapsed: false,
      items: [
        'demo-full-editor',
        'demo-book-cover-editor',
        'demo-simple-t-shirt',
      ],
    },
  ],
};
