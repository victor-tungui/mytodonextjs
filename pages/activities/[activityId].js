import { validateSession } from '../../library/session/session-validator';
import ActivityForm from '../../components/activities/activity-form';
import mainAxios from '../../library/axios/main-axios';
import useSWR from 'swr';

export default function ActivityDetailsPage(props) {
  const { apiToken } = props.session.user;

  const fetcher = (url) =>
    mainAxios
      .get(url, {
        headers: { Authorization: `Bearer ${apiToken}` },
      })
      .then((result) => result.data);

  const { data, error } = useSWR(`/activities/${props.activityId}`, fetcher);

  if (error) {
    return (
      <div className='alert alert-danger' role='alert'>
        Error Loading the Activity
      </div>
    );
  }

  if (!data) {
    return (
      <div className='alert alert-primary' role='alert'>
        Loading...
      </div>
    );
  }

  return <ActivityForm {...props} isNew='false' activity={data} />;
}

export async function getServerSideProps(context) {
  let auth = await validateSession(context.req);
  let activityId = context.params.activityId;

  if (!auth.session) {
    return auth.redirectLoggedOut;
  }

  return {
    props: {
      session: auth.session,
      activityId,
    },
  };
}
