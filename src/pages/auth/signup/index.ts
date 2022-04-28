import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'guest'
})
export default class SignupView extends Vue {
  signupData = {
    displayName: '',
    email: '',
    password: ''
  };

  async signup() {
    this.$nuxt.$loading.start();

    try {
      const { displayName, email, password } = this.signupData;
      const { auth } = this.$fire;

      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser?.updateProfile({ displayName });
    } catch (e) {
      console.log(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
