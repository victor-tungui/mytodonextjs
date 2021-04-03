import { Provider } from 'next-auth/client';

import Layout from '../components/ui/layout/layout';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
