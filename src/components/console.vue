<script>
const Event = require('../lib/events')

import Patd from '../lib/patd'

const patd = Patd.shared()

export default {
  name: 'Console',
  computed: {
    triggers() {
      return patd.activeIntents.flatMap(intents => intents.triggers)
    }
  },

  mounted() {
    Object.keys(Event).forEach(key => {
      patd.eventManager.on(Event[key], (data) => {
        console.log('📟 ', Event[key], data)
      })
    })
  }
}
</script>

<style scoped>
  textarea {
    width: 400px;
    height: 100px;
  }
</style>

<template>
  <div class="console">
    <div class="intents">
      <p><b>intents</b></p>
      <ul>
        <li v-for="trigger in triggers">
          {{ trigger }}
        </li>
      </ul>
    </div>
  </div>
</template>