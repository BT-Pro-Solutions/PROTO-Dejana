<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { aboutFacilities, aboutHeroImageSrc } from '../data/aboutFacilities'

const credits = [
  'NTEA/MVP Certified',
  'QVM Certified',
  '#1 Body & Equipment Company in the U.S. for Ford',
  '#1 U.S. Distributor for Knapheide',
  '#1 U.S. Distributor for Rugby',
  '#1 U.S. Distributor for Douglas Dynamics (Fisher & Western)',
  '#1 Northeast Distributor Sales for Leggett & Platt',
] as const

const shipThruModels = [
  'Ford Transit',
  'Ford Transit Connect',
  'Ford F150 Pick-up',
  'Chevy Express/ Savana',
  'Chevy Colorado/ Canyon',
  'Ram ProMaster',
  'Ram ProMaster City',
  'Ram 1500 Pick-up',
] as const

function facilityKey(f: (typeof aboutFacilities)[number]) {
  return `${f.year}-${f.title}`
}
</script>

<template>
  <div class="about">
    <div class="about__hero">
      <img
        class="about__hero-img"
        :src="aboutHeroImageSrc"
        alt="Pete Dejana — heritage imagery from Dejana Truck & Utility Equipment"
        width="1920"
        height="640"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
      <div class="about__hero-scrim" aria-hidden="true" />
      <div class="about__hero-inner">
        <nav class="about__crumb about__crumb--hero" aria-label="Breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <span class="about__crumb-sep" aria-hidden="true">/</span>
          <span class="about__crumb-here">About Us</span>
        </nav>
        <h1 class="about__h1 about__h1--hero">About Us</h1>
      </div>
    </div>

    <article class="about__article">
      <div class="about__wrap about__inner">
        <div class="about__prose">
          <p>
            In 1957, after serving in the Marine Corps, Pete Dejana borrowed $500 dollars from his father to open a
            three-bay service station on Park Avenue in Huntington, Long Island.
          </p>
          <p>
            Shortly thereafter, on a Sunday afternoon, a gentleman by the name of Mr. Al Kurt was driving with his
            family when his car broke down near the service station, and he came in to Pete for help. Pete brought the
            car back to the station and made the repairs while the family waited. When finished, Mr. Kurt expressed his
            deep appreciation and asked to settle the bill. Pete explained that he was a new business owner and asked
            merely for the opportunity to service his cars in the future.
          </p>
          <p>
            Mr. Kurt explained that he was responsible for fleet maintenance for (what was then) New York Telephone and
            it wasn’t long before Pete was performing service and repairs on telephone trucks. Eager to get the business,
            Pete worked day and night repairing trucks as well as other mechanical equipment that gave the phone company
            trouble.
          </p>
          <p>
            As the relationship developed, NY Telephone asked Pete if he would consider going beyond service and repair
            to actually build the new trucks they needed to their special requirements… Dejana Truck & Utility Equipment
            was born…
          </p>
          <p>
            From the first day, Pete Dejana established the business with a very strong commitment to customer service and
            satisfaction. One of his first customers was a woman named Mrs. Barton who proudly owned a brand new 1956
            T-Bird and was adamant about how it was to be maintained. Very few people were allowed to even drive “Baby,”
            much less work on it, but Pete soon earned the privilege to be her mechanic. For years, Pete meticulously
            maintained the vehicle and was responsive to her every whim. After 20 years of service, Mrs. Barton needed
            regular medical care and the relationship faded as they often do.
          </p>
          <p>
            In 1981 Pete was approached by an attorney representing Mrs. Barton, along with her four sons. It seems that
            one of her last wishes was that “Baby” be left to Pete.
          </p>
          <p>
            Pete continues the maintenance on the T-Bird to this day, and it is a symbol of our commitment within the
            company.
          </p>
        </div>

        <section class="about__sec about__sec--facilities" aria-labelledby="facilities-heading">
          <h2 id="facilities-heading" class="about__h2">Our Facilities</h2>
          <ul class="about__timeline" role="list">
            <li
              v-for="(f, i) in aboutFacilities"
              :key="facilityKey(f)"
              class="about__timeline-item"
            >
              <div class="about__timeline-rail">
                <div class="about__timeline-node">
                  <img
                    :src="f.imageSrc"
                    :alt="`${f.year}: ${f.title}`"
                    width="140"
                    height="140"
                    loading="lazy"
                    decoding="async"
                  />
                <template v-if="i < aboutFacilities.length - 1">
                  <div class="about__timeline-line-tail" aria-hidden="true" />
                </template>
                </div>
              </div>
              <div class="about__timeline-body">
                <p class="about__timeline-year">{{ f.year }}</p>
                <h3 class="about__h3">{{ f.title }}</h3>
                <p class="about__timeline-text">{{ f.body }}</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="about__sec" aria-labelledby="credits-heading">
          <h2 id="credits-heading" class="about__h2">Credits &amp; Accreditations</h2>
          <ul class="about__bullets">
            <li v-for="c in credits" :key="c">{{ c }}</li>
          </ul>
          <h3 class="about__h3 about__h3--sub">Ship-Thru capabilities for:</h3>
          <ul class="about__bullets about__bullets--compact">
            <li v-for="s in shipThruModels" :key="s">{{ s }}</li>
          </ul>
        </section>

        <aside class="about__cta" aria-labelledby="about-cta-h">
          <p id="about-cta-h" class="about__cta-eyebrow">Need more help?</p>
          <p class="about__cta-title">Contact a Dejana sales rep</p>
          <RouterLink to="/contact" class="about__cta-btn">Contact Us</RouterLink>
        </aside>
      </div>
    </article>
  </div>
