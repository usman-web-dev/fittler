<template>
  <v-app-bar app color="#f8f8ff" elevate-on-scroll>
    <v-app-bar-nav-icon color="primary" @click="drawerSrv.mode = !drawerSrv.mode" />
    <h2 class="text-center mt-1 no-select width-100 primary--text">{{ $helpers.titleize($route.name || '') }}</h2>
  </v-app-bar>
</template>

<script lang="ts" src="./index.ts" />
