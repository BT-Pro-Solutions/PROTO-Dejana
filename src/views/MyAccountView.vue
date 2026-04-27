<script setup lang="ts">
import { inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { media } from '../assets/media'
import { authKey } from '../layout/auth'

const router = useRouter()
const auth = inject(authKey, null)

function signOut() {
  auth?.logout()
  router.push({ name: 'home' })
}

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const profile = {
  firstName: 'Jordan',
  lastName: 'Mercer',
  email: 'jordan.mercer@example.com',
  phone: '(317) 555-0142',
  company: 'Mercer Fleet Services',
  customerId: 'DJ-104829',
  memberSince: 'March 2022',
}

const orders = [
  { id: 'DJ-8F2K91', date: 'Apr 2, 2026', status: 'Shipped', total: 1847.5, items: 3 },
  { id: 'DJ-7Q3M44', date: 'Mar 18, 2026', status: 'Delivered', total: 329.0, items: 1 },
  { id: 'DJ-6P1L02', date: 'Feb 4, 2026', status: 'Delivered', total: 5125.75, items: 5 },
]

const payment = {
  brand: 'Visa',
  last4: '4242',
  exp: '08 / 28',
  name: 'Jordan Mercer',
}

const addresses = [
  {
    id: '1',
    label: 'Default shipping',
    default: true,
    lines: ['Mercer Fleet Services', '1200 Industrial Pkwy', 'Building C', 'Indianapolis, IN 46225', 'United States'],
  },
  {
    id: '2',
    label: 'Columbus yard',
    default: false,
    lines: ['Mercer Fleet — Columbus', '88 Warehouse Row', 'Columbus, OH 43228', 'United States'],
  },
]

const nav = [
  { href: '#overview', label: 'Overview' },
  { href: '#profile', label: 'Profile & password' },
  { href: '#orders', label: 'Order history' },
  { href: '#payment', label: 'Payment methods' },
  { href: '#addresses', label: 'Addresses' },
]
</script>

<template>
  <div class="page">
    <div class="page__inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <RouterLink to="/">HOME</RouterLink>
        <img :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
        <span class="crumb__here">MY ACCOUNT</span>
      </nav>

      <header class="page-head">
        <div class="page-head__row">
          <div>
            <h1 class="page-head__title">My account</h1>
            <p class="page-head__meta">Demo profile — actions below are for layout only.</p>
          </div>
          <button type="button" class="page-head__signout" @click="signOut">Sign out</button>
        </div>
      </header>

      <div class="shell">
        <nav class="side" aria-label="Account sections">
          <p class="side__title">Account</p>
          <ul class="side__list">
            <li v-for="item in nav" :key="item.href">
              <a :href="item.href" class="side__link">{{ item.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="main">
          <section id="overview" class="card card--hero" tabindex="-1">
            <div class="hero">
              <div class="hero__avatar" aria-hidden="true">{{ profile.firstName[0] }}{{ profile.lastName[0] }}</div>
              <div class="hero__body">
                <p class="hero__name">{{ profile.firstName }} {{ profile.lastName }}</p>
                <p class="hero__email">{{ profile.email }}</p>
                <dl class="hero__meta">
                  <div>
                    <dt>Customer ID</dt>
                    <dd>{{ profile.customerId }}</dd>
                  </div>
                  <div>
                    <dt>Member since</dt>
                    <dd>{{ profile.memberSince }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <section id="profile" class="card" tabindex="-1">
            <div class="card__head">
              <h2 class="card__h">Profile & contact</h2>
              <button type="button" class="btn btn--secondary">Update profile</button>
            </div>
            <div class="grid">
              <label class="field">
                <span class="field__label">First name</span>
                <input class="field__input" type="text" :value="profile.firstName" readonly />
              </label>
              <label class="field">
                <span class="field__label">Last name</span>
                <input class="field__input" type="text" :value="profile.lastName" readonly />
              </label>
              <label class="field field--full">
                <span class="field__label">Email</span>
                <input class="field__input" type="email" :value="profile.email" readonly />
              </label>
              <label class="field">
                <span class="field__label">Phone</span>
                <input class="field__input" type="text" :value="profile.phone" readonly />
              </label>
              <label class="field">
                <span class="field__label">Company</span>
                <input class="field__input" type="text" :value="profile.company" readonly />
              </label>
            </div>
            <div class="card__divider" />
            <div class="card__head card__head--tight">
              <h3 class="card__subh">Password</h3>
              <button type="button" class="btn btn--secondary">Change password</button>
            </div>
            <p class="card__hint">Last updated 90 days ago. Password changes send a confirmation email.</p>
          </section>

          <section id="orders" class="card" tabindex="-1">
            <div class="card__head">
              <h2 class="card__h">Order history</h2>
              <button type="button" class="btn btn--ghost">Download invoices</button>
            </div>
            <div class="table-wrap">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Order</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Items</th>
                    <th scope="col" class="table__num">Total</th>
                    <th scope="col"><span class="visually-hidden">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="o in orders" :key="o.id">
                    <td class="table__mono">{{ o.id }}</td>
                    <td>{{ o.date }}</td>
                    <td>
                      <span
                        class="pill"
                        :class="{ 'pill--ok': o.status === 'Delivered', 'pill--ship': o.status === 'Shipped' }"
                        >{{ o.status }}</span
                      >
                    </td>
                    <td>{{ o.items }}</td>
                    <td class="table__num">{{ money(o.total) }}</td>
                    <td><button type="button" class="linkish">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="payment" class="card" tabindex="-1">
            <div class="card__head">
              <h2 class="card__h">Payment methods</h2>
              <button type="button" class="btn btn--secondary">Add card</button>
            </div>
            <div class="pay-row">
              <div class="pay-card">
                <span class="pay-card__badge">Default</span>
                <p class="pay-card__title">{{ payment.brand }} ending in {{ payment.last4 }}</p>
                <p class="pay-card__meta">Expires {{ payment.exp }} · {{ payment.name }}</p>
                <div class="pay-card__actions">
                  <button type="button" class="linkish">Edit</button>
                  <button type="button" class="linkish linkish--muted">Remove</button>
                </div>
              </div>
            </div>
          </section>

          <section id="addresses" class="card" tabindex="-1">
            <div class="card__head">
              <h2 class="card__h">Shipping addresses</h2>
              <button type="button" class="btn btn--secondary">Add address</button>
            </div>
            <ul class="addr-grid">
              <li v-for="a in addresses" :key="a.id" class="addr">
                <div class="addr__top">
                  <span class="addr__label">{{ a.label }}</span>
                  <span v-if="a.default" class="addr__pill">Default</span>
                </div>
                <p v-for="(line, i) in a.lines" :key="i" class="addr__line">{{ line }}</p>
                <div class="addr__actions">
                  <button type="button" class="linkish">Edit</button>
                  <button v-if="!a.default" type="button" class="linkish">Set as default</button>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: var(--color-page-bg);
}

.page__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px) var(--space-page-x) clamp(40px, 6vw, 64px);
}

.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.crumb a {
  color: inherit;
  text-decoration: none;
}

.crumb a:hover {
  color: var(--color-dark-blue);
}

.crumb__here {
  color: var(--color-caption);
}

.page-head {
  margin-bottom: clamp(24px, 4vw, 36px);
}

.page-head__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.page-head__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--color-dark-blue);
}

