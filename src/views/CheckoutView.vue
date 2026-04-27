<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { cartLines as seedCartLines, cartSubtotal, type CartLine } from '../data/site'
import { media } from '../assets/media'
import { authKey } from '../layout/auth'
import { miniCartKey } from '../layout/miniCart'

const miniCart = inject(miniCartKey, null)
const auth = inject(authKey, null)

const lines = computed<CartLine[]>(() => (miniCart ? miniCart.lines.value : seedCartLines))

const subtotal = computed(() => cartSubtotal(lines.value))
const taxRate = 0.08
const tax = computed(() => Math.round(subtotal.value * taxRate * 100) / 100)

type ShipMethodId = 'ground' | 'next'
const shipMethodOptions = [
  { id: 'ground' as const, label: 'FedEx Ground', amount: 0 },
  { id: 'next' as const, label: 'FedEx Next Day', amount: 39.99 },
]
const selectedShipMethod = ref<ShipMethodId>('ground')
const shippingLabel = computed(() => shipMethodOptions.find((m) => m.id === selectedShipMethod.value)!.label)
const shippingAmount = computed(() => shipMethodOptions.find((m) => m.id === selectedShipMethod.value)!.amount)
const grandTotal = computed(() => subtotal.value + shippingAmount.value + tax.value)

const isLoggedIn = computed(() => !!auth?.user.value)
const checkoutTitle = computed(() => (isLoggedIn.value ? 'Secure Checkout' : 'Secure Guest Checkout'))
const checkoutSubtitle = computed(() =>
  isLoggedIn.value && auth?.user.value ? `Logged in as: ${auth.user.value.displayName}` : '',
)

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function lineTotal(line: CartLine) {
  return line.price * line.qty
}

function linePriceDetail(line: CartLine) {
  if (line.qty <= 1) return money(line.price)
  return `${money(lineTotal(line))} (${line.qty} @ ${money(line.price)} ea)`
}

const currentStep = ref(0)
const maxReached = ref(0)

const firstName = ref('')
const lastName = ref('')
const company = ref('')
const country = ref('US')
const city = ref('')
const stateCode = ref('IN')
const address1 = ref('')
const address2 = ref('')
const zip = ref('')
const phone = ref('')

const cardName = ref('')
const cardNumber = ref('')
const cardExp = ref('')
const cardCvc = ref('')

const orderPlaced = ref(false)
const demoOrderId = ref('')

const usStates = [
  { abbr: 'IN', name: 'Indiana' },
  { abbr: 'OH', name: 'Ohio' },
  { abbr: 'MI', name: 'Michigan' },
  { abbr: 'IL', name: 'Illinois' },
  { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'WI', name: 'Wisconsin' },
  { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'NY', name: 'New York' },
]

const countryLabel = computed(() => (country.value === 'US' ? 'United States' : 'Canada'))

const shippingSummary = computed(() => {
  const name = [firstName.value, lastName.value].filter(Boolean).join(' ')
  const loc = [city.value, stateCode.value].filter(Boolean).join(', ')
  if (!name && !loc) return 'Add your shipping details'
  const ship = shipMethodOptions.find((m) => m.id === selectedShipMethod.value)!.label
  return `${[name, loc].filter(Boolean).join(' — ')} · ${ship}`
})

const paymentSummary = computed(() => {
  if (!cardNumber.value) return 'Add payment method'
  const last4 = cardNumber.value.replace(/\D/g, '').slice(-4)
  return last4 ? `Card ending in ${last4}` : 'Add payment method'
})

const shippingReviewLines = computed(() => {
  const out: string[] = []
  const name = [firstName.value, lastName.value].filter(Boolean).join(' ')
  if (name) out.push(name)
  if (company.value) out.push(company.value)
  if (address1.value) out.push(address1.value)
  if (address2.value) out.push(address2.value)
  const cityLine = [city.value, stateCode.value, zip.value].filter(Boolean).join(' ')
  if (cityLine) out.push(cityLine)
  out.push(countryLabel.value)
  if (phone.value) out.push(phone.value)
  const ship = shipMethodOptions.find((m) => m.id === selectedShipMethod.value)
  if (ship) {
    out.push(
      `${ship.label}${ship.amount === 0 ? ' — FREE' : ` — ${money(ship.amount)}`}`,
    )
  }
  return out
})

const maskedCardNumber = computed(() => {
  const d = cardNumber.value.replace(/\D/g, '')
  if (d.length < 4) return '•••• •••• •••• ••••'
  return `•••• •••• •••• ${d.slice(-4)}`
})

const guestCardDigits = computed(() => cardNumber.value.replace(/\D/g, ''))

const detectedGuestCardBrand = computed((): 'visa' | 'mastercard' | 'amex' | 'discover' | null => {
  const d = guestCardDigits.value
  if (!d.length) return null
  if (d[0] === '4') return 'visa'
  if (d[0] === '3' && (d[1] === '4' || d[1] === '7')) return 'amex'
  if (d[0] === '5' && d.length >= 2 && '12345'.includes(d[1]!)) return 'mastercard'
  if (d.length >= 4) {
    const n = parseInt(d.slice(0, 4), 10)
    if (!Number.isNaN(n) && n >= 2221 && n <= 2720) return 'mastercard'
  }
  if (d[0] === '6') return 'discover'
  return null
})

function goToStep(i: number) {
  if (i <= maxReached.value) currentStep.value = i
}

type SavedAddr = {
  id: string
  firstName: string
  lastName: string
  company: string
  country: string
  city: string
  stateCode: string
  address1: string
  address2: string
  zip: string
  phone: string
}

const savedAddresses = ref<SavedAddr[]>([
  {
    id: 'home',
    firstName: 'Jordan',
    lastName: 'Mercer',
    company: '',
    country: 'US',
    city: 'Fort Wayne',
    stateCode: 'IN',
    address1: '1234 Example Street',
    address2: '',
    zip: '46845',
    phone: '(260) 555-0199',
  },
  {
    id: 'yard',
    firstName: 'Jordan',
    lastName: 'Mercer',
    company: 'Mercer Fleet Services',
    country: 'US',
    city: 'Indianapolis',
    stateCode: 'IN',
    address1: '1200 Industrial Pkwy',
    address2: 'Building C',
    zip: '46225',
    phone: '(317) 555-0142',
  },
])

const selectedAddressId = ref(savedAddresses.value[0]!.id)

