<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="red" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="red--text">{{meetup.title}}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup :meetup="meetup"></edit-meetup>
            </template>
          </v-card-title>
          <v-card-media 
               :src="meetup.imageUrl"
               height="400px" 
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{meetup.date | date }} - {{meetup.location}}</div>
            <div>
              <edit-meetup-date :meetup="meetup" v-if="userIsCreator"></edit-meetup-date>
              <edit-meetup-time :meetup="meetup" v-if="userIsCreator"></edit-meetup-time>
            </div>
            <div>{{meetup.description}}</div>
             </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
  // ...mapGetters({
  //   meetup: 'meetup/getLoadedMeetup'
  //   })
    loading () {
        return this.$store.getters['meetup/loading']
    },
    meetup () {
      return this.$store.getters['meetup/getLoadedMeetup'](this.$route.params.id)
    },
    userIsAuthenticated () {
      return this.$store.getters['user/user'] !== null && this.$store.getters['user/user'] !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false;
      }
    return this.$store.getters['user/user'].id === this.meetup.creatorId
    }
  }
}
</script>
