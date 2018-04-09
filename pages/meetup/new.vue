<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <h4 class="headline grey--text">Create a new Meetup</h4>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12>
      <form @submit.prevent="onCreateMeetup">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field 
          name="title"
          :rules="[() => meetup.title.length > 0 || 'This field is required', () => meetup.title.length < 20 || 'Title is too big']"
          label="Title"
          id="title"
          v-model="meetup.title"
          required></v-text-field>
        </v-flex>
        </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field 
          name="location"
          :rules="[() => meetup.location.length > 0 || 'This field is required', () => meetup.location.length < 20 || 'location is too big']"
          label="Location"
          id="location"
          v-model="meetup.location"
          required></v-text-field>
        </v-flex>
  </v-layout>
  <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field 
          name="imageUrl"
          :rules="[() => meetup.imageUrl.length > 0 || 'This field is required', () => meetup.imageUrl.length < 200 || 'imageUrl is too big']"
          label="Image Url"
          id="imageUrl"
          v-model="meetup.imageUrl"
          required></v-text-field>
        </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <img :src="meetup.imageUrl" height="150">
    </v-flex>
  </v-layout>
  <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field 
          name="description"
          :rules="[() => meetup.description.length > 0 || 'This field is required', () => meetup.description.length < 200 || 'description is too big']"
          label="Description"
          multi-line
          id="description"
          v-model="meetup.description"
          required></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Choose a Date & Time</h4>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-2">
      <v-flex xs12 sm6 offset-sm3>
         <v-date-picker v-model="meetup.date"></v-date-picker>
         <p>{{ submittableDateTime | date }}</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
         <v-time-picker v-model="meetup.time" format="24hr"></v-time-picker>
         <p>{{ meetup.time }}</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn flat 
        class="red accent-2" 
        dark 
        :disabled="!formIsValid"
        type="submit"
        >Create meetup</v-btn>
      </v-flex>
    </v-layout>
      </form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      meetup: {
        title: '',
        imageUrl: '',
        description: '',
        location: '',
        date: '',
        time: ''
      }
    }
  },
  computed : {
    formIsValid () {
      return this.meetup.title !== '' && 
      this.meetup.location !== '' && 
      this.meetup.imageUrl !== '' && 
      this.meetup.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.meetup.date)
      const hours = this.meetup.time.split(':')[0]
      const minutes = this.meetup.time.match(/:(\d+)/)
      if (minutes) {
        date.setHours(hours)
        date.setMinutes(minutes[1])
      }
      return date
    }
  },
  methods: {
  ...mapActions('meetup', [
    'createMeetup'
    ]),
  onCreateMeetup () {
    this.meetup.date = this.submittableDateTime
    this.$db.ref('meetup').push(this.meetup)
    this.createMeetup(this.meetup) 
    this.$router.push('/meetup')
  }
  },
}
</script>
