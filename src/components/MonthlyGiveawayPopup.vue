<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { media } from '../assets/media'

/** Demo: shown only from HomeView; no persistence — reopens on each visit. */
const SHOW_DELAY_MS = 700

const open = ref(false)
const email = ref('')
const submitted = ref(false)
const emailInputRef = ref<HTMLInputElement | null>(null)

let showTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  showTimer = window.setTimeout(() => {
    open.value = true
  }, SHOW_DELAY_MS)
})

onUnmounted(() => {
  if (showTimer !== undefined) window.clearTimeout(showTimer)
})

watch(open, (isOpen) => {
  if (isOpen && !submitted.value) {
    nextTick(() => emailInputRef.value?.focus())
  }
})

function close() {
  open.value = false
}

function onSubmit(e: Event) {
  e.preventDefault()
  const addr = email.value.trim()
  if (!addr) return
  submitted.value = true
}

function onBackdropClick() {
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="giveaway-fade">
      <div
        v-if="open"
        class="giveaway"
        @keydown.escape.prevent="close"
      >
        <div
          class="giveaway__backdrop"
          aria-hidden="true"
          @click="onBackdropClick"
        />
        <div
          class="giveaway__sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="giveaway-title"
          @click.stop
        >
          <button type="button" class="giveaway__close" aria-label="Close giveaway dialog" @click="close">
            <span aria-hidden="true">×</span>
          </button>

          <div class="giveaway__layout">
            <div class="giveaway__visual">
              <img
                class="giveaway__img"
                :src="media.productHero"
                width="560"
                height="420"
                alt="Commercial snow plow attachment"
              />
            </div>

            <div class="giveaway__body">
              <p class="giveaway__eyebrow">Monthly giveaway</p>
              <h2 id="giveaway-title" class="giveaway__title">Win a free snow plow</h2>

              <template v-if="!submitted">
                <p class="giveaway__lede">
                  Enter your email this month for a chance to win a professional-grade plow for your fleet. One winner
                  selected at random; no purchase necessary.
                </p>

                <form class="giveaway__form" @submit="onSubmit">
                  <label class="giveaway__label" for="giveaway-email">Email address</label>
                  <input
                    id="giveaway-email"
                    ref="emailInputRef"
                    v-model="email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    required
                    class="giveaway__input"
                    placeholder="you@company.com"
                  />
                  <button type="submit" class="giveaway__submit">Enter to win</button>
                </form>

                <p class="giveaway__legal">
                  By entering, you agree that Dejana Truck &amp; Utility Equipment may contact you at this email for
                  marketing, promotions, and product updates. You can unsubscribe anytime. This demo does not store or
                  transmit your email.
                </p>
              </template>

              <template v-else>
                <p class="giveaway__thanks">
                  Thanks — you’re on the list for this month’s drawing. We’ll reach out if you win.
                </p>
                <button type="button" class="giveaway__submit giveaway__submit--secondary" @click="close">
                  Continue shopping
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.giveaway {
  position: fixed;
  inset: 0;
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-page-x);
}

.giveaway__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 30, 64, 0.55);
  backdrop-filter: blur(3px);
}

.giveaway__sheet {
  position: relative;
  width: min(920px, 100%);
  max-height: min(90vh, 640px);
  overflow: auto;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow:
    0 24px 48px rgba(0, 17, 40, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.06) inset;
}

.giveaway__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.giveaway__close:hover,
.giveaway__close:focus-visible {
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.giveaway__layout {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  min-height: 320px;
}

@media (max-width: 720px) {
  .giveaway__layout {
    grid-template-columns: 1fr;
  }
}

.giveaway__visual {
  background: linear-gradient(165deg, #e8eef6 0%, #d4dce8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 28px);
}

.giveaway__img {
  width: 100%;
  max-width: 380px;
  height: auto;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.giveaway__body {
  padding: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px) clamp(28px, 4vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.giveaway__eyebrow {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-light-blue);
}

.giveaway__title {
  margin: 0;
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-dark-blue);
}

.giveaway__lede {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.giveaway__form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.giveaway__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.giveaway__input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-family: inherit;
  background: var(--color-surface);
  color: var(--color-text);
}

.giveaway__input::placeholder {
  color: var(--color-input-placeholder);
}

.giveaway__input:focus {
  outline: none;
  border-color: var(--color-light-blue);
  box-shadow: 0 0 0 3px rgba(15, 83, 149, 0.2);
}

.giveaway__submit {
  margin-top: 8px;
  align-self: flex-start;
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  color: var(--cta-yellow-text);
  background: var(--cta-yellow);
}

.giveaway__submit:hover,
.giveaway__submit:focus-visible {
  background: var(--cta-yellow-hover);
}

.giveaway__submit--secondary {
  background: linear-gradient(167deg, rgb(6, 50, 100) 0%, rgb(20, 86, 152) 100%);
  color: #fff;
}

.giveaway__submit--secondary:hover,
.giveaway__submit--secondary:focus-visible {
  filter: brightness(1.06);
}

.giveaway__legal {
  margin: 8px 0 0;
  font-size: 11px;
  line-height: 1.5;
  color: var(--color-caption);
}

.giveaway__thanks {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.giveaway-fade-enter-active,
.giveaway-fade-leave-active {
  transition: opacity 0.28s ease;
}

.giveaway-fade-enter-active .giveaway__sheet,
.giveaway-fade-leave-active .giveaway__sheet {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.giveaway-fade-enter-from,
.giveaway-fade-leave-to {
  opacity: 0;
}

.giveaway-fade-enter-from .giveaway__sheet,
.giveaway-fade-leave-to .giveaway__sheet {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
