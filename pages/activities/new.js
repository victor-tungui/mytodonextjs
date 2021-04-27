import ActivityForm from '../../components/activities/activity-form';
import { validateSession } from '../../library/session/session-validator';

function NewActivityPage(props) {
  return <ActivityForm {...props} isNew='true' />;
}

export default NewActivityPage;

export async function getServerSideProps(context) {
  let auth = await validateSession(context.req);

  if (!auth.session) {
    return auth.redirectLoggedOut;
  }

  return {
    props: { session: auth.session },
  };
}
