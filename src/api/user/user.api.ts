import { DUMMY_IMAGE } from '~/utils';
import { SignupModel, UserModel } from '../auth';
import { BaseApi } from '../base.api';

class UsersApi extends BaseApi {
  async create({ email, password, name, file, ...data }: SignupModel) {
    const user = await this.$axios.$post('/firebase/users', { email, password, name });

    if (!user) {
      throw new Error('Something went wrong.');
    }

    const userData = new UserModel({
      ...data,
      uid: user.uid,
      email: user.email!,
      img: DUMMY_IMAGE,
      name
    });

    if (file) {
      userData.img = await this.uploadProfilePic(file);
    }
    await this.saveUserInFirestore(userData);
  }

  async delete(id: string) {
    await this.$axios.delete(`/firebase/users/${id}`);
    await this.$fire.firestore.collection('/users').doc(id).delete();
  }

  private async saveUserInFirestore(user: UserModel) {
    await this.$fire.firestore
      .collection('/users')
      .doc(user.uid)
      .set({ ...user });
  }

  async update(uid: string, data: SignupModel) {
    let { password, file, ...user } = data;
    const userData = new UserModel(user);

    if (file) {
      userData.img = await this.uploadProfilePic(file);
    }
    await this.$fire.firestore
      .collection('/users')
      .doc(uid)
      .update({ ...userData });
  }

  private async uploadProfilePic(file: File) {
    return new Promise<string>(res => {
      const ref = this.$fire.storage
        .ref()
        .child(`profile-pics/${Date.now()}.${file.name.split('.').pop()}`)
        .put(file);

      ref.on(
        'state_changed',
        () => {
          window.$nuxt.$loading.start();
        },
        () => {
          this.$context.$alert.show('Something went wrong while uploading the profile picture.', 'error');
        },
        async () => {
          res(await ref.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
}

export const user = new UsersApi();
