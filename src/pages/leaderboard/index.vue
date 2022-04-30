<template>
  <div>
    <h1>Daily Leaderboard</h1>

    <v-simple-table class="rounded-xl shadow">
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories Burnt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usersData" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h1 class="mt-5">Weekly Leaderboard</h1>

    <v-simple-table class="rounded-xl shadow">
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories Burnt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usersData" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts" src="./index.ts" />
