<template>
  <base-form #default="{ invalid }" @submit="save">
    <base-text-field v-if="!isView" label="Plan Name" v-model="dietPlan.name" rules="required|min:3" />
    <h2 v-else class="mb-5">{{ dietPlan.name }}</h2>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="day in days" :key="day">
        <v-expansion-panel-header>{{ $helpers.titleize(day) }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-for="meal in meals">
            <base-textarea
              :key="`textarea-${meal}`"
              v-if="!isView"
              :label="$helpers.titleize(meal)"
              v-model="dietPlan.meals[day][meal]"
              rules="required|min:10"
            />
            <div :key="`text-${meal}`" v-else>
              <h3 class="d-inline-block">{{ $helpers.titleize(meal) }}</h3>
              <span>{{ dietPlan.meals[day][meal] }}</span>
            </div>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="d-flex justify-end my-4" v-if="!isView">
      <base-btn class="px-12" type="submit" :disabled="invalid">Save</base-btn>
    </div>
  </base-form>
</template>

<script lang="ts" src="./index.ts" />
