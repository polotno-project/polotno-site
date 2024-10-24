import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const USERS = [
  {
    name: 'ThirdMerch',
    description: 'Merch Customizator',
    link: 'https://www.thirdmerch.com/',
    image: 'www.thirdmerch.com_customize.jpg',
  },
  {
    name: 'Flag Creator',
    description: 'Make your flags',
    link: 'https://flag-creator.com/',
    image: 'flag-creator.com_.jpg',
  },
  {
    name: 'CoaMaker',
    description: 'Free Coat of Arms Generator and Family Crest Maker',
    link: 'https://coamaker.com/',
    // image: 'coamaker.com_.jpg',
    video: 'coamaker.mp4',
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
        <div className="container">
          <h1 style={{ textAlign: 'center', paddingTop: '40px' }}>Showcase</h1>
          <h2 style={{ color: 'grey' }}>
            Take a look into some apps created with Polotno SDK
          </h2>
        </div>
        <div>
          <div className="container">
            {USERS.map((user, i) => (
              <div class="grid-item" key={i}>
                <a href={user.link} target="_blank">
                  {user.video && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="video"
                      src={`/img/showcase/coamaker.mp4`}
                    />
                  )}
                  {user.image && (
                    <div
                      style={{
                        backgroundImage: `url(/img/showcase/${user.image})`,
                      }}
                      class="preview"
                    ></div>
                  )}
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
