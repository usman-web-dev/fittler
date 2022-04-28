import { Component, Vue } from 'nuxt-property-decorator';
import { drawerSrv } from '~/services';

@Component
export default class CoreDrawer extends Vue {
  drawerSrv = drawerSrv;

  get currentUser() {
    return this.$store.state.user ?? ({} as any);
  }
}
