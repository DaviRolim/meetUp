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
          :rules="[() => meetup.title.length > 0 || 'This field is required', () => meetup.title.length < 50 || 'Title is too big']"
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
          :rules="[() => meetup.location.length > 0 || 'This field is required', () => meetup.location.length < 50 || 'location is too big']"
          label="Location"
          id="location"
          v-model="meetup.location"
          required></v-text-field>
        </v-flex>
  </v-layout>
  <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-btn dark raised class="red" @click="onPickFile">Upload Image</v-btn>
          <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">
        </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <img :src="imageUrl" height="150">
    </v-flex>
  </v-layout>
  <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field 
          name="description"
          :rules="[() => meetup.description.length > 0 || 'This field is required']"
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
         <v-time-picker v-model="time" format="24hr"></v-time-picker>
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
  middleware: 'auth-guard',
  data () {
    return {
      meetup: {
        title: '',
        description: '',
        location: '',
        date: '',
        image: null
      },
        imageUrl: '',
        time: ''
    }
  },
  computed : {
    formIsValid () {
      return this.meetup.title !== '' && 
      this.meetup.location !== '' && 
      this.imageUrl !== '' && 
      this.meetup.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.meetup.date)
      const hours = this.time.split(':')[0]
      const minutes = this.time.match(/:(\d+)/)
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
      if(!this.meetup.image) {
        return
      }
      this.meetup.date = this.submittableDateTime.toISOString()
      this.createMeetup(this.meetup) 
      this.$router.push('/meetup')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const file = event.target.files
      let name = file[0].name
      if (name.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      console.log(name)
      const fileReader = new FileReader()
      fileReader.addEventListener('load',() => {
        this.imageUrl = fileReader.result //the result is base64
      })
      fileReader.readAsDataURL(file[0])
      this.meetup.image = file[0]
      console.log(this.imageUrl)
    }
  }
}
</script>
