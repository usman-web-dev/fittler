<template>
  <v-card class="rounded-xl shadow pa-5">
    <h1 class="mb-3 primary--text">Login</h1>
    <base-form #default="{ invalid }" @submit="login">
      <base-text-field v-model="loginData.email" label="Email" rules="required|email" autofocus />
      <base-text-field v-model="loginData.password" label="Password" type="password" rules="required|min:8|max:36" />
      <base-btn :disabled="invalid" block type="submit">Login</base-btn>
    </base-form>
    <p class="text-center ma-0 mt-5">
      New here?
      <nuxt-link to="/auth/signup">Signup</nuxt-link>
    </p>
  </v-card>
</template>

<script lang="ts" src="./index.ts" />
