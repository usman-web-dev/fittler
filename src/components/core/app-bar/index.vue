<template>
  <v-app-bar app color="#f8f8ff" elevate-on-scroll>
    <div class="d-flex align-center width-100">
      <v-app-bar-nav-icon color="primary" @click="drawerSrv.mode = !drawerSrv.mode" />
      <h2 class="no-select primary--text">{{ $helpers.titleize($route.name || '') }}</h2>
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./index.ts" />
