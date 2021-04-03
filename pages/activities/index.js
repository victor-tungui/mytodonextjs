import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateSession } from '../../library/session/session-validator';

function MyActivitiesPage(props) {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     setIsLoading(false);
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return <p>Your current Activiities</p>;
}

export default MyActivitiesPage;

export async function getServerSideProps(context) {
  let auth = await validateSession(context.req);

  if (!auth.session) {
    return auth.redirectLoggedOut;
  }

  return {
    props: { session: auth.session },
  };
}
