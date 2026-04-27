<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { media } from '../assets/media'
import * as demoAuth from '../session/demoAuth'

const router = useRouter()
const email = ref('')
const password = ref('')

function displayNameFromEmail(raw: string) {
  const local = raw.trim().split('@')[0] ?? ''
  if (!local) return 'Jordan Mercer'
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

function demoSignIn(displayName: string) {
  demoAuth.login({ displayName })
  router.push({ name: 'account' })
}

function goAccount() {
  demoSignIn(displayNameFromEmail(email.value))
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__backdrop" aria-hidden="true" />
    <div class="login-page__inner">
      <RouterLink to="/" class="login-page__back">
        <span aria-hidden="true">←</span> Back to store
      </RouterLink>

      <div class="login-card">
        <div class="login-card__brand">
          <img :src="media.headerLogo" alt="Dejana Truck & Utility Equipment" width="160" height="42" />
        </div>
        <h1 class="login-card__title">Sign in</h1>
        <p class="login-card__subtitle">Welcome back. Use your account or sign in with a provider.</p>

        <div class="login-card__social" role="group" aria-label="Sign in with a social account">
          <button type="button" class="login-card__social-btn" @click="demoSignIn('Jordan Mercer')">
            <svg class="login-card__social-icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.172.282-1.712V4.956H.957C.348 6.175 0 7.55 0 9s.348 2.825.957 4.044l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.956L3.964 7.288C4.672 5.163 6.656 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>
          <button type="button" class="login-card__social-btn" @click="demoSignIn('Jordan Mercer')">
            <svg class="login-card__social-icon" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <rect x="1" y="1" width="8" height="8" fill="#f25022" rx="0.5" />
              <rect x="1" y="11" width="8" height="8" fill="#00a4ef" rx="0.5" />
              <rect x="11" y="1" width="8" height="8" fill="#7fba00" rx="0.5" />
              <rect x="11" y="11" width="8" height="8" fill="#ffb900" rx="0.5" />
            </svg>
            Continue with Microsoft
          </button>
          <button type="button" class="login-card__social-btn" @click="demoSignIn('Jordan Mercer')">
            <svg
              class="login-card__social-icon login-card__social-icon--apple"
              width="16"
              height="20"
              viewBox="0 0 814 1000"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.3 40.8-165.9 40.8s-105.6-57-155.5-127C46.6 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.9 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-195-304.3c43.2 42 92.6 120.6 92.6 222 0 6.9-.6 15.7-2.1 22.9-65.4-2.6-127.7-42.9-169.4-96.2-47.4-61.6-71.4-139.8-71.4-206 0-11.7 1.2-21.6 3.3-31.1 3.4.1 7.1.2 10.6.2 61 0 117.6 25.4 157 91.2z"
              />
            </svg>
            Continue with Apple
          </button>
        </div>

        <p class="login-card__divider">
          <span>or with email</span>
        </p>

        <form class="login-card__form" @submit.prevent="goAccount">
          <label class="login-card__field">
            <span class="login-card__label">Email</span>
            <input
              v-model="email"
              type="email"
              name="email"
              autocomplete="username"
              class="login-card__input"
              placeholder="you@company.com"
            />
          </label>
          <label class="login-card__field">
            <span class="login-card__label">Password</span>
            <input
              v-model="password"
              type="password"
              name="password"
              autocomplete="current-password"
              class="login-card__input"
              placeholder="••••••••"
            />
          </label>

          <div class="login-card__row">
            <RouterLink class="login-card__text-link" :to="{ name: 'forgot-password' }">Forgot password?</RouterLink>
          </div>

          <button type="submit" class="login-card__submit">Sign in</button>
        </form>

        <p class="login-card__footer">
          New to Dejana?
          <RouterLink class="login-card__text-link login-card__text-link--strong" :to="{ name: 'register' }"
            >Create an account</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 5vw, 48px);
  position: relative;
  background: var(--color-dark-blue, #001e40);
  color: #fff;
}

.login-page__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 55% at 50% -20%, rgba(15, 83, 149, 0.45), transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 51, 102, 0.5), transparent 50%),
    linear-gradient(165deg, #000f24 0%, var(--color-dark-blue, #001e40) 45%, #00152e 100%);
  pointer-events: none;
}

.login-page__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
}

.login-page__back {
  align-self: flex-start;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.15s ease;
}

.login-page__back:hover {
  color: #fff;
}

.login-card {
  background: #fff;
  color: var(--color-text, #1b1c1c);
  border-radius: var(--radius-lg, 6px);
  padding: clamp(28px, 5vw, 40px);
  box-shadow:
    0 1px 2px rgba(0, 30, 64, 0.06),
    0 24px 48px -12px rgba(0, 14, 36, 0.35);
  border: 1px solid rgba(0, 30, 64, 0.06);
}

.login-card__brand {
  margin-bottom: 20px;
}

.login-card__brand img {
  display: block;
  height: auto;
  max-width: 100%;
}

.login-card__title {
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-dark-blue, #001e40);
}

.login-card__subtitle {
  margin: 0 0 24px;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-muted, #43474f);
}

.login-card__social {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-card__social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text, #1b1c1c);
  text-decoration: none;
  background: #fff;
  border: 1px solid rgba(0, 30, 64, 0.12);
  border-radius: var(--radius-md, 4px);
  cursor: pointer;
  font-family: inherit;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.login-card__social-btn:hover {
  border-color: rgba(0, 30, 64, 0.22);
  background: var(--color-surface-muted, #f6f3f2);
}

.login-card__social-icon {
  flex-shrink: 0;
}

.login-card__social-icon--apple {
  color: #1b1c1c;
}

.login-card__divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 22px 0 20px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-soft, #6d6d6d);
}

.login-card__divider::before,
.login-card__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(0, 30, 64, 0.1);
}

.login-card__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-card__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.login-card__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text, #1b1c1c);
}

.login-card__input {
  width: 100%;
  padding: 12px 14px;
  font-size: 1rem;
  border: 1px solid rgba(0, 30, 64, 0.15);
  border-radius: var(--radius-md, 4px);
  background: #fff;
  color: var(--color-text, #1b1c1c);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.login-card__input::placeholder {
  color: var(--color-input-placeholder, #6b7280);
}

.login-card__input:hover {
  border-color: rgba(0, 30, 64, 0.22);
}

.login-card__input:focus {
  outline: none;
  border-color: var(--color-light-blue, #0f5395);
  box-shadow: 0 0 0 3px rgba(15, 83, 149, 0.15);
}

.login-card__row {
  display: flex;
  justify-content: flex-end;
  margin-top: -4px;
}

.login-card__text-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-link, #003366);
  text-decoration: none;
}

.login-card__text-link:hover {
  text-decoration: underline;
}

.login-card__text-link--strong {
  margin-left: 4px;
}

.login-card__submit {
  margin-top: 4px;
  width: 100%;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--cta-yellow-text, #1b1c1c);
  background: var(--cta-yellow, #f4b400);
  border: none;
  border-radius: var(--radius-md, 4px);
  cursor: pointer;
  transition: background 0.15s ease;
}

.login-card__submit:hover {
  background: var(--cta-yellow-hover, #e0a300);
}

.login-card__footer {
  margin: 24px 0 0;
  padding-top: 22px;
  border-top: 1px solid rgba(0, 30, 64, 0.08);
  font-size: 0.9375rem;
  text-align: center;
  color: var(--color-text-muted, #43474f);
}
</style>
