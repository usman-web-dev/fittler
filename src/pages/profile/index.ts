import { EmailAuthProvider } from 'firebase/auth';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProfileComponent extends Vue {
  displayName = this._displayName;
  oldDisplayName = this._displayName;
  password = '';

  get _displayName() {
    return this.$fire.auth.currentUser?.displayName;
  }

  async updateProfile() {
    const { currentUser: user } = this.$fire.auth;
    if (user) {
      this.$nuxt.$loading.start();

      try {
        if (this.oldDisplayName !== this.displayName) {
          await user.updateProfile({
            displayName: this.displayName
          });
        }

        if (this.password) {
          const currPass = prompt('Enter your current password');

          if (!currPass) {
            this.$nuxt.$loading.finish();
            this.$alert.show(`Current password can't be empty.`, 'warning');
            return;
          }

          await user.reauthenticateWithCredential(EmailAuthProvider.credential(user.email!, currPass));
          await user.updatePassword(this.password);
        }

        const { email, uid } = user;

        this.$store.dispatch('onAuthStateChangedAction', { authUser: { email, uid, displayName: this.displayName } });

        this.password = '';
        this.oldDisplayName = this.displayName;

        this.$alert.show('Profile has been updated successfully!');
      } catch (e) {
        this.$helpers.handleFirebaseError(e);
      } finally {
        this.$nuxt.$loading.finish();
      }
    }
  }
}
