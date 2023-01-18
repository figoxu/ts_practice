<template>
  <div class="game-box">
    <div class="row" v-for="row in gameRow" :key="row">
      <div class="col" v-for="col in gameCol" :key="col">
        <Cell :type="map[row-1][col-1]"></Cell>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cell from './Cell.vue'
import {gameRow, gameCol} from '../../ts/game/map'
import { defineProps } from 'vue';

defineProps(['map'])

</script>


<style lang='scss'>
.game-box {
  background: #000;
  opacity: 0.85;
  border: 1px solid #fff;

  .row {
    display: flex;
  }
}
</style>
