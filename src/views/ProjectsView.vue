<template>
  <div class="projects-page">
    <NavBar ref="navBarRef" />
    <ProjectsHero />

    <div class="proj__inner">

      <!-- heading -->
      <div class="proj__heading-wrap" ref="headingRef">
        <div class="proj__heading-top">
          <span class="proj__label">// all work</span>
          <span class="proj__count">{{ filteredProjects.length }} projects</span>
        </div>
        <h1 class="proj__heading">
          <span class="proj__heading-clip">
            <span class="proj__heading-line">Things I've</span>
          </span>
          <span class="proj__heading-clip">
            <span class="proj__heading-line proj__heading-line--italic">built.</span>
          </span>
        </h1>
        <div class="proj__heading-rule" ref="ruleRef" />
      </div>

      <!-- filter — sticky below nav -->
      <div class="proj__filter-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          class="proj__filter-btn"
          :class="{ 'proj__filter-btn--active': activeCategory === cat }"
          @click="setCategory(cat)"
        >{{ cat }}</button>
      </div>

      <!-- cards feed -->
      <div class="proj__feed">
        <section
          v-for="(project, i) in filteredProjects"
          :key="project.title"
          class="proj__card-wrap"
          :ref="el => { if (el) cardRefs[i] = el }"
        >
          <div
            class="proj__card-body"
            :ref="el => { if (el) cardBodyRefs[i] = el }"
            :style="{ '--accent': project.accent, '--text': project.textColor }"
          >
            <!-- separate background image with accent overlay -->
            <div
              class="proj__card-bg"
              :style="{ backgroundImage: 'url(' + project.bgImg + ')' }"
            />
            <div class="proj__card-bg-overlay" />
            <div class="proj__card-accent-overlay" :style="{ background: project.accent }" />

            <!-- grid content -->
            <div class="proj__card-grid">

              <!-- left: text -->
              <div class="proj__card-text" :ref="el => { if (el) cardTextRefs[i] = el }">
                <h2 class="proj__card-title">{{ project.title }}</h2>
                <div class="proj__card-tags">
                  <span v-for="tag in project.tags" :key="tag" class="proj__card-tag">{{ tag }}</span>
                </div>
                <p class="proj__card-desc">{{ project.description }}</p>
                <div class="proj__card-meta">
                  <span class="proj__card-num">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span class="proj__card-category">{{ project.categories[0] }}</span>
                </div>
              </div>

              <!-- right: image in 3D frame -->
              <div class="proj__card-img-viewport">
                <div
                  class="proj__card-img-frame"
                  :ref="el => { if (el) cardImgRefs[i] = el }"
                  :style="{ '--border-color': project.accent }"
                >
                  <img
                    :src="project.img"
                    :alt="project.title"
                    class="proj__card-img"
                  />
                </div>
              </div>

            </div>

            <!-- live preview — only for projects with a link -->
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="proj__card-explore"
            >
              <span class="proj__card-explore-text">Live Preview</span>
              <span class="proj__card-explore-arrow">↗</span>
            </a>

          </div>
        </section>
      </div>

      <!-- closing quote -->
      <div class="proj__closer" ref="closerRef">
        <div class="proj__closer-inner">
          <p class="proj__closer-quote">
            <span class="proj__closer-line" ref="closerLine1">"Creativity is intelligence</span><br />
            <span class="proj__closer-line" ref="closerLine2">having fun."</span>
          </p>
          <span class="proj__closer-attr" ref="closerAttr">— Albert Einstein</span>
          <div class="proj__closer-footer">
            <span>© 2025 Neon Brian</span>
            <span>Built with Vue · GSAP · ♥</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, onBeforeUpdate, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavBar from '@/components/shared/NavBar.vue'
import ProjectsHero from '@/components/projects/ProjectsHero.vue'

gsap.registerPlugin(ScrollTrigger)

const categories     = ['All', 'Sports Tech', 'Advertising', 'Systems', 'Hospitality']
const activeCategory = ref('All')

