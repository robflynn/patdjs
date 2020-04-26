<script>
  import Patd from "../lib/patd"
  import { mapState } from 'vuex'

  export default {
    name: 'Scene',

    computed: {
      sceneDescriptionHTML() {
        if (this.currentRoom) {
          return this.currentRoom.fullDescription.split('\n').map((line) => `<p style="margin-bottom: 1em;">${line}</p>`).join("\n")
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