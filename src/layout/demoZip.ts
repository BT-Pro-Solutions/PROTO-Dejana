import { ref, watch } from 'vue'
import { LOCAL_PICKUP_LOCATION } from '../data/localPickup'

export const REFERENCE_ZIP_STORAGE_KEY = 'dejana-demo-reference-zip'

/** Default when nothing is stored and no checkout address ZIP is available (matches PDP / Kings Park demo). */
export const DEFAULT_REFERENCE_ZIP = LOCAL_PICKUP_LOCATION.zip

function readStored(): string {
  try {
    const v = localStorage.getItem(REFERENCE_ZIP_STORAGE_KEY)
    return v ? String(v).trim().slice(0, 12) : ''
  } catch {
    return ''
  }
}

export const storedReferenceZip = ref<string>(readStored())

watch(storedReferenceZip, (z) => {
  try {
    const t = z.trim()
    if (t) localStorage.setItem(REFERENCE_ZIP_STORAGE_KEY, t)
    else localStorage.removeItem(REFERENCE_ZIP_STORAGE_KEY)
  } catch {
    /* ignore quota */
  }
})

export const zipModalOpen = ref(false)

export function openZipCodeModal() {
  zipModalOpen.value = true
}

export function closeZipCodeModal() {
  zipModalOpen.value = false
}
