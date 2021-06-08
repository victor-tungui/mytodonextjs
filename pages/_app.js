import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store/store';

import Layout from '../components/ui/layout/layout';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ReduxProvider>
  );
}

export default MyApp;
