<template>
  <v-row justify="center">
    <v-slide-x-transition hide-on-leave>
      <v-col cols="12" lg="5">
        <div class="d-flex align-center flex-wrap">
          <h1>Added Food Items</h1>
          <base-btn
            class="ml-5"
            small
            v-if="todayFoodItemsData.data.length || dataChanged"
            :disabled="!dataChanged"
            @click="saveData"
            >Save</base-btn
          >
        </div>

        <v-row v-if="todayFoodItemsData.data.length" class="mt-8">
          <v-col
            cols="12"
            v-for="({ quantity, foodItem: { calories, name, unit }, foodItemId }, idx) in todayFoodItemsData.data"
            :key="foodItemId"
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
                  <v-icon
                    @click="
                      todayFoodItemsData.data[idx].quantity++;
                      dataChanged = true;
                    "
                  >
                    mdi-plus
                  </v-icon>
                  <h3 class="mx-2 no-select">{{ quantity }}</h3>
                  <v-icon
                    @click="
                      todayFoodItemsData.data[idx].quantity--;
                      dataChanged = true;
                    "
                    :disabled="quantity < 2"
                  >
                    mdi-minus
                  </v-icon>
                </div>
                <base-btn
                  text
                  color="white"
                  @click="
                    todayFoodItemsData.data.splice(idx, 1);
                    dataChanged = true;
                  "
                >
                  <v-icon>mdi-delete-outline</v-icon>Remove
                </base-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <p v-else class="grey--text">
          No food items added for today, click <v-icon class="mb-1">mdi-plus</v-icon> icon on any food item from the
          list to add.
        </p>
      </v-col>
    </v-slide-x-transition>

    <v-col class="text-center" cols="12" lg="1">
      <v-divider :vertical="$vuetify.breakpoint.lgAndUp" />
    </v-col>

    <v-col cols="12" lg="6" style="max-height: 100%; overflow-y: auto">
      <div class="d-flex align-center mb-5 flex-wrap">
        <h1>Food Items List</h1>
        <base-text-field label="Search" v-model="search" class="ml-auto" />
      </div>
      <v-row>
        <v-col cols="12" lg="6" v-for="foodItem in foodItems" :key="foodItem.id">
          <v-card class="pa-3 gradient shadow rounded-xl" dark>
            <div class="d-flex justify-space-between align-center">
              <h2 class="no-select">{{ foodItem.name }}</h2>
              <base-tooltip #default="{ on }" msg="Add">
                <v-icon @click.stop="selectFoodItem(foodItem)" class="pa-1" v-on="on">mdi-plus</v-icon>
              </base-tooltip>
            </div>
            <v-card-text class="pa-0 pt-2">
              <ul>
                <li>Serving: {{ foodItem.serving }}</li>
                <li>Calories: {{ foodItem.calories }} per {{ foodItem.unit }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./index.ts" />
