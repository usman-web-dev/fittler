import { Chart } from 'chart.js';
import { addDays, startOfWeek, subDays } from 'date-fns';
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class DashboardView extends Vue {
  dailyChart!: Chart;
  weeklyChart!: Chart;

  user = { ...this.$store.state.user };

  get totalCalories() {
    return this.user.gender === 'male' ? 2200 : 2000;
  }

  get percentage() {
    return (this.todayCaloryAdded * 100) / this.totalCalories;
  }

  get color() {
    const per = this.percentage;

    if (per > 95) {
      return 'error';
    } else if (per > 70) {
      return 'warning';
    }

    return 'success';
  }

  mounted() {
    this.$nextTick(() => {
      this.loadData();
    });
  }

  todayCaloryAdded = 0;
  todayCaloryBurnt = 0;

  async loadData() {
    const { uid } = this.$fire.auth.currentUser!;

    this.$nuxt.$loading.start();
    const dailyDates = Array(7)
      .fill(1)
      .map((_, i) => subDays(new Date(), i))
      .reverse();

    let startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

    const weeklyDates = Array<Array<Date>>(4)
      .fill([])
      .map(_ => Array<Date>(7).fill(new Date()));

    weeklyDates.forEach(week => {
      week.forEach((_, i) => {
        week[i] = startDate;
        startDate = addDays(startDate, 1);
      });

      startDate = subDays(startDate, 14);
    });

    const [dailyCaloriesAddedData, dailyCaloriesBurntData, weeklyCaloriesAddedData, weeklyCaloriesBurntData] =
      await Promise.all([
        this.$api.foodItem.getCaloriesAddedData(dailyDates),
        this.$api.foodItem.getCaloriesBurntData(dailyDates),
        this.$api.foodItem.getCaloriesAddedData(weeklyDates.flat()),
        this.$api.foodItem.getCaloriesBurntData(weeklyDates.flat())
      ]);

    this.todayCaloryAdded =
      dailyCaloriesAddedData[uid].find(({ date }) => date === this.$helpers.getDate())?.caloriesAdded ?? 0;
    this.todayCaloryBurnt =
      dailyCaloriesBurntData[uid].find(({ date }) => date === this.$helpers.getDate())?.caloriesBurned ?? 0;

    const weeklyCaloriesAdded = weeklyDates.reduce<Array<{ calories: number; week: string }>>((weeklyDate, week) => {
      const calories = week.reduce((total, date) => {
        total += weeklyCaloriesAddedData[uid].find(({ date: d }) => d === this.$helpers.getDate(date))!.caloriesAdded;
        return total;
      }, 0);

      weeklyDate.push({
        calories,
        week: `${this.$helpers.formatDate(week[0])}-${this.$helpers.formatDate(week.slice(-1)[0])}`
      });

      return weeklyDate;
    }, []);

    const weeklyCaloriesBurnt = weeklyDates.reduce<Array<{ caloriesBurned: number; week: string }>>(
      (weeklyDate, week) => {
        const caloriesBurned = week.reduce((total, date) => {
          total += weeklyCaloriesBurntData[uid].find(
            ({ date: d }) => d === this.$helpers.getDate(date)
          )!.caloriesBurned;
          return total;
        }, 0);

        weeklyDate.push({
          caloriesBurned,
          week: `${this.$helpers.formatDate(week[0])}-${this.$helpers.formatDate(week.slice(-1)[0])}`
        });

        return weeklyDate;
      },
      []
    );

    this.dailyChart = new Chart('daily-chart', {
      type: 'line',
      data: {
        labels: this.$helpers.formatDates(dailyDates),
        datasets: [
          {
            label: 'Calories Burnt',
            data: dailyCaloriesBurntData[uid].map(({ caloriesBurned }) => caloriesBurned).reverse(),
            borderColor: '#5cb860',
            tension: 0.3
          },
          {
            label: 'Calories Added',
            data: dailyCaloriesAddedData[uid].map(({ caloriesAdded }) => caloriesAdded).reverse(),
            borderColor: '#f55a4e',
            tension: 0.3
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.weeklyChart = new Chart('weekly-chart', {
      type: 'line',
      data: {
        labels: weeklyCaloriesAdded.map(({ week }) => week).reverse(),
        datasets: [
          {
            label: 'Calories Burnt',
            data: weeklyCaloriesBurnt.map(({ caloriesBurned }) => caloriesBurned).reverse(),
            borderColor: '#5cb860',
            tension: 0.3
          },
          {
            label: 'Calories Added',
            data: weeklyCaloriesAdded.map(({ calories }) => calories).reverse(),
            borderColor: '#f55a4e',
            tension: 0.3
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.$nuxt.$loading.finish();
  }
}