.page-head__meta {
  margin: 8px 0 0;
  font-size: 15px;
  color: var(--color-text-muted);
}

.page-head__signout {
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  color: var(--color-dark-blue);
  background: #fff;
  border: 1px solid rgba(0, 30, 64, 0.18);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.page-head__signout:hover {
  border-color: var(--color-light-blue);
  background: var(--color-surface-muted);
}

.shell {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(24px, 4vw, 40px);
  align-items: start;
}

@media (min-width: 900px) {
  .shell {
    grid-template-columns: 220px 1fr;
    gap: 40px;
  }
}

.side {
  position: sticky;
  top: 16px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.side__title {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-caption);
}

.side__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.side__link {
  display: block;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.side__link:hover {
  color: var(--color-dark-blue);
  background: var(--color-surface-muted);
}

.main {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vw, 28px);
}

.card {
  scroll-margin-top: 24px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: clamp(20px, 3vw, 28px);
}

.card--hero {
  background: var(--color-dark-blue);
  color: #fff;
}

.card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.card__head--tight {
  margin-bottom: 8px;
}


.card__subh {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.card__divider {
  height: 1px;
  background: var(--color-border);
  margin: 24px 0;
}

.card__hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--color-text-soft);
}

.hero {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.hero__avatar {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--gradient-nav-cta);
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__name {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 800;
}

.hero__email {
  margin: 0 0 16px;
  font-size: 14px;
  opacity: .7;
}

.hero__meta {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  opacity: .7;
}

.hero__meta dt {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-caption);
}

.hero__meta dd {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.field--full {
  grid-column: 1 / -1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-muted);
}

.field__input {
  padding: 11px 12px;
  font-size: 15px;
  border: 1px solid rgba(0, 30, 64, 0.12);
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.btn {
  font-family: inherit;
  cursor: pointer;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 14px;
}

.btn--secondary {
  padding: 9px 16px;
  color: var(--color-dark-blue);
  background: #fff;
  border: 1px solid rgba(0, 30, 64, 0.18);
}

.btn--secondary:hover {
  border-color: var(--color-light-blue);
  background: var(--color-surface-muted);
}

.btn--ghost {
  padding: 9px 14px;
  color: var(--color-link);
  background: transparent;
  border: 1px dashed rgba(0, 51, 102, 0.35);
}

.btn--ghost:hover {
  background: rgba(0, 51, 102, 0.06);
}

.table-wrap {
  overflow-x: auto;
  margin: 0 -4px;
}

.table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-size: 14px;
}

.table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-caption);
  border-bottom: 1px solid var(--color-border);
}

.table td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.table tr:last-child td {
  border-bottom: none;
}

.table__num {
  text-align: right;
  font-weight: 700;
}

.table__mono {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: var(--color-gray-section);
  color: var(--color-text-muted);
}

.pill--ok {
  background: rgba(0, 167, 33, 0.12);
  color: var(--color-success);
}

.pill--ship {
  background: rgba(15, 83, 149, 0.12);
  color: var(--color-light-blue);
}

.linkish {
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-link);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.linkish:hover {
  color: var(--color-light-blue);
}

.linkish--muted {
  color: var(--color-text-soft);
}

.pay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.pay-card {
  flex: 1;
  min-width: 260px;
  max-width: 400px;
  padding: 18px;
  border: 1px solid rgba(0, 30, 64, 0.12);
  border-radius: var(--radius-lg);
  background: var(--color-surface-muted);
  position: relative;
}

.pay-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--color-dark-blue);
  color: #fff;
}

.pay-card__title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.pay-card__meta {
  margin: 0 0 14px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.pay-card__actions {
  display: flex;
  gap: 16px;
}

.addr-grid {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 700px) {
  .addr-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.addr {
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.addr__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.addr__label {
  font-size: 15px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.addr__pill {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(15, 83, 149, 0.12);
  color: var(--color-light-blue);
}

.addr__line {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.addr__actions {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.visually-hidden {
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
</style>
