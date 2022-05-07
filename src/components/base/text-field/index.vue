<template>
  <validation-provider :rules="rules" v-slot="{ errors }" :vid="vid">
    <v-text-field
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @input="$emit('input', $event)"
      @blur="
        $emit('input', !!value && $attrs['type'] !== 'password' && $attrs['type'] !== 'number' ? value.trim() : value)
      "
      :outlined="outlined"
      dense
    >
      <template #label v-if="!!$attrs.label">
        <span class="error--text" v-if="rules.includes('required')">*</span>
        {{ $attrs.label }}
      </template>
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    </v-text-field>
  </validation-provider>
</template>

<script lang="ts" src="./index.ts" />
