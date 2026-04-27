<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import PlpFiltersShell from '../components/PlpFiltersShell.vue'
import { usePlpFilterChecks } from '../composables/usePlpFilterChecks'
import { media } from '../assets/media'
import { filterGroups, listingProducts, searchQueryDemo } from '../data/site'

const route = useRoute()
const displayQuery = computed(() => {
  const q = route.query.q
  return typeof q === 'string' && q.trim() ? q.trim() : searchQueryDemo
})

const sortOptions = [
  { value: 'most-relevant', label: 'Most Relevant' },
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name: A-Z' },
]

const sortBy = ref('most-relevant')

const { activeFilterCount, isOn, onCheck } = usePlpFilterChecks(filterGroups)
</script>

<template>
  <div class="page">
    <header class="mast" aria-labelledby="search-heading">
      <div class="wrap">
        <nav class="crumb" aria-label="Breadcrumb">
          <RouterLink to="/">HOME</RouterLink>
          <img class="crumb__ico" :src="media.icons.breadcrumbSep" width="5" height="7" alt="" />
          <span class="crumb__here">SEARCH RESULTS</span>
        </nav>

        <div class="mast__row">
          <div class="mast__copy">
            <h1 id="search-heading" class="mast__h1">
              Search results for <b>'{{ displayQuery }}'</b>
            </h1>
            <p class="mast__lead">12 results found</p>
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
        <PlpFiltersShell :active-filter-count="activeFilterCount">
          <template #filters>
            <div v-for="(g, gi) in filterGroups" :key="g.title" class="filters__group">
              <h3 class="filters__h">{{ g.title }}</h3>
              <label v-for="(opt, oi) in g.options" :key="opt" class="filters__row">
                <input
                  type="checkbox"
                  class="filters__cb"
                  :checked="isOn(gi, oi)"
                  @change="onCheck(gi, oi, $event)"
                />
                <span>{{ opt }}</span>
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
          </template>

          <div class="results">
            <div class="grid">
              <div v-for="p in listingProducts" :key="p.id" class="grid__cell">
                <ProductCard :product="p" category-grid />
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
        </PlpFiltersShell>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  --plp-sidebar-w: 268px;
  --plp-layout-gap: 48px;
  --plp-content-bg: #f0f2f5;
  --plp-line: #d9dee5;
  background: var(--plp-content-bg);
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
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.12;
  color: #002d62;
}

.mast__h1 b {
  font-weight: 800;
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
  border: 1px solid var(--plp-line);
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-dark-blue);
  cursor: pointer;
  appearance: none;
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23001e40' stroke-width='1.5' d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.sheet {
  background: var(--plp-content-bg);
  padding: 28px 0 0;
}

.filters__group {
  margin-bottom: 28px;
}

.filters__h {
  margin: 0 0 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #002d62;
}

.filters__row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #4a4f58;
  cursor: pointer;
}

.filters__cb {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  accent-color: #002d62;
  cursor: pointer;
}

.filters__compare {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 16px 18px;
  border: 1px solid #002d62;
  border-radius: 4px;
  background: #fff;
  text-decoration: none;
  color: #002d62;
  font-size: 14px;
  font-weight: 700;
  box-shadow: none;
  transition: border-color 0.12s ease;
}

.filters__compare:hover {
  border-color: #001a3d;
}

.filters__compare-icon {
  display: flex;
  color: #002d62;
}

.results {
  min-width: 0;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
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
    column-gap: 32px;
    row-gap: 32px;
  }

  .grid__cell {
    grid-column: span 6;
  }
}

@media (min-width: 1100px) {
  .grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 32px;
    row-gap: 32px;
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
  border: none;
  border-radius: 2px;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  color: #7a808a;
  cursor: pointer;
  box-shadow: none;
}

.pg:hover:not(.pg--active):not(.pg--arrow) {
  color: #4a5058;
}

.pg--active {
  background: #002d62;
  color: #fff;
  font-weight: 700;
}

.pg--arrow {
  font-size: 22px;
  line-height: 1;
  font-weight: 400;
  color: #002d62;
}
</style>
