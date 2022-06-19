import { BaseApi } from '../base.api';
import { DietPlanModel } from './diet-plan.model';

class DietPlanApi extends BaseApi {
  readonly endpoint = '/diet-plans';

  async getAll() {
    const plans = await this.$fire.firestore.collection(this.endpoint).get();

    return plans.docs.map(plan => {
      return plan.data() as DietPlanModel;
    });
  }

  async getById(uid: string) {
    const doc = await this.$fire.firestore.collection(this.endpoint).doc(uid).get();

    if (doc.exists) {
      return doc.data() as DietPlanModel;
    }

    return null;
  }

  async add(data: DietPlanModel) {
    const doc = this.$fire.firestore.collection(this.endpoint).doc();
    data.id = doc.id;

    return doc.set(JSON.parse(JSON.stringify(data)));
  }

  async update(id: string, data: DietPlanModel) {
    return this.$fire.firestore
      .collection(this.endpoint)
      .doc(id)
      .update(JSON.parse(JSON.stringify(data)));
  }

  async delete(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      await this.$fire.firestore.collection(this.endpoint).doc(id).delete();
    }
  }
}

export const dietPlan = new DietPlanApi();
