import { computed, ref, watch } from 'vue'
import type { AuthUser } from '../layout/auth'
import { initialsFromDisplayName } from '../layout/auth'

const AUTH_STORAGE_KEY = 'dejana-demo-auth'

function readAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === 'object' && 'displayName' in parsed) {
      const dn = (parsed as { displayName: unknown }).displayName
      if (typeof dn === 'string' && dn.trim()) return { displayName: dn.trim() }
    }
    return null
  } catch {
    return null
  }
}

const user = ref<AuthUser | null>(readAuthUser())

watch(
  user,
  (u) => {
    try {
      if (u) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
      else localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      /* ignore */
    }
  },
  { deep: true },
)

export const authUser = user

export const isLoggedIn = computed(() => user.value !== null)

export const authInitials = computed(() =>
  user.value ? initialsFromDisplayName(user.value.displayName) : '',
)

export function login(u: AuthUser) {
  user.value = u
}

export function logout() {
  user.value = null
}
