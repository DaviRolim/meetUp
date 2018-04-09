<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="red--text">{{meetup.title}}</h4>
          </v-card-title>
          <v-card-media 
               :src="meetup.imageUrl"
               height="400px" 
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{meetup.date | date }} - {{meetup.location}}</div>
            <div>{{meetup.description}}</div>
             </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat dark class="red accent-2">Register</v-btn>

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
  meetup () {
    return this.$store.getters['meetup/getLoadedMeetup'](this.$route.params.id)
  }
  }
}
</script>