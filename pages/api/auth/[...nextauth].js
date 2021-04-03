import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const loginRequest = await axios.post(
          'http://localhost:54637/api/Authentication/Login',
          {
            Email: credentials.email,
            Password: credentials.password,
          },
          {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        );

        if (loginRequest) {
          return {
            email: loginRequest.data.email,
            apiToken: loginRequest.data.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session(session, token) {
      session.user = token.user;
      return session;
    },
  },
});
