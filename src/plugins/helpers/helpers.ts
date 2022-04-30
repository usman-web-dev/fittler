import { FirebaseError } from '@firebase/util';
import { Context } from '@nuxt/types';
import { FIREBASE_ERROR_MESSAGES } from '~/utils';

export class Helpers {
  constructor(private $context: Context) {}

  upperFirst(text?: string) {
    return (text?.charAt(0).toUpperCase() ?? '') + text?.slice(1);
  }

  slugify(text?: string) {
    return (text ?? '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  unslugify(text?: string) {
    return (text ?? '').replace(/-/g, ' ').replace(/\w\S*/g, str => this.upperFirst(str));
  }

  titleize(text?: string): string {
    return this.unslugify(text)
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
  }

  handleFirebaseError(e: any) {
    this.$context.$alert.show(FIREBASE_ERROR_MESSAGES[(e as FirebaseError).code], 'error');
  }
}
