import { init, send } from '@emailjs/browser';
import { EmailAuthProvider } from 'firebase/auth';
import { DUMMY_IMAGE } from '~/utils';
import { BaseApi } from '../base.api';
import { LoginModel } from './login.model';
import { SignupModel } from './signup.model';
import { UserModel } from './user.model';

class AuthApi extends BaseApi {
  login({ email, password }: LoginModel) {
    return this.$fire.auth.signInWithEmailAndPassword(email, password);
  }

  async signup({ email, password, file, ...data }: SignupModel) {
    const { auth } = this.$fire;

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    if (!user) {
      throw new Error('Something went wrong.');
    }

    const userData = new UserModel({
      ...data,
      email,
      uid: user.uid,
      img: DUMMY_IMAGE
    });

    if (file) {
      userData.img = await this.uploadProfilePic(file);
    }
    await this.saveUserInFirestore(userData, user);
  }

  private async saveUserInFirestore(user: UserModel, currentUser: firebase.default.User) {
    return Promise.all([
      currentUser.updateProfile({ displayName: user.name, photoURL: user.img }),
      await this.$fire.firestore
        .collection('/users')
        .doc(user.uid)
        .set({ ...user })
    ]);
  }

  async getProfile(uid: string) {
    const doc = await this.$fire.firestore.collection('/users').doc(uid).get();

    if (doc.exists) {
      return doc.data() as UserModel;
    }

    return null;
  }

  async getAllUsers() {
    const users = await this.$fire.firestore.collection('/users').get();

    return users.docs.map(user => {
      return user.data();
    });
  }

  async updateProfile({ name, password, file, ...profileData }: Omit<SignupModel, 'email'>) {
    const { currentUser } = this.$fire.auth;
    if (currentUser?.email) {
      const { email, uid } = currentUser;

      const userData = new UserModel({
        uid: uid,
        email: email!,

        name,
        ...profileData
      });

      if (password) {
        const currPass = prompt('Enter your current password');

        if (!currPass) {
          window.$nuxt.$loading.finish();
          throw new Error(`Current password can't be empty.`);
        }

        await currentUser.reauthenticateWithCredential(EmailAuthProvider.credential(email!, currPass));
        await currentUser.updatePassword(password);
      }

      if (file) {
        userData.img = await this.uploadProfilePic(file);
      }
      await this.updateUserInFirestore(userData, currentUser);
    }
  }
  async updateUser(uid: string, data: SignupModel) {
    const userData = new UserModel({ ...data });

    await this.$fire.firestore
      .collection('/users')
      .doc(uid)
      .update({ ...userData });

    if (data.file) {
      await this.uploadProfilePic(data.file);
    }
  }

  private async updateUserInFirestore(user: UserModel, currentUser: firebase.default.User) {
    await Promise.all([
      currentUser.updateProfile({
        displayName: user.name,
        photoURL: user.img
      }),
      this.$fire.firestore
        .collection('/users')
        .doc(currentUser.uid)
        .update({ ...user })
    ]);

    this.$context.store.commit('SET_USER', user);
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

  async forgotPassword(email: string) {
    init('1FLNJ7IXpasRPDkyb');
    const { link, name } = await this.$axios.$post<{ link: string; name: string }>(
      `/firebase/users/${email}/send-reset-password-link`
    );

    await send('service_kkk7ijc', 'template_5a50x6h', {
      to: email,
      name,
      link
    });
  }
}

export const auth = new AuthApi();
