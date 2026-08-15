<template>
  <div id="wrapper">

    <NavBar ref="navBarRef" />

    <canvas class="particles-canvas" ref="particlesCanvasRef" />

    <div class="cursor" ref="cursorRef" />
    <div class="cursor-dot" ref="cursorDotRef" />
    <div class="hero__grain" />

    <div id="content">
      <HeroSection @slices-revealed="onSlicesRevealed" />
      <HeroPassage />
      <HeroWords />
      <ProjectsSection />
      <ContactSection />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/hero/HeroSection.vue'
import HeroWords from '@/components/hero/HeroWords.vue'
import HeroPassage from '@/components/hero/HeroPassage.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import NavBar from '@/components/shared/NavBar.vue'

gsap.registerPlugin(ScrollTrigger)

const cursorRef          = ref(null)
const cursorDotRef       = ref(null)
const navBarRef          = ref(null)
const particlesCanvasRef = ref(null)

let breatheAnim = null
let animFrameId = null
const triggers  = []

// ── particles ──
function initParticles() {
  const canvas = particlesCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const particles = []

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  let mx = 0, my = 0
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

  class Particle {
    constructor() { this.reset() }
    reset() {
      this.x       = Math.random() * canvas.width
      this.y       = Math.random() * canvas.height
      this.size    = Math.random() * 3 + 1.5
      this.speedX  = (Math.random() - 0.5) * 0.5
      this.speedY  = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.6 + 0.3
      this.hue     = Math.random() > 0.5 ? 185 : 310
      this.pulse   = Math.random() * Math.PI * 2
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.pulse += 0.02
      this.currentOpacity = this.opacity * (0.7 + Math.sin(this.pulse) * 0.3)
      const dx   = mx - this.x
      const dy   = my - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 140) { this.x -= dx * 0.005; this.y -= dy * 0.005 }
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
    }
    draw() {
      const color = this.hue === 185 ? '0,240,255' : '255,0,170'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color},${this.currentOpacity * 0.15})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color},${this.currentOpacity})`
      ctx.fill()
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle())

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x
        const dy   = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0,240,255,${(1 - dist / 130) * 0.25})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => { p.update(); p.draw() })
    drawLines()
    animFrameId = requestAnimationFrame(animate)
  }
  animate()
}

// ── cursor ──
function onMouseMove(e) {
  gsap.to(cursorRef.value,    { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' })
  gsap.to(cursorDotRef.value, { x: e.clientX, y: e.clientY, duration: 0.1 })
}
function onNameEnter() { gsap.to(cursorRef.value, { scale: 2.5, duration: 0.3 }) }
function onNameLeave() { gsap.to(cursorRef.value, { scale: 1,   duration: 0.3 }) }

// ── slices revealed — nav shows ──
function onSlicesRevealed() {
  navBarRef.value?.show()
}

onMounted(() => {
  document.body.classList.add('landing-active')
  initParticles()

  window.addEventListener('mousemove', onMouseMove)

  nextTick(() => {
    // staggered parallax — each slice's IMAGE moves at different speed
    // containers are sticky so we move what's inside
    const imgs = document.querySelectorAll('.hero__image-cont img')
    imgs.forEach((img, i) => {
      // alternate: odd slices go up faster, even go slower — creates stagger spread
      const speeds = [0.3, 0.7, 0.2, 0.8, 0.4, 0.6]
      const speed  = speeds[i] ?? 0.5
      const travel = speed * 60  // max 60% travel difference

      triggers.push(
        gsap.to(img, {
          yPercent: -travel,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }).scrollTrigger
      )
    })

    // passage fades as HeroWords arrives
    triggers.push(
      ScrollTrigger.create({
        trigger: '.hwords',
        start: 'top 60%',
        end: 'top top',
        scrub: true,
        onUpdate: self => {
          const el = document.querySelector('.passage-container')
          if (el) gsap.set(el, { opacity: 1 - self.progress })
        }
      })
    )
  })
})

onUnmounted(() => {
  document.body.classList.remove('landing-active')
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('mousemove', onMouseMove)
  triggers.forEach(t => t.kill())
  breatheAnim?.kill()
})
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  overscroll-behavior: none;
  overflow-x: hidden;
  background: #0a0a0f;
}

body.landing-active {
  cursor: none;
}

#wrapper {
  position: relative;
  overflow-x: hidden;
}

#content {
  position: relative;
  z-index: 1;
}

.cursor {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 1.5px solid #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: border-color 0.3s ease, background 0.3s ease;
  mix-blend-mode: exclusion;
  background: rgba(255,255,255,0.08);
}

.cursor-dot {
  position: fixed;
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  mix-blend-mode: exclusion;
}

.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
}

.hero__grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.055;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
  animation: grain 0.5s steps(1) infinite;
}

@keyframes grain {
  0%  { transform: translate(0,0); }
  10% { transform: translate(-2%,-3%); }
  20% { transform: translate(3%,2%); }
  30% { transform: translate(-1%,3%); }
  40% { transform: translate(2%,-1%); }
  50% { transform: translate(-3%,1%); }
  60% { transform: translate(1%,-2%); }
  70% { transform: translate(-2%,2%); }
  80% { transform: translate(3%,-3%); }
  90% { transform: translate(-1%,1%); }
  100%{ transform: translate(0,0); }
}


</style>