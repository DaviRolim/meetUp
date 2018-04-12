import Vue from 'vue'
import Alert from '~/components/shared/Alert.vue'
import EditMeetupDialog from '~/components/Meetup/EditMeetupDialog.vue'
import EditMeetupDateDialog from '~/components/Meetup/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from '~/components/Meetup/EditMeetupTimeDialog.vue'
import RegisterDialog from '~/components/Meetup/RegisterDialog.vue'

Vue.component('alert', Alert)
Vue.component('edit-meetup', EditMeetupDialog)
Vue.component('edit-meetup-date', EditMeetupDateDialog)
Vue.component('edit-meetup-time', EditMeetupTimeDialog)
Vue.component('register-dialog', RegisterDialog)