<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    rating?: number
    reviewCount?: number
    /** PLP prototype: orange stars + review count */
    variant?: 'default' | 'ember'
  }>(),
  { rating: 0, reviewCount: 0, variant: 'default' },
)

/** Material-style 24×24 star path */
const STAR_PATH =
  'M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const clipId = `star-half-${uid}`

const fullStars = computed(() => Math.floor(Math.min(5, Math.max(0, props.rating ?? 0))))
const frac = computed(() => Math.min(5, Math.max(0, props.rating ?? 0)) - fullStars.value)
const hasHalf = computed(() => frac.value >= 0.25 && frac.value < 0.75)
const emptyStars = computed(() => 5 - fullStars.value - (hasHalf.value ? 1 : 0))

const label = computed(() => {
  const r = props.rating ?? 0
  return `${r} out of 5 stars${props.reviewCount ? `, ${props.reviewCount} reviews` : ''}`
})
</script>

<template>
  <div
    class="star-rating"
    :class="{ 'star-rating--ember': variant === 'ember' }"
    role="img"
    :aria-label="label"
  >
    <span v-for="n in fullStars" :key="'f' + n" class="star" aria-hidden="true">
      <svg class="star__svg" viewBox="0 0 24 24" width="14" height="14">
        <path :d="STAR_PATH" fill="currentColor" />
      </svg>
    </span>
    <span v-if="hasHalf" class="star star--half" aria-hidden="true">
      <svg class="star__svg" viewBox="0 0 24 24" width="14" height="14">
        <defs>
          <clipPath :id="clipId">
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <path :d="STAR_PATH" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round" />
        <path :d="STAR_PATH" fill="currentColor" :clip-path="`url(#${clipId})`" />
      </svg>
    </span>
    <span v-for="n in emptyStars" :key="'e' + n" class="star star--empty" aria-hidden="true">
      <svg class="star__svg" viewBox="0 0 24 24" width="14" height="14">
        <path :d="STAR_PATH" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round" />
      </svg>
    </span>
    <span v-if="reviewCount" class="reviews">({{ reviewCount }} Reviews)</span>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 3px;
  color: var(--color-reviews);
}

/* PLP: gold stars, orange review count (light prototype) */
.star-rating--ember {
  color: #c9952d;
}

.star-rating--ember .reviews {
  color: #e07020;
}

.star {
  display: inline-flex;
  line-height: 0;
}

.star__svg {
  display: block;
}

.reviews {
  margin-left: 8px;
  font-size: 12px;
  color: var(--color-reviews);
  line-height: 16px;
}
</style>
