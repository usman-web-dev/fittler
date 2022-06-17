import { Component, Vue } from 'nuxt-property-decorator';
import { UserModel } from '~/api/auth';

@Component({
  middleware: 'isAdmin'
})
export default class User extends Vue {
  users: Array<UserModel> = [];

  created() {
    this.loadData();
  }

  async loadData() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      this.users = (await this.$api.auth.getAllUsers()) as any;
      this.$nuxt.$loading.finish();
    });
  }
}
