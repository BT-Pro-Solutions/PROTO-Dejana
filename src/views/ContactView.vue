<script setup lang="ts">
import { inject, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { media } from '../assets/media'
import { toastKey } from '../layout/toast'

const toast = inject(toastKey, null)

const businessTypes = [
  'Dealership',
  'Fleet',
  'Leasing Company',
  'Municipality',
  'Contractor',
  'Other',
] as const

/** Enough coverage for a realistic demo select (reference site lists all states). */
const stateOptions = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'DC',
] as const

const hqMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('500 Pulaski Road, Kings Park, NY 11754')

function onSubmit(e: Event) {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }
  toast?.push({
    message: 'Thanks — your message was captured for this demo only; nothing was sent.',
  })
  form.reset()
  smsConsent.value = false
}

const smsConsent = ref(false)
</script>

<template>
  <div class="contact">
    <header class="contact__mast" aria-labelledby="contact-h1">
      <div class="contact__wrap">
        <nav class="contact__crumb" aria-label="Breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <img class="contact__crumb-ico" :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
          <span class="contact__crumb-here">Contact Us</span>
        </nav>
        <h1 id="contact-h1" class="contact__h1">Contact Us</h1>
        <p class="contact__intro">
          Reach our team with product questions, quotes, or support. This prototype form matches the structure of the live
          Dejana contact experience for demonstration purposes.
        </p>
      </div>
    </header>

    <div class="contact__wrap contact__grid">
      <section class="contact__panel" aria-labelledby="contact-form-title">
        <h2 id="contact-form-title" class="contact__h2">Send a message</h2>
        <form class="contact__form" @submit="onSubmit">
          <div class="contact__row contact__row--2">
            <label class="contact__field">
              <span class="contact__label">First name <abbr title="required">*</abbr></span>
              <input name="firstName" type="text" autocomplete="given-name" required />
            </label>
            <label class="contact__field">
              <span class="contact__label">Last name <abbr title="required">*</abbr></span>
              <input name="lastName" type="text" autocomplete="family-name" required />
            </label>
          </div>

          <label class="contact__field">
            <span class="contact__label">Type of business</span>
            <select name="businessType">
              <option value="">Select…</option>
              <option v-for="t in businessTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>

          <label class="contact__field">
            <span class="contact__label">Company name</span>
            <input name="company" type="text" autocomplete="organization" />
          </label>

          <div class="contact__row contact__row--2">
            <label class="contact__field">
              <span class="contact__label">Email <abbr title="required">*</abbr></span>
              <input name="email" type="email" autocomplete="email" required />
            </label>
            <label class="contact__field">
              <span class="contact__label">Phone <abbr title="required">*</abbr></span>
              <input name="phone" type="tel" autocomplete="tel" required />
            </label>
          </div>

          <label class="contact__field">
            <span class="contact__label">Street address <abbr title="required">*</abbr></span>
            <input name="address1" type="text" autocomplete="street-address" required />
          </label>

          <div class="contact__row contact__row--3">
            <label class="contact__field contact__field--grow">
              <span class="contact__label">City <abbr title="required">*</abbr></span>
              <input name="city" type="text" autocomplete="address-level2" required />
            </label>
            <label class="contact__field">
              <span class="contact__label">State <abbr title="required">*</abbr></span>
              <select name="state" autocomplete="address-level1" required>
                <option value="">State</option>
                <option v-for="st in stateOptions" :key="st" :value="st">{{ st }}</option>
              </select>
            </label>
            <label class="contact__field">
              <span class="contact__label">ZIP code <abbr title="required">*</abbr></span>
              <input name="zip" type="text" inputmode="numeric" autocomplete="postal-code" required />
            </label>
          </div>

          <label class="contact__field">
            <span class="contact__label">Questions / comments <abbr title="required">*</abbr></span>
            <textarea name="message" rows="5" required placeholder="How can we help?" />
          </label>

          <label class="contact__sms">
            <input v-model="smsConsent" type="checkbox" name="smsConsent" required />
            <span>
              I consent to receive SMS from Dejana Truck &amp; Utility Equipment Company, LLC. Reply STOP to opt out;
              Reply HELP for assistance; message and data rates may apply. Read our
              <RouterLink :to="{ name: 'privacy-policy' }">privacy policy</RouterLink>.
            </span>
          </label>

          <button type="submit" class="contact__submit">Submit</button>
        </form>
      </section>

      <div class="contact__rail">
        <aside class="contact__aside" aria-labelledby="contact-aside-h">
          <p id="contact-aside-h" class="contact__aside-eyebrow">Need more help?</p>
          <h2 class="contact__aside-h">Contact a Dejana sales rep</h2>
          <p class="contact__aside-lead">
            Call or visit corporate headquarters — same numbers as
            <a href="https://dejana.com/contact-us/" rel="noopener noreferrer" target="_blank">dejana.com</a>.
          </p>

          <div class="contact__hq">
            <h3 class="contact__hq-title">Corporate headquarters</h3>
            <a class="contact__hq-addr" :href="hqMapsUrl" rel="noopener noreferrer" target="_blank">
              500 Pulaski Road<br />
              Kings Park, NY 11754
            </a>
            <ul class="contact__phones">
              <li>
                <span class="contact__phones-k">Main</span>
                <a href="tel:+18773352621">877.335.2621</a>
              </li>
              <li>
                <span class="contact__phones-k">Parts</span>
                <a href="tel:+16319675200">631.967.5200</a>
              </li>
              <li>
                <span class="contact__phones-k">Service</span>
                <a href="tel:+16319675399">631.967.5399</a>
              </li>
            </ul>
          </div>
        </aside>

        <div class="contact__photo" aria-hidden="true">
          <img
            src="https://dejana.com/wp-content/uploads/2017/06/main-slider-sales-staff-4-1280x512.jpg"
            alt=""
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  min-height: 60vh;
  background: var(--color-page-bg);
  color: var(--color-text);
  padding-bottom: clamp(48px, 10vw, 80px);
}

