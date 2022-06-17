import { Component, Vue } from 'nuxt-property-decorator';
import { SignupModel, UserModel } from '~/api/auth';
import { Role } from '~/utils';

@Component
export default class AddUser extends Vue {
  profileData: SignupModel = new SignupModel();
  addNewPhoto = false;
  user: UserModel = { ...this.$store.state.user };
  unsubscribeVuex!: Function;

  id = this.$route.params.id;

  roles = [
    {
      key: 'User',
      value: Role.USER
    },
    {
      key: 'Admin',
      value: Role.ADMIN
    }
  ];

  uid = this.$route.params.id;

  mounted() {
    if (this.uid) {
      this.getProfile();
    }
  }

  async getProfile() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    try {
      this.profileData = ((await this.$api.auth.getProfile(this.uid)) as any) ?? new SignupModel();
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
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
