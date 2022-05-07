import { Middleware } from '@nuxt/types';

const nonAuth: Middleware = ({
  $fire: {
    auth: { currentUser }
  },
  redirect
}) => {
  if (currentUser) {
    redirect('/dashboard');
  }
};

export default nonAuth;
