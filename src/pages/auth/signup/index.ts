import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'auth'
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

      this.$router.push('/leaderboard');
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
