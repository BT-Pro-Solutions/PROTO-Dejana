import type { InjectionKey, Ref } from 'vue'

export type AuthUser = {
  displayName: string
}

export type AuthApi = {
  user: Ref<AuthUser | null>
  isLoggedIn: Ref<boolean>
  initials: Ref<string>
  login: (user: AuthUser) => void
  logout: () => void
}

export const authKey: InjectionKey<AuthApi> = Symbol('auth')

export function initialsFromDisplayName(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  const a = parts[0]![0]!
  const b = parts[parts.length - 1]![0]!
  return (a + b).toUpperCase()
}
