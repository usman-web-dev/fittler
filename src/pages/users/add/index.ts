import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { SignupModel } from '~/api/auth';
import { Role } from '~/utils';

@Component
export default class AddUser extends Vue {
  user = new SignupModel();
  addNewPhoto = false;
  roles = Object.values(Role).map(role => ({ key: this.$helpers.titleize(role), value: role }));
  uid = this.$route.params.id ?? '';

  async asyncData({
    $api: { auth },
    route: {
      params: { id }
    }
  }: Context) {
    if (id) {
      const user = (await auth.getProfile(id)) ?? new SignupModel();
      return {
        user
      };
    }
  }

  async save() {
    this.$nuxt.$loading.start();
    try {
      this.uid ? await this.$api.user.update(this.uid, this.user) : await this.$api.user.create(this.user);
      this.$router.push({ path: '/users' });
      this.$alert.show('User has been save successfully!');
    } catch (e) {
      this.$helpers.handleFirebaseError(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
