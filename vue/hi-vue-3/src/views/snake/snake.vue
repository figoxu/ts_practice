<template>
  <div class="app-content">

    <Map :map="state.map"></Map>
    <Controller :is-live="isLive" @start="start" @replay="replay"></Controller>
    <KeyBoard :is-live="isLive" @changeDirection="change"></KeyBoard>

    <audio controls
           ref="audio"
           class="audio"
           loop
           autoplay>
      <source src="https://img.tukuppt.com/newpreview_music/09/01/69/5c8a0553e18db46234.mp3"
              type="audio/mpeg" />
    </audio>
  </div>
</template>

<script lang="ts" setup>

import {startGame, replayGame, changeDirection, initGame} from "./ts/game"
import {reactive, ref} from "vue";
import {StateType} from "./ts/types";
import Map from './view/components/Map.vue';
import Controller from './view/components/Controller.vue';
import KeyBoard from './view/components/KeyBoard.vue';

// const audio = ref(null);

const state = reactive<StateType>({
  map: [],
})

const isLive = ref(1);

const start = () => {
  startGame();
  // audio.value.play();
}

const replay = () => {
  replayGame()
}

const change = (direction: string) => {
  changeDirection(direction)
}


initGame(state.map, isLive)
</script>

<style lang='scss'>
html,
body {
  background: #000;
  padding: 0;
  overflow: hidden;
  background: url('./view/assets/background-b.jpg');
  background-size: cover;
  background-repeat: space;
  @media screen and (max-width: 750px) {
    background: url('./view/assets/background-c.jpg');
    background-size: contain;
  }
}

body {
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-content {
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
}

.audio {
  position: absolute;
  z-index: -1;
  visibility: hidden;
}
</style>

