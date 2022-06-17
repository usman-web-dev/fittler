<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" lg="6">
      <div class="d-flex justify-end">
        <base-btn :to="{ name: 'users-add' }">Add User</base-btn>
      </div>
      <v-card class="shadow rounded-xl mt-3">
        <v-list dense nav>
          <v-list-item link v-for="{ img, name, uid, email } in users" :key="uid">
            <v-list-item-avatar>
              <v-img :src="img" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="flex-row align-center">
              <base-btn icon :to="{ name: 'users-edit-id', params: { id: uid } }" color="primary">
                <v-icon>mdi-pencil</v-icon>
              </base-btn>
              <v-icon color="error" @click.stop>mdi-delete</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./index.ts" />
