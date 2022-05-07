<template>
  <div>
    <h2>Today Stats:</h2>
    <div class="d-flex align-center mb-3">
      <div class="ml-5">
        <p class="mb-0">
          Calories Added: <span :class="`${color}--text`">{{ todayCaloryAdded }}</span>
        </p>
        <p class="mb-0">
          Calories Burnt: <span class="success--text">{{ todayCaloryBurnt }}</span>
        </p>
      </div>

      <v-progress-circular class="ml-5" :value="percentage" size="90" rotate="-90" :color="color">
        <span class="text-caption">{{ todayCaloryAdded }}/{{ totalCalories }}</span>
      </v-progress-circular>
    </div>

    <h2 class="mb-3">Graphs</h2>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="rounded-xl shadow pa-5">
          <h3>Daily</h3>
          <canvas id="daily-chart" />
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="rounded-xl shadow pa-5">
          <h3>Weekly</h3>
          <canvas id="weekly-chart" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss">
#daily-chart,
#weekly-chart {
  max-height: 400px;
  border-radius: unset;
}
</style>
