import { BaseModel } from '../base.model';

export class SignupModel extends BaseModel {
  name = '';
  email = '';
  role = 'user';
  password = '';
  age: number | null = null;
  currentWeight: number | null = null;
  goalWeight: number | null = null;
  gender: 'male' | 'female' | null = null;
  file: File | null = null;
  inches: number | null = null;
  feet: number | null = null;
  img: string | null = null;

  constructor(data?: Partial<SignupModel>) {
    super();
    Object.assign(this, data);
  }
}
