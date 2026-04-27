<script setup lang="ts">
import ProductHorizontalStrip from './ProductHorizontalStrip.vue'
import type { DemoProduct } from '../data/products'

defineProps<{
  productTitle: string
  products: DemoProduct[]
}>()
</script>

<template>
  <ProductHorizontalStrip title="Customers Also Bought" :products="products">
    <template #subtitle>
      <p>
        Buyers of <strong>{{ productTitle }}</strong> also bought these items.
      </p>
    </template>
  </ProductHorizontalStrip>
</template>