const allProjects = [
  {
    title: 'Salon de Belleza',
    tags: ['Vue', 'Express', 'MySQL'],
    categories: ['Hospitality'],
    img: '/images/projects/salon.png',
    bgImg: '/images/projects/salonback.jpg',
    accent: '#c26b8a',
    textColor: '#111',
    liveUrl: 'https://salon-de-belleza-omega.vercel.app/',
    description: 'Website for a salon. Covers services, pricing, and booking — clean and easy to navigate for walk-in and returning clients.',
  },
  {
    title: 'Bowlo',
    tags: ['React', 'FastAPI', 'Supabase'],
    categories: ['Sports Tech'],
    img: '/images/projects/noisy-kings.png',
    bgImg: '/images/projects/noisy-kingsback.jpg',
    accent: '#e8963a',
    textColor: '#111',
    liveUrl: 'https://bowling-app-mirror.vercel.app/',
    description: 'League management app for a local bowling club. Handles lane assignment, live scoring, and player stats. Built with React and FastAPI, deployed on Render.',
  },
  {
    title: 'KTPBA Broadcast',
    tags: ['Vue.js', 'GSAP', 'Broadcast'],
    categories: ['Sports Tech'],
    img: '/images/projects/ktpba.png',
    bgImg: '/images/projects/ktpbaback.jpg',
    accent: '#00c2d4',
    textColor: '#111',
    description: 'Broadcast overlay system for the Kenya Ten Pin Bowling Association. Handles live scoreboards, sponsor graphics, and player cards during televised events.',
  },
  {
    title: 'Mall PDA',
    tags: ['Vue', 'Express', 'Socket.IO'],
    categories: ['Advertising', 'Systems'],
    img: '/images/projects/pda.png',
    bgImg: '/images/projects/pdaback.jpg',
    accent: '#7c5cbf',
    textColor: '#111',
    description: 'Public display system running across screens in a mall. Schedules content, manages media playlists, and tracks display status in real time.',
  },
  {
    title: 'Mechanico',
    tags: ['FastAPI', 'React Admin', 'MySQL'],
    categories: ['Systems'],
    img: '/images/projects/mets.png',
    bgImg: '/images/projects/metsback.jpg',
    accent: '#c0392b',
    textColor: '#111',
    description: 'Fault tracking tool for a gaming floor. Logs machine errors as they happen, gives technicians a simple view and managers a dashboard with exportable reports.',
  },
  {
    title: 'Addico',
    tags: ['GSAP', 'Vue', 'Motion Design'],
    categories: ['Sports Tech', 'Advertising'],
    img: '/images/projects/sponsorstyle.png',
    bgImg: '/images/projects/sponsorstyleback.jpg',
    accent: '#c9a84c',
    textColor: '#111',
    description: 'Ads controller for broadcast settings. Manages sponsor animation sequences with configurable timing, built to plug into any live production setup.',
  },
  {
    title: 'Waitlist',
    tags: ['Vue', 'Express', 'MySQL'],
    categories: ['Sports Tech'],
    img: '/images/projects/waitlist.png',
    bgImg: '/images/projects/waitlistback.jpg',
    accent: '#4a8a6b',
    textColor: '#111',
    description: 'Bowling lane waitlist app. Players add themselves to a queue, track their position, and get notified when a lane is ready.',
  },
]

const filteredProjects = computed(() =>
  activeCategory.value === 'All'
    ? allProjects
    : allProjects.filter(p => p.categories.includes(activeCategory.value))
)

const navBarRef      = ref(null)
const headingRef     = ref(null)
const ruleRef        = ref(null)
const closerRef      = ref(null)
const closerLine1    = ref(null)
const closerLine2    = ref(null)
const closerAttr     = ref(null)
const cardRefs       = []
const cardBodyRefs   = []
const cardTextRefs   = []
const cardImgRefs    = []

const triggers = []

onBeforeUpdate(() => {
  cardRefs.length     = 0
  cardBodyRefs.length = 0
  cardTextRefs.length = 0
  cardImgRefs.length  = 0
})

function setCategory(cat) {
  activeCategory.value = cat
  // rebuild triggers after filter
  nextTick(() => {
    setTimeout(() => {
      setupCards()
      ScrollTrigger.refresh()
    }, 50)
  })
}

