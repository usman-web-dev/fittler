<template>
  <v-card class="rounded-xl shadow pa-5">
    <h1 class="mb-3 primary--text">Signup</h1>
    <base-form #default="{ invalid }" @submit="signup">
      <base-text-field v-model="signupData.name" label="Name" rules="required|max:30" autofocus />
      <base-text-field v-model="signupData.email" label="Email" rules="required|email" />
      <base-text-field v-model="signupData.password" label="Password" type="password" rules="required|min:8|max:36" />

      <v-row no-gutters>
        <v-col cols="6" class="pr-5">
          <base-text-field v-model.number="signupData.age" label="Age" rules="required|numeric" type="number" />
        </v-col>
        <v-col cols="6">
          <base-text-field v-model.number="signupData.inches" label="Inches" rules="required|integer" type="number" />
        </v-col>
        <v-col cols="6" class="pr-5">
          <base-text-field
            v-model.number="signupData.currentWeight"
            label="Current Weight"
            rules="required|integer"
            type="number"
          />
        </v-col>
        <v-col cols="6">
          <base-text-field
            v-model.number="signupData.goalWeight"
            label="Goal Weight"
            rules="required|integer"
            type="number"
          />
        </v-col>
        <v-col cols="6" class="pr-5">
          <base-text-field v-model.number="signupData.feet" label="Feet" rules="required|integer" type="number" />
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <base-radio-group
            class="m-auto"
            v-model="signupData.gender"
            label="Gender"
            rules="required"
            :items="[
              { id: 'male', value: 'Male' },
              { id: 'female', value: 'Female' }
            ]"
          />
        </v-col>
      </v-row>

      <base-file-input v-model="signupData.file" label="Profile Picture" rules="image:jpg,png,jpeg" />
      <base-btn :disabled="invalid" block type="submit">Signup</base-btn>
    </base-form>
    <p class="text-center ma-0 mt-5">
      Already have an account?
      <nuxt-link to="/auth/login">Login</nuxt-link>
    </p>
  </v-card>
</template>

<script lang="ts" src="./index.ts" />
