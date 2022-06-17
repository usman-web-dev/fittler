import { Context } from '@nuxt/types';
// @ts-ignore
import cookieparser from 'cookieparser';
import { Store } from 'vuex';
import { UserModel } from '~/api/auth';

interface State {
  user: UserModel | null;
}

export const state = (): State => ({
  user: null
});

export const mutations = {
  SET_LOGGED_IN() {},
  SET_USER(state: State, user: State['user']) {
    state.user = (user ? ({ ...user } as UserModel) : null) as State['user'];
  }
};

export const actions = {
  async setLoggedIn() {},
  async nuxtServerInit({ commit }: Store<State>, { req }: Context) {
    if (!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const firebaseUser = parsed.firebaseUser;

    if (!firebaseUser) return;

    commit('SET_USER', JSON.parse(firebaseUser));
  }
};
