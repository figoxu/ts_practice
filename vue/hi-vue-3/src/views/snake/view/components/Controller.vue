<template>
  <transition name="base">
    <div class="controller-box" v-if="isLive!==2">
      <div class="show-btns" v-if="isLive===1" @click="emit('start')">
        <img src="../assets/snake.png" class="limit">
        <img src="../assets/start.png">
        <div class="options-trip">
          <p>手机玩家请点击屏幕进行操作</p>
          <p>电脑玩家请通过 ↑ ↓ ← → 进行操作;</p>
        </div>
      </div>
      <div class="show-btns" v-if="isLive===3" @click="emit('replay')">
        <img src="../assets/gameover.png" class="Limit">
        <img src="../assets/replay.png">
      </div>


    </div>
  </transition>
</template>


<script lang="ts" setup>

const emit = defineEmits(['start', 'replay'])
defineProps({
  isLive: {
    type: Number,
    default: 1,
  }
})
</script>

<style lang='scss'>
.controller-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  // 模糊滤镜
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  .show-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .limit {
      width: 300px;
    }
  }

  .options-tips {
    color: #f0d095;
    font-size: 12px;

    p {
      padding: 5px 0;
    }
  }
}

//淡入淡出
.base-enter-active,
.base-leave-active {
  transition: all 0.3s ease;
}

.base-enter-to,
.base-leave-from {
  opacity: 1;
}

.base-enter-from,
.base-leave-to {
  opacity: 0;
}
</style>