import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  inheritAttrs: false
})
export default class BaseInput extends Vue {
  // Props
  @Prop({ default: '', type: String })
  protected readonly rules!: string;

  @Prop({ type: String })
  protected readonly vid!: string;

  @Prop({ default: null })
  protected readonly value!: string | null;

  @Prop({ default: true, type: Boolean })
  protected readonly outlined!: boolean;
}
