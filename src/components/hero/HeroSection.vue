<template>
  <section class="hero">
    <div class="hero__inner">
      <div
        v-for="(_, i) in 6"
        :key="i"
        class="hero__image-cont"
      >
        <img
          :src="heroImage"
          alt=""
          @load="onImageLoad"
          @error="onImageLoad"
        />
        <div class="anim-swipe" ref="swipeRefs" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['slices-revealed'])

const heroImage = '/hero.jpg'
const swipeRefs = ref([])

let revealed       = false
let fallbackTimer  = null
let imageLoadCount = 0

function runReveal() {
  if (revealed) return
  revealed = true
  clearTimeout(fallbackTimer)

  gsap.to(swipeRefs.value, {
    yPercent: 300,
    delay: 0.2,
    duration: 3,
    stagger: { from: 'random', each: 0.1 },
    ease: 'sine.out',
    onComplete: () => emit('slices-revealed')
  })
}

function onImageLoad() {
  imageLoadCount++
  if (imageLoadCount === 1) setTimeout(runReveal, 300)
}

onMounted(() => {
  fallbackTimer = setTimeout(runReveal, 2500)
})

onUnmounted(() => {
  clearTimeout(fallbackTimer)
  gsap.killTweensOf(swipeRefs.value)
})
</script>

<style scoped>
.hero {
  height: 400vh;
  position: relative;
}

.hero__inner {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  z-index: 2;
}

.hero__image-cont {
  position: relative;
  overflow: hidden;
}

.hero__image-cont:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0px;
  background-color: #111111;
  height: 100%;
  top: 0;
  width: 2.5px;
  z-index: 999;
}

.hero__image-cont img,
.hero__image-cont .anim-swipe {
  position: absolute;
  width: 700%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.hero__image-cont:nth-child(1) img { left: -100%; }
.hero__image-cont:nth-child(2) img { left: -200%; }
.hero__image-cont:nth-child(3) img { left: -300%; }
.hero__image-cont:nth-child(4) img { left: -400%; }
.hero__image-cont:nth-child(5) img { left: -500%; }
.hero__image-cont:nth-child(6) img { left: -600%; }

.anim-swipe {
  width: 100% !important;
  background-color: #111111;
  z-index: 2;
}
</style>