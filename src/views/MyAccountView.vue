<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { media } from '../assets/media'
import {
  demoAccountOrders,
  orderEligibleForReturn,
  orderItemCount,
  orderTotal,
  type DemoAccountOrder,
} from '../data/demoAccountOrders'
import { accountSampleReturnRow, type AccountReturnTableRow } from '../data/sampleAccountReturn'
import { authKey } from '../layout/auth'
import { returnsKey } from '../layout/returns'
import { toastKey } from '../layout/toast'

const router = useRouter()
const auth = inject(authKey, null)
const returns = inject(returnsKey, null)
const toast = inject(toastKey, null)

function signOut() {
  auth?.logout()
  router.push({ name: 'home' })
}

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const orders = demoAccountOrders

const myReturns = computed(() => {
  const name = auth?.user.value?.displayName?.trim()
  if (!name || !returns) return []
  return returns.requests.value.filter((r) => r.submittedByDisplayName === name)
})

function itemSummaryForOrder(orderId: string): string {
  const o = demoAccountOrders.find((x) => x.id === orderId)
  if (!o?.lines.length) return '—'
  if (o.lines.length === 1) {
    const line = o.lines[0]!
    return `${line.title} (qty ${line.qty})`
  }
  return `${o.lines.length} line items`
}

/** Sample completed return plus any requests this session (customer view only). */
const returnTableRows = computed((): AccountReturnTableRow[] => {
  if (!auth?.user.value) return []
  const fromSession: AccountReturnTableRow[] = myReturns.value.map((r) => ({
    key: r.id,
    requestId: r.id,
    orderId: r.orderId,
    itemSummary: itemSummaryForOrder(r.orderId),
    reasonLabel: r.reasonLabel,
    submittedAt: r.submittedAt,
    status: r.status,
    reviewNote: r.reviewNote,
  }))
  return [accountSampleReturnRow, ...fromSession]
})

const returnModalOrder = ref<DemoAccountOrder | null>(null)
const returnReasonId = ref('')
const returnNotes = ref('')

function canRequestReturn(o: DemoAccountOrder): boolean {
  if (!orderEligibleForReturn(o)) return false
  if (o.id === accountSampleReturnRow.orderId) return false
  const name = auth?.user.value?.displayName?.trim()
  if (!name || !returns) return false
  return !returns.hasPendingForOrder(o.id, name)
}

function openReturnModal(o: DemoAccountOrder) {
  if (!auth?.user.value) {
    toast?.push({
      message: 'Sign in to request a return.',
      action: { label: 'Log in', to: '/login' },
    })
    return
  }
  if (!returns?.reasons.length) return
  returnModalOrder.value = o
  returnReasonId.value = returns.reasons[0]!.id
  returnNotes.value = ''
}

function closeReturnModal() {
  returnModalOrder.value = null
}

function submitReturnForm() {
  const order = returnModalOrder.value
  if (!order || !returns || !auth?.user.value) return
  const res = returns.submit({
    order,
    reasonId: returnReasonId.value,
    notes: returnNotes.value,
    submittedByDisplayName: auth.user.value.displayName,
  })
  if (!res.ok) {
    toast?.push({ message: res.error })
    return
  }
  toast?.push({ message: `Return request ${res.id} was received.` })
  closeReturnModal()
}

