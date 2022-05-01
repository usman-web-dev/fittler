import { Component, Vue } from 'nuxt-property-decorator';
import { DUMMY_IMAGE } from '~/utils';

@Component({
  layout: 'auth'
})
export default class SignupView extends Vue {
  signupData = {
    displayName: '',
    email: '',
    password: '',
    photo: null as File | null
  };

  async signup() {
    this.$nuxt.$loading.start();

    try {
      const { displayName, email, password, photo } = this.signupData;
      const { auth } = this.$fire;

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      if (!user) {
        throw new Error('Something went wrong.');
      }

      if (photo) {
        const ref = this.$fire.storage
          .ref()
          .child(`profile-pics/${user.uid}.${photo.name.split('.').pop()}`)
          .put(photo);

        ref.on(
          'state_changed',
          () => {
            this.$nuxt.$loading.start();
          },
          () => {
            this.$alert.show('Something went wrong while uploading the profile picture.', 'error');
          },
          async () => {
            const photoURL = await ref.snapshot.ref.getDownloadURL();

            await user.updateProfile({
              displayName,
              photoURL
            });

            await this.saveUserInFirestore({ ...user, photoURL });

            this.$nuxt.$loading.finish();
          }
        );
      } else {
        await user.updateProfile({
          displayName,
          photoURL: DUMMY_IMAGE
        });

        await this.saveUserInFirestore(user);
      }

      this.$router.push('/leaderboard');
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }

  async saveUserInFirestore({ displayName, email, uid, photoURL }: firebase.default.User) {
    await this.$fire.firestore
      .collection('/users')
      .doc(uid)
      .set({
        uid,
        displayName,
        email,
        photoURL: photoURL ?? DUMMY_IMAGE
      });
  }
}
