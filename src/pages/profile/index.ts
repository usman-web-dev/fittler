import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProfileComponent extends Vue {
  displayName = this.$fire.auth.currentUser?.displayName;
  password = '';

  async updateProfile() {
    const { currentUser: user } = this.$fire.auth;
    if (user) {
      this.$nuxt.$loading.start();

      try {
        await user.updateProfile({
          displayName: this.displayName
        });

        if (this.password) {
          await user.updatePassword(this.password);
        }

        const { email, uid } = user;

        this.$store.dispatch('onAuthStateChangedAction', { authUser: { email, uid, displayName: this.displayName } });

        this.password = '';

        this.$alert.show('Profile has been updated successfully!');
      } catch (e) {
        this.$alert.show((e as any).message, 'error');
      } finally {
        this.$nuxt.$loading.finish();
      }
    }
  }
}
