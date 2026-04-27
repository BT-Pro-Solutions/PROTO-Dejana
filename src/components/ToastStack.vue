<script setup lang="ts">
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { toastKey } from '../layout/toast'

const toast = inject(toastKey)!
const toastItems = computed(() => toast.items.value)
</script>

<template>
  <Teleport to="body">
    <div class="toast-stack" aria-live="polite">
      <TransitionGroup name="toast">
        <div v-for="t in toastItems" :key="t.id" class="toast" role="status">
          <p class="toast__msg">{{ t.message }}</p>
          <div class="toast__actions">
            <RouterLink v-if="t.action" :to="t.action.to" class="toast__link" @click="toast.dismiss(t.id)">{{
              t.action.label
            }}</RouterLink>
            <button type="button" class="toast__dismiss" aria-label="Dismiss" @click="toast.dismiss(t.id)">
              ×
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  width: min(420px, calc(100vw - 32px));
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  background: var(--color-dark-blue, #001e40);
  color: #fff;
  border-radius: 10px;
  box-shadow:
    0 12px 32px rgba(0, 20, 50, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}

.toast__msg {
  margin: 0;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.toast__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.toast__link {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
  white-space: nowrap;
}

.toast__link:hover {
  color: var(--color-newsletter-fine, #b2d0ff);
}

.toast__dismiss {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast__dismiss:hover {
  background: rgba(255, 255, 255, 0.2);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
