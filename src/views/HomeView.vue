<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import MonthlyGiveawayPopup from '../components/MonthlyGiveawayPopup.vue'
import ProductHorizontalStrip from '../components/ProductHorizontalStrip.vue'
import { media } from '../assets/media'
import { homeBestSellers } from '../data/site'

type HeroSlide = {
  id: string
  image: string
  /** Snow splash graphic — only the snow slide uses this; anchored to bottom of hero */
  snowBlend?: string
  eyebrow: string
  title: string
  sub: string
  cta: { label: string; to: string }
}

const heroSlides: HeroSlide[] = [
  {
    id: 'snow',
    image: media.pages.homeHeroBg,
    snowBlend: media.pages.homeHeroBlend,
    eyebrow: 'NOW SHIPPING',
    title: 'Snow & Ice Equipment',
    sub:
      "Engineered for the pros who can't afford downtime. Professional upfits, durable hardware, and immediate inventory for your fleet.",
    cta: { label: 'Browse All Inventory', to: '/search' },
  },
  {
    id: 'gearboxes',
    image: media.pages.categoryGearbox,
    eyebrow: 'INDUSTRIAL POWER',
    title: 'Gearboxes & Motors',
    sub: 'Durable gearboxes and high-performance motors for demanding fleet and industrial applications.',
    cta: { label: 'Shop gearboxes', to: '/category/gearboxes' },
  },
  {
    id: 'lighting',
    image: media.pages.categoryLightingRect,
    eyebrow: 'FLEET VISIBILITY',
    title: 'Lighting & Electrical',
    sub: 'See and be seen with state-of-the-art lighting and electrical hardware built for work trucks.',
    cta: { label: 'Shop lighting', to: '/category/lighting' },
  },
]

const HERO_ROTATE_MS = 7000

const activeIndex = ref(0)
const currentSlide = computed(() => heroSlides[activeIndex.value]!)

let rotateTimer: ReturnType<typeof setInterval> | undefined

function clearRotate() {
  if (rotateTimer !== undefined) {
    window.clearInterval(rotateTimer)
    rotateTimer = undefined
  }
}

function startRotate() {
  clearRotate()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  rotateTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % heroSlides.length
  }, HERO_ROTATE_MS)
}

function goToSlide(i: number) {
  const n = heroSlides.length
  activeIndex.value = ((i % n) + n) % n
  startRotate()
}

onMounted(() => {
  startRotate()
})

onUnmounted(() => {
  clearRotate()
})

const categories = [
  {
    to: '/category/snow-ice',
    title: 'Snow & Ice Removal',
    lines: ['Commercial-grade plows, salt spreaders, and', 'de-icing accessories for fleet vehicles.'],
    image: media.pages.categorySnowPlow,
    imageClass: 'cat__img--cover',
  },
  {
    to: '/category/gearboxes',
    title: 'Gearboxes & Motors',
    lines: ['Durable gearboxes and high-performance motors for industrial applications.'],
    image: media.pages.categoryGearbox,
    imageClass: 'cat__img--blend',
  },
  {
    to: '/category/lighting',
    title: 'Lighting',
    lines: ['See and be seen with state of the art lighting equipment.'],
    image: media.pages.categoryLightingRect,
    imageClass: 'cat__img--cover',
  },
]
</script>

