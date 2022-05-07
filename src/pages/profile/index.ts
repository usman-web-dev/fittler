import { Component, Vue } from 'vue-property-decorator';
import { SignupModel, UserModel } from '~/api/auth';

@Component
export default class ProfileComponent extends Vue {
  profileData: Omit<SignupModel, 'email'> = new SignupModel({ ...this.$store.state.user });
  addNewPhoto = false;
  user: UserModel = { ...this.$store.state.user };

  unsubscribeVuex!: Function;

  created() {
    this.unsubscribeVuex = this.$store.subscribe(({ payload, type }) => {
      if (type === 'SET_USER') {
        this.profileData = new SignupModel({ ...payload });
        this.user = { ...payload };
      }
    });
  }

  beforeDestroy() {
    this.unsubscribeVuex();
  }

  async updateProfile() {
    this.$nuxt.$loading.start();
    try {
      await this.$api.auth.updateProfile(this.profileData);

      this.profileData.file = null;
      this.profileData.password = '';
      this.addNewPhoto = false;
      this.$alert.show('Profile has been updated successfully!');
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
