import { Context } from '@nuxt/types';

export abstract class BaseApi {
  $fire!: Context['$fire'];
  $context!: Context;
}
