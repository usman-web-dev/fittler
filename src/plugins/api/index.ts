import { Plugin } from '@nuxt/types';
import { auth, BaseApi, foodItem, UserModel } from '~/api';
import { BaseService } from '~/services';

const api = { auth, foodItem };

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
  const { $fire, store } = ctx;

  // Inject custom APIs.
  BaseApi.prototype.$fire = $fire;
  BaseApi.prototype.$context = ctx;
  BaseService.prototype.$context = ctx;

  inject('api', api);

  $fire.auth.onAuthStateChanged(async user => {
    let userData: UserModel | null = null;

    if (user) {
      userData = await api.auth.getProfile(user.uid);
    }

    store.commit('SET_USER', userData);
  });
};

export default plugin;
