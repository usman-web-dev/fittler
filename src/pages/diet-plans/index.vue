<template>
  <div>
    <div class="d-flex justify-end mb-3">
      <base-btn @click="$router.push({ name: 'diet-plans-add' })" v-if="$helpers.isAdmin">Add</base-btn>
    </div>
    <v-simple-table class="rounded-xl shadow">
      <thead>
        <tr>
          <th class="px-10">Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ name, id } in data" :key="id">
          <td class="py-3 px-10" width="90%">
            <span>{{ name }}</span>
          </td>
          <td class="py-3" width="10%">
            <v-menu left content-class="shadow rounded-lg" min-width="130px">
              <template #activator="{ on }">
                <v-icon v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list dense>
                <v-list-item v-if="$helpers.isAdmin" :to="{ name: 'diet-plans-id-edit', params: { id } }">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="success">mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deletePlan(id)" v-if="$helpers.isAdmin">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'diet-plans-id-view', params: { id } }">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="primary">mdi-eye</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>View</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts" src="./index.ts" />
