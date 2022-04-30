import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'auth'
})
export default class LoginView extends Vue {
  loginData = {
    email: '',
    password: ''
  };

  async login() {
    this.$nuxt.$loading.start();

    try {
      const { email, password } = this.loginData;

      await this.$fire.auth.signInWithEmailAndPassword(email, password);

      this.$router.push('/leaderboard');
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
