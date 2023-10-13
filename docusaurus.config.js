module.exports = {
  title: 'Polotno',
  tagline: 'Customizable SDK for making your own canvas editor',
  url: 'https://polotno.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'polotno', // Usually your repo name.
  themeConfig: {
    image: 'img/twitter-card.jpg',
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
        { to: '/docs/overview', label: 'Docs', position: 'left' },
        { to: '/changelog', label: 'Changelog', position: 'left' },
        { to: '/pricing', label: 'Price', position: 'left' },
        { to: '/showcase', label: 'Showcase', position: 'left' },
        { to: '/docs/demo-full-editor', label: 'Demo', position: 'left' },
        { to: 'https://studio.polotno.com', label: 'Studio', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
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
              href: 'https://github.com/polotno-project/polotno-board/projects/1',
            },
            {
              label: 'Changelog',
              to: 'changelog',
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
              href: 'https://status.polotno.com',
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
      appId: 'TB0G132RK2',
      apiKey: '181b9799f5fd62aa2e2ea1aae75de020',
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
      'data-domain': 'polotno.com',
    },
    {
      src: 'https://cdn.paddle.com/paddle/paddle.js',
    },
    {
      src: '/chat.js',
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
