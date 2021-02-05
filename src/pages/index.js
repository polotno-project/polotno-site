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
  const [competitor, setCompetitor] = React.useState(COMPETITORS[0]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const oldIndex = COMPETITORS.indexOf(competitor);
      const newIndex = (oldIndex + 1) % COMPETITORS.length;
      setCompetitor(COMPETITORS[newIndex]);
    }, 3000);
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
          <p className="hero__subtitle" style={{ marginBottom: '60px' }}>
            {siteConfig.tagline}
          </p>
          <p className="hero__subtitle">
            Create your own app like
            <br />
            {competitor}
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
        <h2 id="price">Price</h2>
        {/* TODO: move styles from global to scope */}
        <div class="background">
          <div class="container">
            <div class="panel pricing-table">
              <div class="pricing-plan">
                <h2 class="pricing-header">Non-commercial</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">
                    For non-commercial or development usage only
                  </li>
                  <li class="pricing-features-item">
                    Have a small backlink to polotno website
                  </li>

                  <li class="pricing-features-item">
                    All polotno features included
                  </li>
                  <li class="pricing-features-item">
                    Basic community
                    <br /> support
                  </li>
                </ul>
                <span class="pricing-price">Free</span>
                <span class="pricing-trial"></span>
                <a
                  href={useBaseUrl('docs/overview')}
                  class="pricing-button"
                  onClick={() => {
                    window.plausible('get-started-from-plan');
                  }}
                >
                  Get started
                </a>
              </div>

              <div class="pricing-plan">
                <h2 class="pricing-header">Small team</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">
                    Commercial and non-commercial
                  </li>
                  <li class="pricing-features-item">
                    One domain, up to 300 daily users
                  </li>
                  <li class="pricing-features-item">
                    No watermarks and backlinks
                  </li>
                  <li class="pricing-features-item">
                    Email
                    <br /> support
                  </li>
                </ul>
                <span class="pricing-price">$100 / month</span>
                <span class="pricing-trial">60 days trial period</span>
                <a
                  href="https://buy.paddle.com/product/600588"
                  class="pricing-button"
                  target="_blank"
                  onClick={() => {
                    window.plausible('small-plan-buy');
                  }}
                >
                  Buy
                </a>
              </div>

              <div class="pricing-plan">
                <h2 class="pricing-header">Enterprise</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">
                    Commercial and non-commercial usage
                  </li>
                  <li class="pricing-features-item">
                    Unlimited domains and daily users
                  </li>
                  <li class="pricing-features-item">
                    No watermarks and backlinks
                  </li>
                  <li class="pricing-features-item">
                    High priority features request and support
                  </li>
                </ul>
                <span class="pricing-price">$200 / month</span>
                <span class="trial">60 days trial period</span>
                <a
                  href="https://buy.paddle.com/product/616700"
                  class="pricing-button is-featured"
                  target="_blank"
                  onClick={() => {
                    window.plausible('large-plan-buy');
                  }}
                >
                  Buy
                </a>
              </div>

              <div class="pricing-plan">
                <h2 class="pricing-header">Custom solution</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">
                    We build everything <br /> for you
                  </li>
                  <li class="pricing-features-item">
                    Full access to the customization source code
                  </li>
                  <li class="pricing-features-item">
                    Your own branding and styles
                  </li>
                  <li class="pricing-features-item">
                    1 year bug-free <br />
                    guarantee
                  </li>
                </ul>
                <span class="pricing-price">From $10 000</span>
                <span class="pricing-trial"></span>
                <a
                  href="mailto:anton@lavrton.com?subject=We%20are%20interested%20in%20Polotno%20%Custom%20solution%22%20plan.&body=We%20are%20%5Bsomething%20about%20you%5D.%0D%0A%0D%0AAnd%20we%20are%20interested%20in%20the%20Polotno%20project%20and%20probably%20we%20will%20use%20it%20for%20%5Bdescribe%20your%20needs%5D."
                  class="pricing-button"
                  target="_blank"
                  onClick={() => {
                    window.plausible('custom-solution-request');
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
        <section
          className="container"
          style={{
            textAlign: 'center',
            paddingBottom: '50px',
            fontSize: '1.5rem',
          }}
        >
          These plans don't fit your needs?{' '}
          <a
            href="mailto:anton@lavrton.com?subject=We%20need%20a%20different%20Polotno%20plan.&body=Describe%20your%20needs."
            target="_blank"
          >
            Tell us more
          </a>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
