<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { media } from '../assets/media'
import { headerShopCategoryLinks } from '../data/shopCategoryPage'
import { authKey } from '../layout/auth'
import { miniCartKey } from '../layout/miniCart'
import { searchModalKey } from '../layout/searchModal'

defineProps<{
  activeNav: string
  contactLabel: string
  /** Cart badge count (prototype shows 0 on shop pages). */
  cartCount?: number
  /** Saved favorites count for header badge. */
  favoritesCount?: number
}>()

const search = inject(searchModalKey, null)
const miniCart = inject(miniCartKey, null)
const auth = inject(authKey, null)
const router = useRouter()
const route = useRoute()

const mobileNavOpen = ref(false)

/** Injected auth is a plain object; nested refs must use .value (template does not unwrap them). */
const accountLoggedIn = computed(() => !!auth && auth.isLoggedIn.value)
const accountInitials = computed(() => (auth ? auth.initials.value : ''))

const cartDrawerOpen = computed(() => (miniCart ? miniCart.isOpen.value : false))

const accountMenuOpen = ref(false)
const accountMenuRef = ref<HTMLElement | null>(null)

function closeAccountMenu() {
  accountMenuOpen.value = false
}

function toggleAccountMenu() {
  accountMenuOpen.value = !accountMenuOpen.value
}

function onDocumentClick(e: MouseEvent) {
  const el = accountMenuRef.value
  if (!el || !accountMenuOpen.value) return
  if (e.target instanceof Node && !el.contains(e.target)) closeAccountMenu()
}

function closeMobileNav() {
  mobileNavOpen.value = false
}

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}

watch(mobileNavOpen, (open) => {
  if (open) {
    accountMenuOpen.value = false
    document.documentElement.style.overflow = 'hidden'
  } else if (!miniCart?.isOpen.value) {
    document.documentElement.style.overflow = ''
  }
})

watch(
  () => route.fullPath,
  () => {
    mobileNavOpen.value = false
  },
)

function onEscapeNav(e: KeyboardEvent) {
  if (e.key !== 'Escape' || !mobileNavOpen.value) return
  e.preventDefault()
  closeMobileNav()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onEscapeNav, true)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onEscapeNav, true)
  if (!miniCart?.isOpen.value) {
    document.documentElement.style.overflow = ''
  }
})

function onLogout() {
  auth?.logout()
  closeAccountMenu()
  void router.push({ name: 'home' })
}
</script>

