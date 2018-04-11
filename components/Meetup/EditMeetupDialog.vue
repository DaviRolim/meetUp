<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
          <v-layout row wrap>
              <v-flex xs12 sm6 offset-sm3>
                <v-card-text>
                  <v-text-field 
                    name="title"
                    label="Title"
                    id="title"
                    v-model="editedTitle"
                    required></v-text-field>
                  <v-text-field 
                    name="description"
                    label="Description"
                    multi-line
                    id="description"
                    v-model="editedDescription"
                    required></v-text-field>
                  </v-card-text>
              </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn flat class="blue--text darken-1" @click.native="dialog = false">CLOSE</v-btn>
                <v-btn flat class="blue--text darken-1" @click.native="onSaveChanges">SAVE</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      dialog: false
    } 
  },
  methods: {
    onSaveChanges () {
      this.dialog = false
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() ===  '') {
        
      }
      // this.$db.ref('meetups').child(this.meetup.id).update({title: this.editedTitle, description: this.editedDescription})
      this.$store.dispatch('meetup/updateMeetupData', 
      {title: this.editedTitle, 
      description: this.editedDescription, 
      id: this.meetup.id})
    }
  }
}
</script>

<style>

</style>
