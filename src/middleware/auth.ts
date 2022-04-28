import { Middleware } from '@nuxt/types';

const auth: Middleware = ({
  $fire: {
    auth: { currentUser }
  },
  redirect
}) => {
  if (!currentUser) {
    redirect('/auth/login');
  }
};

export default auth;
