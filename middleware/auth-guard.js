export default function (context) {
  if (context.route.name !== 'signin') {
    if (!context.store.getters['user/user']) {
      context.redirect('/signin')
    }
  }
}