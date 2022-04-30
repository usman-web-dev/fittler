<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" lg="6">
      <v-card class="shadow rounded-xl pa-5 mt-3">
        <h1 class="text-h5 text-md-h4 mb-3 font-weight-bold">
          Hi
          <span class="primary--text">{{ displayName }}!</span>
        </h1>
        <base-form #default="{ invalid }" @submit="updateProfile">
          <v-row>
            <v-col cols="12" md="6">
              <base-text-field v-model="displayName" label="Display Name" autofocus rules="required|max:30" />
            </v-col>
            <v-col cols="12" md="6">
              <base-text-field label="Password" type="password" rules="max:36|min:8" v-model="password" />
            </v-col>
            <v-col cols="12">
              <base-btn :disabled="invalid || (oldDisplayName !== displayName ? false : !password)" block type="submit">
                Update Profile
              </base-btn>
            </v-col>
          </v-row>
        </base-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./index.ts" />
