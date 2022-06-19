import { Component, Vue } from 'nuxt-property-decorator';
import { DietPlanModel } from '~/api/diet-plan/diet-plan.model';

@Component({
  middleware: ({ redirect, route: { fullPath }, $helpers: { isAdmin } }) => {
    !fullPath.includes('view') && !isAdmin && redirect('/dashboard');
  }
})
export default class AddDietPlan extends Vue {
  dietPlan = new DietPlanModel();
  uid = this.$route.params.id;

  get isView() {
    return this.$route.fullPath.includes('view');
  }

  mounted() {
    if (this.uid) {
      this.loadDietPlan();
    }
  }

  get days() {
    return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  }

  get meals() {
    return ['breakfast', 'lunch', 'dinner'] as const;
  }

  async loadDietPlan() {
    this.$nuxt.$loading.start();
    try {
      this.dietPlan = new DietPlanModel((await this.$api.dietPlan.getById(this.uid)) ?? {});
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }

  async save() {
    this.$nuxt.$loading.start();
    try {
      const { dietPlan } = this.$api;

      this.uid ? await dietPlan.update(this.uid, this.dietPlan) : await dietPlan.add(this.dietPlan);

      this.$alert.show('Diet Plan added successfully!');
      this.$router.push('/diet-plans');
    } catch (e) {
      console.log('error', e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
