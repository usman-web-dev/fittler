<template>
  <v-app>
    <lazy-core-app-bar />
    <lazy-core-drawer />
    <lazy-alert />

    <v-main>
      <v-container fluid class="px-5">
        <v-slide-y-reverse-transition hide-on-leave>
          <nuxt />
        </v-slide-y-reverse-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    const { name } = this.$route;

    return {
      title: this.$helpers.upperFirst(this.$helpers.unslugify(name))
    };
  }
};
</script>
