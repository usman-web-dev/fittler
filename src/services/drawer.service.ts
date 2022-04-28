import { BaseService } from './base.service';

class DrawerService extends BaseService {
  mode = true;

  links = [
    { title: 'Dashboard', icon: 'mdi-monitor', selectedIcon: 'mdi-monitor-dashboard', link: 'dashboard' },
    { title: 'Profile', icon: 'mdi-account-circle-outline', selectedIcon: 'mdi-account-circle', link: 'profile' }
  ];
}

export const drawerSrv = new DrawerService();
