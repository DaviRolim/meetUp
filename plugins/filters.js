import Vue from 'vue'

Vue.filter('date', val => {
  const date = new Date(val)
  return date.toLocaleString(['pt-BR'], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
})