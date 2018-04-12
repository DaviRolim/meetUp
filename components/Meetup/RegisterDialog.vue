<template>
  <v-dialog persistent v-model="dialog">
    <v-btn accent slot="activator" color="red" dark>
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister for Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision</v-card-text>
          </v-flex>
        </v-layout>
         <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click.native="dialog = false">Cancel</v-btn>
              <v-btn class="green--text darken-1" flat @click.native="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
     </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
   props: ['meetupId'],
   data () {
     return {
       dialog: false
     }
   },
   computed: {
     userIsRegistered () {
       return this.$store.getters['meetup/user'].registeredMeetups.findIndex(meetupId => meetupId === this.meetupId) >= 0
     }
   },
   methods: {
     onAgree () {

     }
   }
  }
</script>