function applySavedAddress(a: SavedAddr) {
  firstName.value = a.firstName
  lastName.value = a.lastName
  company.value = a.company
  country.value = a.country
  city.value = a.city
  stateCode.value = a.stateCode
  address1.value = a.address1
  address2.value = a.address2
  zip.value = a.zip
  phone.value = a.phone
}

watch(
  selectedAddressId,
  () => {
    if (!isLoggedIn.value) return
    const a = savedAddresses.value.find((x) => x.id === selectedAddressId.value)
    if (a) applySavedAddress(a)
  },
  { immediate: true },
)

type SavedPay = {
  id: string
  cardName: string
  cardNumber: string
  cardExp: string
  cardCvc: string
}

const savedPayments = ref<SavedPay[]>([
  {
    id: 'pm1',
    cardName: 'Jordan Mercer',
    cardNumber: '4242424242424242',
    cardExp: '08 / 28',
    cardCvc: '123',
  },
])

const selectedPaymentId = ref(savedPayments.value[0]!.id)

function applySavedPayment(p: SavedPay) {
  cardName.value = p.cardName
  cardNumber.value = p.cardNumber
  cardExp.value = p.cardExp
  cardCvc.value = p.cardCvc
}

watch(
  selectedPaymentId,
  () => {
    if (!isLoggedIn.value) return
    const p = savedPayments.value.find((x) => x.id === selectedPaymentId.value)
    if (p) applySavedPayment(p)
  },
  { immediate: true },
)

watch(isLoggedIn, (loggedIn) => {
  if (!loggedIn) return
  const a = savedAddresses.value.find((x) => x.id === selectedAddressId.value)
  if (a) applySavedAddress(a)
  const p = savedPayments.value.find((x) => x.id === selectedPaymentId.value)
  if (p) applySavedPayment(p)
})

const addressModalOpen = ref(false)
const addressModalEditingId = ref<string | null>(null)
const addrDraft = ref<SavedAddr>({ ...savedAddresses.value[0]! })

function openAddressModal(editId?: string) {
  if (editId) {
    const a = savedAddresses.value.find((x) => x.id === editId)
    if (a) addrDraft.value = { ...a }
    addressModalEditingId.value = editId
  } else {
    addressModalEditingId.value = null
    addrDraft.value = {
      id: `addr-${Date.now()}`,
      firstName: firstName.value,
      lastName: lastName.value,
      company: company.value,
      country: country.value,
      city: city.value,
      stateCode: stateCode.value,
      address1: address1.value,
      address2: address2.value,
      zip: zip.value,
      phone: phone.value,
    }
  }
  addressModalOpen.value = true
}

function saveAddressModal() {
  const d = addrDraft.value
  if (addressModalEditingId.value) {
    const i = savedAddresses.value.findIndex((x) => x.id === addressModalEditingId.value)
    if (i >= 0) savedAddresses.value[i] = { ...d }
    selectedAddressId.value = d.id
  } else {
    savedAddresses.value = [...savedAddresses.value, { ...d }]
    selectedAddressId.value = d.id
  }
  applySavedAddress(d)
  addressModalOpen.value = false
}

const paymentModalOpen = ref(false)
const paymentModalEditingId = ref<string | null>(null)
const payDraft = ref<SavedPay>({ ...savedPayments.value[0]! })

function openPaymentModal(editId?: string) {
  if (editId) {
    const p = savedPayments.value.find((x) => x.id === editId)
    if (p) payDraft.value = { ...p }
    paymentModalEditingId.value = editId
  } else {
    paymentModalEditingId.value = null
    payDraft.value = {
      id: `pm-${Date.now()}`,
      cardName: '',
      cardNumber: '',
      cardExp: '',
      cardCvc: '',
    }
  }
  paymentModalOpen.value = true
}

function savePaymentModal() {
  const d = payDraft.value
  if (paymentModalEditingId.value) {
    const i = savedPayments.value.findIndex((x) => x.id === paymentModalEditingId.value)
    if (i >= 0) savedPayments.value[i] = { ...d }
    selectedPaymentId.value = d.id
  } else {
    savedPayments.value = [...savedPayments.value, { ...d }]
    selectedPaymentId.value = d.id
  }
  applySavedPayment(d)
  paymentModalOpen.value = false
}

const guestAddressLocked = ref(false)
/** After a failed guest submit, show red borders on invalid fields (not all browsers style :user-invalid on untouched inputs). */
const guestShipShowErrors = ref(false)

function guestAddressSummary() {
  const name = [firstName.value, lastName.value].filter(Boolean).join(' ')
  const line = [city.value, stateCode.value, zip.value].filter(Boolean).join(', ')
  return [name, address1.value, line].filter(Boolean).join(' · ')
}

function unlockGuestAddress() {
  guestAddressLocked.value = false
  guestShipShowErrors.value = false
}

/** Guest step 1: validate with Constraint Validation API, then lock address. */
function submitGuestAddressStep(e: Event) {
  const form = e.currentTarget as HTMLFormElement
  if (!form.checkValidity()) {
    guestShipShowErrors.value = true
    form.reportValidity()
    return
  }
  guestShipShowErrors.value = false
  guestAddressLocked.value = true
}

function advanceFromShipping() {
  if (isLoggedIn.value) {
    currentStep.value = 1
    maxReached.value = Math.max(maxReached.value, 1)
    return
  }
  if (!guestAddressLocked.value) {
    return
  }
  currentStep.value = 1
  maxReached.value = Math.max(maxReached.value, 1)
}

function advanceFromPayment() {
  currentStep.value = 2
  maxReached.value = Math.max(maxReached.value, 2)
}

function placeOrder() {
  demoOrderId.value = `DJ-${Date.now().toString(36).toUpperCase().slice(-8)}`
  orderPlaced.value = true
}

const stepsMeta = [
  { id: 'shipping', label: 'Shipping', progressShort: 'Ship' },
  { id: 'payment', label: 'Payment', progressShort: 'Pay' },
  { id: 'review', label: 'Review', progressShort: 'Review' },
] as const
</script>

