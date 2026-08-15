<template>
  <section class="prs">
    <div class="prs__inner">

      <div class="prs__heading-row">
        <div class="prs__heading-wrap" ref="headingRef">
          <span class="prs__label">// selected work</span>
          <h2 class="prs__heading">
            <span class="prs__heading-clip"><span class="prs__heading-line">Things</span></span>
            <span class="prs__heading-clip"><span class="prs__heading-line prs__heading-line--italic">I've built.</span></span>
          </h2>
        </div>
        <RouterLink to="/projects" class="prs__view-all" ref="viewAllRef">
          <span class="prs__view-all-text">View all projects</span>
          <span class="prs__view-all-arrow">↗</span>
        </RouterLink>
      </div>

      <div class="prs__grid" ref="gridRef">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          class="prs__card"
          :ref="el => { if (el) cardEls[i] = el }"
          :style="{ '--accent': project.accent }"
        >
          <div class="prs__card-img-wrap">
            <img :src="project.img" :alt="project.title" class="prs__card-img" />
          </div>
          <div class="prs__card-body">
            <div class="prs__card-top">
              <span class="prs__card-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="prs__card-category">{{ project.category }}</span>
            </div>
            <h3 class="prs__card-title">{{ project.title }}</h3>
            <div class="prs__card-tags">
              <span v-for="tag in project.tags" :key="tag" class="prs__card-tag">{{ tag }}</span>
            </div>
            <p class="prs__card-desc">{{ project.desc }}</p>
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" class="prs__card-link">
              Live Preview ↗
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RouterLink } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Salon de Belleza',
    category: 'Hospitality',
    tags: ['Vue', 'Express', 'MySQL'],
    img: '/images/projects/salon.png',
    accent: '#c26b8a',
    liveUrl: 'https://salon-de-belleza-omega.vercel.app/',
    desc: 'Website for a salon. Covers services, pricing, and booking.',
  },
  {
    title: 'Bowlo',
    category: 'Sports Tech',
    tags: ['React', 'FastAPI', 'Supabase'],
    img: '/images/projects/noisy-kings.png',
    accent: '#e8963a',
    liveUrl: 'https://bowling-app-mirror.vercel.app/',
    desc: 'League management app for a local bowling club. Live scoring and player stats.',
  },
  {
    title: 'Mechanico',
    category: 'Systems',
    tags: ['FastAPI', 'React Admin', 'MySQL'],
    img: '/images/projects/mets.png',
    accent: '#c0392b',
    liveUrl: null,
    desc: 'Fault tracking tool for a gaming floor. Real-time error logging and dashboard.',
  },
]

const headingRef = ref(null)
const viewAllRef = ref(null)
const gridRef    = ref(null)
const cardEls    = []
const triggers   = []

onMounted(() => {
  const lines = headingRef.value.querySelectorAll('.prs__heading-line')
  const label = headingRef.value.querySelector('.prs__label')
  gsap.set([label, lines], { opacity: 0, y: 30 })
  gsap.set(viewAllRef.value.$el, { opacity: 0, x: 20 })
  gsap.set(cardEls, { opacity: 0, y: 60 })

  triggers.push(ScrollTrigger.create({
    trigger: headingRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.timeline()
        .to(label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out' }, '-=0.2')
        .to(viewAllRef.value.$el, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    }
  }))

  triggers.push(ScrollTrigger.create({
    trigger: gridRef.value,
    start: 'top 75%',
    onEnter: () => {
      gsap.to(cardEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' })
    }
  }))
})

onUnmounted(() => triggers.forEach(t => t.kill()))
</script>

<style scoped>
.prs {
  background: #fafaf8;
  padding: 8rem 4vw 8rem;
}

.prs__inner { max-width: 1200px; margin: 0 auto; }

.prs__heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 4rem;
  gap: 2rem;
}

.prs__label {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
  margin-bottom: 1rem;
}

.prs__heading {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.prs__heading-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.prs__heading-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.prs__heading-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 1.5rem;
}

.prs__view-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #111;
  transition: gap 0.2s;
}

.prs__view-all:hover { gap: 0.8rem; }

.prs__view-all-text {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #111;
}

.prs__view-all-arrow {
  font-size: 0.9rem;
  color: #111;
}

/* grid */
.prs__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.prs__card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #ebebeb;
  transition: box-shadow 0.3s, transform 0.3s;
}

.prs__card:hover {
  box-shadow: 0 16px 48px -8px rgba(0,0,0,0.12);
  transform: translateY(-4px);
}

.prs__card-img-wrap {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #f2f2f0;
  border-bottom: 3px solid var(--accent);
}

.prs__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.prs__card:hover .prs__card-img { transform: scale(1.04); }

.prs__card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prs__card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prs__card-num {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  color: #ccc;
}

.prs__card-category {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 2px 7px;
  border-radius: 2px;
}

.prs__card-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 1.6rem;
  color: #111;
  margin: 0;
  line-height: 1;
}

.prs__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.prs__card-tag {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  border: 1px solid #ebebeb;
  padding: 2px 8px;
  border-radius: 20px;
}

.prs__card-desc {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.prs__card-link {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
  margin-top: 0.25rem;
  transition: opacity 0.2s;
}

.prs__card-link:hover { opacity: 0.7; }
</style>