<template>
  <div class="home">
    <MonthlyGiveawayPopup />
    <section
      class="hero"
      aria-roledescription="carousel"
      :aria-label="`Featured stories, slide ${activeIndex + 1} of ${heroSlides.length}`"
    >
      <div class="hero__slides" aria-hidden="true">
        <div
          v-for="(slide, i) in heroSlides"
          :key="slide.id"
          class="hero__slide"
          :class="{ 'hero__slide--active': i === activeIndex }"
        >
          <div class="hero__slide-photo-wrap">
            <img class="hero__slide-photo" :src="slide.image" alt="" />
          </div>
          <div class="hero__slide-gradient" />
          <div class="hero__slide-vignette" aria-hidden="true" />
          <div
            v-if="slide.snowBlend"
            class="hero__slide-snow"
            :style="{ backgroundImage: `url(${slide.snowBlend})` }"
          />
        </div>
      </div>

      <div class="hero__content">
        <Transition name="hero-txt" mode="out-in">
          <div :key="currentSlide.id" class="hero__inner">
            <p class="hero__eyebrow">{{ currentSlide.eyebrow }}</p>
            <h1 class="hero__title">{{ currentSlide.title }}</h1>
            <p class="hero__sub">{{ currentSlide.sub }}</p>
            <RouterLink :to="currentSlide.cta.to" class="hero__btn">
              {{ currentSlide.cta.label }}
              <svg
                class="hero__btn-arrow"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h12M10 2l6 5-6 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RouterLink>
          </div>
        </Transition>
      </div>

      <div class="hero__dots" role="tablist" aria-label="Choose hero slide">
        <button
          v-for="(slide, i) in heroSlides"
          :key="'dot-' + slide.id"
          type="button"
          role="tab"
          class="hero__dot"
          :class="{ 'hero__dot--active': i === activeIndex }"
          :aria-selected="i === activeIndex"
          :tabindex="i === activeIndex ? 0 : -1"
          :aria-label="`Show slide ${i + 1}: ${slide.title}`"
          @click="goToSlide(i)"
        />
      </div>
    </section>

    <section class="section section--categories">
      <div class="section__head">
        <div>
          <h2 class="section__h2">Shop by Category</h2>
          <p class="section__sub">Precision components for every industrial application.</p>
        </div>
        <RouterLink to="/shop" class="section__viewall">
          View All
          <img :src="media.icons.chevronRight" width="8" height="12" alt="" />
        </RouterLink>
      </div>
      <div class="cat-grid">
        <article v-for="c in categories" :key="c.to" class="cat">
          <RouterLink :to="c.to" class="cat__visual">
            <img :src="c.image" :alt="c.title" :class="['cat__img', c.imageClass]" />
          </RouterLink>
          <div class="cat__body">
            <h3 class="cat__title">{{ c.title }}</h3>
            <p class="cat__desc">
              <span v-for="(line, i) in c.lines" :key="i">{{ line }}<br v-if="i < c.lines.length - 1" /></span>
            </p>
            <RouterLink :to="c.to" class="cat__shop">SHOP ALL</RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section class="section section--service">
      <div class="service">
        <div class="service__visual">
          <div class="service__bubble-outlines" aria-hidden="true">
            <svg class="service__bubble service__bubble--sm" viewBox="0 0 88 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                class="service__bubble-stroke"
                d="M22 14h44a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10H36l-16 14 4-14h-2a10 10 0 0 1-10-10V24a10 10 0 0 1 10-10Z"
              />
            </svg>
            <svg class="service__bubble service__bubble--lg" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                class="service__bubble-stroke"
                d="M48 28h124a18 18 0 0 1 18 18v68a18 18 0 0 1-18 18h-58l-36 32 8-32h-38a18 18 0 0 1-18-18V46a18 18 0 0 1 18-18Z"
              />
            </svg>
          </div>
          <div class="service__photo-card">
            <div class="service__photo-wrap">
              <img
                class="service__photo"
                :src="media.pages.customerServiceRep"
                alt="Dejana customer service representative"
              />
            </div>
          </div>
        </div>
        <div class="service__panel">
          <p class="service__eyebrow">100% US BASED</p>
          <h2 class="service__h2">Customer Service Excellence</h2>
          <p class="service__text">
            Just a call away, our sales team is here to help guide you to the right product for every
            application.
          </p>
          <div class="service__actions">
            <a class="service__pill" href="#">
              <img class="service__env-icon" :src="media.icons.envelope" width="22" height="22" alt="" />
              Send a Message
            </a>
            <a class="service__pill" href="tel:+18773352621">
              <img :src="media.icons.solarPhoneBold" width="24" height="24" alt="" />
              (877) 335-2621
            </a>
          </div>
        </div>
      </div>
    </section>

    <ProductHorizontalStrip
      title="Best Sellers"
      subtitle="Top rated products loved by fleet specialists."
      :products="homeBestSellers"
    />

    <section class="heritage">
      <div class="heritage__bg" aria-hidden="true">
        <div class="heritage__media">
          <img :src="media.pages.heritagePhoto" alt="" />
          <div class="heritage__fade" />
        </div>
      </div>
      <div class="heritage__content">
        <p class="heritage__eyebrow">FOR OVER 45 YEARS</p>
        <div class="heritage__brand">
          <img
            class="heritage__logo"
            :src="media.icons.dejanaWordmarkBlue"
            width="234"
            height="60"
            alt="Dejana"
          />
          <span class="heritage__means">means quality</span>
        </div>
        <p class="heritage__copy">
          Since Pete Dejana’s humble start in 1957, Dejana has been dedicated to providing the highest level of
          quality to its customers.
        </p>
        <RouterLink to="/about-us" class="heritage__btn">
          Read The Full Story
          <svg class="heritage__btn-arrow" width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path
              d="M1 6h13M11 2l5 4-5 4"
              stroke="currentColor"
              stroke-width="1.35"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  background: #fff;
}

