<script>
export default {
  methods: {
    inputReceived($e) {
      const input = $e.target.value
      $e.target.value = ''
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