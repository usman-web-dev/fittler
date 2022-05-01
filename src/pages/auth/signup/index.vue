<template>
  <v-card class="rounded-xl shadow pa-5">
    <h1 class="mb-3 primary--text">Signup</h1>
    <base-form #default="{ invalid }" @submit="signup">
      <v-row>
        <v-col cols="12">
          <base-text-field v-model="signupData.displayName" label="Display Name" rules="required|max:30" autofocus />
        </v-col>
        <v-col cols="12">
          <base-text-field v-model="signupData.email" label="Email" rules="required|email" />
        </v-col>
        <v-col cols="12">
          <base-text-field
            v-model="signupData.password"
            label="Password"
            type="password"
            rules="required|min:8|max:36"
          />
        </v-col>
        <v-col cols="12">
          <base-file-input v-model="signupData.photo" label="Profile Picture" rules="image:jpg,png,jpeg" />
        </v-col>
        <v-col cols="12">
          <base-btn :disabled="invalid" block type="submit">Signup</base-btn>
        </v-col>
      </v-row>
    </base-form>
    <p class="text-center ma-0 mt-5">
      Already have an account?
      <nuxt-link to="/auth/login">Login</nuxt-link>
    </p>
  </v-card>
</template>

<script lang="ts" src="./index.ts" />
