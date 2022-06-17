export class DietPlanModel {
  id!: string;
  name = '';
  meals = new DaysModel();

  constructor(data?: Partial<DietPlanModel>) {
    Object.assign(this, data);
  }
}

export class MealsModel {
  breakfast = '';
  lunch = '';
  dinner = '';

  constructor(data?: Partial<MealsModel>) {
    Object.assign(this, data);
  }
}
export class DaysModel {
  monday = new MealsModel();
  tuesday = new MealsModel();
  wednesday = new MealsModel();
  thursday = new MealsModel();
  friday = new MealsModel();
  saturday = new MealsModel();
  sunday = new MealsModel();

  constructor(data?: Partial<DaysModel>) {
    Object.assign(this, data);
  }
}
