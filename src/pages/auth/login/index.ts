import { Component, Vue } from 'nuxt-property-decorator';
import { LoginModel, UserModel } from '~/api/auth';

@Component({
  layout: 'auth'
})
export default class LoginView extends Vue {
  loginData = new LoginModel();

  async login() {
    this.$nuxt.$loading.start();

    try {
      await this.$api.auth.login(this.loginData);
      this.$store.commit('SET_USER', new UserModel());

      this.$router.push('/dashboard');
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
