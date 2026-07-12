<template>
  <section class="about" ref="aboutRef">
    <div class="about__inner">

      <span class="about__label" ref="labelRef">about</span>

      <!-- Bio -->
      <div class="about__bio-wrap">

        <div class="about__heading-wrap" ref="headingRef">
          <h2 class="about__heading">
            <span class="line-wrap"><span class="line">I'm Neon Brian. I write code</span></span>
            <span class="line-wrap"><span class="line">and I write poems, and I've</span></span>
            <span class="line-wrap"><span class="line"><em>never been sure which one</em></span></span>
            <span class="line-wrap"><span class="line">I take more seriously.</span></span>
          </h2>
        </div>

        <div class="about__bio-wrap-inner" ref="bioRef">
          <p class="about__bio">
            I'm based in Nairobi — building broadcast systems by day,
            reading Murakami and Camus by night. I'm drawn to things
            that reward patience: FromSoftware games, Schopenhauer,
            the kind of novel that takes three chapters to trust you.
            I believe, with Nietzsche, that we must create our own value.
            Everything I build is an attempt at that.
          </p>
          <div class="about__tags">
            <span v-for="tag in tags" :key="tag" class="about__tag">{{ tag }}</span>
          </div>
        </div>

      </div>

      <!-- Books — horizontal scroll pinned -->
      <div class="about__category" ref="booksCategoryRef">
        <div class="about__category-header" ref="booksLabelRef">
          <span class="about__category-label">books</span>
          <div class="about__rule" />
        </div>
        <div class="about__books-track-wrap" ref="booksTrackWrap">
          <div class="about__books-track" ref="booksTrack">
            <div v-for="book in books" :key="book.title" class="about__book-card">
              <div class="about__img-wrap">
                <img :src="book.img" :alt="book.title" class="about__img" />
              </div>
              <p class="about__img-caption">{{ book.title }}</p>
              <p class="about__img-sub">{{ book.author }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Philosophers -->
      <div class="about__category" ref="philosRef">
        <div class="about__category-header">
          <span class="about__category-label">philosophers</span>
          <div class="about__rule" />
        </div>
        <div class="about__grid-asymmetric">
          <div class="about__grid-item">
            <div class="about__img-wrap about__img-wrap--big">
              <img :src="philosophers[0].img" :alt="philosophers[0].name" class="about__img" />
            </div>
            <p class="about__img-caption">{{ philosophers[0].name }}</p>
            <p class="about__img-sub">{{ philosophers[0].note }}</p>
          </div>
          <div class="about__grid-asymmetric-right">
            <div v-for="p in philosophers.slice(1)" :key="p.name" class="about__grid-item">
              <div class="about__img-wrap about__img-wrap--small">
                <img :src="p.img" :alt="p.name" class="about__img" />
              </div>
              <p class="about__img-caption">{{ p.name }}</p>
              <p class="about__img-sub">{{ p.note }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pull quote — letter split -->
      <div class="about__quote" ref="quoteRef">
        <p class="about__quote-text">
          <span class="quote-line" ref="quoteLine1">"We must be our own</span><br />
          <span class="quote-line" ref="quoteLine2">creator of value."</span>
        </p>
        <span class="about__quote-attr" ref="quoteAttr">— Nietzsche</span>
      </div>

      <!-- Games -->
      <div class="about__category" ref="gamesRef">
        <div class="about__category-header">
          <span class="about__category-label">games</span>
          <div class="about__rule" />
        </div>
        <div class="about__scroll-wrap">
          <div class="about__grid-scroll">
            <div v-for="game in games" :key="game.title" class="about__grid-item about__grid-item--scroll">
              <div class="about__img-wrap about__img-wrap--tall">
                <img :src="game.img" :alt="game.title" class="about__img" />
              </div>
              <p class="about__img-caption">{{ game.title }}</p>
              <p class="about__img-sub">{{ game.studio }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const books = [
  { title: 'We Are Okay', author: 'Nina LaCour', img: '/images/about/books/we-are-okay.jpg' },
  { title: 'Everything Is Illuminated', author: 'Jonathan Safran Foer', img: '/images/about/books/everything-is-illuminated.jpg' },
  { title: 'Me Talk Pretty One Day', author: 'David Sedaris', img: '/images/about/books/me-talk-pretty.jpg' },
  { title: 'Sputnik Sweetheart', author: 'Haruki Murakami', img: '/images/about/books/sputnik-sweetheart.jpg' },
  { title: 'Norwegian Wood', author: 'Haruki Murakami', img: '/images/about/books/norwegian-wood.jpg' },
  { title: 'The Stranger', author: 'Albert Camus', img: '/images/about/books/the-stranger.jpg' },
  { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', img: '/images/about/books/zarathustra.jpg' },
  { title: 'The Myth of Sisyphus', author: 'Albert Camus', img: '/images/about/books/sisyphus.jpg' },
]

const philosophers = [
  { name: 'Friedrich Nietzsche', note: 'on value & self-creation', img: '/images/about/philosophers/nietzsche.jpg' },
  { name: 'Albert Camus', note: 'on absurdity & revolt', img: '/images/about/philosophers/camus.jpg' },
  { name: 'Arthur Schopenhauer', note: 'on will & suffering', img: '/images/about/philosophers/schopenhauer.jpg' },
]

const games = [
  { title: 'Elden Ring', studio: 'FromSoftware', img: '/images/about/games/elden-ring.jpg' },
  { title: 'Dark Souls III', studio: 'FromSoftware', img: '/images/about/games/dark-souls.jpg' },
  { title: 'Sekiro', studio: 'FromSoftware', img: '/images/about/games/sekiro.jpg' },
  { title: 'Bloodborne', studio: 'FromSoftware', img: '/images/about/games/bloodborne.jpg' },
  { title: 'Armored Core VI', studio: 'FromSoftware', img: '/images/about/games/armored-core.jpg' },
]

const tags = ['writer', 'programmer', 'reader', 'philosopher', 'gamer']

const aboutRef        = ref(null)
const labelRef        = ref(null)
const headingRef      = ref(null)
const bioRef          = ref(null)
const booksCategoryRef = ref(null)
const booksLabelRef   = ref(null)
const booksTrackWrap  = ref(null)
const booksTrack      = ref(null)
const philosRef       = ref(null)
const quoteRef        = ref(null)
const quoteLine1      = ref(null)
const quoteLine2      = ref(null)
const quoteAttr       = ref(null)
const gamesRef        = ref(null)

const triggers = []

// ── split text into letter spans ──
function splitLetters(el) {
  const text = el.textContent
  el.innerHTML = text
    .split('')
    .map(ch => `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`)
    .join('')
  return el.querySelectorAll('.char')
}

onMounted(() => {
  nextTick(() => {

    // ── 1. Label slide up ──
    gsap.set(labelRef.value, { opacity: 0, y: 20 })
    triggers.push(ScrollTrigger.create({
      trigger: labelRef.value,
      start: 'top 90%',
      onEnter: () => gsap.to(labelRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }))

    // ── 2. Heading — lines slide up from clip ──
    const lines = headingRef.value.querySelectorAll('.line')
    gsap.set(lines, { y: '105%' })
    triggers.push(ScrollTrigger.create({
      trigger: headingRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(lines, {
          y: '0%',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power4.out'
        })
      }
    }))

    // ── 3. Bio paragraph + tags slide up ──
    gsap.set(bioRef.value.children, { opacity: 0, y: 24 })
    triggers.push(ScrollTrigger.create({
      trigger: bioRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(bioRef.value.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        })
      }
    }))

    // ── 4. Books category label ──
    gsap.set(booksLabelRef.value.children, { opacity: 0, y: 16 })
    triggers.push(ScrollTrigger.create({
      trigger: booksLabelRef.value,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(booksLabelRef.value.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        })
      }
    }))

    // ── 5. Books horizontal scroll — pin + scrub ──
    const trackWidth = booksTrack.value.scrollWidth
    const viewWidth  = booksTrackWrap.value.offsetWidth

    triggers.push(
      gsap.to(booksTrack.value, {
        x: -(trackWidth - viewWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: booksCategoryRef.value,
          start: 'top top',
          end: () => `+=${trackWidth - viewWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      }).scrollTrigger
    )

    // ── 6. Philosophers grid ──
    const philosItems = philosRef.value.querySelectorAll('.about__grid-item')
    gsap.set(philosItems, { opacity: 0, y: 32 })
    triggers.push(ScrollTrigger.create({
      trigger: philosRef.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(philosItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        })
      }
    }))

    // ── 7. Nietzsche quote — letter split ──
    const chars1 = splitLetters(quoteLine1.value)
    const chars2 = splitLetters(quoteLine2.value)
    const allChars = [...chars1, ...chars2]

    gsap.set(allChars, { opacity: 0, y: 40, rotateX: -90 })
    gsap.set(quoteAttr.value, { opacity: 0, y: 12 })

    triggers.push(ScrollTrigger.create({
      trigger: quoteRef.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(allChars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.06,
          stagger: 0.025,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(quoteAttr.value, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out'
            })
          }
        })
      }
    }))

    // ── 8. Games horizontal scroll strip ──
    const gameItems = gamesRef.value.querySelectorAll('.about__grid-item--scroll')
    gsap.set(gameItems, { opacity: 0, x: 40 })
    triggers.push(ScrollTrigger.create({
      trigger: gamesRef.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(gameItems, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    }))

  })
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<style scoped>
.about {
  position: relative;
  z-index: 5;
  background: #fafaf8;
  overflow: hidden;
}

.about__inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 8rem 3rem;
}

.about__label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #999;
  display: block;
  margin-bottom: 3rem;
}

/* ── heading clip wrap ── */
.about__bio-wrap {
  margin-bottom: 6rem;
}

.about__heading-wrap {
  margin-bottom: 2rem;
  overflow: hidden;
}

.about__heading {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  line-height: 1.25;
  color: #111;
  margin: 0;
}

.about__heading em {
  font-style: italic;
  color: #555;
}

.line-wrap {
  display: block;
  overflow: hidden;
}

.line {
  display: block;
}

.about__bio-wrap-inner {}

.about__bio {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.9;
  color: #444;
  max-width: 560px;
  margin-bottom: 2rem;
}

.about__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.about__tag {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  border: 1px solid #ddd;
  padding: 4px 12px;
}

/* ── categories ── */
.about__category {
  margin-bottom: 5rem;
}

.about__category-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
}

.about__category-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  white-space: nowrap;
  flex-shrink: 0;
}

.about__rule {
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}

/* ── books horizontal track ── */
.about__books-track-wrap {
  overflow: hidden;
  width: 100%;
}

.about__books-track {
  display: flex;
  gap: 20px;
  width: max-content;
  padding-bottom: 1rem;
}

.about__book-card {
  width: 180px;
  flex-shrink: 0;
}

.about__book-card .about__img-wrap {
  height: 260px;
}

/* ── philosophers ── */
.about__grid-asymmetric {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;
}

.about__grid-asymmetric-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── games ── */
.about__scroll-wrap {
  overflow-x: auto;
  padding-bottom: 12px;
}

.about__scroll-wrap::-webkit-scrollbar { height: 1px; }
.about__scroll-wrap::-webkit-scrollbar-thumb { background: #ddd; }

.about__grid-scroll {
  display: flex;
  gap: 16px;
  width: max-content;
}

.about__grid-item--scroll {
  width: 200px;
  flex-shrink: 0;
}

/* ── shared image styles ── */
.about__img-wrap {
  overflow: hidden;
  background: #eee;
  margin-bottom: 10px;
}

.about__img-wrap--big   { height: 340px; }
.about__img-wrap--small { height: 162px; }
.about__img-wrap--tall  { height: 260px; }

.about__grid-item .about__img-wrap { height: 220px; }

.about__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.about__img-wrap:hover .about__img {
  transform: scale(1.04);
}

.about__img-caption {
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.8rem;
  color: #222;
  margin-bottom: 2px;
}

.about__img-sub {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: #aaa;
}

/* ── quote ── */
.about__quote {
  text-align: center;
  padding: 5rem 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 5rem;
  perspective: 600px;
}

.about__quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-style: italic;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.3;
  color: #111;
  margin-bottom: 1.5rem;
}

.quote-line {
  display: inline-block;
}

.char {
  display: inline-block;
  transform-origin: bottom center;
}

.about__quote-attr {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.25em;
  color: #aaa;
  text-transform: uppercase;
  display: block;
}
</style>