function formatReturnSubmitted(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
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
    lines: ['Jordan Mercer', '1234 Example Street', 'Kings Park, NY 11754', 'United States'],
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
  { href: '#returns', label: 'Returns' },
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
              <table class="table table--responsive">
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
                    <td class="table__mono" data-label="Order">{{ o.id }}</td>
                    <td data-label="Date">{{ o.date }}</td>
                    <td data-label="Status">
                      <span
                        class="pill"
                        :class="{ 'pill--ok': o.status === 'Delivered', 'pill--ship': o.status === 'Shipped' }"
                        >{{ o.status }}</span
                      >
                    </td>
                    <td data-label="Items">{{ orderItemCount(o) }}</td>
                    <td class="table__num" data-label="Total">{{ money(orderTotal(o)) }}</td>
                    <td class="table__actions" data-label="Actions">
                      <button type="button" class="linkish">View</button>
                      <template v-if="orderEligibleForReturn(o)">
                        <button
                          v-if="canRequestReturn(o)"
                          type="button"
                          class="linkish"
                          @click="openReturnModal(o)"
                        >
                          Request return
                        </button>
                        <span v-else class="return-pending">Return pending</span>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="returns" class="card" tabindex="-1">
            <div class="card__head">
              <h2 class="card__h">Returns</h2>
            </div>
            <p v-if="!auth?.user" class="card__hint">
              Sign in to see your returns and submit new requests from eligible orders above.
            </p>
            <template v-else>
              <p class="returns-lead">
                For a shipped or delivered order, use <strong>Request return</strong> in order history. You will get an
                email when the status updates.
              </p>
              <div class="table-wrap">
                <table class="table table--responsive">
                  <thead>
                    <tr>
                      <th scope="col">Request</th>
                      <th scope="col">Order</th>
                      <th scope="col">Item</th>
                      <th scope="col">Reason</th>
                      <th scope="col">Submitted</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in returnTableRows" :key="r.key">
                      <td data-label="Request">
                        <span class="table__mono">{{ r.requestId }}</span>
                        <span v-if="r.isSample" class="pill pill--sample">Example</span>
                      </td>
                      <td class="table__mono" data-label="Order">{{ r.orderId }}</td>
                      <td data-label="Item">{{ r.itemSummary }}</td>
                      <td data-label="Reason">{{ r.reasonLabel }}</td>
                      <td data-label="Submitted">{{ formatReturnSubmitted(r.submittedAt) }}</td>
                      <td data-label="Status">
                        <span
                          class="pill"
                          :class="{
                            'pill--pending': r.status === 'pending',
                            'pill--ok': r.status === 'approved',
                            'pill--no': r.status === 'rejected',
                          }"
                          >{{ r.status }}</span
                        >
                        <p v-if="r.reviewNote" class="review-note">{{ r.reviewNote }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
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

    <div
      v-if="returnModalOrder && returns"
      class="overlay"
      role="presentation"
      @click.self="closeReturnModal"
    >
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="return-dialog-title">
        <h2 id="return-dialog-title" class="dialog__title">Request a return</h2>
        <p class="dialog__meta">Order {{ returnModalOrder.id }} · {{ returnModalOrder.date }}</p>
        <ul class="dialog__lines">
          <li v-for="line in returnModalOrder.lines" :key="line.sku">
            {{ line.title }} × {{ line.qty }} — {{ money(line.unitPrice * line.qty) }}
          </li>
        </ul>
        <label class="field">
          <span class="field__label">Reason</span>
          <select v-model="returnReasonId" class="field__input">
            <option v-for="reason in returns.reasons" :key="reason.id" :value="reason.id">
              {{ reason.label }}
            </option>
          </select>
        </label>
        <label class="field">
          <span class="field__label">Notes (optional)</span>
          <textarea v-model="returnNotes" class="field__input field__textarea" rows="3" />
        </label>
        <div class="dialog__actions">
          <button type="button" class="btn btn--ghost" @click="closeReturnModal">Cancel</button>
          <button type="button" class="btn btn--primary" @click="submitReturnForm">Submit request</button>
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
  padding-top: clamp(24px, 4vw, 48px);
  padding-bottom: clamp(40px, 6vw, 64px);
  padding-left: max(var(--space-page-x), env(safe-area-inset-left));
  padding-right: max(var(--space-page-x), env(safe-area-inset-right));
}

