import { Plugin } from '@nuxt/types';
import { BaseApi } from '~/api';
import { BaseService } from '~/services';

const api = {};

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

const plugin: Plugin = (ctx, inject) => {
  // Inject custom APIs.
  BaseApi.prototype.$fire = ctx.$fire;
  BaseApi.prototype.$context = ctx;
  BaseService.prototype.$context = ctx;

  inject('api', api);
};

export default plugin;
