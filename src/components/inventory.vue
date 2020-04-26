<script>
import Patd from '../lib/patd'

export default {
  name: 'Inventory',

  computed: {
    items() {
      return Patd.shared().inventory
    }
  },
}
</script>

<style lang="scss" scoped>
.inventory {
    padding: 0.5em;
    display: flex;
    flex-direction: column;

    background: rgba(255, 255, 255, 0.1);
    height: 6em;
    font-size: 0.8em;

    h1 {
      font-size: 1em;
      font-weight: bold;
      margin-bottom: 0.5em;
    }

    .items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .item {
        display: inline-block;
        margin-right: 0.5em;
      }
    }
  }
</style>

<template>
  <div class="inventory">
      <h1>Inventory</h1>
      <div class="items">
        <div class="item" v-for="item in items" :key="item.id">{{ item.name }}</div>
      </div>
  </div>
</template>