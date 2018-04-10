<template>
  <v-app>
    <v-navigation-drawer fixed temporary app v-model="sideNav" >
      <v-list>
        <v-list-tile :to="item.to" v-for="(item,index) in menuItems" :key="index">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="red accent-2">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
      <nuxt-link to="/" tag="span" style="cursor: pointer">MeetUp</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat :to ="item.to" v-for="(item, index) in menuItems" :key="index">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'face', title: 'Sign up', to: '/signup'},
          { icon: 'lock_open', title: 'Sign in', to: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', to: '/'},
          { icon: 'room', title: 'Organize Meetup', to: '/meetup'},
          { icon: 'person', title: 'Profile', to: '/user'}
        ]
        }
        return menuItems
      },
    userIsAuthenticated () {
      return this.$store.getters['meetup/user'] !== null && this.$store.getters['meetup/user'] !== undefined
    }
    },
    created () {
      this.$auth.onAuthStateChanged((user) => {
        if(user) {
          this.$store.dispatch('meetup/autoSignin', user)
        }
      })
      this.$store.dispatch('meetup/loadMeetups')
    },
    methods: {
      onLogout () {
        this.$store.dispatch('meetup/logout')
        this.$router.push('/signin')
      }
    }
  }
</script>