<template>
  <header class="header">
    <div class="header__shell header__shell--top">
      <div class="header__top">
        <button
          type="button"
          class="header__nav-toggle"
          aria-label="Menu"
          :aria-expanded="mobileNavOpen"
          aria-controls="site-mobile-nav"
          @click="toggleMobileNav"
        >
          <span class="header__nav-toggle-bars" aria-hidden="true" />
        </button>
        <div class="header__brand-search">
          <RouterLink to="/" class="header__logo">
            <img :src="media.headerLogo" alt="Dejana Truck & Utility Equipment" width="150" height="39" />
          </RouterLink>
          <button
            type="button"
            class="header__search header__search--bar"
            aria-label="Open search"
            @click="search?.open()"
          >
            <span class="header__search-placeholder">Search products...</span>
            <img :src="media.icons.search" width="18" height="18" alt="" />
          </button>
        </div>
        <div class="header__actions">
          <div class="header__contact">
            <div class="header__avatar-wrap">
              <img :src="media.supportAvatar" alt="" class="header__avatar" width="40" height="40" />
              <div class="header__online" width="10" height="10"></div>
            </div>
            <div class="header__contact-text">
              <span>{{ contactLabel }}</span>
              <a href="tel:+18773352821" class="header__phone">(877) 335-2821</a>
            </div>
          </div>
          <div v-if="accountLoggedIn" ref="accountMenuRef" class="header__account">
            <button
              type="button"
              class="header__account-trigger"
              aria-label="Account menu"
              :aria-expanded="accountMenuOpen"
              aria-haspopup="menu"
              @click.stop="toggleAccountMenu"
            >
              <span class="header__account-initials" aria-hidden="true">{{ accountInitials }}</span>
            </button>
            <div v-show="accountMenuOpen" class="header__account-menu" role="menu">
              <RouterLink to="/account" class="header__account-link" role="menuitem" @click="closeAccountMenu"
                >My Account</RouterLink
              >
              <RouterLink
                to="/favorites"
                class="header__account-link header__account-link--row"
                role="menuitem"
                @click="closeAccountMenu"
              >
                <span>Favorites</span>
                <span v-if="(favoritesCount ?? 0) > 0" class="header__account-fav-badge">{{ favoritesCount }}</span>
              </RouterLink>
              <button
                type="button"
                class="header__account-link header__account-link--btn"
                role="menuitem"
                @click.stop="onLogout"
              >
                Sign Out
              </button>
            </div>
          </div>
          <RouterLink
            v-else
            to="/login"
            class="header__icon-btn header__icon-btn--account"
            aria-label="Sign in"
          >
            <img :src="media.icons.user" width="20" height="20" alt="" />
          </RouterLink>
          <button
            type="button"
            class="header__icon-btn header__icon-btn--search"
            aria-label="Open search"
            @click="search?.open()"
          >
            <img :src="media.icons.search" width="20" height="20" alt="" />
          </button>
          <button
            type="button"
            class="header__icon-btn header__icon-btn--cart"
            :aria-label="'Shopping cart, ' + (cartCount ?? 0) + ' items'"
            aria-haspopup="dialog"
            :aria-expanded="cartDrawerOpen"
            @click="miniCart?.open()"
          >
            <img :src="media.icons.cart" width="20" height="20" alt="" />
            <span class="header__cart-badge">{{ cartCount ?? 0 }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="header__shell header__shell--nav">
      <nav class="header__nav" aria-label="Primary">
        <div class="header__nav-scroll">
          <RouterLink
            to="/"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': activeNav === 'home' }"
            >Home</RouterLink
          >
          <div class="header__nav-item header__nav-item--dropdown">
            <RouterLink
              to="/shop"
              class="header__nav-link header__nav-link--split"
              :class="{ 'header__nav-link--active': activeNav === 'shop' || activeNav === 'category' }"
            >
              <span>Shop By Category</span>
              <span class="header__caret" aria-hidden="true">
                <svg class="header__caret-svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1.25L5 4.75L9 1.25"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </RouterLink>
            <div class="header__dropdown-panel" role="menu" aria-label="Shop by category">
              <RouterLink
                v-for="item in headerShopCategoryLinks"
                :key="item.to"
                :to="item.to"
                class="header__dropdown-link"
                role="menuitem"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </div>
          <RouterLink
            to="/new-arrivals"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': activeNav === 'new-arrivals' }"
            >New Arrivals</RouterLink
          >
          <RouterLink
            to="/favorites"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': activeNav === 'favorites' }"
            >Favorites</RouterLink
          >
          <a
            href="https://dejana.com/about-us/"
            class="header__nav-link header__nav-link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
            <svg
              class="header__ext-ico"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
            </svg>
            <span class="header__sr-only">Opens in new tab</span>
          </a>
          <a
            href="https://dejana.com/contact-us/"
            class="header__nav-link header__nav-link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
            <svg
              class="header__ext-ico"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
            </svg>
            <span class="header__sr-only">Opens in new tab</span>
          </a>
        </div>
        <div class="header__ship">
          <img :src="media.icons.shippingFast" width="20" height="20" alt="" />
          <span>FREE Shipping within 24 hrs*</span>
        </div>
      </nav>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="header-drawer">
      <div
        v-if="mobileNavOpen"
        id="site-mobile-nav"
        class="header-mnav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div class="header-mnav__backdrop" aria-hidden="true" @click="closeMobileNav" />
        <div class="header-mnav__panel">
          <div class="header-mnav__head">
            <span class="header-mnav__title">Menu</span>
            <button type="button" class="header-mnav__close" aria-label="Close menu" @click="closeMobileNav">
              ×
            </button>
          </div>
          <nav class="header-mnav__nav" aria-label="Primary mobile">
            <RouterLink
              to="/"
              class="header-mnav__link"
              :class="{ 'header-mnav__link--active': activeNav === 'home' }"
              @click="closeMobileNav"
              >Home</RouterLink
            >
            <details class="header-mnav__details">
              <summary class="header-mnav__summary">Shop by category</summary>
              <div class="header-mnav__sub">
                <RouterLink
                  v-for="item in headerShopCategoryLinks"
                  :key="item.to"
                  :to="item.to"
                  class="header-mnav__sublink"
                  @click="closeMobileNav"
                >
                  {{ item.label }}
                </RouterLink>
              </div>
            </details>
            <RouterLink
              to="/shop"
              class="header-mnav__link header-mnav__link--muted"
              :class="{ 'header-mnav__link--active': activeNav === 'shop' || activeNav === 'category' }"
              @click="closeMobileNav"
              >Shop overview</RouterLink
            >
            <RouterLink
              to="/new-arrivals"
              class="header-mnav__link"
              :class="{ 'header-mnav__link--active': activeNav === 'new-arrivals' }"
              @click="closeMobileNav"
              >New Arrivals</RouterLink
            >
            <RouterLink
              to="/favorites"
              class="header-mnav__link"
              :class="{ 'header-mnav__link--active': activeNav === 'favorites' }"
              @click="closeMobileNav"
              >Favorites</RouterLink
            >
            <a
              href="https://dejana.com/about-us/"
              class="header-mnav__link header-mnav__link--external"
              target="_blank"
              rel="noopener noreferrer"
              @click="closeMobileNav"
            >
              About Us
              <svg
                class="header-mnav__ext"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
              </svg>
            </a>
            <a
              href="https://dejana.com/contact-us/"
              class="header-mnav__link header-mnav__link--external"
              target="_blank"
              rel="noopener noreferrer"
              @click="closeMobileNav"
            >
              Contact
              <svg
                class="header-mnav__ext"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
              </svg>
            </a>
          </nav>
          <div class="header-mnav__foot">
            <p class="header-mnav__ship">
              <img :src="media.icons.shippingFast" width="18" height="18" alt="" />
              <span>FREE Shipping within 24 hrs*</span>
            </p>
            <a href="tel:+18773352821" class="header-mnav__phone">(877) 335-2821</a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.header {
  width: 100%;
}

.header__shell {
  width: 100%;
}

.header__shell--top {
  background: var(--color-page-bg);
}

.header__shell--nav {
  background: var(--color-dark-blue);
  overflow: visible;
  position: relative;
  z-index: 50;
}

.header__top {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  min-height: 92px;
  padding: 0 var(--header-pad-x, 30px);
  box-sizing: border-box;
}

@media (max-width: 1023px) {
  .header__top {
    flex-wrap: nowrap;
    gap: 6px;
    min-height: 56px;
    padding-left: max(8px, env(safe-area-inset-left));
    padding-right: max(8px, env(safe-area-inset-right));
  }

  .header__brand-search {
    flex: 1 1 auto;
    min-width: 0;
    gap: 8px;
    padding-right: 0;
  }

  .header__logo img {
    max-height: 30px;
  }

  .header__actions {
    flex-wrap: nowrap;
    flex-shrink: 0;
    gap: 0;
  }

  .header__nav-toggle {
    width: 40px;
    height: 40px;
  }

  .header__icon-btn {
    width: 40px;
    height: 40px;
  }

  .header__account-trigger {
    width: 32px;
    height: 32px;
  }
}

.header__nav-toggle {
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-dark-blue);
  cursor: pointer;
}

