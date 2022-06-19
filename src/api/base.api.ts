import { Context } from '@nuxt/types';

export abstract class BaseApi {
  $fire!: Context['$fire'];
  $axios!: Context['$axios'];
  $context!: Context;
}
