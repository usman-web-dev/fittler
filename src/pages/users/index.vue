<template>
  <div>
    <div class="d-flex justify-end mb-3">
      <base-btn :to="{ name: 'users-add' }">Add User</base-btn>
    </div>

    <v-simple-table class="rounded-xl shadow">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ img, name, uid, email, role } in users" :key="uid">
          <td>
            <div class="d-flex gap-3 py-3 align-center">
              <v-avatar>
                <v-img :src="img" />
              </v-avatar>
              {{ name }}
            </div>
          </td>
          <td>{{ email }}</td>
          <td>{{ $helpers.titleize(role) }}</td>
          <td>
            <v-menu left content-class="shadow rounded-lg" min-width="130px">
              <template #activator="{ on }">
                <v-icon v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list dense>
                <v-list-item :to="{ name: 'users-id-edit', params: { id: uid } }">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="success">mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deleteUser(uid)">
                  <v-list-item-icon class="mr-3">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Delete</v-list-item-title>
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
