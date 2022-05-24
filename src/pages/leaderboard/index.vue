<template>
  <div>
    <h2>Daily Leaderboard ({{ $helpers.formatDate(new Date()) }})</h2>

    <v-simple-table class="rounded-xl shadow">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Calories Burnt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in dailyData" :key="idx">
          <td class="py-3">
            <v-avatar color="grey lighten-2" size="40">
              <v-img :src="item.img" contain size="100" />
            </v-avatar>
            <span>{{ item.name }}</span>
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.caloriesBurned }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 class="mt-5">Weekly Leaderboard ({{ weekDate }})</h2>

    <v-simple-table class="rounded-xl shadow">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Calories Burnt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in weeklyData" :key="idx">
          <td class="py-3">
            <v-avatar color="grey lighten-2" size="40">
              <v-img :src="item.img" contain size="100" />
            </v-avatar>
            <span>{{ item.name }}</span>
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.caloriesBurned }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts" src="./index.ts" />