.hero {
  position: relative;
  min-height: clamp(440px, 85vh, 700px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: clip;
  color: #fff;
}

@media (min-width: 900px) {
  .hero {
    min-height: 700px;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: 500px;
  }
}

.hero__slides {
  position: absolute;
  inset: 0;
}

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.65s ease;
  pointer-events: none;
}

.hero__slide--active {
  opacity: 1;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .hero__slide {
    transition: opacity 0.04s ease;
  }
}

/** Centered photo band — letterbox sides use brand blue; max width limits stretch on ultrawide */
.hero__slide-photo-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background: var(--color-dark-blue);
}

.hero__slide-photo {
  width: 100%;
  max-width: 1440px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
}

/* Edge feather only when photo is letterboxed (visible side bands) */
@media (min-width: 1441px) {
  .hero__slide-photo {
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent 0,
      #000 clamp(56px, 8vw, 160px),
      #000 calc(100% - clamp(56px, 8vw, 160px)),
      transparent 100%
    );
    mask-image: linear-gradient(
      90deg,
      transparent 0,
      #000 clamp(56px, 8vw, 160px),
      #000 calc(100% - clamp(56px, 8vw, 160px)),
      transparent 100%
    );
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
  }
}

.hero__slide-gradient {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(90deg, #001e40 0%, rgba(0, 30, 64, 0.55) 45%, rgba(0, 30, 64, 0) 100%);
}

/** Wide viewports: edge bands go fully to navy (opaque near edges, long fade inward) */
.hero__slide-vignette {
  display: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image:
    linear-gradient(
      to right,
      #001e40 0%,
      #001e40 min(5%, 72px),
      rgba(0, 30, 64, 0.92) 12%,
      rgba(0, 30, 64, 0.55) 22%,
      rgba(0, 30, 64, 0.18) 34%,
      transparent 46%
    ),
    linear-gradient(
      to left,
      #001e40 0%,
      #001e40 min(5%, 72px),
      rgba(0, 30, 64, 0.92) 12%,
      rgba(0, 30, 64, 0.55) 22%,
      rgba(0, 30, 64, 0.18) 34%,
      transparent 46%
    );
}

/* When photo hits max-width, side bands appear — reinforce edge falloff to navy */
@media (min-width: 1441px) {
  .hero__slide-vignette {
    display: block;
  }
}

/** Snow splash: tile horizontally at natural scale (no upscale), anchored to bottom */
.hero__slide-snow {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: clamp(160px, 42vh, 480px);
  background-repeat: repeat-x;
  background-position: center bottom;
  background-size: auto 100%;
  mix-blend-mode: lighten;
  pointer-events: none;
  z-index: 3;
}

.hero__content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--layout-max-width);
  padding: clamp(72px, 12vw, 120px) var(--space-page-x) calc(64px + clamp(40px, 8vw, 56px));
}

