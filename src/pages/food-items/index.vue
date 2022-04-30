<template>
  <div>
    <div v-if="selectedFoodItems.length">
      <h1>Added Food Items</h1>

      <v-col
        cols="12"
        v-for="({ name, quantity, calories, unit, id }, idx) in selectedFoodItems"
        :key="id"
        class="pa-0 pb-3"
      >
        <v-card class="shadow rounded-xl gradient" dark>
          <div class="pa-5 d-flex align-center justify-space-between flex-wrap">
            <div class="d-flex flex-column">
              <h2>{{ name }}</h2>
              <span>
                {{ calories }} X
                <span class="font-weight-black">{{ quantity }} {{ unit }}</span>
                = {{ calories * quantity }} calories
              </span>
            </div>
            <div class="d-flex align-center">
              <v-icon @click="selectedFoodItems[idx].quantity++"> mdi-plus </v-icon>
              <h3 class="mx-2 no-select">{{ quantity }}</h3>
              <v-icon @click="selectedFoodItems[idx].quantity--" :disabled="quantity < 2"> mdi-minus </v-icon>
            </div>
            <base-btn text color="white" @click="selectedFoodItems.splice(idx, 1)">
              <v-icon>mdi-delete-outline</v-icon>Remove
            </base-btn>
          </div>
        </v-card>
      </v-col>

      <v-divider class="my-5" />
    </div>

    <h1 class="mb-3">Food Items List</h1>
    <v-row>
      <v-col cols="12" md="4" v-for="foodItem in foodItems" :key="foodItem.id">
        <v-card class="pa-3 gradient shadow rounded-xl" dark>
          <div class="d-flex justify-space-between align-center">
            <h2 class="no-select">{{ foodItem.name }} ({{ foodItem.calories }} per {{ foodItem.unit }})</h2>
            <base-tooltip #default="{ on }" msg="Add">
              <v-icon @click.stop="selectFoodItem(foodItem)" class="pa-1" v-on="on">mdi-plus</v-icon>
            </base-tooltip>
          </div>
          <v-card-text class="details text-justify pr-0 pt-2">
            {{ foodItem.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss">
.details {
  overflow: scroll;
  color: rgba(0, 0, 0, 0) !important;
  text-shadow: 0 0 #fff;
  transition: color 0.4s ease-in-out;
  height: 100px;
  &:hover {
    color: rgba(255, 255, 255, 0.7) !important;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 26px !important;
    height: 0px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 10px solid transparent;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }
}
</style>