.crumb {
  display: flex;
  flex-wrap: wrap;
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

@media (max-width: 479px) {
  .page-head__signout {
    width: 100%;
    justify-content: center;
  }
}

.shell {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(20px, 4vw, 40px);
  align-items: start;
}

@media (min-width: 768px) {
  .shell {
    grid-template-columns: minmax(180px, 220px) 1fr;
    gap: clamp(24px, 3vw, 40px);
  }
}

.side {
  position: static;
  padding: 16px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

@media (max-width: 767px) {
  .side {
    padding: 12px 12px 10px;
  }

  .side__title {
    margin-bottom: 10px;
  }

  .side__list {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 6px;
    margin: 0 -4px;
    padding-left: 4px;
    padding-right: 4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .side__link {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 10px 14px;
    font-size: 13px;
    border: 1px solid var(--color-border);
    background: var(--color-surface-muted);
  }

  .side__link:hover {
    background: #fff;
  }
}

@media (min-width: 768px) {
  .side {
    position: sticky;
    top: 16px;
    padding: 20px;
  }

  .side__list {
    flex-direction: column;
  }
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
  scroll-margin-top: clamp(80px, 22vw, 120px);
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: clamp(16px, 3vw, 28px);
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

@media (max-width: 540px) {
  .card__head {
    flex-direction: column;
    align-items: stretch;
  }

  .card__head .btn {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
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
  flex-wrap: wrap;
  gap: 16px 20px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  -webkit-overflow-scrolling: touch;
}

.table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-size: 14px;
}

@media (max-width: 699px) {
  .table--responsive {
    min-width: 0;
    display: block;
  }

  .table--responsive thead {
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

  .table--responsive tbody {
    display: block;
  }

  .table--responsive tbody tr {
    display: block;
    margin-bottom: 14px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-surface-muted);
  }

  .table--responsive tbody td {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--color-border);
    font-size: 14px;
  }

  .table--responsive tbody td:last-child {
    border-bottom: none;
  }

  .table--responsive tbody td::before {
    content: attr(data-label);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-caption);
  }

  .table--responsive .table__num {
    text-align: left;
  }

  .table--responsive .table__actions {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .table--responsive .pill--sample {
    margin-left: 0;
    margin-top: 2px;
  }

  .table--responsive .review-note {
    max-width: none;
  }
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

.pill--pending {
  background: rgba(206, 110, 0, 0.15);
  color: var(--color-warning-text);
}

.pill--no {
  background: rgba(176, 0, 32, 0.1);
  color: #b00020;
}

.pill--sample {
  margin-left: 8px;
  vertical-align: middle;
  background: rgba(0, 30, 64, 0.08);
  color: var(--color-caption);
  font-weight: 700;
}

.table__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
}

.return-pending {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-warning-text);
}

.returns-lead {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.review-note {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--color-text-soft);
  max-width: 280px;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  padding-bottom: max(24px, env(safe-area-inset-bottom));
  background: rgba(0, 30, 64, 0.45);
}

.dialog {
  width: min(100%, 480px);
  max-height: min(90vh, 640px);
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .overlay {
    padding: 12px;
    padding-bottom: max(12px, env(safe-area-inset-bottom));
    align-items: flex-end;
  }

  .dialog {
    width: 100%;
    max-height: min(92dvh, 640px);
    border-radius: 12px 12px 0 0;
    padding: 20px 18px max(20px, env(safe-area-inset-bottom));
  }

  .dialog__actions {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 10px;
  }

  .dialog__actions .btn {
    width: 100%;
    justify-content: center;
  }
}

.dialog__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.dialog__meta {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.dialog__lines {
  margin: 0 0 18px;
  padding: 12px 14px;
  list-style: none;
  font-size: 13px;
  line-height: 1.45;
  color: var(--color-text);
  background: var(--color-surface-muted);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.dialog__lines li + li {
  margin-top: 6px;
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.field__textarea {
  resize: vertical;
  min-height: 72px;
  font-family: inherit;
}

.btn--primary {
  padding: 9px 18px;
  color: #fff;
  background: var(--color-dark-blue);
  border: 1px solid var(--color-dark-blue);
}

.btn--primary:hover {
  background: var(--color-light-blue);
  border-color: var(--color-light-blue);
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
  min-width: min(100%, 260px);
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