.hero__dots {
  position: absolute;
  left: 50%;
  bottom: max(20px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(228, 231, 236, 0.96);
  box-shadow: 0 1px 4px rgba(0, 30, 64, 0.08);
}

.hero__dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: #9aa5b5;
  cursor: pointer;
  transition:
    width 0.25s ease,
    background 0.2s ease,
    opacity 0.2s ease;
}

.hero__dot:hover {
  background: #7c8a9e;
}

.hero__dot--active {
  width: 28px;
  background: var(--color-light-blue);
  opacity: 1;
}

.hero__dot:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 2px;
}

.hero-txt-enter-active,
.hero-txt-leave-active {
  transition: opacity 0.35s ease;
}

.hero-txt-enter-from,
.hero-txt-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hero-txt-enter-active,
  .hero-txt-leave-active {
    transition: opacity 0.05s ease;
  }
}

.hero__inner {
  max-width: 672px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero__eyebrow {
  margin: 0;
  align-self: flex-start;
  padding: 4px 12px;
  background: var(--color-accent);
  border-radius: var(--radius-sm);
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.hero__title {
  margin: 0;
  font-size: clamp(40px, 8vw, 60px);
  font-weight: 400;
  letter-spacing: -3px;
  line-height: 1.15;
}

.hero__sub {
  margin: 0;
  max-width: 576px;
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 1.4;
  color: #a7c8ff;
}

.hero__btn {
  margin-top: 16px;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  background: linear-gradient(167deg, rgb(6, 50, 100) 0%, rgb(20, 86, 152) 100%);
}

.hero__btn-arrow {
  flex-shrink: 0;
  display: block;
  margin-top: 1px;
  opacity: 0.95;
}

.section {
  padding: clamp(40px, 8vw, 60px) clamp(20px, 5vw, 60px);
}

.section--categories {
  background: #fff;
}

.section__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  max-width: var(--layout-max-width);
  margin: 0 auto 48px;
}

.section__h2 {
  margin: 0 0 8px;
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 800;
  letter-spacing: -1.8px;
  color: var(--color-dark-blue);
}

.section__h2--center {
  text-align: center;
}

.section__sub {
  margin: 0;
  font-size: 16px;
  color: #737780;
}

.section__sub--center {
  text-align: center;
  max-width: 400px;
  margin: 0 auto 40px;
}

.section__viewall {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-dark-blue);
  text-decoration: none;
  font-size: 16px;
}

