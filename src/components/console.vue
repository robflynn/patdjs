<script>
const Event = require('../lib/events')

import Patd from '../lib/patd'

const patd = Patd.shared()

export default {
  name: 'Console',

  mounted() {
    Object.keys(Event).forEach(key => {
      patd.eventManager.on(Event[key], (data) => {
        console.log('📟 ', Event[key], data)
      })
    })

    patd.eventManager.on(Event.actionResponse, (data) => {
      this.output(data)
      this.output('')
    })

    patd.eventManager.on(Event.playerEnteredRoom, (room) => {
      this.output(`<h1 style="font-size: 1.4em;">${room.name}</h1>`)
      this.output(room.fullDescription)

      if (room.exits.length > 0) {
        this.output(`\nObvious exits are: ${room.exits.map(exit => exit.direction).join(', ')}\n`)
      } else {
        this.output('\nThere are no obvious exits.\n')
      }
    })
  },

  methods: {
    output(message) {
      const console = this.$refs.console

      console.innerHTML += message.split('\n').join('<br />')
      console.innerHTML += "<br />"
    },
  },
}
</script>

<style lang="scss" scoped>
.console {
  background: rgba(0, 255, 0, 0.2);
  padding: 0.75em;
  width: 100%;
  flex-grow: 1;

  font-family: monospace;
  font-size: 1.2em;
}
</style>

<template>
  <div ref="console" class="console" />
</template>