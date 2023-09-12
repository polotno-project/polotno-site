import React from 'react';
import Layout from '@theme/Layout';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import styles from './styles.module.css';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const DOT_DEV_ID = 'QLNBl0Vci943fWC42GMZXiyWaNvtzXQb';
const DOT_COM_ID = 'MNzqsYRf6Vz2bilIOXqc51Mb9BlDT1Tu';

let ID = DOT_COM_ID;
let onDotCom = true;

if (ExecutionEnvironment.canUseDOM) {
  onDotCom =
    typeof window !== undefined &&
    window.location.origin.indexOf('polotno.com') >= 0;
}

const AUTH_DOMAIN = 'polotno.eu.auth0.com';

const isLocalhost =
  ExecutionEnvironment.canUseDOM &&
  window.location.href.indexOf('localhost') >= 0;

const POLOTNO_API = isLocalhost
  ? 'http://localhost:3001/api'
  : 'https://api.polotno.com/api';
const PRODUCTION_ID = onDotCom ? DOT_COM_ID : DOT_DEV_ID;
const LOCAL_ID = '3ST3bZS6HsQ50L5qkKZ8kKnOtDz831ki';

ID = isLocalhost ? LOCAL_ID : PRODUCTION_ID;

const redirect = isLocalhost
  ? 'http://localhost:3000/cabinet'
  : onDotCom
  ? 'https://polotno.com/cabinet'
  : 'https://polotno.dev/cabinet';

