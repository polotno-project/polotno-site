module.exports = {
  title: 'Polotno',
  tagline: 'Canvas editor framework',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Polotno',
      logo: {
        alt: 'Polotno logo',
        src: 'img/logo.svg'
      },
      links: [
        // { to: 'docs/getting-started', label: 'Docs', position: 'left' },
        // { to: 'blog', label: 'Blog', position: 'left' }
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right'
        // }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            // {
            //   label: 'Getting Started',
            //   to: 'docs/getting-started'
            // }
            // {
            //   label: 'Second Doc',
            //   to: 'docs/doc2'
            // }
          ]
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
              href: 'https://twitter.com/lavrton'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Polotno. Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
