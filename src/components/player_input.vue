<script>
import Patd from "../lib/patd"
const Event = require('../lib/events')

export default {
  methods: {
    inputReceived($e) {
      const input = $e.target.value
      $e.target.value = ''

      Patd.shared().emit(Event.inputReceived, input)
    }
  }
}
</script>

<style lang="scss">
</style>

<template>
  <div>
    <input type="text" name="playerInput" ref="playerInput" @change="inputReceived"/>
  </div>
</template>