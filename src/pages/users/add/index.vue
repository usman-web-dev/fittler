<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" lg="6">
      <v-card class="shadow rounded-xl pa-5 mt-3">
        <base-form ref="baseForm" #default="{ invalid }" @submit="save">
          <base-text-field v-model="user.name" label="Name" rules="required|max:30" autofocus />
          <base-text-field :disabled="!!uid" v-model="user.email" label="Email" rules="required|email" />

          <v-row no-gutters>
            <v-col cols="6" class="pr-5" v-if="!uid">
              <base-text-field v-model="user.password" label="Password" type="password" rules="required|min:8|max:36" />
            </v-col>
            <v-col cols="6" class="pr-5">
              <v-select
                label="Role"
                outlined
                dense
                :items="roles"
                item-text="key"
                item-value="value"
                v-model="user.role"
              />
            </v-col>
            <v-col cols="6" class="pr-5">
              <base-text-field v-model.number="user.age" label="Age" rules="required|numeric" type="number" />
            </v-col>
            <v-col cols="6" class="pr-5">
              <base-text-field v-model.number="user.inches" label="Inches" rules="required|integer" type="number" />
            </v-col>
            <v-col cols="6" class="pr-5">
              <base-text-field
                v-model.number="user.currentWeight"
                label="Current Weight"
                rules="required|integer"
                type="number"
              />
            </v-col>
            <v-col cols="6" class="pr-5">
              <base-text-field
                v-model.number="user.goalWeight"
                label="Goal Weight"
                rules="required|integer"
                type="number"
              />
            </v-col>
            <v-col cols="6" class="pr-5">
              <base-text-field v-model.number="user.feet" label="Feet" rules="required|integer" type="number" />
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center">
              <base-radio-group
                class="m-auto"
                v-model="user.gender"
                label="Gender"
                rules="required"
                :items="[
                  { id: 'male', value: 'Male' },
                  { id: 'female', value: 'Female' }
                ]"
              />
            </v-col>
          </v-row>
          <v-col cols="12" md="5" v-if="uid">
            <h3>Current Photo</h3>
            <v-avatar color="grey lighten-2" size="70" class="mb-5">
              <v-img :src="user.img" contain size="100" />
            </v-avatar>
            <base-btn @click="addNewPhoto = !addNewPhoto" :color="addNewPhoto ? 'error' : 'primary'" class="ml-5" small>
              {{ addNewPhoto ? 'Cancel' : 'Add New' }}
            </base-btn>
            <base-file-input
              v-if="addNewPhoto"
              v-model="user.file"
              label="Profile Picture"
              rules="required|image:jpg,png,jpeg"
            />
          </v-col>

          <base-file-input v-else v-model="user.file" label="Profile Picture" rules="image:jpg,png,jpeg" />
          <base-btn :disabled="invalid" block type="submit">{{ uid ? 'Update' : 'Add' }} User</base-btn>
        </base-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./index.ts" />
