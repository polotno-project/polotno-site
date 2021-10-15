import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const useCases = [
  {
    title: <>Design apps</>,
    imageUrl: 'img/undraw_moments_0y20.svg',
    description: (
      <>
        Do you want to make an editor for social media images, presentations,
        business cards?
      </>
    ),
  },
  {
    title: <>Printing company</>,
    imageUrl: 'img/undraw_printing_invoices_5r4r.svg',
    description: (
      <>
        Do you have a printing business, so your users can quickly make a design
        to print?
      </>
    ),
  },
  {
    title: <>E-commerce</>,
    imageUrl: 'img/undraw_web_shopping_dd4l.svg',
    description: (
      <>
        Do you have a shop and you want to allow your clients customize their
        purchases. Like making their own T-shirt design?
      </>
    ),
  },
];

const reasons = [
  {
    title: <>Low cost</>,
    imageUrl: 'img/undraw_Savings_dwkw.svg',
    description: (
      <>
        Building full canvas editor is hard. You will save tens or hundreds of
        thousands dollars if you will just use solid and already working
        solution.
      </>
    ),
  },
  {
    title: <>Fast development</>,
    imageUrl: 'img/undraw_speed_test_wxl0.svg',
    description: (
      <>
        Polotno was designed to easily build a canvas editor application and
        used to get your new business feature quickly. Don't waste time. Ship
        new feature today!
      </>
    ),
  },
  {
    title: <>High quality</>,
    imageUrl: 'img/undraw_result_5583.svg',
    description: (
      <>Polotno is made from experience of tens of similar applications.</>
    ),
  },
];

const features = [
  // {
  //   title: <>Fast development</>,
  //   imageUrl: 'img/web_design.svg',
  //   description: (
  //     <>
  //       Polotno was designed to easily build a canvas editor application and
  //       used to get your new business feature quickly.
  //     </>
  //   ),
  // },

  {
    title: <>Modular components</>,
    imageUrl: 'img/undraw_design_notes_8dmv.svg',
    description: (
      <>
        Polotno is a large set of js modules and React components, so you can
        bootstrap a working version in a day.
      </>
    ),
  },
  {
    title: <>Full featured canvas editor</>,
    imageUrl: 'img/undraw_abstract_x68e.svg',
    description: (
      <>
        Polotno has all the features for building rich design tools: selection,
        text styles, image filters, undo/redo, smart cropping, and much more.
      </>
    ),
  },
  {
    title: <>Simple API</>,
    imageUrl: 'img/undraw_dev_productivity_umsq.svg',
    description: (
      <>
        Polotno hide as much complexity from you as possible. So you can use
        clean yet powerful API.
      </>
    ),
  },
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
  'Zazzle',
];

function Home() {
  const ref = React.useRef();

  React.useEffect(() => {
    let competitor = COMPETITORS[0];
    const timeout = setInterval(() => {
      const oldIndex = COMPETITORS.indexOf(competitor);
      const newIndex = (oldIndex + 1) % COMPETITORS.length;
      competitor = COMPETITORS[newIndex];

      // use ref instead of state,
      // because state change is clearing algolia search
      ref.current.innerText = competitor;
    }, 3000);
    return () => clearInterval(timeout);
  }, []);

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
          <p className="hero__subtitle" style={{ marginBottom: '60px' }}>
            {siteConfig.tagline}
          </p>
          <p className="hero__subtitle">
            Create your own app like
            <br />
            <span ref={ref}>{COMPETITORS[0]}</span>
          </p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              style={{
                backgroundColor: 'white',
              }}
              to={useBaseUrl('docs/overview')}
            >
              Get Started
            </Link>
          </div>
          {/* <link
            href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
            rel="stylesheet"
            type="text/css"
          /> */}
          <div
            id="mc_embed_signup"
            style={{ maxWidth: '500px', margin: 'auto', marginTop: '20px' }}
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
                      width: '150px',
                    }}
                  />
                  <input
                    type="submit"
                    value="Subscribe to Polotno news and updates"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button button--outline button--secondary "
                    style={{
                      backgroundColor: 'white',
                    }}
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
                    tabIndex="-1"
                    value=""
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container" style={{ padding: '10px' }}>
          <img className={styles.demoImage} src="/img/polotno.png" />
        </div>
      </header>
      <main>
        <h2>Where to use Polotno?</h2>
        <section className={styles.useCases}>
          <div className="container">
            <div className="row">
              {useCases.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <main>
        <h2>Why use Polotno?</h2>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {reasons.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <main>
        <h2>Anything good for developers?</h2>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <main>
        <h2>Who is using Polotno?</h2>
        <section style={{ textAlign: 'center' }}>
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                <div className={classnames('col col--3', styles.feature)}>
                  <div className="text--center">
                    <a href="https://coamaker.com/" target="_blank">
                      <img
                        style={{ height: '100px', width: 'auto' }}
                        className={styles.featureImage}
                        src="/img/users/coamaker.svg"
                      />
                    </a>
                  </div>
                </div>
                <div className={classnames('col col--3', styles.feature)}>
                  <div className="text--center">
                    <a href="https://mycanas.com/" target="_blank">
                      <img
                        style={{ height: '100px', width: 'auto' }}
                        className={styles.featureImage}
                        src="/img/users/logo-mycanvas.svg"
                      />
                    </a>
                  </div>
                </div>
                <div className={classnames('col col--3', styles.feature)}>
                  <div className="text--center">
                    <a href="https://www.aryeo.com/" target="_blank">
                      <img
                        style={{ height: '100px', width: 'auto' }}
                        className={styles.featureImage}
                        src="/img/users/aryeo.png"
                      />
                    </a>
                  </div>
                </div>
                <div className={classnames('col col--3', styles.feature)}>
                  <div className="text--center">
                    <a href="https://www.jazzudesigner.com/" target="_blank">
                      <img
                        style={{ height: '100px', width: 'auto' }}
                        className={styles.featureImage}
                        src="/img/users/jazzu-designer-logo.png"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                <div className={classnames('col col--6', styles.feature)}>
                  <p>
                    "I have struggled with building my prototype for months,
                    tried several Javascript libraries, and even tried to build
                    a canvas tool by myself. As soon as I had found Polotno,
                    everything happened fast: In just a few hours, I customized
                    Polotno, picked the functions I needed, and from then on
                    concentrated on building my business. Furthermore, the
                    support at Polotno is amazing. New features are published
                    quickly and reflect what the quickly growing community of
                    users wishes."
                  </p>
                </div>
                <div className={classnames('col col--6', styles.feature)}>
                  <p>
                    <div
                      style={{
                        position: 'relative',
                        paddingBottom: '62.5%',
                        height: '0',
                      }}
                    >
                      <iframe
                        src="https://www.loom.com/embed/73bc209dfa41475d99ec11d4b850ac47"
                        frameborder="0"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                        }}
                      ></iframe>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <main>
        <h2>Ready for it?</h2>
        <section style={{ textAlign: 'center' }}>
          <a
            className="pricing-button is-featured"
            style={{ margin: '40px' }}
            href="/docs/overview"
          >
            Documentation
          </a>
          <a
            className="pricing-button is-featured"
            style={{ margin: '40px' }}
            href="/pricing"
          >
            Pricing
          </a>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
