import { BaseModel } from '../base.model';

export class UserModel extends BaseModel {
  uid!: string;
  name = '';
  email = '';
  role = 'user';
  age: number | null = null;
  currentWeight: number | null = null;
  goalWeight: number | null = null;
  gender: 'male' | 'female' | null = null;
  img: string | null = null;
  inches: number | null = null;
  feet: number | null = null;

  constructor(data?: Partial<UserModel>) {
    super();
    Object.assign(this, data);
  }
}
