import React from 'react';
import Layout from '@theme/Layout';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import styles from './styles.module.css';

const DOMAIN = 'polotno.eu.auth0.com';
const API = 'https://api.polotno.dev/api';

const UserDashboard = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();

  const [subscription, setSubscription] = React.useState(null);
  const [keys, setKeys] = React.useState(null);
  const [createStatus, setCreateState] = React.useState(null);
  const [removingKey, setRemovingKey] = React.useState(null);

  const loadKeys = async () => {
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(API + '/get-user-keys', {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });
    const res = await req.json();
    setKeys(res);
  };

  const loadSubscription = async () => {
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(API + '/get-user-subscription', {
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

  const createKey = async () => {
    setCreateState('loading');
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(API + '/create-user-key', {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });
    const res = await req.json();
    setKeys(res);
    setCreateState(null);
  };

  const deleteKey = async (key) => {
    setRemovingKey(key);
    const accessToken = await getAccessTokenSilently({});

    const req = await fetch(API + '/delete-user-key', {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify({ key }),
    });
    const res = await req.json();
    setKeys(res);
    setRemovingKey(null);
  };

  return (
    <div>
      <h3>Hey, {user.nickname || user.name || user.email} </h3>
      <a className={styles.logoutButton} onClick={logout}>
        Logout
      </a>

      {!keys && <h3>Loading API keys...</h3>}
      {keys && !keys.length && <h3>You don't have any API keys yet...</h3>}
      {keys && keys.length ? (
        <React.Fragment>
          <h3>API keys</h3>
          {keys.map((key) => (
            <div className={styles.keyRow} key={key}>
              <pre>{key}</pre>
              <button
                onClick={() => {
                  deleteKey(key);
                }}
                disabled={removingKey === key}
              >
                {removingKey === key ? 'Removing...' : 'Remove'}
              </button>
            </div>
          ))}
        </React.Fragment>
      ) : null}
      {keys && (
        <button onClick={createKey} disabled={createStatus === 'loading'}>
          {createStatus === 'loading' ? 'Creating...' : 'Create new key'}
        </button>
      )}
      {!subscription && <h3>Loading subscription data...</h3>}
      {subscription && !subscription.update_url && (
        <React.Fragment>
          <h3>You have no any subscriptions yet...</h3>
          <a href="/#price">I want to buy polotno.</a>
        </React.Fragment>
      )}
      {subscription && subscription.update_url && (
        <div>
          <h3>Subscription</h3>
          <p>
            <a href={subscription.update_url}>Update subscription</a>
          </p>
          <p>
            <a href={subscription.cancel_url} style={{ color: 'red' }}>
              Cancel subscription
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

function Cabinet() {
  const { isLoading, isAuthenticated, loginWithPopup } = useAuth0();

  return (
    <Layout>
      <div className={styles.cabinetPage}>
        {isLoading && <h3>Loading...</h3>}
        {isAuthenticated && <UserDashboard />}
        {!isLoading && !isAuthenticated && (
          <div style={{ textAlign: 'center ' }}>
            <h3>Do you want to generate API keys to use Polotno SDK?</h3>
            <a onClick={loginWithPopup} className={styles.loginButton}>
              Login
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default () => {
  return (
    <Auth0Provider
      domain={DOMAIN}
      clientId="QLNBl0Vci943fWC42GMZXiyWaNvtzXQb"
      redirectUri={'https://polotno.dev/cabinet'}
    >
      <Cabinet />
    </Auth0Provider>
  );
};
