<template>
  <div id="app">

    <!-- curtain overlay -->
    <div class="curtain" ref="curtainRef">
      <span class="curtain__word" ref="curtainWordRef">{{ curtainWord }}</span>
    </div>

    <RouterView />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { gsap } from 'gsap'

const curtainRef     = ref(null)
const curtainWordRef = ref(null)
const curtainWord    = ref('')

const routeWords = {
  '/':         'Home',
  '/about':    'About',
  '/projects': 'Projects',
}

const router = useRouter()

router.beforeEach((to, from, next) => {
  if (to.path === from.path) return next()

  curtainWord.value = routeWords[to.path] || ''

  const curtain = curtainRef.value
  const word    = curtainWordRef.value

  gsap.set(curtain, { display: 'flex', yPercent: 100 })
  gsap.set(word,    { opacity: 0, y: 20 })

  gsap.timeline({
    onComplete: () => next()
  })
    .to(curtain, { yPercent: 0, duration: 0.55, ease: 'power4.inOut' })
    .to(word,    { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, '-=0.1')
    .to({},      { duration: 0.25 }) // hold
})

router.afterEach(() => {
  const curtain = curtainRef.value
  const word    = curtainWordRef.value

  // scroll to top on new page
  window.scrollTo(0, 0)

  gsap.timeline()
    .to(word,    { opacity: 0, y: -10, duration: 0.2, ease: 'power3.in' })
    .to(curtain, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => gsap.set(curtain, { display: 'none', yPercent: 100 })
    }, '-=0.05')
})
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body { background: #0a0a0f; overflow-x: hidden; }

#app { position: relative; min-height: 100vh; }

.curtain {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #0a0a0f;
  display: none;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.curtain__word {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-style: italic;
  font-size: clamp(3rem, 10vw, 9rem);
  color: rgba(255,255,255,0.12);
  letter-spacing: -0.02em;
  text-transform: uppercase;
  will-change: transform, opacity;
}
</style>