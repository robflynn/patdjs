<script>
  import Patd from "../lib/patd"
  import { mapState } from 'vuex'

  export default {
    name: 'Scene',

    mounted() {
      console.log('scene mounted')
    },

    computed: {
      sceneDescriptionHTML() {
        if (this.currentRoom) {
          return this.currentRoom.description.split('\n').map((line) => `<p>${line}</p>`).join("\n")
        }

        return ""
      },

      ...mapState([
        'currentRoom'
      ])
    },

    watch: {
      currentRoom(newValue, oldValue) {
        console.log("room changed: ", oldValue, newValue)
      }
    }
  }
</script>

<style scoped>
.scene {
}
</style>

<template>
  <div>
    <div class="scene" v-if="currentRoom" :key="currentRoom.id">
      <h1 class="title">{{ currentRoom.name }}</h1>
      <div class="description" v-html="sceneDescriptionHTML" />
    </div>
  </div>
</template>