function setupCards() {
  triggers.forEach(t => t.kill())
  triggers.length = 0

  cardRefs.forEach((cardEl, i) => {
    if (!cardEl) return
    const body   = cardBodyRefs[i]
    const textEl = cardTextRefs[i]
    const imgEl  = cardImgRefs[i]
    if (!body) return

    // reset — image starts rotated LEFT
    gsap.set(body,   { scale: 1, opacity: 1, filter: 'blur(0px)' })
    gsap.set(imgEl,  { rotateX: -15, rotateY: 20, rotateZ: -8, scale: 0.9, y: 30 })
    gsap.set(textEl, { opacity: 1, y: 0 })

    // entry: rotates left → upright → final tilt as card scrolls in
    triggers.push(
      ScrollTrigger.create({
        trigger: cardEl,
        start: 'top 100%',
        end: 'top 15%',
        scrub: 1.5,
        onUpdate: self => {
          const p = self.progress
          // phase 1 (0→0.5): swing from left to upright
          // phase 2 (0.5→1): continue to final tilt right
          let rX, rY, rZ, sc, blur

          if (p < 0.5) {
            const t = p / 0.5
            rX = -15 + 15 * t      // -15 → 0
            rY =  20 - 20 * t      //  20 → 0
            rZ =  -8 + 8 * t       //  -8 → 0
            sc = 0.9 + 0.1 * t     // 0.9 → 1
            blur = 8 * (1 - t)     // blur clears as it enters
          } else {
            const t = (p - 0.5) / 0.5
            rX =  0 + 8 * t        //   0 → 8
            rY =  0 - 12 * t       //   0 → -12
            rZ =  0 + 2 * t        //   0 → 2
            sc = 1 - 0.04 * t      //   1 → 0.96
            blur = 0
          }

          gsap.set(body,  { filter: `blur(${blur}px)` })
          gsap.set(imgEl, { rotateX: rX, rotateY: rY, rotateZ: rZ, scale: sc, y: 30 * (1 - p) })
        }
      })
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardEl,
        start: 'top 120px',
        end: '+=1400',
        pin: true,
        pinSpacing: false,
        scrub: 2,
      }
    })

    // pure scale from center — border moves away from top naturally
    tl.to(body, {
      scale: 0.48,
      opacity: 0.08,
      ease: 'power2.inOut',
    }, 0)

    // image deepens tilt further during collapse
    tl.to(imgEl, {
      rotateX: 18,
      rotateY: -20,
      rotateZ: 4,
      scale: 0.88,
      y: 20,
      ease: 'power2.inOut',
    }, 0)

    // text fades out
    tl.to(textEl, {
      opacity: 0,
      y: -20,
      ease: 'power2.inOut',
    }, 0)

    triggers.push(tl.scrollTrigger)
  })
}

onMounted(() => {
  document.body.classList.add('about-active')
  navBarRef.value?.show()

  const lines = headingRef.value.querySelectorAll('.proj__heading-line')
  const top   = headingRef.value.querySelector('.proj__heading-top')
  gsap.set(top,           { opacity: 0, y: 12 })
  gsap.set(lines,         { y: '105%' })
  gsap.set(ruleRef.value, { scaleX: 0, transformOrigin: 'left' })

  // animate heading on mount — no scroll trigger needed, it's right there
  gsap.timeline({ delay: 0.3 })
    .to(top,           { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    .to(lines,         { y: '0%', duration: 0.9, stagger: 0.1, ease: 'power4.out' }, '-=0.2')
    .to(ruleRef.value, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')

  nextTick(() => {
    setupCards()

    // hide all ghost cards when closer section enters
    triggers.push(
      ScrollTrigger.create({
        trigger: closerRef.value,
        start: 'top 90%',
        onEnter: () => {
          cardBodyRefs.forEach(el => {
            if (el) gsap.set(el, { visibility: 'hidden', opacity: 0 })
          })
          cardRefs.forEach(el => {
            if (el) gsap.set(el, { zIndex: -1 })
          })
        },
        onLeaveBack: () => {
          cardBodyRefs.forEach(el => {
            if (el) gsap.set(el, { visibility: 'visible', opacity: 1 })
          })
          cardRefs.forEach(el => {
            if (el) gsap.set(el, { zIndex: '' })
          })
        }
      })
    )

    // closer quote letter animation
    const splitLetters = el => {
      const text = el.textContent
      el.innerHTML = text.split('').map(ch =>
        `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`
      ).join('')
      return el.querySelectorAll('.char')
    }

    const chars1 = splitLetters(closerLine1.value)
    const chars2 = splitLetters(closerLine2.value)
    const allChars = [...chars1, ...chars2]
    gsap.set(allChars, { opacity: 0, y: 30, rotateX: -90 })
    gsap.set(closerAttr.value, { opacity: 0, y: 10 })

    triggers.push(ScrollTrigger.create({
      trigger: closerRef.value,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(allChars, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.05, stagger: 0.022, ease: 'power3.out',
          onComplete: () => {
            gsap.to(closerAttr.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          }
        })
      }
    }))
  })
})

onUnmounted(() => {
  document.body.classList.remove('about-active')
  triggers.forEach(t => t.kill())
})
</script>

<style scoped>
.projects-page {
  background: #0a0a0f;
}

.proj__inner {
  background: #fafaf8;
  padding: 5rem 4vw 0;
}

/* heading */
.proj__heading-wrap { margin-bottom: 2rem; }

.proj__heading-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.proj__label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
}

.proj__count {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #ccc;
}

.proj__heading {
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
}

.proj__heading-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.proj__heading-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.proj__heading-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2.5rem;
}

.proj__heading-rule {
  height: 1px;
  background: #e0e0e0;
}

