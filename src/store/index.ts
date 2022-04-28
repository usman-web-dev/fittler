import { ActionContext } from 'vuex';

interface State {
  user: { uid: string; email: string; displayName: string } | null;
}

export const state = (): State => ({
  user: null
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state: State, { authUser }: any) {
    if (!authUser) {
      state.user = null;
    } else {
      const { uid, email, displayName } = (authUser as State['user'])!;
      state.user = { uid, email, displayName };
    }
  }
};

export const actions = {
  onAuthStateChangedAction: ({ commit }: ActionContext<any, any>, data: any) => {
    commit('ON_AUTH_STATE_CHANGED_MUTATION', data);
  }
};
