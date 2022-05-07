import { Component, Vue } from 'nuxt-property-decorator';
import { SignupModel } from '~/api/auth';

@Component({
  layout: 'auth'
})
export default class SignupView extends Vue {
  signupData = new SignupModel();

  async signup() {
    this.$nuxt.$loading.start();

    try {
      await this.$api.auth.signup(this.signupData);
      location.reload();
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
