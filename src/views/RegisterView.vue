<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { media } from '../assets/media'
import * as demoAuth from '../session/demoAuth'

const router = useRouter()

function startDemoAccount() {
  demoAuth.login({ displayName: 'Jordan Mercer' })
  router.push({ name: 'account' })
}
</script>

<template>
  <div class="auth-shell">
    <div class="auth-shell__backdrop" aria-hidden="true" />
    <div class="auth-shell__inner">
      <RouterLink to="/" class="auth-shell__back"><span aria-hidden="true">←</span> Back to store</RouterLink>
      <div class="auth-card">
        <img :src="media.headerLogo" alt="Dejana Truck & Utility Equipment" width="160" height="42" />
        <h1 class="auth-card__title">Create an account</h1>
        <p class="auth-card__text">This demo skips real registration. Open the sample account dashboard or return to sign in.</p>
        <button type="button" class="auth-card__cta" @click="startDemoAccount">View demo account</button>
        <RouterLink class="auth-card__secondary" to="/login">Back to sign in</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 5vw, 48px);
  position: relative;
  background: var(--color-dark-blue, #001e40);
  color: #fff;
}
.auth-shell__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 55% at 50% -20%, rgba(15, 83, 149, 0.45), transparent 55%),
    linear-gradient(165deg, #000f24 0%, var(--color-dark-blue, #001e40) 100%);
  pointer-events: none;
}
.auth-shell__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.auth-shell__back {
  align-self: flex-start;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  font-weight: 500;
}
.auth-shell__back:hover {
  color: #fff;
}
.auth-card {
  background: #fff;
  color: var(--color-text, #1b1c1c);
  border-radius: var(--radius-lg, 6px);
  padding: clamp(28px, 5vw, 40px);
  box-shadow: 0 24px 48px -12px rgba(0, 14, 36, 0.35);
  border: 1px solid rgba(0, 30, 64, 0.06);
  text-align: center;
}
.auth-card__title {
  margin: 20px 0 12px;
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-dark-blue, #001e40);
}
.auth-card__text {
  margin: 0 0 24px;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--color-text-muted, #43474f);
}
.auth-card__cta {
  display: block;
  width: 100%;
  padding: 12px 24px;
  font-weight: 700;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  color: var(--cta-yellow-text, #1b1c1c);
  background: var(--cta-yellow, #f4b400);
  text-decoration: none;
  border: none;
  border-radius: var(--radius-md, 4px);
}
.auth-card__cta:hover {
  background: var(--cta-yellow-hover, #e0a300);
}
.auth-card__secondary {
  display: block;
  margin-top: 16px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-link, #003366);
  text-decoration: none;
}
.auth-card__secondary:hover {
  text-decoration: underline;
}
</style>
