import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'guest'
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
    } catch (e) {
      console.log(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
