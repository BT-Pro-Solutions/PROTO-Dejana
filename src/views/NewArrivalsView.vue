<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { media } from '../assets/media'
import { listingProducts, newArrivalsFilters } from '../data/site'

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name: A-Z' },
]

const sortBy = ref('newest')
</script>

<template>
  <div class="page">
    <header class="mast" aria-labelledby="na-heading">
      <div class="wrap">
        <nav class="crumb" aria-label="Breadcrumb">
          <RouterLink to="/">HOME</RouterLink>
          <img class="crumb__ico" :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
          <span class="crumb__here">NEW ARRIVALS</span>
        </nav>

        <div class="mast__row">
          <div class="mast__copy">
            <h1 id="na-heading" class="mast__h1">New arrivals</h1>
            <p class="mast__lead">Fresh stock and seasonal drops — {{ listingProducts.length }} items just in.</p>
          </div>
          <div class="mast__sort">
            <label class="sort">
              <span class="sort__label">SORT BY:</span>
              <select v-model="sortBy" class="sort__select">
                <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </header>

    <div class="sheet">
      <div class="wrap">
        <div class="layout">
          <aside class="filters" aria-label="Filters">
            <div v-for="g in newArrivalsFilters" :key="g.title" class="filters__group">
              <h3 class="filters__h">{{ g.title }}</h3>
              <label v-for="(opt, idx) in g.options" :key="idx" class="filters__row">
                <input type="checkbox" class="filters__cb" :checked="!!opt.checked" />
                <span>{{ opt.label }}</span>
              </label>
            </div>
            <RouterLink to="/compare" class="filters__compare">
              <span class="filters__compare-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M8 7h12M8 12h12M8 17h12" stroke-linecap="round" />
                  <circle cx="5" cy="7" r="1.35" fill="currentColor" stroke="none" />
                  <circle cx="5" cy="12" r="1.35" fill="currentColor" stroke="none" />
                  <circle cx="5" cy="17" r="1.35" fill="currentColor" stroke="none" />
                </svg>
              </span>
              Compare Items (3)
            </RouterLink>
          </aside>

          <div class="results">
            <div class="grid">
              <div v-for="p in listingProducts" :key="p.id" class="grid__cell">
                <ProductCard :product="p" category-grid show-new-badge dark-grid />
              </div>
            </div>
            <nav class="pagination" aria-label="Pagination">
              <button type="button" class="pg pg--arrow" aria-label="Previous page">‹</button>
              <button type="button" class="pg pg--active">1</button>
              <button type="button" class="pg">2</button>
              <button type="button" class="pg">3</button>
              <button type="button" class="pg pg--arrow" aria-label="Next page">›</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  --na-bg: var(--color-dark-blue);
  --na-line: rgba(255, 255, 255, 0.12);
  --na-muted: rgba(255, 255, 255, 0.72);
  --plp-sidebar-w: 268px;
  --plp-layout-gap: 48px;
  background: var(--na-bg);
  padding-bottom: 56px;
}

.wrap {
  max-width: var(--max-content);
  margin: 0 auto;
  padding-left: var(--space-page-x);
  padding-right: var(--space-page-x);
}

.mast {
  background: #fff;
  padding: 24px 0 32px;
}

.crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7a808a;
  margin-bottom: 22px;
}

.crumb a {
  color: #5c6370;
  text-decoration: none;
}

.crumb a:hover {
  color: var(--color-dark-blue);
}

.crumb__here {
  color: #4a5058;
}

.crumb__ico {
  opacity: 0.55;
}

.mast__row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
}

@media (min-width: 900px) {
  .mast__row {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
  }
}

.mast__copy {
  flex: 1;
  min-width: 0;
  max-width: 820px;
}

.mast__h1 {
  margin: 0 0 12px;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
  color: #002d62;
}

.mast__lead {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  color: #43474f;
}

.mast__sort {
  flex-shrink: 0;
}

@media (min-width: 900px) {
  .mast__sort {
    padding-bottom: 2px;
  }
}

.sort {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.sort__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #5c6370;
}

.sort__select {
  width: 100%;
  max-width: 320px;
  min-width: 0;
  padding: 11px 40px 11px 14px;
  border-radius: 4px;
  border: 1px solid #d9dee5;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-dark-blue);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23001e40' stroke-width='1.5' d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.sheet {
  background: var(--na-bg);
  padding: 28px 0 0;
  box-shadow: inset 0 1px 0 var(--na-line);
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: var(--plp-sidebar-w) minmax(0, 1fr);
    column-gap: var(--plp-layout-gap);
    align-items: start;
  }
}

.filters__group {
  margin-bottom: 28px;
}

.filters__h {
  margin: 0 0 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.92);
}

.filters__row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--na-muted);
  cursor: pointer;
}

.filters__cb {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  accent-color: var(--cta-yellow);
  cursor: pointer;
}

.filters__compare {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 16px 18px;
  border: 1px solid var(--na-line);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.filters__compare:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.22);
}

.filters__compare-icon {
  display: flex;
  color: var(--cta-yellow);
}

.results {
  min-width: 0;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-bottom: 40px;
}

.grid__cell {
  display: flex;
  min-width: 0;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) and (max-width: 1099px) {
  .grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 28px;
    row-gap: 28px;
  }

  .grid__cell {
    grid-column: span 6;
  }
}

@media (min-width: 1100px) {
  .grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 28px;
    row-gap: 28px;
  }

  .grid__cell {
    grid-column: span 4;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pg {
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--na-line);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 15px;
  font-weight: 600;
  color: var(--na-muted);
  cursor: pointer;
}

.pg:hover:not(.pg--active):not(.pg--arrow) {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.pg--active {
  background: #fff;
  color: var(--color-dark-blue);
  border-color: #fff;
  font-weight: 700;
}

.pg--arrow {
  font-size: 22px;
  line-height: 1;
  font-weight: 400;
  color: #fff;
  border-color: transparent;
  background: transparent;
}

.pg--arrow:hover {
  color: var(--cta-yellow);
  background: transparent;
}
</style>
