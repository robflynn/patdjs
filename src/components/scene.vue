<script>
  export default {
    name: 'Scene',

    mounted() {
      console.log('scene mounted')
    },

    props: [
      "scene"
    ],

    computed: {
      sceneDescriptionHTML() {
        return this.scene.description.split('\n').map((line) => `<p>${line}</p>`).join("\n")
      }
    },

    watch: {
      scene() {
        console.log("scene changed")
      }
    }
  }
</script>

<style scoped>
.scene {
}
</style>

<template>
  <div class="scene">
    <h1 class="title">{{ scene.name }}</h1>
    <div class="description" v-html="sceneDescriptionHTML" />
  </div>
</template>