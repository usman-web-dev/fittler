import { Middleware } from '@nuxt/types';

const auth: Middleware = ({
  store: {
    state: { user }
  },
  redirect
}) => {
  if (!user) {
    redirect('/auth/login');
  }
};

export default auth;
