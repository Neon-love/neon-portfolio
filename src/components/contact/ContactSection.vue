<template>
  <section class="contact" id="contact" ref="sectionRef">
    <div class="contact__inner">

      <!-- heading -->
      <div class="contact__heading-wrap" ref="headingRef">
        <div class="contact__heading-top">
          <span class="contact__label">// get in touch</span>
        </div>
        <h2 class="contact__heading">
          <span class="contact__heading-clip">
            <span class="contact__heading-line">Let's build</span>
          </span>
          <span class="contact__heading-clip">
            <span class="contact__heading-line contact__heading-line--italic">something.</span>
          </span>
        </h2>
        <div class="contact__heading-rule" ref="ruleRef" />
      </div>

      <!-- main grid: cards only -->
      <div class="contact__cards" ref="cardsRef">
        <div
          v-for="card in cards"
          :key="card.title"
          class="contact__card"
        >
          <div class="contact__card-icon">
            <i :class="card.icon" />
          </div>
          <h3 class="contact__card-title">{{ card.title }}</h3>
          <div class="contact__card-content">
            <a
              v-if="card.href"
              :href="card.href"
              class="contact__card-link"
              :target="card.external ? '_blank' : undefined"
              rel="noopener"
            >{{ card.value }}</a>
            <span v-else class="contact__card-value">{{ card.value }}</span>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="contact__footer" ref="footerRef">
        <span class="contact__footer-copy">© 2025 Neon Brian</span>
        <span class="contact__footer-stack">Built with Vue · GSAP · ♥</span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const cards = [
  { icon: 'bx bx-map',     title: 'Location', value: 'Nairobi, Kenya',       href: null },
  { icon: 'bx bx-envelope',title: 'Email',    value: 'brianwriter92@gmail.com',  href: 'mailto:brianwriter92@gmail.com', external: false },
  { icon: 'bx bx-phone',   title: 'Phone',    value: '+254 701 55 7046',     href: 'tel:+254701557046', external: false },
  { icon: 'bx bxl-github', title: 'GitHub',   value: 'github.com/Neon-love',   href: 'https://github.com/Neon-love', external: true },
]

const sectionRef = ref(null)
const headingRef = ref(null)
const ruleRef    = ref(null)
const cardsRef   = ref(null)
const footerRef  = ref(null)
const triggers   = []

onMounted(() => {
  const lines   = headingRef.value.querySelectorAll('.contact__heading-line')
  const top     = headingRef.value.querySelector('.contact__heading-top')
  const cardEls = cardsRef.value.querySelectorAll('.contact__card')

  gsap.set(top,   { opacity: 0, y: 12 })
  gsap.set(lines, { y: '105%' })
  gsap.set(ruleRef.value, { scaleX: 0, transformOrigin: 'left' })
  gsap.set(cardEls, { opacity: 0, y: 20 })
  gsap.set(footerRef.value, { opacity: 1 })

  triggers.push(
    ScrollTrigger.create({
      trigger: headingRef.value,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(top,   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        gsap.to(lines, { y: '0%', duration: 0.9, stagger: 0.1, ease: 'power4.out', delay: 0.1 })
        gsap.to(ruleRef.value, { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      }
    })
  )

  triggers.push(
    ScrollTrigger.create({
      trigger: cardsRef.value,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(cardEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
      }
    })
  )
})

onUnmounted(() => { triggers.forEach(t => t.kill()) })
</script>


<style scoped>
.contact {
  position: relative;
  z-index: 5;
  background: #fafaf8;
  padding: 8rem 0 4rem;
}

.contact__inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* heading */
.contact__heading-wrap { margin-bottom: 4rem; }

.contact__heading-top { margin-bottom: 1.5rem; }

.contact__label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
}

.contact__heading {
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
}

.contact__heading-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.contact__heading-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.contact__heading-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2.5rem;
}

.contact__heading-rule {
  height: 1px;
  background: #e0e0e0;
}

/* cards — full width 4 columns */
.contact__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 5rem;
}

.contact__card {
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  padding: 1.5rem 1.2rem;
  text-align: center;
  transition: box-shadow 0.3s, border-color 0.3s;
  cursor: default;
}

.contact__card:hover {
  border-color: #d0d0d0;
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
}

.contact__card-icon {
  font-size: 1.6rem;
  color: #111;
  margin-bottom: 0.6rem;
  opacity: 0.7;
}

.contact__card-title {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.contact__card-content {
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.78rem;
  color: #555;
  line-height: 1.5;
}

.contact__card-link {
  color: #555;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1px;
  transition: color 0.2s, border-color 0.2s;
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.78rem;
  word-break: break-all;
}

.contact__card-link:hover {
  color: #111;
  border-color: #111;
}

.contact__card-value {
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.78rem;
}

/* footer */
.contact__footer {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid #ebebeb;
}

.contact__footer-copy,
.contact__footer-stack {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ccc;
}
</style>