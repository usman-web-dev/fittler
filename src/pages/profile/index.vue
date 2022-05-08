<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" lg="6">
      <v-card class="shadow rounded-xl pa-5 mt-3">
        <h1 class="text-h5 text-md-h4 mb-3 font-weight-bold">
          Hi
          <span class="primary--text">{{ user.name }}!</span>
        </h1>
        <base-form #default="{ invalid }" @submit="updateProfile">
          <v-row no-gutters align="center">
            <v-col cols="12" md="6" class="pr-0 pr-md-5">
              <base-text-field v-model="profileData.name" label="Name" autofocus rules="required|max:30" />
            </v-col>
            <v-col cols="12" md="6">
              <base-text-field label="Password" type="password" rules="max:36|min:8" v-model="profileData.password" />
            </v-col>

            <v-col cols="12" md="6" class="pr-0 pr-md-5">
              <base-text-field v-model.number="profileData.age" label="Age" rules="required|numeric" type="number" />
            </v-col>
            <v-col cols="12" md="6">
              <base-text-field
                v-model.number="profileData.inches"
                label="Inches"
                rules="required|integer"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="6" class="pr-0 pr-md-5">
              <base-text-field
                v-model.number="profileData.currentWeight"
                label="Current Weight"
                rules="required|integer"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="6">
              <base-text-field
                v-model.number="profileData.goalWeight"
                label="Goal Weight"
                rules="required|integer"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="6" class="pr-0 pr-md-5">
              <base-text-field v-model.number="profileData.feet" label="Feet" rules="required|integer" type="number" />
            </v-col>

            <v-col cols="12" md="7">
              <base-radio-group
                v-model="profileData.gender"
                label="Gender"
                rules="required"
                :items="[
                  { id: 'male', value: 'Male' },
                  { id: 'female', value: 'Female' }
                ]"
              />
            </v-col>

            <v-col cols="12" md="5">
              <h3>Current Photo</h3>
              <v-avatar color="grey lighten-2" size="70" class="mb-5">
                <v-img :src="user.img" contain size="100" />
              </v-avatar>
              <base-btn
                @click="addNewPhoto = !addNewPhoto"
                :color="addNewPhoto ? 'error' : 'primary'"
                class="ml-5"
                small
              >
                {{ addNewPhoto ? 'Cancel' : 'Add New' }}
              </base-btn>
              <base-file-input
                v-if="addNewPhoto"
                v-model="profileData.file"
                label="Profile Picture"
                rules="required|image:jpg,png,jpeg"
              />
            </v-col>
            <v-col cols="12">
              <base-btn :disabled="invalid" block type="submit">Update Profile</base-btn>
            </v-col>
          </v-row>
        </base-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./index.ts" />
