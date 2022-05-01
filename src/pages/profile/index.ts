import { EmailAuthProvider } from 'firebase/auth';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProfileComponent extends Vue {
  displayName = this._displayName;
  oldDisplayName = this._displayName;
  password = '';
  photo: File | null = null;
  addNewPhoto = false;

  get _displayName() {
    return this.$fire.auth.currentUser?.displayName;
  }

  photoURL = this.$fire.auth.currentUser?.photoURL;

  async updateProfile() {
    const { currentUser: user } = this.$fire.auth;
    if (user?.email) {
      this.$nuxt.$loading.start();

      try {
        const { email, uid } = user;

        if (this.password) {
          const currPass = prompt('Enter your current password');

          if (!currPass) {
            this.$nuxt.$loading.finish();
            this.$alert.show(`Current password can't be empty.`, 'warning');
            return;
          }

          await user.reauthenticateWithCredential(EmailAuthProvider.credential(email!, currPass));
          await user.updatePassword(this.password);
        }

        if (this.photo) {
          const ref = this.$fire.storage
            .ref()
            .child(`profile-pics/${uid}.${this.photo.name.split('.').pop()}`)
            .put(this.photo);

          ref.on(
            'state_changed',
            undefined,
            () => {
              this.$alert.show('Something went wrong while uploading the profile picture.', 'error');
            },
            async () => {
              const photoURL = await ref.snapshot.ref.getDownloadURL();

              this.photoURL = photoURL;

              await Promise.all([
                user.updateProfile({
                  displayName: this.displayName,
                  photoURL
                }),
                this.$fire.firestore.collection('/users').doc(uid).update({
                  displayName: this.displayName,
                  photoUrl: photoURL
                })
              ]);

              this.updateUser(email, uid);
            }
          );
        } else if (this.oldDisplayName !== this.displayName) {
          await Promise.all([
            user.updateProfile({
              displayName: this.displayName
            }),
            this.$fire.firestore.collection('/users').doc(uid).update({
              displayName: this.displayName
            })
          ]);

          this.updateUser(email, uid);
        }
      } catch (e) {
        this.$helpers.handleFirebaseError(e);
      }
    }
  }

  updateUser(email: string, uid: string) {
    this.$store.dispatch('onAuthStateChangedAction', {
      authUser: { email, uid, displayName: this.displayName, photoURL: this.photoURL }
    });

    this.password = '';
    this.oldDisplayName = this.displayName;
    this.photo = null;
    this.addNewPhoto = false;

    this.$alert.show('Profile has been updated successfully!');
    this.$nuxt.$loading.finish();
  }
}
