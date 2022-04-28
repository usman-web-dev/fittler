<template v-if="loading">
  <v-fade-transition>
    <v-overlay :value="loading" opacity=".7" z-index="99999999">
      <v-progress-circular indeterminate color="primary" />
    </v-overlay>
  </v-fade-transition>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class LoadingComponent extends Vue {
  loading = false;
  start() {
    this.loading = true;
  }
  finish() {
    this.loading = false;
  }
}
</script>
