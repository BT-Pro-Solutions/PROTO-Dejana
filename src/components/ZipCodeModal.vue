<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  closeZipCodeModal,
  DEFAULT_REFERENCE_ZIP,
  storedReferenceZip,
  zipModalOpen,
} from '../layout/demoZip'

const draft = ref('')

watch(zipModalOpen, (open) => {
  if (open) {
    const s = storedReferenceZip.value.trim()
    draft.value = s || DEFAULT_REFERENCE_ZIP
  }
})

function save() {
  storedReferenceZip.value = draft.value.trim().slice(0, 12)
  closeZipCodeModal()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeZipCodeModal()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="zipModalOpen"
      class="zip-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="zip-modal-title"
      @keydown="onKeydown"
    >
      <div class="zip-modal-backdrop" @click="closeZipCodeModal" />
      <div class="zip-modal-sheet">
        <h2 id="zip-modal-title" class="zip-modal-title">ZIP code</h2>
        <p class="zip-modal-lead">We use this to show the nearest pickup location and shipping estimates.</p>
        <label class="zip-modal-field">
          <span class="zip-modal-label">ZIP or postal code</span>
          <input
            v-model="draft"
            type="text"
            inputmode="text"
            autocomplete="postal-code"
            class="zip-modal-input"
            @keydown.enter.prevent="save"
          />
        </label>
        <div class="zip-modal-actions">
          <button type="button" class="zip-modal-btn zip-modal-btn--ghost" @click="closeZipCodeModal">Cancel</button>
          <button type="button" class="zip-modal-btn zip-modal-btn--primary" @click="save">Save</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.zip-modal-root {
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.zip-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 20, 50, 0.45);
}

.zip-modal-sheet {
  position: relative;
  z-index: 1;
  width: min(420px, 100%);
  padding: 24px 24px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 20, 50, 0.25);
}

.zip-modal-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.zip-modal-lead {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.zip-modal-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.zip-modal-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.zip-modal-input {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #d1d7e0;
  border-radius: 8px;
  font: inherit;
  font-size: 16px;
}

.zip-modal-input:focus {
  outline: none;
  border-color: var(--color-light-blue);
}

.zip-modal-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.zip-modal-btn {
  padding: 10px 18px;
  border-radius: 8px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: none;
}

.zip-modal-btn--ghost {
  background: transparent;
  color: var(--color-dark-blue);
}

.zip-modal-btn--ghost:hover {
  background: var(--color-gray-section);
}

.zip-modal-btn--primary {
  background: var(--color-light-blue);
  color: #fff;
}

.zip-modal-btn--primary:hover {
  filter: brightness(1.05);
}
</style>
