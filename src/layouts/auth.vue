<template>
  <v-app>
    <lazy-alert />

    <v-main class="gradient">
      <v-container class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" lg="6" xl="4">
            <p class="white--text font-weight-bold text-center text-h4 d-block mb-5">Fittler</p>

            <v-slide-x-transition hide-on-leave>
              <nuxt />
            </v-slide-x-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'nonAuth'
};
</script>