.contact__mast {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-strong);
}

.contact__wrap {
  max-width: var(--max-content);
  margin: 0 auto;
  padding-left: var(--space-page-x);
  padding-right: var(--space-page-x);
}

.contact__mast .contact__wrap {
  padding-top: clamp(20px, 4vw, 32px);
  padding-bottom: clamp(24px, 5vw, 40px);
}

.contact__crumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.contact__crumb a {
  color: var(--color-link);
  text-decoration: none;
}

.contact__crumb a:hover {
  text-decoration: underline;
}

.contact__crumb-ico {
  opacity: 0.45;
}

.contact__crumb-here {
  color: var(--color-text-muted);
}

.contact__h1 {
  margin: 0 0 12px;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-dark-blue);
}

.contact__intro {
  margin: 0;
  max-width: 52rem;
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.contact__grid {
  display: grid;
  gap: clamp(28px, 5vw, 48px);
  padding-top: clamp(28px, 5vw, 44px);
  align-items: stretch;
}

@media (min-width: 960px) {
  .contact__grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  }
}

.contact__rail {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 24px);
  min-height: 0;
}

.contact__photo {
  display: none;
}

@media (min-width: 960px) {
  .contact__photo {
    display: block;
    flex: 1 1 auto;
    min-height: 200px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-surface-muted, #e8edf3);
  }

  .contact__photo img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 0;
    object-fit: cover;
    object-position: center 20%;
  }
}

.contact__panel {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: clamp(20px, 4vw, 28px);
}

.contact__h2 {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact__row {
  display: grid;
  gap: 16px;
}

.contact__row--2 {
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 560px) {
  .contact__row--2 {
    grid-template-columns: 1fr;
  }
}

.contact__row--3 {
  grid-template-columns: 1fr auto auto;
  gap: 12px;
}

@media (max-width: 640px) {
  .contact__row--3 {
    grid-template-columns: 1fr;
  }
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.contact__field--grow {
  min-width: 0;
}

.contact__label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.contact__label abbr {
  text-decoration: none;
  color: #b42318;
}

.contact__field input,
.contact__field select,
.contact__field textarea {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #c9ced8;
  font-size: 15px;
  font-family: inherit;
  background: #fff;
}

.contact__field textarea {
  resize: vertical;
  min-height: 120px;
}

.contact__field input:focus,
.contact__field select:focus,
.contact__field textarea:focus {
  outline: 2px solid rgba(15, 83, 149, 0.35);
  outline-offset: 1px;
}

.contact__sms {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.contact__sms input {
  margin-top: 4px;
  flex-shrink: 0;
}

.contact__sms :deep(a) {
  color: var(--color-link);
  font-weight: 600;
}

.contact__submit {
  margin-top: 4px;
  align-self: flex-start;
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-lg, 10px);
  background: var(--color-dark-blue);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}

.contact__submit:hover {
  filter: brightness(1.06);
}

.contact__aside {
  background: linear-gradient(165deg, rgba(15, 83, 149, 0.08) 0%, rgba(0, 30, 64, 0.04) 100%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: clamp(20px, 4vw, 28px);
}

.contact__aside-eyebrow {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contact__aside-h {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 800;
  color: var(--color-dark-blue);
  letter-spacing: -0.02em;
}

.contact__aside-lead {
  margin: 0 0 22px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.contact__aside-lead a {
  color: var(--color-link);
  font-weight: 600;
}

.contact__hq-title {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.contact__hq-addr {
  display: inline-block;
  margin-bottom: 18px;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 600;
  color: var(--color-dark-blue);
  text-decoration: none;
}

.contact__hq-addr:hover {
  text-decoration: underline;
}

.contact__phones {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact__phones li {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: baseline;
  font-size: 15px;
}

.contact__phones-k {
  min-width: 4.5rem;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contact__phones a {
  color: var(--color-link);
  font-weight: 700;
  text-decoration: none;
}

.contact__phones a:hover {
  text-decoration: underline;
}
</style>