</template>

<style scoped>
.about {
  --about-node: 118px;
  --about-line: var(--color-light-blue, #0f5395);
  min-height: 60vh;
  background: var(--color-page-bg);
  color: var(--color-text);
  padding-bottom: clamp(48px, 10vw, 80px);
}

.about__hero {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  min-height: clamp(240px, 42vw, 460px);
  max-height: min(520px, 56vh);
  overflow: hidden;
  background: var(--color-dark-blue);
}

.about__hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
}

.about__hero-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(0, 30, 64, 0.82) 0%,
    rgba(0, 30, 64, 0.45) 42%,
    rgba(0, 30, 64, 0.2) 100%
  );
}

.about__hero-inner {
  position: relative;
  z-index: 1;
  max-width: var(--max-content);
  margin: 0 auto;
  padding: clamp(28px, 6vw, 52px) var(--space-page-x);
  padding-right: min(var(--space-page-x), 48px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: clamp(240px, 42vw, 460px);
  max-height: min(520px, 56vh);
  box-sizing: border-box;
}

.about__crumb--hero {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.about__crumb--hero a {
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
}

.about__crumb--hero a:hover {
  text-decoration: underline;
  color: #fff;
}

.about__crumb-sep {
  opacity: 0.45;
  color: rgba(255, 255, 255, 0.75);
}

.about__crumb-here {
  color: rgba(255, 255, 255, 0.92);
}

.about__h1--hero {
  margin: 0;
  font-size: clamp(2rem, 5.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  line-height: 1.1;
  max-width: 16ch;
}

.about__wrap {
  max-width: var(--max-content);
  margin: 0 auto;
  padding-left: var(--space-page-x);
  padding-right: var(--space-page-x);
}

.about__article {
  padding-top: clamp(28px, 5vw, 44px);
}

.about__inner {
  max-width: 52rem;
}

.about__prose p {
  margin: 0 0 1.1em;
  font-size: 17px;
  line-height: 1.65;
  color: var(--color-text);
}

.about__prose p:last-child {
  margin-bottom: 0;
}

.about__sec {
  margin-top: clamp(36px, 6vw, 52px);
}

.about__sec--facilities {
  max-width: min(52rem, 100%);
}

.about__h2 {
  margin: 0 0 28px;
  font-size: clamp(1.35rem, 3vw, 1.65rem);
  font-weight: 800;
  color: var(--color-dark-blue);
  letter-spacing: -0.02em;
}

.about__h3 {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.about__h3--sub {
  margin-top: 24px;
  margin-bottom: 12px;
}

.about__timeline {
  margin: 0;
  padding: 0;
  list-style: none;
}

.about__timeline-item {
  --about-timeline-gap: clamp(26px, 4vw, 36px);
  display: grid;
  grid-template-columns: var(--about-node) minmax(0, 1fr);
  gap: clamp(18px, 4vw, 32px);
  align-items: stretch;
  margin-bottom: var(--about-timeline-gap);
  position: relative;
}

.about__timeline-item:last-child {
  margin-bottom: 0;
}

.about__timeline-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--about-node);
  align-self: stretch;
  position: relative;
}

.about__timeline-line-tail {
  position: absolute;
  left: 55px;
  top: 100%;
  height: 100px;
  background: var(--about-line);
  width: 3px;
}

.about__timeline-node {
  width: var(--about-node);
  height: var(--about-node);
  flex-shrink: 0;
  border-radius: 50%;
  border: 3px solid var(--about-line);
  box-sizing: border-box;
  background: var(--color-surface-muted);
  position: relative;
}

.about__timeline-node img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.about__timeline-body {
  padding-top: 6px;
}

.about__timeline-year {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-light-blue);
}

.about__timeline-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.about__fineprint {
  margin: 28px 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.about__fineprint a {
  color: var(--color-link);
  font-weight: 600;
}

.about__bullets {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 15px;
  line-height: 1.55;
  color: var(--color-text);
}

.about__bullets li {
  margin-bottom: 0.5em;
}

.about__bullets--compact {
  margin-top: 0;
}

.about__cta {
  margin-top: clamp(40px, 7vw, 56px);
  padding: clamp(22px, 4vw, 28px);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: linear-gradient(165deg, rgba(15, 83, 149, 0.08) 0%, rgba(0, 30, 64, 0.04) 100%);
}

.about__cta-eyebrow {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.about__cta-title {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-dark-blue);
}

.about__cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border-radius: var(--radius-lg, 10px);
  background: var(--color-dark-blue);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

.about__cta-btn:hover {
  filter: brightness(1.06);
}

@media (max-width: 560px) {
  .about__timeline-item {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 14px;
  }

  .about__timeline-line-grow,
  .about__timeline-line-tail {
    display: none;
  }

  .about__timeline-rail {
    width: auto;
    align-self: center;
  }

  .about__timeline-body {
    padding-top: 0;
  }
}
</style>
