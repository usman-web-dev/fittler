import { endOfWeek, startOfWeek, subDays } from 'date-fns';
import { Component, Vue } from 'nuxt-property-decorator';
import { UserModel } from '~/api';
import { DUMMY_IMAGE } from '~/utils';

@Component
export default class LeaderboardView extends Vue {
  mounted() {
    this.$nextTick(() => {
      this.loadData();
    });
  }

  weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  get weekDate() {
    return `${this.$helpers.formatDate(this.weekStart)} - ${this.$helpers.formatDate(this.weekEnd)}`;
  }

  dailyLeaderboardData: Array<{ email: string; name: string; img: string; caloriesBurned: number }> = [];
  weeklyLeaderboardData: Array<{ email: string; name: string; img: string; caloriesBurned: number }> = [];

  get dailyData() {
    return this.dailyLeaderboardData.sort(({ caloriesBurned: a }, { caloriesBurned: b }) => (a > b ? -1 : 1));
  }

  get weeklyData() {
    return this.weeklyLeaderboardData.sort(({ caloriesBurned: a }, { caloriesBurned: b }) => (a > b ? -1 : 1));
  }

  profiles: Array<UserModel> = [];

  async getProfile(uid: string) {
    let profile: UserModel | null = this.profiles.find(({ uid: id }) => uid === id)!;

    if (!profile) {
      profile = await this.$api.auth.getProfile(uid);

      profile && this.profiles.push(profile);
    }

    return profile;
  }

  async loadData() {
    this.$nuxt.$loading.start();

    const [dailyCaloriesBurntData, weeklyCaloriesBurntData] = await Promise.all([
      this.$api.foodItem.getCaloriesBurntData([new Date()], false),
      this.$api.foodItem.getCaloriesBurntData(
        Array(7)
          .fill(1)
          .map((_, i) => subDays(new Date(), i)),
        false
      )
    ]);

    for (const [uid, data] of Object.entries(dailyCaloriesBurntData)) {
      const caloriesData: this['dailyLeaderboardData'][0] = {
        email: 'Anonymous',
        name: 'anonymous',
        img: DUMMY_IMAGE,
        caloriesBurned: data[0].caloriesBurned
      };

      const profile = await this.getProfile(uid);
      if (profile) {
        caloriesData.email = profile.email;
        caloriesData.name = profile.name;
        caloriesData.img = profile.img!;
      }

      this.dailyLeaderboardData.push(caloriesData);
    }

    for (const [uid, data] of Object.entries(weeklyCaloriesBurntData)) {
      const caloriesData: this['dailyLeaderboardData'][0] = {
        email: 'Anonymous',
        name: 'anonymous',
        img: DUMMY_IMAGE,
        caloriesBurned: data.reduce((total, { caloriesBurned }) => total + caloriesBurned, 0)
      };

      const profile = await this.getProfile(uid);
      if (profile) {
        caloriesData.email = profile.email;
        caloriesData.name = profile.name;
        caloriesData.img = profile.img!;
      }

      this.weeklyLeaderboardData.push(caloriesData);
    }

    this.$nuxt.$loading.finish();
  }
}
