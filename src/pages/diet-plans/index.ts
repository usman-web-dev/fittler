import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { DietPlanModel } from '~/api';

@Component
export default class DietPlanView extends Vue {
  data: Array<DietPlanModel> = [];

  async asyncData({ $api: { dietPlan } }: Context) {
    const data = await dietPlan.getAll();

    return {
      data
    };
  }

  async deletePlan(id: string) {
    this.$nuxt.$loading.start();

    await this.$api.dietPlan.delete(id);

    this.$nuxt.refresh();

    this.$nuxt.$loading.finish();
  }
}
