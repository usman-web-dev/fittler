export class FoodItemModel {
  id: number | null = null;
  name = '';
  calories = 0;
  unit = '';
  serving = '';

  constructor(data?: Partial<FoodItemModel>) {
    Object.assign(this, data);
  }
}

export class FoodItemEntryModel {
  foodItemId: number | null = null;
  quantity = 0;
  foodItem = new FoodItemModel();

  constructor(data?: Partial<FoodItemEntryModel>) {
    Object.assign(this, data);
  }
}

export class FoodItemDataModel {
  uid!: string;
  date = new Date().toISOString().slice(0, 10);
  data: Array<FoodItemEntryModel> = [];

  constructor(data?: Partial<FoodItemDataModel>) {
    Object.assign(this, data);
  }
}
