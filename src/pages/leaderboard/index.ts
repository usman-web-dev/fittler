import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class LeaderboardView extends Vue {
  usersData = [
    {
      name: 'Hassan',
      calories: 159
    },
    {
      name: 'Mahad',
      calories: 237
    },
    {
      name: 'Muaz',
      calories: 262
    },
    {
      name: 'Usman',
      calories: 305
    },
    {
      name: 'Ahmed',
      calories: 356
    },
    {
      name: 'Ali',
      calories: 375
    },
    {
      name: 'Tahir',
      calories: 392
    },
    {
      name: 'Adil',
      calories: 408
    },
    {
      name: 'Asad',
      calories: 452
    },
    {
      name: 'Irfan',
      calories: 518
    }
  ].sort(({ calories }, { calories: bCalories }) => calories - bCalories);
}
