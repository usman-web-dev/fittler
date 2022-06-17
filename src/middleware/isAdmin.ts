import { Middleware } from '@nuxt/types';

const userAuth: Middleware = ({ redirect, $helpers: { isAdmin } }) => {
  !isAdmin && redirect('/dashboard');
};

export default userAuth;
