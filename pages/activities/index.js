import useSWR from 'swr';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { validateSession } from '../../library/session/session-validator';
import ActivityList from '../../components/activities/activity-list';
import mainAxios from '../../library/axios/main-axios';

function MyActivitiesPage(props) {
  // Variable definition
  const [page, setPage] = useState(1);

  const fetcher = (url) =>
    mainAxios
      .get(url, {
        headers: { Authorization: `Bearer ${props.session.user.apiToken}` },
      })
      .then((res) => res.data);

  const urlActivities = `/activities?page=${page}&status=-1&pageSize=10`;
  const { data, error } = useSWR(urlActivities, fetcher);
  const router = useRouter();

  // Function definition
  function addNewHandler(event) {
    router.replace('/activities/new');
  }

  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const previousPageHandler = () => {
    setPage(page - 1);
  };

  // Content Definition

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

  const nextAvailable = data.currentPage < data.totalPages;
  const prevAvailable = data.currentPage > 1;

  const nextDisabledCss = nextAvailable ? 'page-item' : 'page-item disabled';
  const prevDisabledCss = prevAvailable ? 'page-item' : 'page-item disabled';

  return (
    <Fragment>
      <div className='row mt-2'>
        <div className='col-md'>
          <button className='btn btn-primary' onClick={addNewHandler}>
            Add New
          </button>
        </div>
      </div>
      <ActivityList activities={data.items} />

      <nav>
        <ul className='pagination'>
          <li className={prevDisabledCss}>
            <button
              type='button'
              className='page-link'
              disabled={!prevAvailable}
              onClick={previousPageHandler}
            >
              Previous
            </button>
          </li>
          <li className={nextDisabledCss}>
            <button
              type='button'
              className='page-link'
              disabled={!nextAvailable}
              onClick={nextPageHandler}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
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
