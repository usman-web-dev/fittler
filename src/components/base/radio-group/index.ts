import { Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';
import { AnyObject } from '~/utils';
import BaseInput from '../input';

@Component({
  components: {
    ValidationProvider
  }
})
export default class BaseRadioGroup extends BaseInput {
  @Prop({ required: true, type: Array })
  private readonly items!: Array<AnyObject>;
}
