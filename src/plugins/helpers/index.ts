import { Plugin } from '@nuxt/types';
import { Helpers } from './helpers';

interface Props {
  $helpers: Helpers;
}

declare module 'vue/types/vue' {
  interface Vue extends Props {}
}

declare module '@nuxt/types' {
  interface NuxtAppOptions extends Props {}
  interface Context extends Props {}
}

const helper: Plugin = (ctx, inject) => {
  inject('helpers', new Helpers(ctx));
};

export default helper;
