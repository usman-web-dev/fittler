import { Middleware } from '@nuxt/types';

const nonAuth: Middleware = ({
  store: {
    state: { user }
  },
  redirect
}) => {
  if (user) {
    redirect('/dashboard');
  }
};

export default nonAuth;
