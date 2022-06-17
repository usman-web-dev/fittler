import { Component, Vue } from 'nuxt-property-decorator';
import { UserModel } from '~/api/auth';
import { drawerSrv } from '~/services';

@Component
export default class CoreDrawer extends Vue {
  drawerSrv = drawerSrv;

  get user(): UserModel {
    return new UserModel({ ...this.$store.state.user });
  }

  get roleLinks() {
    return this.drawerSrv.links.filter(({ role }) => !role || role.includes(this.$store.state.user?.role));
  }

  async logout() {
    await this.$fire.auth.signOut();
    this.$router.push('/auth/login');
  }
}
