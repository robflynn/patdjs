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

      exits() {
        return this.currentRoom.exits.map(exit => exit.direction).join(', ')
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

<style lang="scss" scoped>
h1 {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1.2em;
}

.description {
  margin-bottom: 1em;
  line-height: 1.2em;
  font-size: 1.1em;
}

.scene {
  width: 100%;
}

.exits {
  margin-bottom: 1em;
}
</style>

<template>
  <div class="scene">
    <div v-if="currentRoom" :key="currentRoom.id">
      <h1 class="title">{{ currentRoom.name }}</h1>
      <div class="description" v-html="sceneDescriptionHTML" />
      <div class="exits">
        Obvious exits are: {{ this.exits }}
      </div>
    </div>
  </div>
</template>