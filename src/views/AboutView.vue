<template>
  <div class="about-page">
    <NavBar ref="navBarRef" :smoother="smoother" />

    <div id="about-wrapper" ref="wrapperRef">
      <div id="about-content" ref="contentRef">

        <div class="about__inner">

          <!-- ── Display heading ── -->
          <div class="about__display-wrap" ref="displayRef">
            <div class="about__display-top">
              <span class="about__label">// about</span>
              <RouterLink to="/" class="about__back">← Home</RouterLink>
            </div>
            <h1 class="about__display">
              <span class="about__display-clip">
                <span class="about__display-line">More than</span>
              </span>
              <span class="about__display-clip">
                <span class="about__display-line about__display-line--italic">a developer.</span>
              </span>
            </h1>
            <div class="about__display-rule" ref="displayRuleRef" />
          </div>

          <!-- ── Bio ── -->
          <div class="about__bio-section" ref="bioRef">
            <div class="about__bio-heading-wrap">
              <h2 class="about__bio-heading">
                <span class="line-wrap"><span class="line">Neon Brian is a University of</span></span>
                <span class="line-wrap"><span class="line">Nairobi graduate — a programmer</span></span>
                <span class="line-wrap"><span class="line"><em>who also writes poems.</em></span></span>
              </h2>
            </div>
            <div class="about__bio-body" ref="bioBodyRef">
              <p class="about__bio-text">
                He builds broadcast systems by day and reads Camus at 1am.
                He is drawn to things that reward patience — Schopenhauer,
                the kind of novel that takes three chapters to trust you,
                a codebase that only reveals itself slowly. He holds a
                Bachelor's degree and believes, with Nietzsche, that we
                must create our own value. Everything he builds is an
                attempt at that.
              </p>
              <div class="about__tags">
                <span v-for="tag in tags" :key="tag" class="about__tag">{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- ── What I read ── -->
          <div class="about__section" ref="booksSection">
            <div class="about__section-intro" ref="booksIntroRef">
              <span class="about__section-label">// what I read</span>
              <h2 class="about__section-heading">
                <span class="about__section-clip"><span class="about__section-line">Where do I</span></span>
                <span class="about__section-clip"><span class="about__section-line about__section-line--italic">get lost?</span></span>
              </h2>
              <p class="about__section-sub">In books, of course. Neon Brian reads obsessively
              and usually at the wrong hour — fiction, philosophy, the kind of prose
              that makes you put it down and stare at the ceiling for a while.</p>
              <div class="about__section-rule" />
            </div>

            <div class="about__books-header" ref="booksLabelRef">
              <span class="about__category-label">books I've read</span>
              <div class="about__rule" />
            </div>
            <div class="about__books-track-wrap" ref="booksTrackWrap">
              <div class="about__books-track" ref="booksTrack">
                <div v-for="book in books" :key="book.title" class="about__book-card">
                  <div class="about__book-img-wrap">
                    <img :src="book.img" :alt="book.title" class="about__img" />
                  </div>
                  <p class="about__img-caption">{{ book.title }}</p>
                  <p class="about__img-sub">{{ book.author }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ── How I think ── -->
          <div class="about__section" ref="philosSection">
            <div class="about__section-intro" ref="philosIntroRef">
              <span class="about__section-label">// how I think</span>
              <h2 class="about__section-heading">
                <span class="about__section-clip"><span class="about__section-line">Studying</span></span>
                <span class="about__section-clip"><span class="about__section-line about__section-line--italic">human nature.</span></span>
              </h2>
              <p class="about__section-sub">Philosophy is not a hobby — it is a lens. Neon Brian
              studies the thinkers who asked the hardest questions about existence,
              will, and what it means to live deliberately.</p>
              <div class="about__section-rule" />
            </div>

            <div class="about__philosophers-header" ref="philosLabelRef">
              <span class="about__category-label">my philosophers</span>
              <div class="about__rule" />
            </div>

            <div class="about__philos-grid" ref="philosGridRef">
              <div v-for="p in philosophers" :key="p.name" class="about__philos-card">
                <div class="about__philos-img-wrap">
                  <img :src="p.img" :alt="p.name" class="about__img" />
                </div>
                <h3 class="about__philos-name">{{ p.name }}</h3>
                <p class="about__philos-note">{{ p.note }}</p>
                <blockquote class="about__philos-quote">"{{ p.quote }}"</blockquote>
              </div>
            </div>

            <!-- Pull quote -->
            <div class="about__quote" ref="quoteRef">
              <p class="about__quote-text">
                <span class="quote-line" ref="quoteLine1">"We must be our own</span><br />
                <span class="quote-line" ref="quoteLine2">creator of value."</span>
              </p>
              <span class="about__quote-attr" ref="quoteAttr">— Nietzsche</span>
            </div>
          </div>

          <!-- ── Beyond code ── -->
          <div class="about__section" ref="othersSection">
            <div class="about__section-intro" ref="othersIntroRef">
              <span class="about__section-label">// beyond code</span>
              <h2 class="about__section-heading">
                <span class="about__section-clip"><span class="about__section-line">Other things</span></span>
                <span class="about__section-clip"><span class="about__section-line about__section-line--italic">I do well.</span></span>
              </h2>
              <p class="about__section-sub">Neon Brian's range extends beyond the terminal.
              Numbers, records, and precision work are as natural to him as writing code.</p>
              <div class="about__section-rule" />
            </div>

            <div class="about__scroll-track-wrap" ref="othersTrackWrap">
              <div class="about__scroll-track" ref="othersTrack">
                <div v-for="item in others" :key="item.title" class="about__scroll-card">
                  <div class="about__scroll-img-wrap">
                    <img :src="item.img" :alt="item.title" class="about__img" />
                  </div>
                  <h3 class="about__scroll-title">{{ item.title }}</h3>
                  <p class="about__scroll-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Sports ── -->
          <div class="about__section" ref="sportsSection">
            <div class="about__section-intro" ref="sportsIntroRef">
              <span class="about__section-label">// the body</span>
              <h2 class="about__section-heading">
                <span class="about__section-clip"><span class="about__section-line">The mind needs</span></span>
                <span class="about__section-clip"><span class="about__section-line about__section-line--italic">a body.</span></span>
              </h2>
              <p class="about__section-sub">It is not enough to exercise only the mind.
              Neon Brian believes the body deserves the same discipline —
              that physical effort sharpens mental clarity, and rest is earned, not given.</p>
              <div class="about__section-rule" />
            </div>

            <div class="about__scroll-track-wrap" ref="sportsTrackWrap">
              <div class="about__scroll-track" ref="sportsTrack">
                <div v-for="item in sports" :key="item.title" class="about__scroll-card about__scroll-card--wide">
                  <div class="about__scroll-img-wrap about__scroll-img-wrap--wide">
                    <img :src="item.img" :alt="item.title" class="about__img" />
                  </div>
                  <h3 class="about__scroll-title">{{ item.title }}</h3>
                  <p class="about__scroll-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import NavBar from '@/components/shared/NavBar.vue'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const tags = ['programmer', 'writer', 'reader', 'philosopher', 'accountant', 'analyst']

const books = [
  { title: 'We Are Okay',              author: 'Nina LaCour',          img: '/images/about/books/we-are-okay.jpg' },
  { title: 'Everything Is Illuminated', author: 'Jonathan Safran Foer', img: '/images/about/books/everything-is-illuminated.jpg' },
  { title: 'Me Talk Pretty One Day',   author: 'David Sedaris',         img: '/images/about/books/me-talk-pretty.jpg' },
  { title: 'Sputnik Sweetheart',       author: 'Haruki Murakami',       img: '/images/about/books/sputnik-sweetheart.jpg' },
  { title: 'Norwegian Wood',           author: 'Haruki Murakami',       img: '/images/about/books/norwegian-wood.jpg' },
  { title: 'The Stranger',             author: 'Albert Camus',          img: '/images/about/books/the-stranger.jpg' },
  { title: 'Thus Spoke Zarathustra',  author: 'Friedrich Nietzsche',   img: '/images/about/books/zarathustra.jpg' },
  { title: 'The Myth of Sisyphus',    author: 'Albert Camus',          img: '/images/about/books/sisyphus.jpg' },
]

const philosophers = [
  {
    name: 'Friedrich Nietzsche',
    note: 'on value & self-creation',
    quote: 'He who has a why to live can bear almost any how.',
    img: '/images/about/philosophers/nietzsche.jpg',
  },
  {
    name: 'Albert Camus',
    note: 'on absurdity & revolt',
    quote: 'In the midst of winter, I found there was within me an invincible summer.',
    img: '/images/about/philosophers/camus.jpg',
  },
  {
    name: 'Arthur Schopenhauer',
    note: 'on will & suffering',
    quote: 'Talent hits a target no one else can hit; genius hits a target no one else can see.',
    img: '/images/about/philosophers/schopenhauer.jpg',
  },
]

const others = [
  {
    title: 'Accounting',
    desc: 'Financial records, bookkeeping, and understanding the numbers behind a business.',
    img: '/images/about/others/accounting.jpg',
  },
  {
    title: 'Data Entry',
    desc: 'Fast, accurate, and detail-oriented. Clean data is the foundation of good decisions.',
    img: '/images/about/others/data-entry.jpg',
  },
  {
    title: 'Analysis',
    desc: 'Breaking down complex information into clear, actionable insights.',
    img: '/images/about/others/analysis.jpg',
  },
  {
    title: 'Computer Repair',
    desc: 'Hardware diagnostics, software troubleshooting, and getting machines back to life.',
    img: '/images/about/others/computer-repair.jpg',
  },
  {
    title: 'IT Support',
    desc: 'Networks, systems, and the quiet work of keeping things running smoothly.',
    img: '/images/about/others/it-support.jpg',
  },
]

const sports = [
  {
    title: 'Bowling',
    desc: 'Competitive ten-pin bowling. Active member of the Noisy Kings league.',
    img: '/images/about/sports/bowling.jpg',
  },
  {
    title: 'Football',
    desc: 'The beautiful game. A lifelong follower and occasional player.',
    img: '/images/about/sports/football.jpg',
  },
  {
    title: 'Gaming',
    desc: 'FromSoftware titles — games that demand patience and punish complacency.',
    img: '/images/about/sports/gaming.jpg',
  },
]

// refs
const wrapperRef      = ref(null)
const contentRef      = ref(null)
const navBarRef       = ref(null)
const displayRef      = ref(null)
const displayRuleRef  = ref(null)
const bioRef          = ref(null)
const bioBodyRef      = ref(null)
const booksSection    = ref(null)
const booksIntroRef   = ref(null)
const booksLabelRef   = ref(null)
const booksTrackWrap  = ref(null)
const booksTrack      = ref(null)
const philosSection   = ref(null)
const philosIntroRef  = ref(null)
const philosLabelRef  = ref(null)
const philosGridRef   = ref(null)
const quoteRef        = ref(null)
const quoteLine1      = ref(null)
const quoteLine2      = ref(null)
const quoteAttr       = ref(null)
const othersSection   = ref(null)
const othersIntroRef  = ref(null)
const othersTrackWrap = ref(null)
const othersTrack     = ref(null)
const sportsSection   = ref(null)
const sportsIntroRef  = ref(null)
const sportsTrackWrap = ref(null)
const sportsTrack     = ref(null)

let smoother   = null
const triggers = []

function animSectionIntro(el) {
  const lines = el.querySelectorAll('.about__section-line')
  const label = el.querySelector('.about__section-label')
  const sub   = el.querySelector('.about__section-sub')
  const rule  = el.querySelector('.about__section-rule')

  gsap.set(label, { opacity: 0, y: 10 })
  gsap.set(lines, { y: '105%' })
  gsap.set(sub,   { opacity: 0, y: 16 })
  gsap.set(rule,  { scaleX: 0, transformOrigin: 'left' })

  triggers.push(ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
      gsap.to(lines, { y: '0%', duration: 0.9, stagger: 0.1, ease: 'power4.out', delay: 0.1 })
      gsap.to(sub,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
      gsap.to(rule,  { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 })
    }
  }))
}

