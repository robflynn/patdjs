<script>
import Patd from '../lib/patd'

export default {
  name: 'Console',
  computed: {
    triggers() {
      return Patd.shared().activeIntents.flatMap(intents => intents.triggers)
    }
  }
}
</script>

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