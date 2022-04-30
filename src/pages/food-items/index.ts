import { Component, Vue } from 'nuxt-property-decorator';
import { FoodItem, FOOD_ITEMS } from '~/utils';

@Component
export default class FoodItemsView extends Vue {
  selectedFoodItems: Array<FoodItem & { quantity: number }> = [];

  get foodItems() {
    return FOOD_ITEMS;
  }

  selectFoodItem(foodItem: FoodItem) {
    const index = this.selectedFoodItems.findIndex(({ id }) => foodItem.id === id);

    if (index > -1) {
      this.selectedFoodItems[index].quantity++;
    } else {
      this.selectedFoodItems.push({ ...foodItem, quantity: 1 });
    }

    this.$alert.show('Food item added.');
  }
}
