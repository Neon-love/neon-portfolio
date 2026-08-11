<template>
  <nav class="nav" ref="navRef" :class="{ 'nav--light': isLight, 'nav--visible': isVisible }">

    <RouterLink to="/" class="nav__brand">
      <span class="nav__brand-dot" />
      <span class="nav__brand-serif">Neon</span>
      <span class="nav__brand-mono">Brian</span>
    </RouterLink>

    <ul class="nav__links">
      <li>
        <RouterLink to="/about" class="nav__link">About</RouterLink>
      </li>
      <li>
        <span class="nav__link nav__link--disabled">Projects</span>
      </li>
      <li>
        <a href="#contact" class="nav__link" @click.prevent="scrollToContact">Contact</a>
      </li>
    </ul>

  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  smoother: { type: Object, default: null }
})

const route     = useRoute()
const navRef    = ref(null)
const isLight   = ref(false)
const isVisible = ref(false)
const triggers  = []

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el && props.smoother) {
    props.smoother.scrollTo(el, true, 'top top')
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function show() {
  if (isVisible.value) return
  isVisible.value = true
  gsap.to(navRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
}

defineExpose({ show })

function setupScrollTriggers() {
  triggers.forEach(t => t.kill())
  triggers.length = 0

  if (route.path !== '/') {
    show()
    isLight.value = true
    return
  }

  const hwords = document.querySelector('.hwords')
  if (hwords) {
    triggers.push(
      ScrollTrigger.create({
        trigger: hwords,
        start: 'top 80%',
        onEnter: () => show()
      })
    )
  }

  const checkLight = () => {
    const scrollY   = window.scrollY || document.documentElement.scrollTop
    const hero      = document.querySelector('.hero')
    if (!hero) return
    const heroBottom = hero.offsetTop + hero.offsetHeight
    isLight.value = scrollY >= heroBottom - 80
  }

  window.addEventListener('scroll', checkLight, { passive: true })
  triggers.push({ kill: () => window.removeEventListener('scroll', checkLight) })
}

onMounted(() => {
  gsap.set(navRef.value, { opacity: 0, y: -16 })
  setupScrollTriggers()
})

watch(() => route.path, () => { setupScrollTriggers() })

onUnmounted(() => { triggers.forEach(t => t.kill()) })
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  pointer-events: none;
  opacity: 0;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.nav--visible { pointer-events: all; }

.nav--light {
  background: rgba(250,250,248,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.07);
}

/* brand */
.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  user-select: none;
}

.nav__brand-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  flex-shrink: 0;
  animation: pulse 2.5s ease-in-out infinite;
  transition: background 0.4s ease;
}

.nav--light .nav__brand-dot { background: rgba(17,17,17,0.35); }

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.3); }
}

.nav__brand-serif {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-style: italic;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.9);
  transition: color 0.4s ease;
}

.nav__brand-mono {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  transition: color 0.4s ease;
}

.nav--light .nav__brand-serif { color: rgba(17,17,17,0.9); }
.nav--light .nav__brand-mono  { color: rgba(17,17,17,0.45); }

/* links */
.nav__links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
}

.nav__link {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  cursor: pointer;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav__link:hover { color: rgba(255,255,255,0.95); }
.nav__link:hover::after { width: 100%; }

.nav__link.router-link-active { color: rgba(255,255,255,0.95); }
.nav__link.router-link-active::after { width: 100%; }

/* disabled — projects not yet live */
.nav__link--disabled {
  color: rgba(255,255,255,0.2) !important;
  cursor: default;
  pointer-events: none;
}

.nav__link--disabled::after { display: none; }

/* light mode */
.nav--light .nav__link { color: rgba(17,17,17,0.45); }
.nav--light .nav__link:hover { color: rgba(17,17,17,0.95); }
.nav--light .nav__link.router-link-active { color: rgba(17,17,17,0.95); }
.nav--light .nav__link--disabled { color: rgba(17,17,17,0.2) !important; }
</style>