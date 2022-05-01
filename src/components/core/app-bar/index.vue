<template>
  <v-app-bar app color="#f8f8ff" elevate-on-scroll>
    <div class="d-flex align-center justify-space-between width-100">
      <v-app-bar-nav-icon color="primary" @click="drawerSrv.mode = !drawerSrv.mode" />
      <h2 class="no-select primary--text">{{ $helpers.titleize($route.name || '') }}</h2>
      <h3 class="primary--text">
        <span :class="{ 'error--text': totalCalories > caloriesLimit }">{{ totalCalories }}</span
        >/{{ caloriesLimit }}
        calories
      </h3>
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./index.ts" />
