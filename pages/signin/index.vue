<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <alert @dismissed="onDismissed" :text="error.message"></alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex>
                    <v-text-field
                    name="email"
                    label="Mail"
                    id="email"
                    v-model="email"
                    type="email"
                    required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign In
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user (value) {
      return this.$store.getters['meetup/user']
    },
    error () {
      return this.$store.getters['meetup/error']
    },
    loading () {
      return this.$store.getters['meetup/loading']
    }
  },
  watch: {
   user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    } 
  },
  methods: {
    ...mapActions('meetup', [
    'signUserIn'
    ]),
    onSignin () {
      this.signUserIn({email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('meetup/clearError')
    }
  }
}
</script>