<template>
  <div class="page">
    <div class="checkout-page-bg">
      <header class="checkout-top">
        <div class="checkout-top__inner">
          <nav class="crumb" aria-label="Breadcrumb">
            <RouterLink to="/">HOME</RouterLink>
            <img :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
            <RouterLink to="/cart">CART</RouterLink>
            <img :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
            <span>CHECKOUT</span>
          </nav>

          <div class="checkout-top__bar">
            <div class="checkout-headlines">
              <h1 class="h1">
                <span class="h1__icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L4 6v5c0 5.25 3.5 10.15 8 11 4.5-.85 8-5.75 8-11V6l-8-4z"
                      fill="var(--color-success)"
                      opacity="0.2"
                    />
                    <path
                      d="M12 2L4 6v5c0 5.25 3.5 10.15 8 11 4.5-.85 8-5.75 8-11V6l-8-4z"
                      stroke="var(--color-success)"
                      stroke-width="1.5"
                      fill="none"
                    />
                    <path
                      d="M9.2 12.4l1.8 1.8 4.2-4.2"
                      stroke="var(--color-success)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                {{ checkoutTitle }}
              </h1>
              <p v-if="checkoutSubtitle" class="checkout-sub">{{ checkoutSubtitle }}</p>
            </div>
            <div class="step-dots" role="group" aria-label="Checkout progress">
              <div
                v-for="(s, i) in stepsMeta"
                :key="s.id"
                class="step-dots__unit"
                :class="{
                  'step-dots__unit--has-tail': i < stepsMeta.length - 1,
                  'step-dots__unit--seg-done': maxReached >= i + 1,
                }"
              >
                <span
                  class="step-dots__n"
                  :class="{
                    'step-dots__n--active': i === currentStep && !(orderPlaced && i === 2),
                    'step-dots__n--done': i < currentStep || (i === 2 && orderPlaced),
                    'step-dots__n--has-tail': i < stepsMeta.length - 1,
                  }"
                >{{ i + 1 }}</span>
                <span class="step-dots__lbl">{{ s.progressShort }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="checkout-sheet">
      <div class="checkout-sheet__grid" :class="{ 'checkout-sheet__grid--order-done': orderPlaced }">
        <div class="checkout-sheet__main">
          <div class="checkout-sheet__pad checkout-sheet__pad--main">
            <div class="accordion" role="region" aria-label="Checkout steps">
          <section
            v-for="(s, i) in stepsMeta"
            :key="s.id"
            class="acc-step"
            :class="{ 'acc-step--future': i > maxReached }"
          >
            <button
              type="button"
              class="acc-step__bar"
              :class="{
                'acc-step__bar--active': currentStep === i && !(orderPlaced && i === 2),
                'acc-step__bar--done': i < currentStep || (orderPlaced && i === 2),
                'acc-step__bar--muted': orderPlaced && i === 2,
              }"
              :disabled="i > maxReached || (orderPlaced && i < 2)"
              :aria-expanded="currentStep === i"
              :aria-controls="`acc-panel-${s.id}`"
              @click="goToStep(i)"
            >
              <span class="acc-step__badge">{{ i + 1 }}</span>
              <span class="acc-step__title">{{ s.label }}</span>
              <span v-if="i < currentStep" class="acc-step__hint" aria-hidden="true">
                {{ i === 0 ? shippingSummary : i === 1 ? paymentSummary : '' }}
              </span>
            </button>

            <div
              :id="`acc-panel-${s.id}`"
              class="acc-step__panel"
              :hidden="currentStep !== i"
            >
              <div v-if="i === 0 && currentStep === 0" class="panel-body">
                <template v-if="isLoggedIn">
                  <h2 class="ship-to">Shipping to:</h2>
                  <div class="pick-list" role="radiogroup" aria-label="Shipping address">
                    <label
                      v-for="a in savedAddresses"
                      :key="a.id"
                      class="pick-card"
                      :class="{ 'pick-card--selected': selectedAddressId === a.id }"
                    >
                      <input v-model="selectedAddressId" class="pick-card__radio" type="radio" name="ship-addr" :value="a.id" />
                      <span class="pick-card__body">
                        <span class="pick-card__title">{{ a.address1 }}</span>
                        <span class="pick-card__sub">{{ a.city }}, {{ a.stateCode }} {{ a.zip }}</span>
                      </span>
                      <button
                        type="button"
                        class="pick-card__edit"
                        aria-label="Edit address"
                        @click.prevent.stop="openAddressModal(a.id)"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                            stroke="currentColor"
                            stroke-width="1.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </label>
                  </div>
                  <button type="button" class="btn-text" @click="openAddressModal()">+ Add new address</button>

                  <h2 class="ship-to ship-to--spaced">Shipping via:</h2>
                  <div class="pick-list" role="radiogroup" aria-label="Shipping method">
                    <label
                      v-for="m in shipMethodOptions"
                      :key="m.id"
                      class="pick-card pick-card--ship"
                      :class="{ 'pick-card--selected': selectedShipMethod === m.id }"
                    >
                      <input
                        v-model="selectedShipMethod"
                        class="pick-card__radio"
                        type="radio"
                        name="ship-method"
                        :value="m.id"
                      />
                      <span class="pick-card__body">
                        <span class="pick-card__title">{{ m.label }}</span>
                        <span v-if="m.amount === 0" class="pick-card__price pick-card__price--free">FREE</span>
                        <span v-else class="pick-card__price pick-card__price--paid">{{ money(m.amount) }}</span>
                      </span>
                    </label>
                  </div>
                  <button type="button" class="btn-primary" @click="advanceFromShipping">Save &amp; continue</button>
                </template>

                <template v-else>
                  <h2 class="ship-to">Shipping to:</h2>
                  <form
                    v-if="!guestAddressLocked"
                    class="guest-ship-form"
                    :class="{ 'guest-ship-form--show-errors': guestShipShowErrors }"
                    @submit.prevent="submitGuestAddressStep"
                  >
                    <div class="form-grid">
                      <label class="field">
                        <span class="field__l">First name <abbr title="required">*</abbr></span>
                        <input
                          v-model="firstName"
                          name="given-name"
                          type="text"
                          autocomplete="given-name"
                          required
                        />
                      </label>
                      <label class="field">
                        <span class="field__l">Last name <abbr title="required">*</abbr></span>
                        <input
                          v-model="lastName"
                          name="family-name"
                          type="text"
                          autocomplete="family-name"
                          required
                        />
                      </label>
                      <label class="field">
                        <span class="field__l">Company</span>
                        <input v-model="company" name="company" type="text" autocomplete="organization" />
                      </label>
                      <label class="field">
                        <span class="field__l">Country <abbr title="required">*</abbr></span>
                        <select v-model="country" name="country" autocomplete="country" required>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                        </select>
                      </label>
                      <label class="field">
                        <span class="field__l">City <abbr title="required">*</abbr></span>
                        <input
                          v-model="city"
                          name="city"
                          type="text"
                          autocomplete="address-level2"
                          required
                        />
                      </label>
                      <label class="field">
                        <span class="field__l">State <abbr title="required">*</abbr></span>
                        <select v-model="stateCode" name="state" autocomplete="address-level1" required>
                          <option v-for="st in usStates" :key="st.abbr" :value="st.abbr">{{ st.abbr }}</option>
                        </select>
                      </label>
                      <label class="field field--full">
                        <span class="field__l">Address line 1 <abbr title="required">*</abbr></span>
                        <input
                          v-model="address1"
                          name="address-line1"
                          type="text"
                          autocomplete="address-line1"
                          required
                        />
                      </label>
                      <label class="field field--full">
                        <span class="field__l">Address line 2</span>
                        <input
                          v-model="address2"
                          name="address-line2"
                          type="text"
                          autocomplete="address-line2"
                        />
                      </label>
                      <label class="field">
                        <span class="field__l">ZIP code <abbr title="required">*</abbr></span>
                        <input
                          v-model="zip"
                          name="postal-code"
                          type="text"
                          autocomplete="postal-code"
                          inputmode="numeric"
                          required
                        />
                      </label>
                      <label class="field">
                        <span class="field__l">Phone <abbr title="required">*</abbr></span>
                        <input v-model="phone" name="tel" type="tel" autocomplete="tel" required />
                      </label>
                    </div>
                    <button type="submit" class="btn-primary btn-primary--ship-cta">
                      Continue to shipping options
                    </button>
                  </form>
                  <template v-else>
                    <div class="guest-ship-review">
                      <p class="guest-ship-review__line">{{ guestAddressSummary() }}</p>
                      <button type="button" class="btn-text" @click="unlockGuestAddress">Edit address</button>
                      <h2 class="ship-to ship-to--spaced">Shipping via:</h2>
                      <div class="pick-list" role="radiogroup" aria-label="Shipping method">
                        <label
                          v-for="m in shipMethodOptions"
                          :key="m.id"
                          class="pick-card pick-card--ship"
                          :class="{ 'pick-card--selected': selectedShipMethod === m.id }"
                        >
                          <input
                            v-model="selectedShipMethod"
                            class="pick-card__radio"
                            type="radio"
                            name="guest-ship-method"
                            :value="m.id"
                          />
                          <span class="pick-card__body">
                            <span class="pick-card__title">{{ m.label }}</span>
                            <span v-if="m.amount === 0" class="pick-card__price pick-card__price--free">FREE</span>
                            <span v-else class="pick-card__price pick-card__price--paid">{{ money(m.amount) }}</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <button type="button" class="btn-primary btn-primary--ship-cta" @click="advanceFromShipping">
                      Save &amp; continue
                    </button>
                  </template>
                </template>
              </div>

              <div v-if="i === 1 && currentStep === 1" class="panel-body panel-body--pay">
                <p class="panel-lead panel-lead--secure">
                  <svg
                    class="panel-lead__lock"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 11V8a5 5 0 0 1 10 0v3"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                    />
                    <rect
                      x="5"
                      y="11"
                      width="14"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="1.75"
                    />
                    <circle cx="12" cy="16" r="1.25" fill="currentColor" />
                  </svg>
                  <span>All transactions are secure and encrypted.</span>
                </p>

                <template v-if="isLoggedIn">
                  <p class="pay-pick-label">Payment method</p>
                  <div class="pick-list" role="radiogroup" aria-label="Payment method">
                    <label
                      v-for="p in savedPayments"
                      :key="p.id"
                      class="pick-card pick-card--pay"
                      :class="{ 'pick-card--selected': selectedPaymentId === p.id }"
                    >
                      <input
                        v-model="selectedPaymentId"
                        class="pick-card__radio"
                        type="radio"
                        name="pay-method"
                        :value="p.id"
                      />
                      <span class="pick-card__body">
                        <span class="pick-card__title">Card ending in {{ p.cardNumber.replace(/\D/g, '').slice(-4) }}</span>
                        <span class="pick-card__sub">{{ p.cardName }} · {{ p.cardExp }}</span>
                      </span>
                      <button
                        type="button"
                        class="pick-card__edit"
                        aria-label="Update card"
                        @click.prevent.stop="openPaymentModal(p.id)"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                            stroke="currentColor"
                            stroke-width="1.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </label>
                  </div>
                  <button type="button" class="btn-text" @click="openPaymentModal()">+ Add another card</button>
                </template>

                <div v-else class="guest-pay">
                  <div class="guest-pay-card" role="group" aria-label="Card payment">
                    <label class="guest-pay-field" for="guest-cc-number">
                      <span class="guest-pay-field__l">Card number</span>
                      <div class="guest-pay-inputwrap guest-pay-inputwrap--number">
                        <div
                          class="guest-pay-cardlogo"
                          :class="{ 'guest-pay-cardlogo--active': detectedGuestCardBrand }"
                          aria-hidden="true"
                        >
                          <svg
                            v-if="detectedGuestCardBrand === 'visa'"
                            class="guest-pay-cardlogo__svg guest-pay-cardlogo__svg--visa"
                            viewBox="0 0 64 20"
                            width="36"
                            height="12"
                            aria-hidden="true"
                          >
                            <text
                              x="1"
                              y="14"
                              fill="#1a1f71"
                              font-family="system-ui, -apple-system, sans-serif"
                              font-size="12"
                              font-weight="800"
                              letter-spacing="0.06em"
                            >
                              VISA
                            </text>
                          </svg>
                          <svg
                            v-else-if="detectedGuestCardBrand === 'mastercard'"
                            class="guest-pay-cardlogo__svg"
                            viewBox="0 0 40 24"
                            width="28"
                            height="17"
                            aria-hidden="true"
                          >
                            <circle cx="15" cy="12" r="10" fill="#EB001B" />
                            <circle cx="25" cy="12" r="10" fill="#F79E1B" fill-opacity="0.95" />
                          </svg>
                          <svg
                            v-else-if="detectedGuestCardBrand === 'amex'"
                            class="guest-pay-cardlogo__svg"
                            viewBox="0 0 56 20"
                            width="36"
                            height="13"
                            aria-hidden="true"
                          >
                            <rect width="56" height="20" rx="3" fill="#016fd0" />
                            <text
                              x="28"
                              y="13"
                              fill="#fff"
                              font-family="system-ui, -apple-system, sans-serif"
                              font-size="8"
                              font-weight="800"
                              letter-spacing="0.04em"
                              text-anchor="middle"
                            >
                              AMEX
                            </text>
                          </svg>
                          <svg
                            v-else-if="detectedGuestCardBrand === 'discover'"
                            class="guest-pay-cardlogo__svg"
                            viewBox="0 0 56 20"
                            width="36"
                            height="13"
                            aria-hidden="true"
                          >
                            <rect width="56" height="20" rx="3" fill="#fff" stroke="#cbd5e1" stroke-width="1" />
                            <circle cx="28" cy="10" r="4.5" fill="#f47216" />
                          </svg>
                        </div>
                        <input
                          id="guest-cc-number"
                          v-model="cardNumber"
                          class="guest-pay-input guest-pay-input--number"
                          type="text"
                          inputmode="numeric"
                          autocomplete="cc-number"
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                    </label>
                    <div class="guest-pay-row">
                      <label class="guest-pay-field guest-pay-field--grow">
                        <span class="guest-pay-field__l">Name on card</span>
                        <input
                          v-model="cardName"
                          class="guest-pay-input"
                          type="text"
                          autocomplete="cc-name"
                          placeholder="As shown on card"
                        />
                      </label>
                      <label class="guest-pay-field guest-pay-field--exp">
                        <span class="guest-pay-field__l">Expires</span>
                        <input
                          v-model="cardExp"
                          class="guest-pay-input"
                          type="text"
                          autocomplete="cc-exp"
                          placeholder="MM / YY"
                        />
                      </label>
                    </div>
                    <label class="guest-pay-field guest-pay-field--cvc">
                      <span class="guest-pay-field__l">Security code</span>
                      <input
                        v-model="cardCvc"
                        class="guest-pay-input"
                        type="text"
                        autocomplete="cc-csc"
                        inputmode="numeric"
                        placeholder="CVC"
                      />
                    </label>
                  </div>
                </div>

                <div class="panel-actions">
                  <button type="button" class="btn-primary" @click="advanceFromPayment">Save &amp; continue</button>

                  <button type="button" class="btn-ghost" @click="goToStep(0)">Back</button>
                </div>
              </div>

              <div v-if="i === 2 && currentStep === 2" class="panel-body panel-body--review">
                <template v-if="!orderPlaced">
                  <h2 class="review__h">Review your order</h2>
                  <p class="review__intro">Confirm the details below match what you entered. Nothing is charged until you place the demo order.</p>

                  <section class="review-block" aria-labelledby="review-ship">
                    <h3 id="review-ship" class="review-block__h">Shipping</h3>
                    <ul class="review-block__list">
                      <li v-for="(line, idx) in shippingReviewLines" :key="'s' + idx">{{ line }}</li>
                    </ul>
                  </section>

                  <section class="review-block" aria-labelledby="review-pay">
                    <h3 id="review-pay" class="review-block__h">Payment</h3>
                    <dl class="review-dl">
                      <div class="review-dl__row">
                        <dt>Card</dt>
                        <dd>{{ maskedCardNumber }}</dd>
                      </div>
                      <div class="review-dl__row">
                        <dt>Name on card</dt>
                        <dd>{{ cardName || '—' }}</dd>
                      </div>
                      <div class="review-dl__row">
                        <dt>Expires</dt>
                        <dd>{{ cardExp || '—' }}</dd>
                      </div>
                      <div class="review-dl__row">
                        <dt>Security code</dt>
                        <dd>{{ cardCvc ? '•••' : '—' }}</dd>
                      </div>
                    </dl>
                  </section>

                  <section class="review-block" aria-labelledby="review-items">
                    <h3 id="review-items" class="review-block__h">Items</h3>
                    <ul class="review-items">
                      <li v-for="line in lines" :key="line.id" class="review-items__li">
                        <span class="review-items__t">{{ line.title }}</span>
                        <span class="review-items__p">{{ linePriceDetail(line) }}</span>
                      </li>
                    </ul>
                    <div class="review-totals">
                      <div class="review-totals__r">
                        <span>Subtotal</span><span>{{ money(subtotal) }}</span>
                      </div>
                      <div class="review-totals__r">
                        <span>Shipping ({{ shippingLabel }})</span>
                        <span :class="shippingAmount === 0 ? 'review-totals__free' : 'review-totals__ship-cost'">{{
                          shippingAmount === 0 ? 'FREE' : money(shippingAmount)
                        }}</span>
                      </div>
                      <div class="review-totals__r">
                        <span>Estimated tax</span><span>{{ money(tax) }}</span>
                      </div>
                      <div class="review-totals__r review-totals__r--grand">
                        <span>Total</span><span>{{ money(grandTotal) }}</span>
                      </div>
                    </div>
                  </section>

                  <div class="panel-actions panel-actions--end">
                    <button type="button" class="btn-primary" @click="placeOrder">Place order</button>
                    <button type="button" class="btn-ghost" @click="goToStep(1)">Back</button>
                  </div>
                </template>

                <div v-else class="done-card done-card--celebrate">
                  <div class="done-card__iconwrap" aria-hidden="true">
                    <svg class="done-card__check" viewBox="0 0 88 88" width="88" height="88" fill="none">
                      <circle cx="44" cy="44" r="40" fill="url(#done-grad)" opacity="0.95" />
                      <circle cx="44" cy="44" r="40" stroke="#fff" stroke-opacity="0.35" stroke-width="3" />
                      <path
                        d="M28 46l12 12 24-28"
                        stroke="#fff"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient id="done-grad" x1="12" y1="8" x2="76" y2="80" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#00c853" />
                          <stop offset="1" stop-color="#00a721" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p class="done-card__eyebrow">You’re all set</p>
                  <h2 class="done-card__h">Thank you — your order is in!</h2>
                  <p class="done-card__p">
                    Order
                    <RouterLink class="done-card__order" :to="{ name: 'account', hash: '#orders' }">{{
                      demoOrderId
                    }}</RouterLink>
                    is saved for this demo. Nothing was charged.
                  </p>
                  <p class="done-card__hint">Open your account to see it in order history anytime.</p>
                  <div class="panel-actions panel-actions--center done-card__actions">
                    <RouterLink to="/" class="btn-primary btn-primary--link">Continue shopping</RouterLink>
                    <RouterLink :to="{ name: 'account', hash: '#orders' }" class="btn-secondary btn-secondary--link"
                      >View order history</RouterLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>
            </div>
          </div>
        </div>

        <aside v-if="!orderPlaced" class="checkout-sheet__aside summary" aria-label="Order summary">
          <div class="checkout-sheet__pad checkout-sheet__pad--aside">
            <h2 class="summary__h">Order summary</h2>
            <ul class="summary__lines">
              <li v-for="line in lines" :key="line.id" class="sum-line">
                <img class="sum-line__img" :src="line.image" width="72" height="72" alt="" />
                <div class="sum-line__body">
                  <div class="sum-line__t">{{ line.title }}</div>
                  <div class="sum-line__p">{{ linePriceDetail(line) }}</div>
                </div>
              </li>
            </ul>
            <div class="summary__meta">
              <div class="summary__row">
                <span class="summary__k">Subtotal</span>
                <span class="summary__v">{{ money(subtotal) }}</span>
              </div>
              <div class="summary__row summary__row--ship">
                <div class="summary__ship-label">
                  <span class="summary__k">Shipping</span>
                  <span class="summary__ship-sub">{{ shippingLabel }}</span>
                </div>
                <span
                  class="summary__v"
                  :class="shippingAmount === 0 ? 'summary__v--free' : 'summary__v--ship-paid'"
                  >{{ shippingAmount === 0 ? 'FREE' : money(shippingAmount) }}</span
                >
              </div>
              <div class="summary__row">
                <span class="summary__k">Estimated tax</span>
                <span class="summary__v">{{ money(tax) }}</span>
              </div>
            </div>
            <div class="summary__total">
              <span class="summary__total-lbl">Total</span>
              <span class="summary__total-val">{{ money(grandTotal) }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </div>

    <Teleport to="body">
      <div
        v-if="addressModalOpen"
        class="modal-root"
        role="dialog"
        aria-modal="true"
        aria-labelledby="addr-modal-title"
      >
        <div class="modal-backdrop" @click="addressModalOpen = false" />
        <div class="modal-sheet">
          <h2 id="addr-modal-title" class="modal-title">{{ addressModalEditingId ? 'Edit address' : 'Add address' }}</h2>
          <div class="modal-form">
            <label class="field">
              <span class="field__l">First name</span>
              <input v-model="addrDraft.firstName" type="text" autocomplete="given-name" />
            </label>
            <label class="field">
              <span class="field__l">Last name</span>
              <input v-model="addrDraft.lastName" type="text" autocomplete="family-name" />
            </label>
            <label class="field field--full">
              <span class="field__l">Company</span>
              <input v-model="addrDraft.company" type="text" autocomplete="organization" />
            </label>
            <label class="field">
              <span class="field__l">Country</span>
              <select v-model="addrDraft.country">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </label>
            <label class="field">
              <span class="field__l">City</span>
              <input v-model="addrDraft.city" type="text" />
            </label>
            <label class="field">
              <span class="field__l">State</span>
              <select v-model="addrDraft.stateCode">
                <option v-for="st in usStates" :key="st.abbr" :value="st.abbr">{{ st.abbr }}</option>
              </select>
            </label>
            <label class="field field--full">
              <span class="field__l">Address line 1</span>
              <input v-model="addrDraft.address1" type="text" />
            </label>
            <label class="field field--full">
              <span class="field__l">Address line 2</span>
              <input v-model="addrDraft.address2" type="text" />
            </label>
            <label class="field">
              <span class="field__l">ZIP</span>
              <input v-model="addrDraft.zip" type="text" />
            </label>
            <label class="field">
              <span class="field__l">Phone</span>
              <input v-model="addrDraft.phone" type="tel" />
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-ghost" @click="addressModalOpen = false">Cancel</button>
            <button type="button" class="btn-primary" @click="saveAddressModal">Save address</button>
          </div>
        </div>
      </div>

      <div
        v-if="paymentModalOpen"
        class="modal-root"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-modal-title"
      >
        <div class="modal-backdrop" @click="paymentModalOpen = false" />
        <div class="modal-sheet modal-sheet--pay">
          <h2 id="pay-modal-title" class="modal-title">{{ paymentModalEditingId ? 'Update card' : 'Add card' }}</h2>
          <div class="modal-pay-fields">
            <label class="field field--full">
              <span class="field__l">Name on card</span>
              <input v-model="payDraft.cardName" type="text" autocomplete="cc-name" />
            </label>
            <label class="field field--full">
              <span class="field__l">Card number</span>
              <input v-model="payDraft.cardNumber" type="text" inputmode="numeric" autocomplete="cc-number" />
            </label>
            <label class="field">
              <span class="field__l">Expires</span>
              <input v-model="payDraft.cardExp" type="text" autocomplete="cc-exp" placeholder="MM / YY" />
            </label>
            <label class="field">
              <span class="field__l">Security code</span>
              <input v-model="payDraft.cardCvc" type="text" inputmode="numeric" autocomplete="cc-csc" />
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-ghost" @click="paymentModalOpen = false">Cancel</button>
            <button type="button" class="btn-primary" @click="savePaymentModal">Save card</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.sr-only {
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

.page {
  background: var(--color-page-bg);
  overflow-x: clip;
}

.checkout-page-bg {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  box-sizing: border-box;
  padding-bottom: 48px;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 61%,
    #f0f4f8 61%,
    #f0f4f8 100%
  );
}

@media (max-width: 959px) {
  .checkout-page-bg {
    background: #f0f4f8;
  }

  .checkout-top {
    margin-bottom: 12px;
  }
}

.checkout-top {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #dfe3ea;
}

.checkout-top__inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) var(--space-page-x) clamp(18px, 2.5vw, 24px);
}