.header__nav-toggle:hover {
  background: rgba(0, 30, 64, 0.06);
}

.header__nav-toggle-bars {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  box-shadow:
    0 -7px 0 currentColor,
    0 7px 0 currentColor;
}

@media (max-width: 1023px) {
  .header__nav-toggle {
    display: flex;
  }

  .header__shell--nav {
    display: none;
  }
}

.header__brand-search {
  display: flex;
  flex: 1 1 320px;
  align-items: center;
  gap: clamp(24px, 5vw, 60px);
  min-width: 0;
  padding-right: clamp(0px, 3vw, 40px);
}

.header__logo {
  display: block;
  flex-shrink: 0;
}

.header__logo img {
  display: block;
  height: auto;
  max-height: 38px;
  width: auto;
}

.header__search {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  max-width: 560px;
  padding: 10px 16px;
  background: var(--color-surface-search);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: left;
}

@media (max-width: 1023px) {
  .header__search--bar {
    display: none;
  }
}

.header__icon-btn--search {
  display: none;
}

@media (max-width: 1023px) {
  .header__icon-btn--search {
    display: flex;
  }
}

.header__search-placeholder {
  flex: 1;
  font-size: 16px;
  color: var(--color-input-placeholder);
  letter-spacing: -0.4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.header__contact {
  display: none;
  align-items: center;
  gap: 10px;
  padding-right: 12px;
}

@media (min-width: 900px) {
  .header__contact {
    display: flex;
  }
}

.header__avatar-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.header__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100px;
}

