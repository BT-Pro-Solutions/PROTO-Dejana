<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { media } from '../assets/media'
</script>

<template>
  <div class="nf">
    <div class="nf__band" aria-hidden="true" />
    <div class="nf__shell">
      <p class="nf__watermark" aria-hidden="true">404</p>
      <div class="nf__card">
        <RouterLink to="/" class="nf__logo-link" aria-label="Dejana — home">
          <img
            class="nf__logo"
            :src="media.headerLogo"
            alt="Dejana Truck & Utility Equipment"
            width="140"
            height="36"
          />
        </RouterLink>
        <p class="nf__eyebrow">Page not found</p>
        <h1 class="nf__h1">We couldn’t find that page</h1>
        <p class="nf__lead">
          The URL may be mistyped, the link may be outdated, or this page may have moved. Head back to the store or open
          search from the header.
        </p>
        <div class="nf__actions">
          <RouterLink to="/" class="nf__btn nf__btn--primary">Back to home</RouterLink>
          <RouterLink to="/shop" class="nf__btn nf__btn--secondary">Shop by category</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nf {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(40px, 8vw, 80px) var(--space-page-x) clamp(56px, 10vw, 96px);
  min-height: min(72vh, 720px);
  background: var(--color-page-bg);
  overflow: hidden;
}

.nf__band {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--color-dark-blue) 0%, var(--color-light-blue) 50%, var(--color-dark-blue) 100%);
}

.nf__shell {
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

.nf__watermark {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: clamp(7rem, 28vw, 14rem);
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.85;
  color: rgba(0, 30, 64, 0.055);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}

.nf__card {
  position: relative;
  z-index: 1;
  padding: clamp(32px, 6vw, 44px) clamp(24px, 5vw, 40px);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  box-shadow:
    0 24px 48px rgba(0, 30, 64, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.8) inset;
  text-align: center;
}

.nf__logo-link {
  display: block;
  margin: 0 auto 28px;
  width: fit-content;
}

.nf__logo-link:hover {
  opacity: 0.88;
}

.nf__logo {
  display: block;
  height: auto;
  max-height: 34px;
  width: auto;
}

.nf__eyebrow {
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.nf__h1 {
  margin: 0 0 16px;
  font-size: clamp(1.5rem, 4vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--color-dark-blue);
}

.nf__lead {
  margin: 0 0 28px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.nf__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.nf__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.nf__btn--primary {
  background: linear-gradient(167deg, rgb(6, 50, 100) 0%, rgb(20, 86, 152) 100%);
  color: #fff;
  border: none;
}

.nf__btn--primary:hover {
  filter: brightness(1.05);
}

.nf__btn--secondary {
  background: #fff;
  color: var(--color-dark-blue);
  border: 2px solid rgba(0, 30, 64, 0.2);
}

.nf__btn--secondary:hover {
  border-color: var(--color-light-blue);
  background: var(--color-gray-section);
}
</style>