.checkout-top__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.checkout-headlines {
  flex: 1 1 280px;
  min-width: 0;
}

.checkout-sub {
  margin: 8px 0 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: -0.02em;
}

.checkout-top__bar > .h1 {
  flex: 0 1 auto;
}

.checkout-sheet {
  width: 100%;
}

.checkout-sheet__grid {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
}

@media (min-width: 960px) {
  .checkout-sheet__grid {
    grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  }

  .checkout-sheet__grid--order-done {
    grid-template-columns: minmax(0, 1fr);
    max-width: var(--layout-max-width);
  }
}

.checkout-sheet__main {
  background: #fff;
}


.checkout-sheet__aside {
  background: #f0f4f8;
}

@media (max-width: 959px) {
  .checkout-sheet__main {
    background: #fff;
  }
}

.checkout-sheet__pad {
  box-sizing: border-box;
}

.checkout-sheet__pad--main {
  padding: clamp(36px, 5vw, 56px) clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px);
}

.checkout-sheet__pad--aside {
  padding: clamp(36px, 5vw, 56px) clamp(28px, 3.5vw, 44px) clamp(48px, 6vw, 80px);
  min-height: 100%;
}

.crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.crumb a {
  color: inherit;
  text-decoration: none;
}

.h1 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  color: var(--color-dark-blue);
}

