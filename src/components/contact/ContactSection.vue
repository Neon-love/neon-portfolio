<template>
  <section class="contact" id="contact">
    <div class="contact__inner">

      <div class="contact__heading-wrap" ref="headingRef">
        <span class="contact__label">// get in touch</span>
        <h2 class="contact__heading">
          <span class="contact__clip"><span class="contact__line">Let's build</span></span>
          <span class="contact__clip"><span class="contact__line contact__line--italic">something.</span></span>
        </h2>
        <div class="contact__rule" ref="ruleRef" />
      </div>

      <div class="contact__cards" ref="cardsRef">
        <a href="mailto:brianwriter92@gmail.com" class="contact__card">
          <i class="bx bx-envelope contact__icon" />
          <span class="contact__card-label">Email</span>
          <span class="contact__card-value">brianwriter92@gmail.com</span>
        </a>
        <a href="https://github.com/Neon-love" target="_blank" class="contact__card">
          <i class="bx bxl-github contact__icon" />
          <span class="contact__card-label">GitHub</span>
          <span class="contact__card-value">github.com/Neon-love</span>
        </a>
        <div class="contact__card">
          <i class="bx bx-map contact__icon" />
          <span class="contact__card-label">Location</span>
          <span class="contact__card-value">Nairobi, Kenya</span>
        </div>
      </div>

      <div class="contact__footer">
        <span>© 2025 Neon Brian</span>
        <span>Built with Vue · GSAP · ♥</span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const headingRef = ref(null)
const ruleRef    = ref(null)
const cardsRef   = ref(null)
const triggers   = []

onMounted(() => {
  const lines = headingRef.value.querySelectorAll('.contact__line')
  const label = headingRef.value.querySelector('.contact__label')
  gsap.set([label, lines, cardsRef.value], { opacity: 0, y: 30 })
  gsap.set(ruleRef.value, { scaleX: 0, transformOrigin: 'left' })

  triggers.push(ScrollTrigger.create({
    trigger: headingRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.timeline()
        .to(label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out' }, '-=0.2')
        .to(ruleRef.value, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to(cardsRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    }
  }))
})

onUnmounted(() => triggers.forEach(t => t.kill()))
</script>

<style scoped>
.contact {
  background: #fafaf8;
  padding: 8rem 4vw 5rem;
}

.contact__inner { max-width: 900px; margin: 0 auto; }

.contact__label {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
  margin-bottom: 1.5rem;
}

.contact__heading {
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
}

.contact__clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.contact__line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.contact__line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2rem;
}

.contact__rule {
  height: 1px;
  background: #e0e0e0;
  margin-bottom: 3rem;
}

.contact__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;
}

.contact__card {
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: default;
}

a.contact__card { cursor: pointer; }
a.contact__card:hover {
  border-color: #d0d0d0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.contact__icon {
  font-size: 1.5rem;
  color: #111;
  opacity: 0.6;
  margin-bottom: 0.25rem;
}

.contact__card-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
}

.contact__card-value {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: #555;
}

.contact__footer {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid #ebebeb;
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ccc;
}
</style>