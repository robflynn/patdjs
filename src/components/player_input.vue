<script>
import Patd from "../lib/patd"
const Event = require('../lib/events')

export default {
  methods: {
    inputReceived($e) {
      const input = $e.target.value
      $e.target.value = ''

      Patd.shared().process(input)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 10px;
  margin-top: 2em;

  background: rgba(255, 255, 255, 0.4);
  border: solid 1px rgba(255, 255, 255, 0.4);
  font-size: 2em;
  color: #fff;
}
</style>

<template>
  <div>
    <input type="text" name="playerInput" ref="playerInput" @change="inputReceived"/>
  </div>
</template>