.h1__icon {
  display: flex;
  flex-shrink: 0;
}

.step-dots {
  --step-bridge: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 auto;
  width: max-content;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.step-dots__unit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  min-width: 36px;
  max-width: 5.75rem;
}

.step-dots__unit--has-tail {
  margin-right: var(--step-bridge);
}

.step-dots__n {
  position: relative;
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #d1d7e0;
  color: var(--color-dark-blue);
  font-size: 14px;
  font-weight: 700;
}

.step-dots__n--has-tail::after {
  content: '';
  position: absolute;
  top: 50%;
  left: calc(100% + 2px);
  width: calc(var(--step-bridge) + 1px);
  height: 2px;
  margin-top: -1px;
  background: #d1d7e0;
  z-index: 0;
  pointer-events: none;
}

.step-dots__unit--seg-done .step-dots__n--has-tail::after {
  background: var(--color-dark-blue);
}

.step-dots__n--active,
.step-dots__n--done {
  background: var(--color-dark-blue);
  border-color: var(--color-dark-blue);
  color: #fff;
}

.step-dots__lbl {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
  text-align: center;
  line-height: 1.25;
  width: 100%;
  max-width: 5.5rem;
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.acc-step {
  background: #fff;
  overflow: hidden;
}

.acc-step--future .acc-step__bar {
  opacity: 0.5;
}

.acc-step__bar {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: none;
  background: #dee5ed;
  border-radius: 4px;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}

.acc-step__bar:disabled {
  cursor: default;
  opacity: 1;
}

.acc-step__bar--active {
  background: var(--color-dark-blue);
  color: #fff;
}

.acc-step__bar--done:not(.acc-step__bar--active) {
  background: #dee5ed;
  color: var(--color-dark-blue);
}

.acc-step__bar--muted {
  background: #e4e9ef;
  color: var(--color-dark-blue);
}

.acc-step__badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
}

