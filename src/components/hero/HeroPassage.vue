<template>
  <div class="passage-container">
    <Transition name="zoom-passage">
      <component
        :is="'h2'"
        :key="currentIndex"
        class="passage-text"
      >
        {{ currentText }}
      </component>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const texts = [
  'EXPLORE',
  'CREATE',
  'INNOVATE',
  'FUTURE',
]

const currentIndex = ref(0)
const currentText  = computed(() => texts[currentIndex.value])

let timer = null

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % texts.length
  }, 1800)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.passage-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  pointer-events: none;
}

.passage-text {
  position: absolute;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(4rem, 14vw, 13rem);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-align: center;
  color: #fff;
  margin: 0;
  will-change: transform, opacity, filter;
  line-height: 1;
}

/* entering — zooms in from far back */
.zoom-passage-enter-active {
  animation: enterFromBack 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* exiting — blasts toward camera */
.zoom-passage-leave-active {
  animation: zoomOutToCamera 0.75s cubic-bezier(0.7, 0, 0.84, 0) forwards;
}

@keyframes enterFromBack {
  0% {
    transform: scale(0.2) translateZ(-400px);
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    transform: scale(1) translateZ(0);
    opacity: 1;
    filter: blur(0px);
  }
}

@keyframes zoomOutToCamera {
  0% {
    transform: scale(1) translateZ(0);
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: scale(22) translateZ(800px);
    opacity: 0;
    filter: blur(24px);
  }
}
</style>