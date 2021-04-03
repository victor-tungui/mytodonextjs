import { getSession } from 'next-auth/client';

export async function validateSession(request) {
  const session = await getSession({ req: request });

  const redirectLoggedOut = {
    redirect: {
      destination: '/authentication',
      permanent: false,
    },
  };

  const redirectLoggedIn = {
    redirect: {
      destination: '/activities',
      permanent: false,
    },
  };

  return {
    redirectLoggedOut: redirectLoggedOut,
    redirectLoggedIn: redirectLoggedIn,
    session: session,
  };
}
