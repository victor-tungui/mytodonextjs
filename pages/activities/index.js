import useSWR from 'swr';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

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

  const router = useRouter();

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

  function addNewHandler(event) {
    router.replace('/activities/new');
  }

  return (
    <Fragment>
      <div className='row mt-2'>
        <div className='col-md'>
          <button className='btn btn-primary' onClick={addNewHandler}>
            Add New
          </button>
        </div>
      </div>
      <ActivityList activities={data} />
    </Fragment>
  );
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
