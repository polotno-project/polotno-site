module.exports = {
  title: 'Polotno',
  tagline: 'SDK for making design editors for the web',
  url: 'https://polotno.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'polotno', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'Polotno',
      logo: {
        alt: 'Polotno logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'docs/overview', label: 'Docs', position: 'left' },
        { to: 'changelog', label: 'Changelog', position: 'left' },
        { to: '/pricing', label: 'Price', position: 'left' },
        { to: '/docs/demo-full-editor', label: 'Showcase', position: 'left' },
        { to: 'https://studio.polotno.dev', label: 'Studio', position: 'left' },
        { to: '/cabinet', label: 'API keys', position: 'right' },
        {
          to: 'https://discord.gg/W2VeKgsr9J',
          label: 'Discord chat',
          position: 'right',
        },
        { to: '/contact', label: 'Contact', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/overview',
            },
            {
              label: 'Roadmap and bugs reports',
              href: 'https://github.com/lavrton/polotno-board/issues',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            // {
            //   label: 'Second Doc',
            //   to: 'docs/doc2'
            // }
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'Company',
          items: [
            {
              label: 'Status',
              href: 'https://status.polotno.dev',
            },
            {
              label: 'License',
              href: '/license',
            },
            {
              label: 'Privacy',
              href: '/privacy',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lavrton',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Polotno. Built with Docusaurus.`,
    },
    algolia: {
      apiKey: '29f79523fee713489da139abf189e9c4',
      indexName: 'polotno',

      // Optional: see doc section bellow
      contextualSearch: false,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
  },
  scripts: [
    {
      src: 'https://plausible.io/js/plausible.js',
      async: true,
      defer: true,
      'data-domain': 'polotno.dev',
    },
    {
      src: 'https://cdn.paddle.com/paddle/paddle.js',
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
