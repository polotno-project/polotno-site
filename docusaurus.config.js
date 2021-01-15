module.exports = {
  title: 'Polotno',
  tagline: 'Graphic design editor framework',
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
        { to: '/#price', label: 'Price', position: 'left' },
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
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/overview',
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
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus'
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus'
        //     }
        //   ]
        // },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog'
            // },
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/facebook/docusaurus'
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lavrton',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Polotno. Built with Docusaurus.`,
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
