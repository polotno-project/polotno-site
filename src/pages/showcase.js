import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const USERS = [
  {
    name: 'CoaMaker',
    description: 'Free Coat of Arms Generator and Family Crest Maker',
    link: 'https://coamaker.com/',
    image: 'coamaker.com_.png',
  },
  {
    name: 'Flag Creator',
    description: 'Make your flags',
    link: 'https://flag-creator.com/',
    image: 'flag-creator.com_.png',
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title} Showcase`}
      description="Polotno - Canvas Editor framework for JavaScript"
    >
      <main>
        <h2 id="price">Showcase</h2>
        <div>
          <div className="container">
            {USERS.map((user, i) => (
              <div class="grid-item" key={i}>
                <a href={user.link} target="_blank">
                  <div
                    style={{
                      backgroundImage: `url(/img/showcase/${user.image})`,
                    }}
                    class="preview"
                  ></div>
                  <div class="description">
                    <h5 class="name">{user.name}</h5>
                    <p>{user.description}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
