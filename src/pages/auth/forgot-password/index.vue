<template>
  <v-card class="rounded-xl shadow pa-5">
    <h1 class="mb-3 primary--text">Forgot Password</h1>
    <base-form #default="{ invalid }" @submit="login">
      <base-text-field v-model="email" label="Email" rules="required|email" autofocus />
      <base-btn :disabled="invalid" block type="submit">Send Email</base-btn>
    </base-form>
    <p class="text-center ma-0 mt-5">
      Go back to
      <nuxt-link to="/auth/login">Login</nuxt-link>
    </p>
  </v-card>
</template>

<script lang="ts" src="./index.ts" />