const UserDashboard = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();

  const [subscription, setSubscription] = React.useState(null);
  const [keys, setKeys] = React.useState(null);
  const [createKeyStatus, setKeyCreateStatus] = React.useState(null);
  const [removingKey, setRemovingKey] = React.useState(null);
  const [removingDomain, setRemovingDomain] = React.useState(null);

  const [createDomainStatus, setDomainCreateStatus] = React.useState(null);

  const loadKeys = async () => {
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(POLOTNO_API + '/cabinet/get-keys', {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });
    if (req.status !== 200) {
      alert('Something went wrong. Can not load API keys.');
      return;
    }
    const res = await req.json();
    setKeys(res);
  };

  const loadSubscription = async () => {
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(POLOTNO_API + '/get-user-subscription', {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });
    const res = await req.json();
    setSubscription(res);
  };

  React.useEffect(() => {
    loadKeys();
    loadSubscription();
  }, [user]);

  React.useEffect(() => {
    Paddle.Setup({
      vendor: 118216,
      eventCallback: function (data) {
        // The data.event will specify the event type
        if (data.event === 'Checkout.Complete') {
          loadSubscription();
        }
      },
    });
  }, []);

  const createKey = async () => {
    setKeyCreateStatus('loading');
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(POLOTNO_API + '/cabinet/create-key', {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });
    if (req.status !== 200) {
      alert('Something went wrong');
      setKeyCreateStatus(null);
      return;
    }
    const res = await req.json();
    setKeys(res);
    setKeyCreateStatus(null);
  };

  const deleteKey = async (key) => {
    if (!window.confirm('Are you sure you want to delete a key?')) {
      return;
    }
    setRemovingKey(key);
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(POLOTNO_API + '/cabinet/delete-key', {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify(key),
    });
    const res = await req.json();
    setKeys(res);
    setRemovingKey(null);
  };

  const handleCreateDomain = async (key, domain) => {
    if (!domain) {
      return;
    }
    setDomainCreateStatus('loading' + key);
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(POLOTNO_API + '/cabinet/add-domain', {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify({ domain, key }),
    });
    if (req.status !== 200) {
      alert('Something went wrong');
      setDomainCreateStatus(null);
      return;
    }
    const res = await req.json();
    setKeys(res);
    setDomainCreateStatus(null);
  };

  const handleDeleteDomain = async (key, domain) => {
    setRemovingDomain(key + domain);
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(POLOTNO_API + '/cabinet/delete-domain', {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify({ key, domain }),
    });
    if (req.status !== 200) {
      alert('Something went wrong');
      setRemovingDomain(null);
      return;
    }
    const res = await req.json();
    setKeys(res);
    setRemovingDomain(null);
  };

  return (
    <div>
      <h3>Hey, {user.nickname || user.name || user.email} </h3>
      <a className={styles.logoutButton} onClick={logout}>
        Logout
      </a>

      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        {!keys && <h3>Loading API keys...</h3>}
        {keys && <h3>API keys</h3>}
        {keys && !keys.length && <p>You don't have any API keys yet...</p>}
        {keys && keys.length ? (
          <React.Fragment>
            {keys.map((key) => (
              <div
                className={styles.keyCard}
                key={key.key}
                styles={{
                  pointerEvent: key.key === removingKey ? 'none' : 'auto',
                }}
              >
                <div className={styles.keyRow}>
                  <div className={styles.col1}>Key:</div>
                  <div className={styles.col2}>
                    <pre>{key.key}</pre>
                  </div>
                  <div className={styles.col3}></div>
                </div>
                {key.domains.map((domain, index) => (
                  <div className={styles.keyRow} key={index}>
                    <div className={styles.col1}>
                      {index === 0 && <div>Domains:</div>}
                    </div>
                    <div className={styles.col2}>
                      <pre>{domain}</pre>
                    </div>
                    <div className={styles.col3}>
                      <button
                        onClick={() => {
                          handleDeleteDomain(key.key, domain);
                        }}
                        className="button button--danger"
                        disabled={removingDomain === key.key + domain}
                      >
                        {removingDomain === key.key + domain
                          ? 'Removing...'
                          : 'Remove'}
                      </button>
                    </div>
                  </div>
                ))}
                <div className={styles.keyRow}>
                  <div className={styles.col1}>
                    {key.domains.length === 0 && <div>Domains:</div>}
                  </div>
                  <div className={styles.col2}>
                    <input placeholder="https://example.com"></input>
                  </div>
                  <div className={styles.col3}>
                    <button
                      onClick={(e) => {
                        handleCreateDomain(
                          key.key,
                          e.currentTarget.parentElement.parentElement.querySelector(
                            'input'
                          ).value
                        );
                      }}
                      disabled={createDomainStatus === 'loading' + key.key}
                      className="button button--primary"
                    >
                      {createDomainStatus === 'loading' + key.key
                        ? 'Adding...'
                        : 'Add'}
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    opacity: 0.9,
                    fontSize: '0.8rem',
                  }}
                >
                  Note: it may take up to 8 minutes before domain list changes
                  will take affect.
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    opacity: 0.7,
                    fontSize: '0.8rem',
                  }}
                >
                  You can use full domain <strong>https://example.com</strong>{' '}
                  or subdomain or even patterns like{' '}
                  <strong>https://*.example.com</strong>,{' '}
                  <strong>electron</strong> for Electron apps and{' '}
                  <strong>headless</strong> for polotno-node backend
                  application.
                </div>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                  <button
                    onClick={() => {
                      deleteKey(key);
                    }}
                    disabled={removingKey === key}
                    className="button button--danger"
                  >
                    {removingKey === key
                      ? 'Removing...'
                      : 'Remove key and its domains'}
                  </button>
                </div>
              </div>
            ))}
          </React.Fragment>
        ) : null}

        {keys && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={createKey}
              disabled={createKeyStatus === 'loading'}
              className="button button--primary"
              style={{
                fontSize: '1.2em',
              }}
            >
              {createKeyStatus === 'loading'
                ? 'Creating...'
                : 'Create new API key'}
            </button>
          </div>
        )}

        {/* {!domains && <h3>Loading domains data...</h3>}
        {domains && <h3>Allowed domains</h3>}
        {domains && (
          <p>
            Note: it may take up to 8 minutes before domain list changes will
            take affect.
          </p>
        )}
        {domains && !domains.length ? (
          <p>You don't have any allowed domains yet. </p>
        ) : null}
        {domains && domains.length ? (
          <React.Fragment>
            {domains.map((domain) => (
              <div className={styles.keyRow} key={domain}>
                <pre>{domain}</pre>
                <button
                  onClick={() => {
                    deleteDomain(domain);
                  }}
                  disabled={removingDomain === domain}
                >
                  {removingDomain === domain ? 'Removing...' : 'Remove'}
                </button>
              </div>
            ))}
          </React.Fragment>
        ) : null}
        {domains && (
          <React.Fragment>
            <div className={styles.keyRow}>
              <input ref={domainRef} placeholder="https://example.com"></input>
              <button
                onClick={createDomain}
                disabled={createDomainStatus === 'loading'}
              >
                {createDomainStatus === 'loading' ? 'Adding...' : 'Add'}
              </button>
            </div>
          </React.Fragment>
        )} */}
        <hr />
        {!subscription && <h3>Loading subscription data...</h3>}
        {subscription && !subscription.update_url && (
          <React.Fragment>
            <h3>You have no any subscriptions yet...</h3>
            <p>
              You can use Polotno only for{' '}
              <strong>local development or non-commercial projects</strong>. For
              more information about available plans, please read{' '}
              <a href="/price">Polotno prices</a>.
            </p>

            <p>
              Please use the same email <strong>{user.email}</strong> for
              payment as you used for login.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => {
                  Paddle.Checkout.open({
                    product: 652979,
                    email: user.email,
                  });
                }}
                className="button button--primary"
              >
                Buy Small Team plan for 187 USD.
              </button>
              <button
                onClick={() => {
                  Paddle.Checkout.open({
                    product: 652978,
                    email: user.email,
                  });
                }}
                className="button button--primary"
              >
                Buy Enterprise Team plan for 385 USD.
              </button>
            </div>
          </React.Fragment>
        )}
        {subscription && subscription.update_url && (
          <div>
            <h3>Subscription is {subscription.state}</h3>
            {subscription.next_payment && (
              <>
                <p>
                  You are subscribed to Polotno plan for{' '}
                  {subscription.next_payment.amount}{' '}
                  {subscription.next_payment.currency}.
                </p>
                <p>
                  Next payment will be done on {subscription.next_payment.date}.
                </p>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a href={subscription.update_url}>Update subscription</a>
              <a href={subscription.cancel_url} style={{ color: 'red' }}>
                Cancel subscription
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Cabinet() {
  const { isLoading, isAuthenticated, loginWithPopup, error } = useAuth0();

  return (
    <Layout>
      <div className={styles.cabinetPage}>
        <script
          src="https://cdn.paddle.com/paddle/paddle.js"
          type="text/javascript"
        ></script>
        {isLoading && <h3>Loading...</h3>}
        {isAuthenticated && <UserDashboard />}
        {!isLoading && !isAuthenticated && (
          <div style={{ textAlign: 'center ' }}>
            <h3>Do you want to generate API keys to use Polotno SDK?</h3>
            <a
              onClick={loginWithPopup}
              className={styles.loginButton + ' button button--primary'}
            >
              Login
            </a>
            <p
              style={{
                paddingTop: '80px',
                opacity: 0.7,
                maxWidth: '380px',
                margin: 'auto',
              }}
            >
              If you already bought a subscription, use your payment email for
              signup and login.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default () => {
  return (
    <Auth0Provider domain={AUTH_DOMAIN} clientId={ID} redirectUri={redirect}>
      <Cabinet />
    </Auth0Provider>
  );
};
