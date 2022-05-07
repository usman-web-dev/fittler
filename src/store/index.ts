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
    console.log('ahahah', user);
    state.user = { ...user } as State['user'];
  }
};

export const actions = {
  async setLoggedIn() {}
};
