import { Component, Vue } from 'nuxt-property-decorator';
import { FoodItemDataModel, FoodItemModel } from '~/api';
import { FOOD_ITEMS } from '~/utils';

@Component
export default class FoodItemsView extends Vue {
  todayFoodItemsData = new FoodItemDataModel();
  search = '';
  dataChanged = false;

  mounted() {
    this.loadData();
  }

  async loadData() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      this.todayFoodItemsData = await this.$api.foodItem.getTodayFoodItemsData();
      this.$nuxt.$loading.finish();
    });
  }

  get foodItems() {
    return FOOD_ITEMS.filter(({ name }) => name.toLowerCase().includes(this.search.toLowerCase()));
  }

  selectFoodItem(foodItem: FoodItemModel) {
    const index = this.todayFoodItemsData.data.findIndex(({ foodItemId }) => foodItem.id === foodItemId);

    if (index > -1) {
      this.todayFoodItemsData.data[index].quantity++;
    } else {
      this.todayFoodItemsData.data.push({ quantity: 1, foodItemId: foodItem.id, foodItem });
    }

    this.dataChanged = true;
  }

  async saveData() {
    if (this.dataChanged) {
      this.$nuxt.$loading.start();

      try {
        await this.$api.foodItem.saveTodayFoodItemsData(this.todayFoodItemsData);
        this.dataChanged = false;
      } catch (e) {
        this.$helpers.handleFirebaseError(e);
      } finally {
        this.$nuxt.$loading.finish();
      }
    }
  }
}
