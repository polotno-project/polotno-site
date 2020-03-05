import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Fast development</>,
    imageUrl: 'img/web_design.svg',
    description: (
      <>
        Polotno was designed to easily build a canvas editor application and
        used to get your new business feature quickly.
      </>
    )
  },
  {
    title: <>Modular components</>,
    imageUrl: 'img/designers.svg',
    description: (
      <>
        Polotno is a large set of js modules and React components, so you can
        bootstrap a working version.
      </>
    )
  },
  {
    title: <>Your own canvas editor</>,
    imageUrl: 'img/new_app.svg',
    description: (
      <>
        Polotno has all the features for building rich design tools: selection,
        text styles, image filters, undo/redo, smart cropping, and much more.
      </>
    )
  }
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const COMPETITORS = [
  'Canva',
  'Stensil',
  'PixTeller',
  'Snappa',
  'Designbold',
  'Crello',
  'Piktochart',
  'Zazzle'
];

function Home() {
  const [competitor, setCompetitor] = React.useState(COMPETITORS[0]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const oldIndex = COMPETITORS.indexOf(competitor);
      const newIndex = (oldIndex + 1) % COMPETITORS.length;
      setCompetitor(COMPETITORS[newIndex]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [competitor]);

  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Canvas Editor Framework ${siteConfig.title}`}
      description="Polotno - Canvas Editor framework for JavaScript"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className="hero__subtitle">
            Make your own {competitor} alternative.
          </p>
          {/* <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/getting-started')}
            >
              Get Started
            </Link>
          </div> */}
          {/* <link
            href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
            rel="stylesheet"
            type="text/css"
          /> */}
          <div
            id="mc_embed_signup"
            style={{ maxWidth: '400px', margin: 'auto' }}
          >
            <form
              action="https://dev.us10.list-manage.com/subscribe/post?u=c4acb00b499825f956980387e&amp;id=c004a2de67"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group">
                  <input
                    type="email"
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    placeholder="Your email"
                    style={{
                      padding: '8px',
                      border: '1px solid white',
                      borderRadius: '4px',
                      marginRight: '10px',
                      width: '150px'
                    }}
                  />
                  <input
                    type="submit"
                    value="Get notified on early access"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  />
                </div>
                <div id="mce-responses" className="clear">
                  <div
                    className="response"
                    id="mce-error-response"
                    style={{ display: 'none' }}
                  ></div>
                  <div
                    className="response"
                    id="mce-success-response"
                    style={{ display: 'none' }}
                  ></div>
                </div>
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_c4acb00b499825f956980387e_c004a2de67"
                    tabindex="-1"
                    value=""
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
