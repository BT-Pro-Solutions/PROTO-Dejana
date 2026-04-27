<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { media } from '../assets/media'
import {
  shopCategoryFeatured,
  shopCategoryMedia,
  shopCategoryRow2,
  shopCategoryTopRight,
} from '../data/shopCategoryPage'
</script>

<template>
  <div class="page">
    <div class="page__inner">
      <header class="page-head">
        <nav class="crumb" aria-label="Breadcrumb">
          <RouterLink to="/">HOME</RouterLink>
          <img :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
          <span class="crumb__here">SHOP BY CATEGORY</span>
        </nav>
        <h1 class="h1">Shop By Category</h1>
      </header>

      <div class="bento">
        <RouterLink :to="shopCategoryFeatured.to" class="tile tile--featured">
          <div class="tile--featured__media">
            <img
              :src="shopCategoryMedia.vanInterior"
              alt="Van interior shelving"
              class="tile--featured__img"
            />
          </div>
          <div class="tile--featured__copy">
            <p class="eyebrow">{{ shopCategoryFeatured.eyebrow }}</p>
            <h2 class="tile--featured__title">
              <span v-for="(line, i) in shopCategoryFeatured.title" :key="i">{{ line }}</span>
            </h2>
            <p class="tile--featured__desc">
              <span v-for="(line, i) in shopCategoryFeatured.lines" :key="i" class="desc-line">{{ line }}</span>
            </p>
            <span class="link-featured">
              <span>SHOP ALL</span>
              <img :src="media.icons.chevronRight" width="16" height="16" alt="" />
            </span>
          </div>
        </RouterLink>

        <RouterLink :to="shopCategoryTopRight.to" class="tile tile--snow">
          <div class="tile__media tile__media--zoom" :style="{ background: shopCategoryTopRight.imageBg }">
            <img :src="shopCategoryTopRight.image" alt="" class="tile__img tile__img--zoom" />
          </div>
          <div class="tile__body">
            <h2 class="tile__title">{{ shopCategoryTopRight.title }}</h2>
            <p class="tile__desc">
              <span v-for="(line, i) in shopCategoryTopRight.lines" :key="i" class="desc-line">{{ line }}</span>
            </p>
            <span class="link-under">SHOP ALL</span>
          </div>
        </RouterLink>

        <RouterLink
          v-for="(item, idx) in shopCategoryRow2"
          :key="item.to"
          :to="item.to"
          class="tile tile--std"
          :class="'tile--r2-' + (idx + 1)"
        >
          <div
            class="tile__media"
            :class="{ 'tile__media--blend': item.imageBlend }"
            :style="{ background: item.imageBg }"
          >
            <div v-if="item.imageBlend" class="tile__blend-bg" aria-hidden="true" />
            <img :src="item.image" :alt="item.title" class="tile__img" :class="{ 'tile__img--zoom': item.to.includes('cable') }" />
          </div>
          <div class="tile__body">
            <h2 class="tile__title">{{ item.title }}</h2>
            <p class="tile__desc">
              <span v-for="(line, i) in item.lines" :key="i" class="desc-line">{{ line }}</span>
            </p>
            <span class="link-under">SHOP ALL</span>
          </div>
        </RouterLink>
      </div>

      <section class="newsletter" aria-labelledby="newsletter-heading">
        <div class="newsletter__inner">
          <div class="newsletter__copy">
            <h2 id="newsletter-heading" class="newsletter__h">Stay ahead of the pack</h2>
            <p class="newsletter__lead">
              Join 5,000+ professionals getting exclusive first access to flash sales, new product engineering
              reveals, and technical fleet guides.
            </p>
          </div>
          <div class="newsletter__form-wrap">
            <div class="newsletter__form">
              <label class="visually-hidden" for="shop-cat-email">Your Email</label>
              <input id="shop-cat-email" class="newsletter__input" type="email" placeholder="Your Email" />
              <button type="button" class="newsletter__btn">JOIN THE LIST</button>
            </div>
            <p class="newsletter__fine">
              By subscribing, you agree to our <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.page {
  background: #fff;
  padding-bottom: 96px;
}

.page__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 48px) var(--space-page-x) 0;
  box-sizing: border-box;
}

.page-head {
  border-bottom: 1px solid rgba(195, 198, 209, 0.15);
  padding-bottom: 25px;
  margin-bottom: 0;
}

.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  line-height: 16px;
  margin-bottom: 8px;
}

.crumb a {
  color: #737780;
  text-decoration: none;
}

.crumb__here {
  color: var(--color-dark-blue);
}

.h1 {
  margin: 0;
  padding-top: 8px;
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 400;
  letter-spacing: -0.9px;
  line-height: 1.12;
  color: var(--color-dark-blue);
}

.bento {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding: 64px 0 60px;
}

