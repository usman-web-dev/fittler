import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { UserModel } from '~/api/auth';

@Component({
  middleware: 'isAdmin'
})
export default class User extends Vue {
  users: Array<UserModel> = [];

  async asyncData({ $api: { auth } }: Context) {
    const users = await auth.getAllUsers();

    return {
      users
    };
  }

  async deleteUser(id: string) {
    this.$nuxt.$loading.start();
    try {
      await this.$api.user.delete(id);
      this.$alert.show('User deleted successfully!');
      this.$nuxt.refresh();
    } catch {
      this.$alert.show('Something went wrong!', 'error');
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
}
