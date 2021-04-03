import { Fragment } from 'react';
import Head from 'next/head';
import Navigation from './navigation';

function Layout(props) {
  return (
    <Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='My TODO Application' />
      </Head>
      <Navigation />
      <main className='container'>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
