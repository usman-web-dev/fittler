import { Component, Vue } from 'nuxt-property-decorator';
import { DietPlanModel } from '~/api';

@Component
export default class DietPlanView extends Vue {
  data: Array<DietPlanModel> = [];

  async fetch() {
    this.data = await this.$api.dietPlan.getAll();
  }

  async deletePlan(id: string) {
    this.$nuxt.$loading.start();

    await this.$api.dietPlan.delete(id);

    this.$fetch();

    this.$nuxt.$loading.finish();
  }
}
