<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProductGallery from '../components/ProductGallery.vue'
import ProductInfoPanel from '../components/ProductInfoPanel.vue'
import PdpTabsSection from '../components/PdpTabsSection.vue'
import CustomersAlsoBought from '../components/CustomersAlsoBought.vue'
import { media } from '../assets/media'
import { primaryProduct, relatedProducts } from '../data/products'
import type { DemoProduct } from '../data/products'

const pdpCartProduct = computed<DemoProduct>(() => ({
  id: primaryProduct.id,
  slug: 'fisher-hs-compact',
  sku: primaryProduct.sku,
  title: primaryProduct.title,
  price: primaryProduct.price,
  image: primaryProduct.gallery[0]?.src ?? '/assets/product-fisher-plow-hero.png',
  reviewCount: primaryProduct.reviewCount,
  rating: primaryProduct.rating,
}))
</script>

<template>
  <div class="pdp">
    <main class="pdp__main">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/" class="breadcrumb__link">Home</RouterLink>
        <span class="breadcrumb__sep" aria-hidden="true">
          <img :src="media.icons.breadcrumbSep" width="4" height="6" alt="" />
        </span>
        <template v-for="(crumb, i) in primaryProduct.breadcrumbs" :key="i + crumb">
          <RouterLink
            v-if="i < primaryProduct.breadcrumbs.length - 1"
            :to="i === 0 ? '/shop' : '/category/snow-ice'"
            class="breadcrumb__link"
            >{{ crumb }}</RouterLink
          >
          <span v-else class="breadcrumb__current">{{ crumb }}</span>
          <span v-if="i < primaryProduct.breadcrumbs.length - 1" class="breadcrumb__sep" aria-hidden="true">
            <img :src="media.icons.breadcrumbSep" width="4" height="6" alt="" />
          </span>
        </template>
      </nav>

      <div class="pdp__grid">
        <ProductGallery :images="primaryProduct.gallery" />
        <aside class="pdp__info">
          <ProductInfoPanel
            :product-id="primaryProduct.id"
            :title="primaryProduct.title"
            :sku="primaryProduct.sku"
            :in-stock="primaryProduct.inStock"
            :price="primaryProduct.price"
            :compare-at-price="primaryProduct.compareAtPrice"
            :review-count="primaryProduct.reviewCount"
            :rating="primaryProduct.rating"
            :blade-options="primaryProduct.bladeOptions"
            :ship-note="primaryProduct.shipNote"
            :cart-product="pdpCartProduct"
          />
        </aside>
      </div>

      <PdpTabsSection
        :product-title="primaryProduct.title"
        :review-count="primaryProduct.reviewCount"
        :tab-heading="primaryProduct.tabHeading"
        :lead="primaryProduct.descriptionLead"
        :bullets="primaryProduct.descriptionBullets"
        :documents="primaryProduct.pdpDocuments"
        :reviews-summary="primaryProduct.pdpReviewsSummary"
        :reviews="primaryProduct.pdpReviews"
      />
    </main>

    <CustomersAlsoBought :product-title="primaryProduct.title" :products="relatedProducts" />
  </div>
</template>

<style scoped>
.pdp {
  display: flex;
  flex-direction: column;
  background: var(--color-page-bg);
}

.pdp__main {
  width: 100%;
  max-width: var(--max-content);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 48px) var(--space-page-x) 0;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 4vw, 32px);
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
}

.breadcrumb__link {
  color: var(--color-text-muted);
  text-decoration: none;
}

.breadcrumb__link:hover {
  text-decoration: underline;
}

.breadcrumb__current {
  color: var(--color-dark-blue);
  font-weight: 500;
}

.breadcrumb__sep {
  display: flex;
  align-items: center;
  opacity: 0.7;
}

.pdp__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(24px, 4vw, 48px) clamp(32px, 5vw, 64px);
  align-items: start;
}

@media (min-width: 960px) {
  .pdp__grid {
    grid-template-columns: minmax(0, 7fr) minmax(280px, 5fr);
  }
}

.pdp__info {
  position: sticky;
  top: clamp(16px, 3vw, 32px);
  align-self: start;
  min-width: 0;
}
</style>
