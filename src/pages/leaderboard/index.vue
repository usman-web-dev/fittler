<template>
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
</template>

<script lang="ts" src="./index.ts" />