/* filter */
.proj__filter-wrap {
  position: sticky;
  top: 60px;
  z-index: 9000;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 1rem 0;
  background: #fafaf8;
  border-bottom: 1px solid #ebebeb;
  margin: 0 -4vw;
  padding-left: 4vw;
  padding-right: 4vw;
}

.proj__filter-btn {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #aaa;
  background: none;
  border: 1px solid #e0e0e0;
  padding: 5px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.proj__filter-btn:hover { color: #111; border-color: #111; }
.proj__filter-btn--active { color: #fff; background: #111; border-color: #111; }

/* feed */
.proj__feed {
  display: flex;
  flex-direction: column;
  gap: 15vh;
  padding-top: 4vh;
  padding-bottom: 30vh;
}

/* card wrapper — pinning container */
.proj__card-wrap {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective: 1200px;
}

/* card body */
.proj__card-body {
  position: relative;
  width: 92vw;
  height: 100%;
  background: #f0efeb;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 60px -12px rgba(0,0,0,0.15);
  transform-origin: center center;
  will-change: transform, opacity;
}

/* separate background image */
.proj__card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.35;
  z-index: 0;
  pointer-events: none;
}

.proj__card-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(240, 239, 235, 0.72);
  z-index: 1;
  pointer-events: none;
}

.proj__card-accent-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.07;
}

/* grid wrapper */
.proj__card-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  z-index: 2;
  overflow: hidden;
  isolation: isolate;
}

/* text side */
.proj__card-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.2rem;
  padding: 3.5rem 3rem 4rem;
  will-change: transform, opacity;
  position: relative;
}

.proj__card-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--text);
  margin: 0;
  line-height: 0.95;
}

.proj__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.proj__card-tag {
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text);
  border: 1.5px solid var(--text);
  padding: 4px 14px;
  border-radius: 50px;
  opacity: 0.85;
}

.proj__card-desc {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  opacity: 0.75;
  margin: 0;
  max-width: 380px;
}

.proj__card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.proj__card-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--text);
  opacity: 0.35;
}

.proj__card-category {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 2px 8px;
  border-radius: 2px;
}

/* image side — floats with space, 3D depth */
.proj__card-img-viewport {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  position: relative;
  overflow: visible;
  padding: 2.5rem;
}

/* 3D frame — this is what gets GSAP transforms applied */
.proj__card-img-frame {
  width: 100%;
  height: auto;
  max-height: 82%;
  transform-style: preserve-3d;
  will-change: transform;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
  border-radius: 12px;
  overflow: hidden;
  /* 3D layered border in accent color */
  box-shadow:
    0 0 0 1.5px var(--border-color, #999),
    6px 6px 0 0 var(--border-color, #999),
    12px 12px 0 0 var(--border-color, #999),
    0 40px 80px -12px rgba(0,0,0,0.2);
  opacity: 1;
}

.proj__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* text */
.proj__card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  will-change: transform, opacity;
  position: relative;
}

.proj__card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.proj__card-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.3);
}

.proj__card-category {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 2px 8px;
  border-radius: 2px;
}

.proj__card-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0;
  line-height: 1;
}

.proj__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.proj__card-tag {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 3px 10px;
  border-radius: 20px;
}

/* image */
.proj__card-img-viewport {
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  position: relative;
  overflow: hidden;
}

.proj__card-img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transform: rotateX(12deg) rotateY(-10deg) rotateZ(2deg) scale(0.96);
  transform-style: preserve-3d;
  will-change: transform;
  box-shadow: -8px 16px 40px rgba(0,0,0,0.15);
}

.proj__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transform: rotateX(12deg) rotateY(-10deg) rotateZ(2deg) scale(0.96);
  transform-style: preserve-3d;
  will-change: transform;
  box-shadow: -8px 16px 40px rgba(0,0,0,0.15);
}

/* explore button */
.proj__card-explore {
  position: absolute;
  right: 3rem;
  bottom: 3rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  z-index: 10;
  mix-blend-mode: difference;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.proj__card-explore:hover {
  transform: scale(1.1);
}

.proj__card-explore-text {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #000;
}

.proj__card-explore-arrow {
  font-size: 1rem;
  color: #000;
}
/* ── closer ── */
.proj__closer {
  background: #0a0a0f;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 4vw;
}

.proj__closer-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.proj__closer-quote {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-style: italic;
  font-size: clamp(3rem, 8vw, 7.5rem);
  line-height: 1;
  color: #fff;
  letter-spacing: -0.02em;
  margin: 0;
  perspective: 600px;
}

.proj__closer-line {
  display: inline-block;
}

.char {
  display: inline-block;
  will-change: transform, opacity;
}

.proj__closer-attr {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
}

.proj__closer-footer {
  display: flex;
  gap: 3rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
}
</style>