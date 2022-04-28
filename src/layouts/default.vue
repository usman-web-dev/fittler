<template>
  <v-app>
    <lazy-core-app-bar />
    <lazy-core-drawer />

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth'
};
</script>
