<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-card class="rounded-xl shadow pa-5">
          <h1 class="mb-3 primary--text">Login</h1>
          <base-form #default="{ invalid }" @submit="login">
            <v-row dense>
              <v-col cols="12">
                <base-text-field v-model="loginData.email" label="Email" rules="required|email" autofocus />
              </v-col>
              <v-col cols="12">
                <base-text-field
                  v-model="loginData.password"
                  label="Password"
                  type="password"
                  rules="required|min:8|max:36"
                />
              </v-col>
              <v-col cols="12">
                <base-btn :disabled="invalid" block type="submit">Login</base-btn>
              </v-col>
            </v-row>
          </base-form>
          <p class="text-center ma-0 mt-5">
            New here?
            <nuxt-link to="/auth/signup">Signup</nuxt-link>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src="./index.ts" />
