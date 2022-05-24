import { FOOD_ITEMS } from '~/utils';
import { BaseApi } from '../base.api';
import { FoodItemDataModel, FoodItemModel } from './food-item.model';

class FoodItemApi extends BaseApi {
  private getDocKey() {
    const { uid } = this.$fire.auth.currentUser!;

    return `${uid}:${this.$context.$helpers.getDate()}`;
  }

  async getTodayFoodItemsData() {
    const doc = await this.$fire.firestore.collection('/food-items-entry').doc(this.getDocKey()).get();

    let data = new FoodItemDataModel({ uid: this.$fire.auth.currentUser!.uid });

    if (doc.exists) {
      data = new FoodItemDataModel(doc.data());
    }

    data.data.forEach(d => {
      d.foodItem = new FoodItemModel(FOOD_ITEMS.find(({ id }) => id === d.foodItemId));
    });

    return data;
  }

  saveTodayFoodItemsData(data: FoodItemDataModel) {
    const foodItemsData = structuredClone(data);

    foodItemsData.data.forEach(d => {
      delete (d as any).foodItem;
    });

    return this.$fire.firestore.collection('/food-items-entry').doc(this.getDocKey()).set(foodItemsData);
  }

  async getCaloriesAddedData(dates: Array<Date>, forCurrentUser = true) {
    const { uid } = this.$fire.auth.currentUser!;

    const dateStrings = dates.map(date => this.$context.$helpers.getDate(date));
    const tempDates = structuredClone(dateStrings);

    const dataFromFirestore: { [uid: string]: Array<{ date: string; caloriesAdded: number }> } = {};

    while (tempDates.length) {
      const batch = tempDates.splice(0, 10);
      let ref = this.$fire.firestore.collection('/food-items-entry').where('date', 'in', batch);

      if (forCurrentUser) {
        ref = ref.where('uid', '==', uid);
      }

      const doc = await ref.get();

      doc.forEach(doc => {
        if (doc.exists) {
          if (!dataFromFirestore[uid]) {
            dataFromFirestore[uid] = [];
          }

          const { date, data } = doc.data() as FoodItemDataModel;

          data.forEach(d => {
            d.foodItem = new FoodItemModel(FOOD_ITEMS.find(({ id }) => id === d.foodItemId));
          });

          dataFromFirestore[uid].push({
            date,
            caloriesAdded: data.reduce((total, { quantity, foodItem: { calories } }) => total + quantity * calories, 0)
          });
        }
      });
    }

    dateStrings.forEach(date => {
      if (!dataFromFirestore[uid]) {
        dataFromFirestore[uid] = [];
      }

      if (!dataFromFirestore[uid].find(({ date: d }) => d === date)) {
        dataFromFirestore[uid].push({ date, caloriesAdded: 0 });
      }
    });

    return dataFromFirestore;
  }

  async getCaloriesBurntData(dates: Array<Date>, forCurrentUser = true) {
    const { uid } = this.$fire.auth.currentUser!;

    const dateStrings = dates.map(date => this.$context.$helpers.getDate(date));
    const tempDates = structuredClone(dateStrings);

    const dataFromFirestore: { [uid: string]: Array<{ date: string; caloriesBurned: number }> } = {};

    while (tempDates.length) {
      const batch = tempDates.splice(0, 10);
      let ref = this.$fire.firestore.collection('/calories_burned').where('date', 'in', batch);

      if (forCurrentUser) {
        ref = ref.where('uid', '==', uid);
      }

      const doc = await ref.get();

      doc.forEach(doc => {
        if (doc.exists) {
          const {
            caloriesBurned: caloriesBurned,
            date,
            ...data
          } = doc.data() as { date: string; caloriesBurned: number; uid: string };

          if (!dataFromFirestore[data.uid]) {
            dataFromFirestore[data.uid] = [];
          }

          dataFromFirestore[data.uid].push({ caloriesBurned: caloriesBurned, date } as {
            date: string;
            caloriesBurned: number;
          });
        }
      });
    }

    if (forCurrentUser) {
      dateStrings.forEach(date => {
        if (!dataFromFirestore[uid]) {
          dataFromFirestore[uid] = [];
        }

        if (!dataFromFirestore[uid].find(({ date: d }) => d === date)) {
          dataFromFirestore[uid].push({ date, caloriesBurned: 0 });
        }
      });
    }
    return dataFromFirestore;
  }
}

export const foodItem = new FoodItemApi();
