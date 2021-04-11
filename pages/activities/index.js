import { useEffect } from 'react';
import useSWR from 'swr';

import { validateSession } from '../../library/session/session-validator';
import ActivityList from '../../components/activities/activity-list';
import mainAxios from '../../library/axios/main-axios';

function MyActivitiesPage(props) {
  const fetcher = (url) =>
    mainAxios
      .get(url, {
        headers: { Authorization: `Bearer ${props.session.user.apiToken}` },
      })
      .then((res) => res.data);

  const { data, error } = useSWR('/activities', fetcher);

  if (error) {
    return (
      <div className='alert alert-danger' role='alert'>
        Failed to load
      </div>
    );
  }

  if (!data) {
    return (
      <div className='alert alert-info' role='alert'>
        Loading ...
      </div>
    );
  }

  return <ActivityList activities={data} />;
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
