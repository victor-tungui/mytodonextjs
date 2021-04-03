import LoginForm from '../../components/authentication/login-form';
import { validateSession } from '../../library/session/session-validator';

function AuthPage() {
  return <LoginForm />;
}

export default AuthPage;

export async function getServerSideProps(context) {
  let auth = await validateSession(context.req);

  if (auth.session) {
    return auth.redirectLoggedIn;
  }

  return {
    props: {},
  };
}
