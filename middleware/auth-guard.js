export default function (context) {
  if (context.route.name !== 'signin') {
    if (!context.store.getters['meetup/user']) {
      context.redirect('/signin')
    }
  }
}