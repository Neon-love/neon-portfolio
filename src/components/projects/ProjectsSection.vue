<template>
  <section class="projects">
    <div class="projects__inner">

      <div class="projects__heading-wrap" ref="headerRef">
        <div class="projects__heading-top">
          <span class="projects__label">// selected work</span>
          <span class="projects__count">03 projects</span>
        </div>
        <h2 class="projects__heading">
          <span class="projects__heading-clip">
            <span class="projects__heading-line">Things</span>
          </span>
          <span class="projects__heading-clip">
            <span class="projects__heading-line projects__heading-line--italic">I've built.</span>
          </span>
        </h2>
        <div class="projects__heading-rule" ref="ruleRef" />
      </div>

      <div class="projects__list">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          class="projects__row"
          :class="i % 2 === 0 ? '' : 'projects__row--reverse'"
          :ref="el => { if (el) rowEls[i] = el }"
        >
          <div class="projects__img-wrap">
            <div class="projects__img-inner">
              <img
                :src="project.img"
                :alt="project.title"
                class="projects__img"
                :ref="el => { if (el) imgEls[i] = el }"
              />
              <div class="projects__img-fallback" :style="{ background: project.fallback }" />
            </div>
          </div>

          <div class="projects__text">
            <div class="projects__text-top">
              <span class="projects__num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="projects__year">{{ project.year }}</span>
            </div>
            <h3 class="projects__title">{{ project.title }}</h3>
            <p class="projects__desc">{{ project.desc }}</p>
            <div class="projects__tags">
              <span v-for="tag in project.tags" :key="tag" class="projects__tag">
                {{ tag }}
              </span>
            </div>
            <div class="projects__cta">
              <span class="projects__cta-text">View project</span>
              <span class="projects__cta-arrow">↗</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUpdate } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    title: 'KTPBA Broadcast System',
    desc: 'Full live broadcast overlay system for national bowling. Animated sponsor sequences, real-time scoreboards, player profiles — engineered for live TV.',
    tags: ['Vue.js', 'GSAP', 'Broadcast'],
    year: '2025',
    img: '/images/projects/ktpba.jpg',
    fallback: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    title: 'Noisy Kings Bowling App',
    desc: 'Full league management app. Lane visualization, practice mode, live scoring and a Supabase + PostgreSQL backend deployed on Render.',
    tags: ['React', 'FastAPI', 'Supabase'],
    year: '2024',
    img: '/images/projects/noisy-kings.jpg',
    fallback: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
  },
  {
    title: 'Village Market PDA',
    desc: 'Public display and advertising app powering screens across Village Market mall. Real-time content scheduling via Socket.IO.',
    tags: ['Vue', 'Express', 'Socket.IO'],
    year: '2024',
    img: '/images/projects/pda.jpg',
    fallback: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 100%)',
  },
]

const headerRef = ref(null)
const ruleRef   = ref(null)
const rowEls    = []
const imgEls    = []
const triggers  = []

onBeforeUpdate(() => {
  rowEls.length = 0
  imgEls.length = 0
})

onMounted(() => {
  const lines = headerRef.value.querySelectorAll('.projects__heading-line')
  const top   = headerRef.value.querySelector('.projects__heading-top')

  gsap.set(top,   { opacity: 0, y: 16 })
  gsap.set(lines, { y: '105%' })
  gsap.set(ruleRef.value, { scaleX: 0, transformOrigin: 'left' })

  triggers.push(
    ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top 85%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: self => {
        const p = self.progress
        gsap.set(top,   { opacity: p, y: 16 * (1 - p) })
        gsap.set(lines, { y: `${105 * (1 - p)}%` })
        gsap.set(ruleRef.value, { scaleX: p, transformOrigin: 'left' })
      }
    })
  )

  rowEls.forEach((row, i) => {
    const isReverse = i % 2 !== 0
    const imgWrap   = row.querySelector('.projects__img-wrap')
    const text      = row.querySelector('.projects__text')
    const img       = imgEls[i]

    // scrubbed — reverses naturally on scroll up
    triggers.push(
      ScrollTrigger.create({
        trigger: row,
        start: 'top 90%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: self => {
          const p      = self.progress
          const eased  = gsap.parseEase('power3.out')(p)
          const xImg   = isReverse ? 40 * (1 - eased) : -40 * (1 - eased)
          const xText  = isReverse ? -40 * (1 - eased) : 40 * (1 - eased)
          gsap.set(imgWrap, { opacity: eased, x: xImg })
          gsap.set(text,    { opacity: eased, x: xText })
        }
      })
    )

    row.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.04, duration: 0.6, ease: 'power2.out' })
    })
    row.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' })
    })
  })
})

onUnmounted(() => { triggers.forEach(t => t.kill()) })
</script>

<style scoped>
.projects {
  position: relative;
  z-index: 5;
  background: #fafaf8;
  padding: 8rem 0;
}

.projects__inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 3rem;
}

.projects__heading-wrap { margin-bottom: 5rem; }

.projects__heading-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.projects__label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
}

.projects__count {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #ccc;
}

.projects__heading {
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
}

.projects__heading-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.projects__heading-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.projects__heading-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2.5rem;
}

.projects__heading-rule {
  height: 1px;
  background: #e0e0e0;
}

/* rows */
.projects__list {
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.projects__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.projects__row--reverse {
  direction: rtl;
}
.projects__row--reverse > * {
  direction: ltr;
}

.projects__img-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 3px;
  background: #ebebeb;
  position: relative;
}

.projects__img-inner {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.projects__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
}

.projects__img-fallback {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.projects__text {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.projects__text-top {
  display: flex;
  justify-content: space-between;
}

.projects__num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #ccc;
}

.projects__year {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: #ccc;
}

.projects__title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  color: #111;
  margin: 0;
  line-height: 1.1;
}

.projects__desc {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  line-height: 1.78;
  color: #777;
  margin: 0;
}

.projects__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.projects__tag {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #aaa;
  border: 1px solid #e0e0e0;
  padding: 3px 10px;
  border-radius: 2px;
}

.projects__cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.projects__cta-text {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #bbb;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1px;
  transition: color 0.2s, border-color 0.2s;
}

.projects__cta-arrow {
  font-size: 0.9rem;
  color: #bbb;
  transition: color 0.2s, transform 0.2s;
}

.projects__row:hover .projects__cta-text {
  color: #111;
  border-color: #111;
}

.projects__row:hover .projects__cta-arrow {
  color: #111;
  transform: translate(3px, -3px);
}
</style>