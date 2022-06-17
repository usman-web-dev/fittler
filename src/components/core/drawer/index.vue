<template>
  <v-navigation-drawer app dark floating v-model="drawerSrv.mode" mobile-breakpoint="959" color="gradient shadow">
    <div class="drawer-top py-5 text-center">
      <v-avatar color="grey lighten-2" size="70">
        <v-img :src="user.img" contain />
      </v-avatar>
      <div />
      <v-badge color="success" dot offset-y="8" offset-x="-3">
        <h2 class="white--text">{{ user.name }}</h2>
      </v-badge>
      <h5 class="blue-grey--text text--lighten-4 mt-n1">{{ user.email }}</h5>
    </div>

    <v-list dense nav>
      <v-list-item
        v-for="{ title, icon, selectedIcon, link } in roleLinks"
        :key="title"
        nuxt
        :to="{ name: link }"
        exact
      >
        <v-list-item-icon class="mr-3">
          <v-icon>{{ $route.name === link ? selectedIcon : icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="ma-0 pa-0">
          <v-icon size="20" class="ml-1">mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-3">
        <base-btn block color="white primary--text" @click="logout">
          Logout
          <v-icon class="ml-1" size="18">mdi-logout</v-icon>
        </base-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" src="./index.ts" />
