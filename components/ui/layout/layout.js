import { Fragment } from "react";
import Head from "next/head";
import Navigation from "./navigation";

function Layout(props) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="description" content="My ToDO Application" />
      </Head>
      <Navigation />
      <main className="container">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