.acc-step__bar--active .acc-step__badge {
  background: rgba(255, 255, 255, 0.22);
}

.acc-step__bar:not(.acc-step__bar--active):not(:disabled) .acc-step__badge {
  background: var(--color-dark-blue);
  color: #fff;
}

.acc-step__bar--done:not(.acc-step__bar--active) .acc-step__badge {
  background: var(--color-success);
  color: #fff;
}

.acc-step__bar--done:hover {
  background: #c6d0db;
}

.acc-step__title {
  justify-self: start;
}

.acc-step__hint {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.acc-step__bar--active .acc-step__hint {
  color: rgba(255, 255, 255, 0.9);
}

.acc-step__panel {
  background: #fff;
  padding-left: 50px;
}

.ship-to {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.panel-body {
  padding: 24px 0 28px;
}

.panel-body--pay {
  padding-top: 20px;
}

.panel-body--review {
  padding-top: 12px;
  padding-bottom: 12px;
}

.panel-lead {
  margin: 0 0 18px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.panel-lead--secure {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.45;
}

.panel-lead__lock {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-success);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 28px;
  margin-bottom: 32px;
}

@media (max-width: 560px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.field--full {
  grid-column: 1 / -1;
}

.field__l {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.field__l abbr {
  color: #c41e1e;
  text-decoration: none;
}

.field input,
.field select {
  padding: 11px 12px;
  border: 1px solid #d8dde6;
  border-radius: 4px;
  font-size: 15px;
  font-family: inherit;
  background: #fff;
  color: var(--color-text);
}

.field input:focus,
.field select:focus {
  outline: none;
  border-color: var(--color-dark-blue);
}

.guest-ship-form--show-errors .field input:invalid,
.guest-ship-form--show-errors .field select:invalid {
  border-color: #c41e1e;
  box-shadow: 0 0 0 3px rgba(196, 30, 30, 0.14);
}

.guest-ship-form .field input:user-invalid,
.guest-ship-form .field select:user-invalid {
  border-color: #c41e1e;
  box-shadow: 0 0 0 3px rgba(196, 30, 30, 0.14);
}

.guest-pay {
  width: 100%;
  max-width: 520px;
  margin: 0 0 28px;
}

.guest-pay-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px 20px 28px;
  border: 1px solid #d8dde6;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 30, 64, 0.04);
}

.guest-pay-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.guest-pay-field__l {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.guest-pay-inputwrap {
  position: relative;
  display: block;
}

.guest-pay-inputwrap--number .guest-pay-cardlogo {
  position: absolute;
  z-index: 1;
  left: 1px;
  top: 1px;
  bottom: 1px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px 0 0 7px;
  background: #f1f4f9;
  border-right: 1px solid #e2e8f0;
  box-sizing: border-box;
  pointer-events: none;
}

.guest-pay-inputwrap--number .guest-pay-cardlogo--active {
  background: #e8eef6;
  border-right-color: #cbd5e1;
}

.guest-pay-cardlogo__svg {
  display: block;
}

.guest-pay-cardlogo__svg--visa text {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.guest-pay-input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d8dde6;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  background: #fff;
  color: var(--color-text);
  box-sizing: border-box;
}

.guest-pay-input::placeholder {
  color: var(--color-input-placeholder, #6b7280);
}

.guest-pay-input:focus {
  outline: none;
  border-color: var(--color-dark-blue);
  box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.12);
}

.guest-pay-inputwrap--number .guest-pay-input--number {
  position: relative;
  z-index: 0;
  width: 100%;
  padding-left: 58px;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 16px;
  letter-spacing: 0.04em;
}

.guest-pay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
  align-items: flex-end;
}

.guest-pay-field--grow {
  flex: 1;
  min-width: min(100%, 200px);
}

.guest-pay-field--exp {
  width: 140px;
  flex-shrink: 0;
}

.guest-pay-field--cvc {
  max-width: 160px;
}

@media (max-width: 480px) {
  .guest-pay-field--exp {
    width: 100%;
  }

  .guest-pay-field--cvc {
    max-width: none;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 36px;
  border: none;
  border-radius: 8px;
  background: var(--color-success);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
}

.btn-primary:hover {
  filter: brightness(1.05);
}

.btn-primary--link {
  text-decoration: none;
}

.btn-ghost {
  padding: 12px 18px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--color-dark-blue);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
}

.btn-ghost:hover {
  text-decoration: underline;
}

.panel-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding-top: 30px;
}

.panel-actions--center {
  justify-content: center;
  margin-top: 8px;
}

.panel-actions--end {
  justify-content: flex-end;
  margin-top: 8px;
}

.review__h {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.review__intro {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.review-block {
  margin-bottom: 24px;
}

.review-block__h {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
}

.review-block__list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 15px;
  line-height: 1.55;
  color: var(--color-text);
}

.review-dl {
  margin: 0;
}

.review-dl__row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.review-dl__row dt {
  margin: 0;
  color: var(--color-text-muted);
  font-weight: 500;
}

.review-dl__row dd {
  margin: 0;
  color: var(--color-text);
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 14px;
}

.review-items {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
}

.review-items__li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 0;
  font-size: 14px;
}

.review-items__t {
  font-weight: 600;
  color: var(--color-dark-blue);
}

.review-items__p {
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.review-totals {
  font-size: 14px;
}

.review-totals__r {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  color: var(--color-text-muted);
}

.review-totals__r--grand {
  margin-top: 8px;
  padding-top: 12px;
  font-size: 17px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.review-totals__free {
  color: var(--color-success);
  font-weight: 700;
}

.done-card {
  text-align: center;
  max-width: 440px;
  margin: 0 auto;
  padding: 16px 0 24px;
}

.done-card--celebrate {
  position: relative;
  max-width: min(100%, 640px);
}

.done-card--celebrate::before {
  content: '';
  position: absolute;
  inset: -30% -20% auto;
  height: 70%;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 200, 83, 0.18), transparent 65%);
  pointer-events: none;
}

.done-card__iconwrap {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  animation: done-card-pop 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.done-card__check {
  display: block;
  filter: drop-shadow(0 10px 20px rgba(0, 120, 40, 0.25));
}

.done-card__eyebrow {
  position: relative;
  z-index: 1;
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-success);
}

.done-card__h {
  position: relative;
  z-index: 1;
  margin: 0 0 14px;
  font-size: clamp(26px, 4vw, 34px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.15;
  background: var(--color-dark-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.done-card__p {
  position: relative;
  z-index: 1;
  margin: 0 0 10px;
  font-size: 16px;
  color: var(--color-text);
  line-height: 1.55;
}

.done-card__order {
  display: inline-block;
  margin: 0 0.12em;
  padding: 2px 8px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--color-dark-blue);
  text-decoration: none;
  border-radius: 6px;
  background: rgba(15, 83, 149, 0.1);
  border: 1px solid rgba(15, 83, 149, 0.22);
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;
}

.done-card__order:hover {
  background: rgba(15, 83, 149, 0.16);
  border-color: var(--color-light-blue);
  transform: translateY(-1px);
}

.done-card__hint {
  position: relative;
  z-index: 1;
  margin: 0 0 28px;
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.done-card__actions {
  position: relative;
  z-index: 1;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.btn-secondary--link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 8px;
  border: 2px solid rgba(0, 30, 64, 0.18);
  background: #fff;
  color: var(--color-dark-blue);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.btn-secondary--link:hover {
  border-color: var(--color-light-blue);
  background: var(--color-surface-muted);
}

.summary {
  margin: 0;
}

.summary__h {
  margin: 0 0 28px;
  padding: 0;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
}

.summary__lines {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
}

.sum-line {
  display: flex;
  gap: 16px;
  padding: 0 0 22px;
}

.sum-line + .sum-line {
  padding-top: 22px;
}

.sum-line__img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  flex-shrink: 0;
}

.sum-line__t {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-dark-blue);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sum-line__p {
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.summary__meta {
  padding: 0 0 4px;
}

.summary__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 0;
  font-size: 13px;
}

.summary__row--ship {
  align-items: center;
}

.summary__ship-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.summary__k {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.summary__ship-sub {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: none;
  color: var(--color-text-soft);
}

.summary__v {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text);
}

.summary__v--free {
  color: var(--color-success);
  font-weight: 700;
  font-size: 14px;
}

.summary__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 22px;
  border-top: 1px solid #c5d0dc;
}

.summary__total-lbl {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-dark-blue);
}

.summary__total-val {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-dark-blue);
  letter-spacing: -0.02em;
}

.summary__v--ship-paid {
  color: var(--color-dark-blue);
  font-weight: 800;
}

.ship-to--spaced {
  margin-top: 28px;
}

.pick-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 12px;
}

.pick-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px 16px;
  padding: 16px 18px;
  border: 2px solid #d1d7e0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.pick-card--selected {
  border-color: var(--color-light-blue);
  box-shadow: 0 0 0 1px rgba(15, 83, 149, 0.12);
}

