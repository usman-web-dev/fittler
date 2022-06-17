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
}