.header__online {
  position: absolute;
  right: -2px;
  bottom: 2px;
  background: rgb(24, 193, 24);
  border: 2px solid white;
  width: 12px;
  height: 12px;
  border-radius: 50px;
}

.header__contact-text {
  display: flex;
  flex-direction: column;
  gap: 0;
  font-size: 14px;
  color: var(--color-dark-blue);
  letter-spacing: -0.35px;
  line-height: 1.25;
}

.header__phone {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-light-blue);
  text-decoration: none;
}

.header__icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  cursor: pointer;
  color: inherit;
}

.header__account {
  position: relative;
}

.header__account-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  padding: 0;
  border: 2px solid var(--color-light-blue);
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  font-family: inherit;
}

.header__account-trigger:hover {
  background: var(--color-light-blue);
  color: #fff;
}

.header__account-initials {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1;
  user-select: none;
}

.header__account-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 400;
  min-width: 200px;
  padding: 8px 0;
  background: #fff;
  color: var(--color-dark-blue);
  border-radius: 8px;
  box-shadow:
    0 16px 40px rgba(0, 30, 64, 0.14),
    0 0 0 1px rgba(0, 30, 64, 0.06);
}

.header__account-link {
  display: block;
  width: 100%;
  padding: 11px 18px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
}

.header__account-link:hover,
.header__account-link:focus-visible {
  background: var(--color-gray-section);
  outline: none;
}

.header__account-link--btn {
  border-top: 1px solid rgba(0, 30, 64, 0.08);
  margin-top: 4px;
  padding-top: 12px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.header__account-link--row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header__account-fav-badge {
  flex-shrink: 0;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: #dc2626;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  line-height: 20px;
  text-align: center;
}

.header__icon-btn--account {
  text-decoration: none;
  color: inherit;
}

.header__icon-btn--cart {
  text-decoration: none;
}

.header__cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 12px;
  background: var(--color-light-blue);
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: -0.4px;
  text-align: center;
}

.header__nav {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  gap: 8px 16px;
  min-height: 66px;
  padding: 0 var(--header-pad-x, 30px);
  box-sizing: border-box;
  color: #fff;
}

.header__nav-scroll {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0;
  overflow: visible;
  flex: 1;
  min-width: 0;
}

.header__nav-item--dropdown {
  position: relative;
  align-self: stretch;
  display: flex;
}

.header__nav-item--dropdown .header__nav-link {
  align-self: stretch;
}

.header__dropdown-panel {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 300;
  min-width: min(288px, calc(100vw - 48px));
  padding: 8px 0;
  margin: 0;
  background: #fff;
  color: var(--color-dark-blue);
  border-radius: 2px;
  box-shadow:
    0 16px 40px rgba(0, 30, 64, 0.12),
    0 0 0 1px rgba(0, 30, 64, 0.06);
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0.18s;
  pointer-events: none;
}

.header__nav-item--dropdown:hover .header__dropdown-panel,
.header__nav-item--dropdown:focus-within .header__dropdown-panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.header__dropdown-link {
  display: block;
  padding: 11px 20px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.25px;
  line-height: 1.35;
  color: var(--color-dark-blue);
  text-decoration: none;
  white-space: nowrap;
}

.header__dropdown-link:hover,
.header__dropdown-link:focus-visible {
  background: var(--color-gray-section);
  outline: none;
}

