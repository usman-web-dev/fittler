import { Plugin } from '@nuxt/types';
import { remove, set } from 'js-cookie';
import { auth, BaseApi, dietPlan, foodItem, user, UserModel } from '~/api';
import { BaseService } from '~/services';

const api = { auth, foodItem, dietPlan, user };

export type Api = typeof api;

interface Props {
  $api: Api;
}

declare module 'vue/types/vue' {
  interface Vue extends Props {}
}

declare module '@nuxt/types' {
  interface NuxtAppOptions extends Props {}
  interface Context extends Props {}
}

const plugin: Plugin = async (ctx, inject) => {
  const {
    $fire,
    $axios,
    store: { commit }
  } = ctx;

  // Inject custom APIs.
  BaseApi.prototype.$fire = $fire;
  BaseApi.prototype.$axios = $axios;
  BaseApi.prototype.$context = ctx;
  BaseService.prototype.$context = ctx;

  inject('api', api);

  if (process.client) {
    $fire.auth.onAuthStateChanged(async user => {
      let userData: UserModel | null = null;

      if (user) {
        userData = await api.auth.getProfile(user.uid);
        set('firebaseUser', JSON.stringify(userData));
      } else {
        remove('firebaseUser');
      }

      commit('SET_USER', userData);
    });
  }
};

export default plugin;
