<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { compareProducts, compareRows } from '../data/site'
import { media } from '../assets/media'
import AddToCartButton from '../components/AddToCartButton.vue'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function formatPrice(n: number) {
  return money.format(n)
}

const productSpecs = computed(() =>
  compareProducts.map((p, col) => ({
    product: p,
    rows: compareRows.map((row) => ({ label: row.label, value: row.values[col] })),
  })),
)
</script>

<template>
  <div class="page">
    <div class="page__inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <RouterLink to="/">HOME</RouterLink>
        <img :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
        <span>COMPARE</span>
      </nav>

      <header class="intro">
        <h1 class="h1">Compare Tool</h1>
        <p class="lede">
          Click the <strong>COMPARE</strong> button on products to bring items into this tool for comparison.
        </p>
      </header>

      <!-- Mobile / narrow: one card per product -->
      <div class="cards" aria-label="Product comparison">
        <article v-for="block in productSpecs" :key="block.product.id" class="card">
          <div class="card__media">
            <img :src="block.product.image" :alt="block.product.title" class="card__img" />
          </div>
          <p class="card__sku">SKU: {{ block.product.sku }}</p>
          <h2 class="card__title">{{ block.product.title }}</h2>
          <p class="card__price">{{ formatPrice(block.product.price) }}</p>
          <dl class="card__dl">
            <template v-for="row in block.rows" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </template>
          </dl>
          <div class="btn-stack">
            <AddToCartButton block />
            <button
              type="button"
              class="btn-outline"
              :aria-label="'Remove ' + block.product.title + ' from compare'"
            >
              Remove from compare
            </button>
          </div>
        </article>
      </div>

      <!-- Desktop: full compare grid -->
      <div class="table-wrap" role="region" aria-label="Comparison table" tabindex="0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="table__corner">Specifications</th>
              <th v-for="p in compareProducts" :key="p.id" scope="col" class="table__prod">
                <div class="table__prod-inner">
                  <img :src="p.image" :alt="p.title" class="table__img" />
                  <div class="table__sku">SKU: {{ p.sku }}</div>
                  <div class="table__title">{{ p.title }}</div>
                  <div class="table__price">{{ formatPrice(p.price) }}</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label">
              <th scope="row" class="table__attr">{{ row.label }}</th>
              <td v-for="(cell, i) in row.values" :key="i" class="table__cell">{{ cell }}</td>
            </tr>
            <tr class="table__actions">
              <td class="table__attr table__attr--muted" aria-hidden="true"></td>
              <td v-for="p in compareProducts" :key="'atc-' + p.id" class="table__atc-cell">
                <div class="btn-stack">
                  <AddToCartButton block />
                  <button type="button" class="btn-outline" :aria-label="'Remove ' + p.title + ' from compare'">
                    Remove from compare
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: var(--color-page-bg);
  padding-bottom: 64px;
}

.page__inner {
  max-width: var(--max-content);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px) var(--space-page-x);
}

.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.crumb a {
  color: inherit;
  text-decoration: none;
}

.intro {
  margin-bottom: clamp(24px, 4vw, 36px);
}

.h1 {
  margin: 0 0 10px;
  font-size: clamp(30px, 4.5vw, 40px);
  font-weight: 800;
  font-family: var(--font-sans);
  color: var(--color-dark-blue);
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.lede {
  margin: 0;
  max-width: 52ch;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.lede strong {
  color: var(--color-dark-blue);
  font-weight: 700;
}

/* —— Mobile cards —— */
.cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: #fff;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: 20px;
}

.card__media {
  background: var(--color-card-image-bg);
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card__sku {
  margin: 0 0 6px;
  font-size: 12px;
  color: var(--color-caption);
}

.card__title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-dark-blue);
}

.card__price {
  margin: 0 0 16px;
  font-size: 26px;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.card__dl {
  margin: 0 0 20px;
  display: grid;
  grid-template-columns: minmax(0, 38%) 1fr;
  gap: 8px 16px;
  font-size: 14px;
}

.card__dl dt {
  margin: 0;
  font-weight: 700;
  color: var(--color-dark-blue);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.06em;
}

.card__dl dd {
  margin: 0;
  color: var(--color-text);
  line-height: 1.45;
}

.btn-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.btn-outline {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 2px solid var(--color-dark-blue);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-dark-blue);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.btn-outline:hover {
  background: #001e4014;
}

.btn-outline:focus-visible {
  outline: 2px solid var(--color-light-blue);
  outline-offset: 2px;
}

/* —— Desktop table —— */
.table-wrap {
  display: none;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius-md);
  outline: none;
}

.table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid var(--color-border-strong);
}

.table th,
.table td {
  padding: 14px 16px;
  border: 1px solid var(--color-border-strong);
  vertical-align: top;
}

.table__corner {
  width: 200px;
  text-align: left;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
  background: var(--color-surface-muted);
}

.table__prod {
  min-width: 200px;
  max-width: 280px;
  text-align: left;
  background: #fff;
}

.table__prod-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.table__img {
  width: 100%;
  max-height: 140px;
  object-fit: contain;
  margin-bottom: 10px;
}

.table__sku {
  font-size: 12px;
  color: var(--color-caption);
  margin-bottom: 6px;
}

.table__title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-dark-blue);
  margin-bottom: 8px;
  line-height: 1.25;
}

.table__price {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.table__attr {
  text-align: left;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
  background: var(--color-surface-muted);
}

.table__attr--muted {
  background: var(--color-surface-muted);
}

.table__cell {
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.45;
}

.table__actions td,
.table__actions th {
  border-top-width: 2px;
}

.table__atc-cell {
  vertical-align: top;
}

@media (min-width: 768px) {
  .cards {
    display: none;
  }

  .table-wrap {
    display: block;
  }
}

@media (min-width: 768px) and (max-width: 899px) {
  .table {
    min-width: 720px;
  }
}
</style>