.header__dropdown-link:last-child {
  margin-top: 4px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 30, 64, 0.08);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.header__nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 14px;
  color: inherit;
  text-decoration: none;
  font-size: 16px;
  letter-spacing: -0.4px;
  white-space: nowrap;
  border-bottom: 6px solid transparent;
  margin-bottom: -1px;
}

.header__nav-link--split {
  gap: 6px;
}

.header__nav-link--external {
  position: relative;
  gap: 6px;
}

.header__ext-ico {
  flex-shrink: 0;
  display: block;
  margin-top: 1px;
  opacity: 0.88;
}

.header__sr-only {
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

.header__nav-link--active {
  border-bottom-color: var(--color-light-blue);
  font-weight: 800;
}

.header__caret {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0.92;
}

.header__caret-svg {
  display: block;
}

.header__ship {
  display: none;
  align-items: center;
  align-self: center;
  gap: 10px;
  padding: 8px 14px;
  margin: 8px 0;
  background: var(--color-accent);
  color: var(--color-accent-text);
  border-radius: 3px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.5;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .header__ship {
    display: flex;
  }
}

/* —— Mobile off-canvas nav (teleported) —— */
.header-mnav {
  position: fixed;
  inset: 0;
  z-index: 360;
  display: flex;
  pointer-events: auto;
}

.header-mnav__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 20, 40, 0.5);
}

.header-mnav__panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: min(20rem, calc(100vw - 48px));
  max-width: 100%;
  height: 100%;
  max-height: 100dvh;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--color-dark-blue);
  color: #fff;
  box-shadow: 8px 0 32px rgba(0, 20, 40, 0.25);
}

.header-mnav__head {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.header-mnav__title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.9;
}

.header-mnav__close {
  width: 44px;
  height: 44px;
  margin: -8px -10px -8px 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.header-mnav__close:hover {
  background: rgba(255, 255, 255, 0.08);
}

.header-mnav__nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 12px 0 24px;
  display: flex;
  flex-direction: column;
}

.header-mnav__link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  border-left: 4px solid transparent;
}

.header-mnav__link--muted {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.85;
  padding-top: 4px;
  padding-bottom: 10px;
}

.header-mnav__link--active {
  border-left-color: var(--color-light-blue);
  font-weight: 800;
  background: rgba(255, 255, 255, 0.06);
}

.header-mnav__link--external {
  opacity: 0.95;
}

.header-mnav__ext {
  flex-shrink: 0;
  opacity: 0.85;
}

.header-mnav__details {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-mnav__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  padding: 14px 22px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.header-mnav__summary::-webkit-details-marker {
  display: none;
}

.header-mnav__summary::after {
  content: '';
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-right: 2px solid rgba(255, 255, 255, 0.7);
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  transform: rotate(45deg);
  transition: transform 0.15s ease;
}

.header-mnav__details[open] .header-mnav__summary::after {
  transform: rotate(-135deg);
}

.header-mnav__sub {
  display: flex;
  flex-direction: column;
  padding: 0 0 12px 8px;
  background: rgba(0, 0, 0, 0.15);
}

.header-mnav__sublink {
  padding: 10px 22px 10px 26px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
}

.header-mnav__sublink:hover,
.header-mnav__sublink:focus-visible {
  color: #fff;
  text-decoration: underline;
  outline: none;
}

.header-mnav__foot {
  flex-shrink: 0;
  padding: 16px 22px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-mnav__ship {
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
}

.header-mnav__ship img {
  flex-shrink: 0;
  margin-top: 2px;
  filter: brightness(10);
}

.header-mnav__phone {
  font-size: 18px;
  font-weight: 800;
  color: #a7c8ff;
  text-decoration: none;
}

.header-mnav__phone:hover {
  text-decoration: underline;
}

.header-drawer-enter-active,
.header-drawer-leave-active {
  transition: opacity 0.2s ease;
}

.header-drawer-enter-active .header-mnav__panel,
.header-drawer-leave-active .header-mnav__panel {
  transition: transform 0.22s ease;
}

.header-drawer-enter-from,
.header-drawer-leave-to {
  opacity: 0;
}

.header-drawer-enter-from .header-mnav__panel,
.header-drawer-leave-to .header-mnav__panel {
  transform: translateX(-100%);
}
</style>