@media (min-width: 1024px) {
  .bento {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: 480px auto;
    align-items: stretch;
  }

  .tile--featured {
    grid-column: 1 / span 8;
    grid-row: 1;
    min-height: 0;
    height: 100%;
  }

  .tile--snow {
    grid-column: 9 / span 4;
    grid-row: 1;
    min-height: 0;
    height: 100%;
  }

  .tile--r2-1 {
    grid-column: 1 / span 4;
    grid-row: 2;
  }

  .tile--r2-2 {
    grid-column: 5 / span 4;
    grid-row: 2;
  }

  .tile--r2-3 {
    grid-column: 9 / span 4;
    grid-row: 2;
  }
}

.tile {
  text-decoration: none;
  color: inherit;
  background: var(--color-gray-section);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s ease;
}

.tile:hover {
  background-color: #e4e9ef;
}

.tile:active {
  background-color: #dde4ec;
}

.tile--featured {
  flex-direction: column;
  min-height: 480px;
  box-shadow: 0 4px 24px -8px rgba(0, 30, 64, 0.04);
}

@media (min-width: 1024px) {
  .tile--featured {
    min-height: 0;
  }
}

@media (min-width: 768px) {
  .tile--featured {
    flex-direction: row;
    align-items: stretch;
  }
}

.tile--featured__media {
  position: relative;
  flex: 1 1 auto;
  min-height: 240px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .tile--featured__media {
    flex: 1 1 0;
    max-width: 480px;
    min-height: 0;
    align-self: stretch;
  }
}

@media (min-width: 1024px) {
  .tile--featured__media {
    min-height: 100%;
  }
}

.tile--featured__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile--featured__copy {
  flex: 0 0 auto;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
  padding: 32px 28px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
}

@media (min-width: 768px) {
  .tile--featured__copy {
    flex: 0 0 320px;
    padding: 40px;
    align-self: stretch;
  }
}

@media (min-width: 1024px) {
  .tile--featured__copy {
    min-height: 0;
  }
}

.eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  line-height: 16px;
  color: var(--color-accent);
}

.tile--featured__title {
  margin: 0 0 16px;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -1.5px;
  line-height: 37.5px;
  color: var(--color-dark-blue);
  display: flex;
  flex-direction: column;
}

.tile--featured__desc {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 22.75px;
  color: #43474f;
  display: flex;
  flex-direction: column;
}

.link-featured {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: var(--color-dark-blue);
  line-height: 20px;
}

.link-featured img {
  flex-shrink: 0;
}

.tile__media {
  position: relative;
  height: 256px;
  overflow: hidden;
  flex-shrink: 0;
}

.tile__media--zoom {
  background: var(--color-gray-section);
}

.tile__media--blend {
  background: #fff;
}

.tile__blend-bg {
  position: absolute;
  inset: 0;
  background: #fff;
  z-index: 0;
}

.tile__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.tile__img--zoom {
  height: 150%;
  top: -25%;
}

.tile__media--blend .tile__img {
  mix-blend-mode: multiply;
}

.tile__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px 32px 27px;
  padding-bottom: 32px;
}

@media (min-width: 1024px) {
  .tile--snow .tile__body {
    flex: 1 1 auto;
    min-height: 0;
  }

  .tile--snow .link-under {
    margin-top: auto;
  }
}

.tile__title {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -1.2px;
  line-height: 32px;
  color: var(--color-dark-blue);
}

.tile__desc {
  margin: 0;
  padding-bottom: 15.5px;
  font-size: 14px;
  line-height: 20px;
  color: #43474f;
  display: flex;
  flex-direction: column;
}

.desc-line {
  display: block;
}

.link-under {
  align-self: flex-start;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  line-height: 16px;
  color: var(--color-dark-blue);
  padding-bottom: 6px;
  border-bottom: 2px solid rgba(0, 30, 64, 0.2);
}

.newsletter {
  margin-top: 0;
  background: var(--color-dark-blue);
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
}

.newsletter__inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: clamp(40px, 8vw, 80px);
  max-width: 100%;
}

@media (min-width: 960px) {
  .newsletter__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
  }
}

.newsletter__copy {
  max-width: 576px;
}

.newsletter__h {
  margin: 0 0 24px;
  font-size: clamp(24px, 6vw, 36px);
  font-weight: 900;
  letter-spacing: -1.8px;
  line-height: 1.1;
  text-transform: uppercase;
}

.newsletter__lead {
  margin: 0;
  font-size: 18px;
  line-height: 29.25px;
  color: var(--color-newsletter-muted);
}

.newsletter__form-wrap {
  width: 100%;
  max-width: 476px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.newsletter__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

@media (min-width: 480px) {
  .newsletter__form {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0;
  }
}

.newsletter__input {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  max-width: none;
  padding: 22px 24px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-dark-blue);
  box-sizing: border-box;
}

.newsletter__input::placeholder {
  color: #737780;
}

@media (min-width: 480px) {
  .newsletter__input {
    flex: 1 1 200px;
    width: auto;
    max-width: 320px;
  }
}

.newsletter__btn {
  flex: 1 1 auto;
  min-width: 140px;
  padding: 21.5px 20px 22.5px;
  border: none;
  background: var(--color-accent);
  color: var(--color-accent-text);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  line-height: 20px;
  cursor: pointer;
}

.newsletter__fine {
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-newsletter-fine);
}

.newsletter__fine a {
  color: inherit;
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
</style>
