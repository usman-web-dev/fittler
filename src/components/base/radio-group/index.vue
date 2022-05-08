<template>
  <validation-provider :rules="rules" #default="{ errors }" slim>
    <v-radio-group
      class="pt-0 mt-0"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      :input-value="value"
      row
      @change="$emit('input', $event)"
    >
      <v-radio v-for="item in items" :key="item.id" :label="item.value" :value="item.id" />

      <template #label v-if="!!$attrs.label">
        <span class="error--text" v-if="rules.includes('required')">*</span>
        {{ $attrs.label }}
      </template>
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    </v-radio-group>
  </validation-provider>
</template>

<script lang="ts" src="./index.ts" />
