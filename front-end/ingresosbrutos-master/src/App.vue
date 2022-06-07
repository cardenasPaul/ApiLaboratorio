<template>
  <v-app>
    <v-app-bar
      app
      dark
      color="primary"      
    >
      <div class="d-flex align-left">
        <v-img
          alt="logo_baseTVN"
          class="shrink mr-2"
          contain
          src="require('../assets/ingresosbrutos\src\assets\logo_baseTVN.png')"
          transition="scale-transition"
          width="64"
        />        
      </div>
      <v-spacer></v-spacer>      
    </v-app-bar>
    <v-main>
      <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>      
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