.pick-card__radio {
  width: 18px;
  height: 18px;
  accent-color: var(--color-light-blue);
  cursor: pointer;
}

.pick-card__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.pick-card__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.pick-card__sub {
  font-size: 13px;
  color: var(--color-text-muted);
}

.pick-card__price {
  font-size: 15px;
  font-weight: 800;
  margin-top: 4px;
}

.pick-card__price--free {
  color: var(--color-success);
}

.pick-card__price--paid {
  color: var(--color-dark-blue);
}

.pick-card--ship .pick-card__body {
  gap: 2px;
}

.pick-card__edit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.pick-card__edit:hover {
  background: var(--color-gray-section);
}

.btn-text {
  display: inline-block;
  margin: 0 0 8px;
  padding: 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-light-blue);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-family: inherit;
}

.btn-text:hover {
  color: var(--color-dark-blue);
}

.btn-primary--ship-cta {
  margin-top: 8px;
}

.pay-pick-label {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
}

.guest-ship-review__line {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text);
  font-weight: 600;
}

.review-totals__ship-cost {
  color: var(--color-dark-blue);
  font-weight: 800;
}

.modal-root {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 20, 50, 0.45);
}

.modal-sheet {
  position: relative;
  z-index: 1;
  width: min(520px, 100%);
  max-height: min(90vh, 720px);
  overflow: auto;
  padding: 24px 24px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 20, 50, 0.25);
}

.modal-sheet--pay {
  max-width: 400px;
}

.modal-title {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.modal-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  margin-bottom: 24px;
}

.modal-pay-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 560px) {
  .modal-form,
  .modal-pay-fields {
    grid-template-columns: 1fr;
  }
}
</style>
