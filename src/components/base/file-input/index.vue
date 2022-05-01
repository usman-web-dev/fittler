<template>
  <validation-provider :rules="rules" v-slot="{ errors }" :vid="vid">
    <v-file-input
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @change="$emit('input', $event)"
      :outlined="outlined"
      dense
      prepend-icon=""
      prepend-inner-icon="mdi-attachment"
      hide-details="auto"
    >
      <template #label v-if="!!$attrs.label">
        <span class="error--text" v-if="rules.includes('required')">*</span>
        {{ $attrs.label }}
      </template>
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    </v-file-input>
  </validation-provider>
</template>

<script lang="ts" src="./index.ts" />
