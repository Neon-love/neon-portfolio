<template>
  <section class="hwords" ref="sectionRef">

    <div class="hwords__stage" ref="stageRef">

      <!-- heading — fixed within pin -->
      <div class="hwords__header" ref="headerRef">
        <div class="hwords__header-inner">
          <div class="hwords__header-top">
            <span class="hwords__header-label">// who I am</span>
            <span class="hwords__header-counter" ref="counterRef">01 / 06</span>
          </div>
          <h2 class="hwords__heading">
            <span class="hwords__heading-clip">
              <span class="hwords__heading-line">Who</span>
            </span>
            <span class="hwords__heading-clip">
              <span class="hwords__heading-line hwords__heading-line--italic">I am.</span>
            </span>
          </h2>
          <div class="hwords__header-rule" ref="ruleRef" />
        </div>
      </div>

      <!-- sliding panels -->
      <div class="hwords__panels">
        <div
          v-for="(word, i) in words"
          :key="word.label"
          class="hwords__panel"
          :ref="el => { if (el) panelEls[i] = el }"
        >
          <div class="hwords__panel-inner">
            <h3 class="hwords__label">{{ word.label }}</h3>
            <div class="hwords__marquee-wrap">
              <div class="hwords__marquee-track">
                <div
                  v-for="(tech, ti) in [...word.techs, ...word.techs, ...word.techs]"
                  :key="`${tech.name}-${ti}`"
                  class="hwords__icon-item"
                >
                  <div class="hwords__icon-wrap">
                    <template v-if="tech.icon">
                      <img
                        :src="tech.icon"
                        :alt="tech.name"
                        class="hwords__icon-img"
                        @error="e => { e.target.style.display='none'; e.target.parentElement.querySelector('.hwords__icon-placeholder').style.display='flex' }"
                      />
                      <span class="hwords__icon-placeholder" style="display:none">
                        {{ tech.short || tech.name[0] }}
                      </span>
                    </template>
                    <i
                      v-else-if="tech.bxi"
                      :class="[tech.short, 'hwords__icon-bxi']"
                    />
                    <span v-else class="hwords__icon-placeholder">
                      {{ tech.short || tech.name[0] }}
                    </span>
                  </div>
                  <span class="hwords__icon-label">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="hwords__progress">
            <div
              class="hwords__progress-fill"
              :ref="el => { if (el) progressEls[i] = el }"
            />
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

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const words = [
  {
    label: 'web developer',
    techs: [
      { name: 'Vue.js',     icon: `${DI}/vuejs/vuejs-original.svg` },
      { name: 'React',      icon: `${DI}/react/react-original.svg` },
      { name: 'Node.js',    icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: 'Flutter',    icon: `${DI}/flutter/flutter-original.svg` },
      { name: 'GSAP',       icon: 'https://cdn.simpleicons.org/greensock/000000', short: 'GS' },
      { name: 'Vite',       icon: `${DI}/vitejs/vitejs-original.svg` },
    ]
  },
  {
    label: 'programmer',
    techs: [
      { name: 'Python',     icon: `${DI}/python/python-original.svg` },
      { name: 'Go',         icon: `${DI}/go/go-original.svg` },
      { name: 'FastAPI',    icon: `${DI}/fastapi/fastapi-original.svg` },
      { name: 'Express.js', icon: `${DI}/express/express-original.svg` },
      { name: 'MySQL',      icon: `${DI}/mysql/mysql-original.svg` },
      { name: 'Docker',     icon: `${DI}/docker/docker-original.svg` },
    ]
  },
  {
    label: 'ai skills',
    techs: [
      { name: 'Claude',     icon: 'https://cdn.simpleicons.org/anthropic/000000' },
      { name: 'ChatGPT',    icon: 'https://cdn.simpleicons.org/chatgpt/000000' },
      { name: 'Gemini',     icon: 'https://cdn.simpleicons.org/googlegemini/000000' },
      { name: 'Ollama',     icon: 'https://cdn.simpleicons.org/ollama/000000' },
      { name: 'RAG',        icon: null, short: 'R' },
      { name: 'LangChain',  icon: null, short: 'LC' },
    ]
  },
  {
    label: 'web reviewer',
    techs: [
      { name: 'Lighthouse', icon: 'https://cdn.simpleicons.org/lighthouse/000000' },
      { name: 'WCAG',       icon: null, short: 'WC' },
      { name: 'Figma',      icon: `${DI}/figma/figma-original.svg` },
      { name: 'Chrome DevTools', icon: `${DI}/chrome/chrome-original.svg` },
      { name: 'SEO',        icon: null, short: 'SE' },
    ]
  },
  {
    label: 'it expert',
    techs: [
      { name: 'Linux',      icon: `${DI}/linux/linux-original.svg` },
      { name: 'AWS',        icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
      { name: 'Docker',     icon: `${DI}/docker/docker-original.svg` },
      { name: 'Git',        icon: `${DI}/git/git-original.svg` },
      { name: 'Nginx',      icon: `${DI}/nginx/nginx-original.svg` },
    ]
  },
  {
    label: 'writer',
    techs: [
      { name: 'Poetry',     icon: null, short: 'bx bxs-pen',        bxi: true },
      { name: 'Prose',      icon: null, short: 'bx bx-book-open',   bxi: true },
      { name: 'Philosophy', icon: null, short: 'bx bx-brain',       bxi: true },
      { name: 'Journals',   icon: null, short: 'bx bx-notepad',     bxi: true },
      { name: 'Stories',    icon: null, short: 'bx bxs-book',       bxi: true },
    ]
  },
]

const sectionRef  = ref(null)
const stageRef    = ref(null)
const headerRef   = ref(null)
const ruleRef     = ref(null)
const counterRef  = ref(null)
const panelEls    = []
const progressEls = []
const triggers    = []

const PER_PANEL = 700

onBeforeUpdate(() => {
  panelEls.length    = 0
  progressEls.length = 0
})

onMounted(() => {
  const count = words.length

  // heading reveal
  const lines = headerRef.value.querySelectorAll('.hwords__heading-line')
  const top   = headerRef.value.querySelector('.hwords__header-top')
  const rule  = ruleRef.value

  gsap.set(top,   { opacity: 0, y: 12 })
  gsap.set(lines, { y: '105%' })
  gsap.set(rule,  { scaleX: 0, transformOrigin: 'left' })

  triggers.push(
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(top,   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        gsap.to(lines, { y: '0%', duration: 0.9, stagger: 0.1, ease: 'power4.out', delay: 0.1 })
        gsap.to(rule,  { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 })
      }
    })
  )

  // stack panels — first visible, rest to the right
  panelEls.forEach((el, i) => {
    gsap.set(el, { x: i === 0 ? '0%' : '100%', zIndex: i + 1 })
  })

  const totalPin = count * PER_PANEL

  ScrollTrigger.create({
    trigger: stageRef.value,
    start: 'top top',
    end: `+=${totalPin}`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: 1.2,
    onUpdate: self => {
      const progress  = self.progress
      const panelProg = progress * count

      // update counter
      const current = Math.min(Math.floor(panelProg) + 1, count)
      if (counterRef.value) {
        counterRef.value.textContent =
          `${String(current).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
      }

      panelEls.forEach((el, i) => {
        if (i === 0) return
        const rel = panelProg - i
        if (rel <= 0) {
          gsap.set(el, { x: '100%' })
        } else if (rel >= 1) {
          gsap.set(el, { x: '0%' })
        } else {
          const eased = gsap.parseEase('power2.inOut')(rel)
          gsap.set(el, { x: `${(1 - eased) * 100}%` })
        }
      })

      progressEls.forEach((el, i) => {
        const rel  = panelProg - i
        const fill = Math.max(0, Math.min(1, rel))
        gsap.set(el, { scaleX: fill, transformOrigin: 'left' })
      })
    }
  })
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger === stageRef.value) t.kill()
  })
})
</script>

<style scoped>
.hwords {
  position: relative;
  z-index: 5;
  background: #fafaf8;
  padding-top: 6rem;
}

.hwords__stage {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fafaf8;
  z-index: 5;
}

/* heading */
.hwords__header {
  flex-shrink: 0;
  border-bottom: 1px solid #e8e8e8;
  background: #fafaf8;
}

.hwords__header-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 3rem 2rem;
}

.hwords__header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.hwords__header-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
}

.hwords__header-counter {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #ccc;
}

.hwords__heading {
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5rem;
}

.hwords__heading-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.hwords__heading-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.hwords__heading-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2rem;
}

.hwords__header-rule {
  height: 1px;
  background: #e0e0e0;
}

/* panels */
.hwords__panels {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.hwords__panel {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #fafaf8;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.hwords__panel-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 3rem;
}

.hwords__label {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 6vw, 5.5rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #111;
  text-align: center;
  line-height: 1;
  margin: 0;
  max-width: 90vw;
  word-break: break-word;
}

/* marquee */
.hwords__marquee-wrap {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
}

.hwords__marquee-track {
  display: flex;
  gap: 3rem;
  width: max-content;
  animation: marquee 20s linear infinite;
}

.hwords__marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

.hwords__icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.hwords__icon-wrap {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.hwords__icon-wrap:hover { opacity: 1; }

.hwords__icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hwords__icon-bxi {
  font-size: 1.6rem;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hwords__icon-placeholder {
  font-family: 'DM Mono', monospace;
  font-size: 0.95rem;
  color: #555;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hwords__icon-label {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #bbb;
}

/* progress */
.hwords__progress {
  height: 2px;
  background: #ebebeb;
  flex-shrink: 0;
}

.hwords__progress-fill {
  height: 100%;
  background: #111;
  transform: scaleX(0);
  transform-origin: left;
}
</style>