.cat-grid {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 900px) {
  .cat-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

.cat {
  background: var(--color-gray-section);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cat__visual {
  display: block;
  height: 256px;
  overflow: hidden;
  background: #fff;
}

.cat__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cat__img--blend {
  mix-blend-mode: multiply;
}

.cat__body {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.cat__title {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -1.2px;
  color: var(--color-dark-blue);
}

.cat__desc {
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.cat__shop {
  align-self: flex-start;
  margin-top: auto;
  padding-bottom: 6px;
  border-bottom: 2px solid rgba(0, 30, 64, 0.2);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-decoration: none;
  color: var(--color-dark-blue);
}

.section--service {
  position: relative;
  padding: 0;
  overflow: hidden;
  background: var(--color-dark-blue);
}

.service__bg-deco {
  position: absolute;
  top: -12%;
  right: -18%;
  width: min(72vw, 640px);
  max-height: 85%;
  aspect-ratio: 1;
  color: rgba(142, 192, 255, 0.22);
  pointer-events: none;
  z-index: 0;
}

.service__mega-env {
  display: block;
  width: 100%;
  height: 100%;
}

.service {
  position: relative;
  z-index: 1;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: clamp(24px, 4vw, 48px);
  padding: 0 var(--space-page-x);
  max-height: 1400px;
}

.service__visual {
  position: relative;
  flex: 0 1 420px;
  width: 100%;
  max-width: 460px;
}

.service__bubble-outlines {
  position: absolute;
  inset: -6% -14% -4% -18%;
  z-index: 0;
  pointer-events: none;
}

.service__bubble {
  position: absolute;
  display: block;
  overflow: visible;
}

.service__bubble-stroke {
  fill: none;
  stroke: rgba(220, 236, 255, 0.42);
  stroke-width: 1.35;
  stroke-linejoin: round;
  stroke-linecap: round;
}

/* Small bubble: far left of the figure */
.service__bubble--sm {
  width: 68px;
  height: auto;
  aspect-ratio: 88 / 72;
  top: 20%;
  left: -4%;
  transform: rotate(-11deg);
}

/* Large bubble: behind head, extending toward section center */
.service__bubble--lg {
  width: min(48%, 220px);
  height: auto;
  aspect-ratio: 220 / 180;
  top: 4%;
  right: -8%;
  transform: rotate(14deg);
}

.service__photo-card {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.service__photo-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  max-height: min(500px, 68vh);
  border-radius: 18px;
  overflow: hidden;
}

.service__photo {
  width: auto;
  height: 150%;
  object-fit: cover;
  object-position: top 20%;
  display: block;
}

.service__env-icon {
  flex-shrink: 0;
  display: block;
}

@media (max-width: 767px) {
  .hero__slide-gradient {
  background: linear-gradient(120deg, rgba(0, 19, 40, 0.9) 0%, rgba(0, 30, 64, .7) 100%);
}

  .service__bg-deco {
    display: none;
  }

  .service__visual {
    display: none;
  }

  .service {
    justify-content: center;
    padding: 0;
  }

  .service__panel {
    max-width: none;
    width: 100%;
    border-radius: 0!important;
    border-top: 2px solid var(--color-border);
  }
}

.service__panel {
  flex: 1 1 320px;
  max-width: 601px;
  background: #fff;
  border-radius: clamp(36px, 4vw, 48px);
  padding: clamp(28px, 7vw, 50px);
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}

.service__eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  letter-spacing: 3.6px;
  text-transform: uppercase;
  color: var(--color-accent);
}

.service__h2 {
  margin: 0 0 16px;
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -1.2px;
  color: var(--color-dark-blue);
  line-height: 1.2;
}

.service__text {
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.service__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.service__pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 30px;
  border-radius: 48px;
  background: #f0f4f8;
  color: var(--color-dark-blue);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

.heritage {
  position: relative;
  padding: clamp(48px, 10vw, 120px) clamp(20px, 5vw, 40px);
  overflow: hidden;
}

.heritage__bg {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  background: #fff;
}

.heritage__media {
  position: relative;
  width: 100%;
  max-width: var(--layout-max-width);
  height: 100%;
}

.heritage__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) saturate(0);
}

.heritage__fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    #fff 0%,
    rgba(255, 255, 255, 0) 78%,
    #fff 100%
  );
}

.heritage__content {
  position: relative;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.heritage__eyebrow {
  margin: 0;
  padding: 9px 14px 7px;
  background: var(--color-accent);
  color: var(--color-accent-text);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
}

.heritage__brand {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 2px 10px;
}

.heritage__logo {
  display: block;
  width: clamp(180px, 42vw, 234px);
  height: auto;
  max-height: clamp(46px, 10vw, 60px);
}

.heritage__reg {
  font-family: 'Times New Roman', serif;
  font-size: clamp(18px, 3.5vw, 24px);
  line-height: 1;
  color: var(--color-light-blue);
  margin-bottom: 0.35em;
}

.heritage__means {
  font-size: clamp(28px, 6vw, 44px);
  color: #141414;
  letter-spacing: -0.5px;
  padding-bottom: 8px;
}

.heritage__copy {
  margin: 0;
  max-width: 563px;
  font-size: 16px;
  line-height: 1.5;
  color: #353535;
  font-weight: 500;
}

.heritage__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  background: linear-gradient(167deg, rgb(6, 50, 100) 0%, rgb(20, 86, 152) 100%);
}

.heritage__btn-arrow {
  flex-shrink: 0;
  opacity: 0.95;
}

@media (max-width: 767px) {
  .heritage__fade {
    background: linear-gradient( 45deg, #fff 50%, rgba(255, 255, 255, 0) );
  }
}
</style>
