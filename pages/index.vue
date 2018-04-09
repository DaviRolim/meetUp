<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="text-xs-center text-sm-right">
      <v-btn large to="/meetup" class="info">Explore MeetUps</v-btn>
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-center text-sm-left">
      <v-btn large to="/meetup/new" class="success">Organize MeetUps</v-btn>
    </v-flex>
  </v-layout>
  <v-layout class="mt-2">
    <v-flex xs12>
      <v-carousel>
        <v-carousel-item v-for="(meetup,i) in meetups" :src="meetup.imageUrl" :key="i"
        @click="onLoadMeetup(meetup.id)" style="cursor: pointer">
          <div class="title">
            {{meetup.title}}
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
    <v-layout row wrap>
    <v-flex xs12 class="text-xs-center">
      <p>Join our awesome MeetUps!!</p>
    </v-flex>
  </v-layout>
 </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      meetups: 'meetup/featuredMeetups'
    })
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetup/' + id)
    }
  }
}
</script>
<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 15px;
  }
</style>

