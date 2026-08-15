<template>
  <div class="proj-hero">
    <canvas ref="canvasRef" class="proj-hero__canvas" />

    <div class="proj-hero__content">
      <div class="proj-hero__lines" ref="linesRef">
        <div class="proj-hero__line-wrap" v-for="(line, i) in lines" :key="i">
          <span class="proj-hero__line">{{ line }}</span>
        </div>
      </div>
      <div class="proj-hero__attr-wrap">
        <span class="proj-hero__attr" ref="attrRef">— Neon Brian</span>
      </div>
    </div>

    <div class="proj-hero__scroll">
      <span class="proj-hero__scroll-label">Scroll to Explore</span>
      <span class="proj-hero__scroll-arrow">↓</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const lines = ['Projects', 'for people,', 'made', 'to last.']

// ── config ──
const CARD_COUNT  = 60
const SPEED       = 2.4
const MAX_DEPTH   = 2600
const MIN_DEPTH   = -200
const FOCAL       = 480
const CARD_W      = 170
const CARD_H      = 210

// protected center radius — text lives here
const TEXT_RADIUS = 280

const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
]

const canvasRef = ref(null)
const linesRef  = ref(null)
const attrRef   = ref(null)

let ctx          = null
let width        = 0
let height       = 0
let rafId        = null
let cards        = []
let loadedImages = []

// place card anywhere on screen EXCEPT the protected center circle
// uses polar coords — angle fully random (full 360°)
// radius from TEXT_RADIUS out to max screen corner distance
function randomPosition() {
  const angle = Math.random() * Math.PI * 2

  // at this card's depth it will be projected — we want it to fill
  // the full screen at mid-depth. Use a wide radius spread.
  // min radius: just outside text protect zone (in world space at z=0: radius=TEXT_RADIUS)
  // max radius: enough that at mid-depth cards reach screen corners
  const minR = TEXT_RADIUS + 40
  const maxR = minR + 800 + Math.random() * 400  // wide spread fills corners

  const r = minR + Math.sqrt(Math.random()) * (maxR - minR)

  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, angle }
}

function loadImages() {
  return Promise.all(
    IMAGE_URLS.map(url => new Promise(resolve => {
      const img       = new Image()
      img.crossOrigin = 'anonymous'
      img.src         = url
      img.onload      = () => resolve(img)
      img.onerror     = () => resolve(null)
    }))
  )
}

function initCards() {
  cards = []
  for (let i = 0; i < CARD_COUNT; i++) {
    const pos = randomPosition()
    cards.push({
      x:     pos.x,
      y:     pos.y,
      angle: pos.angle,
      z:     (i / CARD_COUNT) * MAX_DEPTH,
      image: loadedImages[i % loadedImages.length],
    })
  }
}

function handleResize() {
  if (!canvasRef.value) return
  width  = canvasRef.value.width  = window.innerWidth
  height = canvasRef.value.height = window.innerHeight
}

function render() {
  ctx.clearRect(0, 0, width, height)

  const cx = width  / 2
  const cy = height / 2

  cards.sort((a, b) => b.z - a.z)

  for (const card of cards) {
    card.z -= SPEED

    if (card.z <= MIN_DEPTH) {
      card.z = MAX_DEPTH
      const pos  = randomPosition()
      card.x     = pos.x
      card.y     = pos.y
      card.angle = pos.angle
    }

    const scale = FOCAL / (FOCAL + card.z)
    if (scale <= 0) continue

    const sx = cx + card.x * scale
    const sy = cy + card.y * scale
    const dw = CARD_W * scale
    const dh = CARD_H * scale

    // skip if entirely off screen
    if (sx + dw < 0 || sx - dw > width || sy + dh < 0 || sy - dh > height) continue

    const farFade  = Math.sin(Math.min(1, Math.max(0, (MAX_DEPTH - card.z) / 700)) * (Math.PI / 2))
    const nearFade = Math.min(1, Math.max(0, (card.z - MIN_DEPTH) / 300))
    const opacity  = farFade * nearFade * 0.88

    if (opacity < 0.01) continue

    ctx.save()
    ctx.globalAlpha = opacity

    const r = Math.max(2, 7 * scale)
    ctx.beginPath()
    ctx.roundRect(sx - dw / 2, sy - dh / 2, dw, dh, r)
    ctx.clip()

    if (card.image?.complete) {
      ctx.drawImage(card.image, sx - dw / 2, sy - dh / 2, dw, dh)
    }

    ctx.restore()
  }

  rafId = requestAnimationFrame(render)
}

onMounted(async () => {
  ctx = canvasRef.value.getContext('2d')
  handleResize()
  window.addEventListener('resize', handleResize)

  loadedImages = (await loadImages()).filter(Boolean)
  initCards()
  render()

  const lineEls = linesRef.value.querySelectorAll('.proj-hero__line-wrap')
  gsap.set(lineEls,       { yPercent: 110 })
  gsap.set(attrRef.value, { opacity: 0, y: 12 })

  gsap.timeline({ delay: 0.5 })
    .to(lineEls, { yPercent: 0, duration: 1.1, stagger: 0.14, ease: 'power4.out' })
    .to(attrRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.proj-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
}

.proj-hero__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.proj-hero__content {
  position: relative;
  z-index: 2;
  pointer-events: none;
  text-align: center;
}

.proj-hero__lines {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.proj-hero__line-wrap {
  overflow: hidden;
  padding-bottom: 0.04em;
}

.proj-hero__line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.5rem, 9vw, 8.5rem);
  line-height: 0.9;
  color: #fff;
  letter-spacing: -0.01em;
  will-change: transform;
}

.proj-hero__attr-wrap {
  margin-top: 1.5rem;
  overflow: hidden;
}

.proj-hero__attr {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
}

.proj-hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  pointer-events: none;
}

.proj-hero__scroll-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
}

.proj-hero__scroll-arrow {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.3);
  animation: bounce 1.8s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
</style>