function splitLetters(el) {
  const text = el.textContent
  el.innerHTML = text.split('').map(ch =>
    `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`
  ).join('')
  return el.querySelectorAll('.char')
}

onMounted(() => {
  document.body.classList.add('about-active')

  smoother = ScrollSmoother.create({
    wrapper: wrapperRef.value,
    content: contentRef.value,
    smooth: 1.5,
    effects: true,
  })

  navBarRef.value?.show()

  nextTick(() => {

    // display heading — plays on load
    const displayLines = displayRef.value.querySelectorAll('.about__display-line')
    const displayTop   = displayRef.value.querySelector('.about__display-top')
    gsap.set(displayTop,           { opacity: 0, y: 12 })
    gsap.set(displayLines,         { y: '105%' })
    gsap.set(displayRuleRef.value, { scaleX: 0, transformOrigin: 'left' })

    gsap.timeline({ delay: 0.3 })
      .to(displayTop,           { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to(displayLines,         { y: '0%', duration: 0.9, stagger: 0.1, ease: 'power4.out' }, '-=0.2')
      .to(displayRuleRef.value, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')

    // bio heading lines
    const bioLines = bioRef.value.querySelectorAll('.line')
    gsap.set(bioLines, { y: '105%' })
    triggers.push(ScrollTrigger.create({
      trigger: bioRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(bioLines, { y: '0%', duration: 0.9, stagger: 0.08, ease: 'power4.out' })
      }
    }))

    // bio body
    gsap.set(bioBodyRef.value.children, { opacity: 0, y: 20 })
    triggers.push(ScrollTrigger.create({
      trigger: bioBodyRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(bioBodyRef.value.children, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
        })
      }
    }))

    // what i read intro
    animSectionIntro(booksIntroRef.value)

    // books label
    gsap.set(booksLabelRef.value.children, { opacity: 0, y: 12 })
    triggers.push(ScrollTrigger.create({
      trigger: booksLabelRef.value,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(booksLabelRef.value.children, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out'
        })
      }
    }))

    // books horizontal pin
    const trackWidth = booksTrack.value.scrollWidth
    const viewWidth  = booksTrackWrap.value.offsetWidth
    triggers.push(
      gsap.to(booksTrack.value, {
        x: -(trackWidth - viewWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: booksSection.value,
          start: 'top top',
          end: () => `+=${trackWidth - viewWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      }).scrollTrigger
    )

    // how i think intro
    animSectionIntro(philosIntroRef.value)

    // philosophers label
    gsap.set(philosLabelRef.value.children, { opacity: 0, y: 12 })
    triggers.push(ScrollTrigger.create({
      trigger: philosLabelRef.value,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(philosLabelRef.value.children, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out'
        })
      }
    }))

    // philosophers grid
    const cards = philosGridRef.value.querySelectorAll('.about__philos-card')
    gsap.set(cards, { opacity: 0, y: 32 })
    triggers.push(ScrollTrigger.create({
      trigger: philosGridRef.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
      }
    }))

    // Nietzsche quote — letter split
    const chars1   = splitLetters(quoteLine1.value)
    const chars2   = splitLetters(quoteLine2.value)
    const allChars = [...chars1, ...chars2]
    gsap.set(allChars,        { opacity: 0, y: 40, rotateX: -90 })
    gsap.set(quoteAttr.value, { opacity: 0, y: 12 })
    triggers.push(ScrollTrigger.create({
      trigger: quoteRef.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(allChars, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.06, stagger: 0.025, ease: 'power3.out',
          onComplete: () => {
            gsap.to(quoteAttr.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          }
        })
      }
    }))

    // beyond code intro
    animSectionIntro(othersIntroRef.value)

    // others horizontal pin
    const othersTrackWidth = othersTrack.value.scrollWidth
    const othersViewWidth  = othersTrackWrap.value.offsetWidth
    triggers.push(
      gsap.to(othersTrack.value, {
        x: -(othersTrackWidth - othersViewWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: othersSection.value,
          start: 'top top',
          end: () => `+=${othersTrackWidth - othersViewWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      }).scrollTrigger
    )

    // sports intro
    animSectionIntro(sportsIntroRef.value)

    // sports horizontal pin
    const sportsTrackWidth = sportsTrack.value.scrollWidth
    const sportsViewWidth  = sportsTrackWrap.value.offsetWidth
    triggers.push(
      gsap.to(sportsTrack.value, {
        x: -(sportsTrackWidth - sportsViewWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sportsSection.value,
          start: 'top top',
          end: () => `+=${sportsTrackWidth - sportsViewWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      }).scrollTrigger
    )

  })
})

onUnmounted(() => {
  document.body.classList.remove('about-active')
  triggers.forEach(t => t.kill())
  if (smoother) smoother.kill()
})
</script>

<style scoped>
.about-page {
  background: #fafaf8;
  min-height: 100vh;
}

#about-wrapper {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

#about-content { overflow: visible; }

.about__inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 9rem 3rem 8rem;
}

/* ── display heading ── */
.about__display-wrap { margin-bottom: 5rem; }

.about__display-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.about__label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: #999;
}

.about__back {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #bbb;
  text-decoration: none;
  transition: color 0.2s;
}

.about__back:hover { color: #111; }

.about__display {
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
}

.about__display-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.about__display-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.about__display-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2.5rem;
}

.about__display-rule {
  height: 1px;
  background: #e0e0e0;
}

/* ── bio ── */
.about__bio-section { margin-bottom: 6rem; }

.about__bio-heading-wrap {
  overflow: hidden;
  margin-bottom: 2.5rem;
}

.about__bio-heading {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  line-height: 1.25;
  color: #111;
  margin: 0;
}

.about__bio-heading em { font-style: italic; color: #555; }

.line-wrap { display: block; overflow: hidden; }
.line { display: block; }

.about__bio-text {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.9;
  color: #444;
  max-width: 560px;
  margin-bottom: 2rem;
}

.about__tags { display: flex; flex-wrap: wrap; gap: 8px; }

.about__tag {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  border: 1px solid #ddd;
  padding: 4px 12px;
}

/* ── section shared ── */
.about__section { margin-bottom: 6rem; }

.about__section-intro { margin-bottom: 3rem; }

.about__section-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #999;
  display: block;
  margin-bottom: 1rem;
}

.about__section-heading {
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5rem;
}

.about__section-clip {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.about__section-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 0.95;
  color: #111;
  padding-bottom: 0.05em;
}

.about__section-line--italic {
  font-style: italic;
  color: #aaa;
  padding-left: 2rem;
}

.about__section-sub {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
  line-height: 1.85;
  color: #666;
  max-width: 520px;
  margin-bottom: 1.5rem;
}

.about__section-rule {
  height: 1px;
  background: #e0e0e0;
}

/* ── category labels ── */
.about__books-header,
.about__philosophers-header {
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

/* ── books ── */
.about__books-track-wrap { overflow: hidden; width: 100%; }

.about__books-track {
  display: flex;
  gap: 20px;
  width: max-content;
  padding-bottom: 1rem;
}

.about__book-card { width: 180px; flex-shrink: 0; }

.about__book-img-wrap {
  width: 100%;
  height: 260px;
  overflow: hidden;
  background: #eee;
  margin-bottom: 10px;
}

/* ── philosophers grid — 3 equal columns ── */
.about__philos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
}

.about__philos-card {
  display: flex;
  flex-direction: column;
}

.about__philos-img-wrap {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #eee;
  margin-bottom: 1rem;
  border-radius: 2px;
}

.about__philos-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-weight: 400;
  color: #111;
  margin-bottom: 2px;
}

.about__philos-note {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 0.75rem;
}

.about__philos-quote {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.88rem;
  line-height: 1.6;
  color: #777;
  border-left: 2px solid #e0e0e0;
  padding-left: 0.75rem;
  margin: 0;
}

/* ── Nietzsche pull quote ── */
.about__quote {
  text-align: center;
  padding: 5rem 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 0;
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

.quote-line { display: inline-block; }

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

/* ── shared horizontal scroll track (others + sports) ── */
.about__scroll-track-wrap {
  overflow: hidden;
  width: 100%;
}

.about__scroll-track {
  display: flex;
  gap: 20px;
  width: max-content;
  padding-bottom: 1rem;
}

.about__scroll-card {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.about__scroll-card--wide { width: 280px; }

.about__scroll-img-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #eee;
  margin-bottom: 0.75rem;
  border-radius: 2px;
}

.about__scroll-img-wrap--wide {
  aspect-ratio: 16 / 9;
}

.about__scroll-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-weight: 400;
  color: #111;
  margin-bottom: 0.35rem;
}

.about__scroll-desc {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 1.65;
  color: #777;
  margin: 0;
}

.about__scroll-img-wrap:hover .about__img {
  transform: scale(1.04);
}

/* ── shared image ── */
.about__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.about__book-img-wrap:hover .about__img,
.about__philos-img-wrap:hover .about__img {
  transform: scale(1.04);
}

.about__img-caption {
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.78rem;
  color: #222;
  margin-bottom: 2px;
}

.about__img-sub {
  font-family: 'DM Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.1em;
  color: #aaa;
}
</style>