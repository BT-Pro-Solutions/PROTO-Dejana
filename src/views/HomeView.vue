<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ProductHorizontalStrip from '../components/ProductHorizontalStrip.vue'
import { media } from '../assets/media'
import { homeBestSellers } from '../data/site'

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
    <section class="hero">
      <div class="hero__bg" aria-hidden="true">
        <img class="hero__photo" :src="media.pages.homeHeroBg" alt="" />
        <div class="hero__gradient" />
        <div class="hero__blend" :style="{ backgroundImage: `url(${media.pages.homeHeroBlend})` }" />
      </div>
      <div class="hero__content">
        <div class="hero__inner">
          <p class="hero__eyebrow">NOW SHIPPING</p>
          <h1 class="hero__title">Snow & Ice Equipment</h1>
          <p class="hero__sub">
            Engineered for the pros who can't afford downtime.<br />
            Professional upfits, durable hardware, and immediate<br />
            inventory for your fleet.
          </p>
          <RouterLink to="/search" class="hero__btn">
            Browse All Inventory
            <img :src="media.icons.btnArrow" width="16" height="16" alt="" />
          </RouterLink>
        </div>
      </div>
      <div class="hero__scroll" aria-hidden="true">
        <img :src="media.icons.heroChevrons" width="120" height="20" alt="" />
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
          <span class="heritage__reg" aria-hidden="true">®</span>
          <span class="heritage__means">means quality</span>
        </div>
        <p class="heritage__copy">
          Since Pete Dejana’s humble start in 1957, Dejana has been dedicated to providing the highest level of
          quality to its customers.
        </p>
        <RouterLink to="/shop" class="heritage__btn">
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
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: clip;
  color: #fff;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #001e40 0%, rgba(0, 30, 64, 0.55) 45%, rgba(0, 30, 64, 0) 100%);
}

.hero__blend {
  position: absolute;
  inset: 0;
  mix-blend-mode: lighten;
  background-size: cover;
  background-position: top left;
  opacity: 0.9;
}

.hero__content {
  position: relative;
  width: 100%;
  max-width: var(--layout-max-width);
  padding: 48px clamp(24px, 5vw, 60px);
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
  gap: 8px;
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  background: linear-gradient(167deg, rgb(6, 50, 100) 0%, rgb(20, 86, 152) 100%);
}

.hero__btn img {
  filter: brightness(10);
}

.hero__scroll {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.85;
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
  padding: 0 30px;
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
  .service__bg-deco {
    display: none;
  }

  .service__visual {
    display: none;
  }

  .service {
    justify-content: center;
  }

  .service__panel {
    max-width: none;
    width: 100%;
  }
}

.service__panel {
  flex: 1 1 320px;
  max-width: 601px;
  background: #fff;
  border-radius: clamp(36px, 4vw, 48px);
  padding: 50px;
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
</style>
