<template>
  <div id="wrapper" ref="wrapperRef">

    <NavBar ref="navBarRef" :smoother="smoother" />

    <canvas class="particles-canvas" ref="particlesCanvasRef" />

    <div class="cursor" ref="cursorRef" />
    <div class="cursor-dot" ref="cursorDotRef" />
    <div class="hero__grain" />

    <div class="hero__bg-text" ref="bgTextRef">
      <div class="hero__name-wrap" ref="nameWrapRef">
        <div class="hero__rule-wrap">
          <div class="hero__rule" ref="ruleRef" />
        </div>
        <div class="hero__name-clip">
          <h1 class="hero__name" ref="nameRef">Neon <span class="hero__name-brian">Brian</span></h1>
        </div>
      </div>
    </div>

    <div id="content" ref="contentRef">
      <HeroSection @slices-revealed="onSlicesRevealed" />
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
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import HeroSection from '@/components/hero/HeroSection.vue'
import HeroWords from '@/components/hero/HeroWords.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import NavBar from '@/components/shared/NavBar.vue'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const wrapperRef         = ref(null)
const contentRef         = ref(null)
const bgTextRef          = ref(null)
const nameWrapRef        = ref(null)
const nameRef            = ref(null)
const ruleRef            = ref(null)
const cursorRef          = ref(null)
const cursorDotRef       = ref(null)
const navBarRef          = ref(null)
const particlesCanvasRef = ref(null)

let smoother    = null
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

// ── slices revealed — name animates in, nav shows, NO auto-scroll ──
function onSlicesRevealed() {
  gsap.fromTo(ruleRef.value,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.8, ease: 'power3.out', transformOrigin: 'left' }
  )

  gsap.fromTo(nameRef.value,
    { y: '110%' },
    {
      y: '0%',
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.2,
      onComplete: () => {
        breatheAnim = gsap.to(nameRef.value, {
          scale: 1.004, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1
        })
        navBarRef.value?.show()
        // no auto-scroll — user scrolls naturally
      }
    }
  )
}

onMounted(() => {
  document.body.classList.add('landing-active')
  initParticles()
  gsap.set(nameRef.value, { y: '110%' })

  window.addEventListener('mousemove', onMouseMove)
  nameRef.value?.addEventListener('mouseenter', onNameEnter)
  nameRef.value?.addEventListener('mouseleave', onNameLeave)

  nextTick(() => {
    smoother = ScrollSmoother.create({
      wrapper: wrapperRef.value,
      content: contentRef.value,
      smooth: 2,
      effects: true,
      // normalizeScroll removed — it breaks per-element parallax stagger
    })

    // each slice gets a different random speed — this is what creates the stagger
    smoother.effects('.hero__image-cont', {
      speed: () => gsap.utils.random(0.55, 0.85, 0.05)
    })

    // image scale + drift
    triggers.push(
      gsap.to('.hero__image-cont > img', {
        scale: 1.5,
        xPercent: 20,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=1500px',
          scrub: true
        }
      }).scrollTrigger
    )

    // bgText fades as HeroWords arrives
    triggers.push(
      ScrollTrigger.create({
        trigger: '.hwords',
        start: 'top 20%',
        end: 'top top',
        scrub: true,
        onUpdate: self => {
          gsap.set(bgTextRef.value, { opacity: 1 - self.progress })
        }
      })
    )
  })
})

onUnmounted(() => {
  document.body.classList.remove('landing-active')
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('mousemove', onMouseMove)
  nameRef.value?.removeEventListener('mouseenter', onNameEnter)
  nameRef.value?.removeEventListener('mouseleave', onNameLeave)
  triggers.forEach(t => t.kill())
  breatheAnim?.kill()
  if (smoother) smoother.kill()
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
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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

.hero__bg-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  pointer-events: none;
}

.hero__name-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  pointer-events: none;
}

.hero__rule-wrap {
  width: clamp(200px, 40vw, 400px);
}

.hero__rule {
  height: 1px;
  background: rgba(255,255,255,0.2);
  transform-origin: left;
  transform: scaleX(0);
}

.hero__name-clip {
  overflow: hidden;
  padding-bottom: 0.1em;
}

.hero__name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.5rem, 10vw, 8.5rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1;
  text-align: center;
  margin: 0;
  pointer-events: all;
  display: block;
}

.hero__name-brian {
  display: inline;
  animation: brianGlow 4s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes brianGlow {
  0%, 60%, 100% {
    color: #ffffff;
    text-shadow: none;
  }
  70% {
    color: #fff;
    text-shadow: 0 0 10px #00f0ff, 0 0 30px #00f0ff88, 0 0 60px #00f0ff44;
  }
  80% {
    color: #fff;
    text-shadow: 0 0 6px #00f0ff, 0 0 20px #00f0ff66;
  }
  90% {
    color: #fff;
    text-shadow: 0 0 12px #00f0ff, 0 0 40px #00f0ffaa, 0 0 80px #00f0ff33;
  }
}
</style>