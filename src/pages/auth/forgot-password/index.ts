import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'auth'
})
export default class LoginView extends Vue {
  email = '';

  async login() {
    this.$nuxt.$loading.start();

    try {
      await this.$api.auth.forgotPassword(this.email);
      this.$router.push('/auth/login');
      this.$alert.show('Check your email for reset password link.', 'success', true, 10);
    } catch (e: any) {
      this.$helpers.handleFirebaseError(e.response.data);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
