<script setup lang="ts">
import { media } from '../assets/media'

const categories = [
  'Van Interiors',
  'Cable Pulling',
  'Snow/Ice',
  'Truck Body',
  'Consumables',
]

const support = [
  'Talk to a Parts Expert',
  'American-made',
  'Fast Shipping',
  'Warranty Info',
]
</script>

<template>
  <footer class="footer">
    <div class="footer__grid">
      <div class="footer__col">
        <div class="footer__wordmark">
          <img :src="media.icons.dejanaWordmark" alt="Dejana" width="78" height="20" />
          <span class="footer__reg">®</span>
        </div>
        <p class="footer__tagline">
          The premier source for truck upfitting and utility equipment since 1957. Built for the pros.
        </p>
        <div class="footer__social">
          <a href="#" aria-label="Facebook"
            ><img :src="media.icons.facebook" width="24" height="24" alt=""
          /></a>
          <a href="#" aria-label="YouTube"
            ><img :src="media.icons.youtube" width="24" height="24" alt=""
          /></a>
        </div>
      </div>
      <div class="footer__col">
        <h3 class="footer__h">Equipment Categories</h3>
        <ul class="footer__list">
          <li v-for="c in categories" :key="c"><a href="#">{{ c }}</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h3 class="footer__h">Expert Support</h3>
        <ul class="footer__list">
          <li v-for="s in support" :key="s"><a href="#">{{ s }}</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h3 class="footer__h">Stay Upfitted</h3>
        <p class="footer__news">
          Get alerts on inventory restocks and new equipment launches.
        </p>
        <form class="footer__form" @submit.prevent>
          <input class="footer__input" type="email" placeholder="Email Address" aria-label="Email" />
          <button type="submit" class="footer__join">Join</button>
        </form>
      </div>
    </div>
    <div class="footer__legal">
      <p>
        © 2026 Dejana Truck & Utility Equipment <span class="footer__sep">|</span>
        * Any Shipping Disclaimers Could Go Here
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-dark-blue);
  border-top: 1px solid var(--color-footer-border);
  color: var(--color-footer-text);
}

.footer__grid {
  max-width: var(--max-content);
  margin: 0 auto;
  padding: clamp(40px, 8vw, 64px) clamp(24px, 5vw, 60px);
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px 48px;
}

@media (min-width: 640px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .footer__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer__wordmark {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 16px;
}

.footer__reg {
  font-family: 'Times New Roman', serif;
  font-weight: 700;
  font-size: 9px;
  color: #fff;
}

.footer__tagline {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
}

.footer__social {
  display: flex;
  gap: 16px;
}

.footer__social a {
  display: flex;
}

.footer__h {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.footer__list a {
  color: inherit;
  text-decoration: none;
  font-size: 14px;
}

.footer__list a:hover {
  text-decoration: underline;
}

.footer__news {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 16px;
  opacity: 0.85;
}

.footer__form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.footer__input {
  flex: 1 1 140px;
  min-width: 0;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  font-size: 12px;
}

.footer__join {
  padding: 8px 16px;
  border: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--color-accent);
  color: var(--color-accent-text);
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
}

.footer__legal {
  border-top: 1px solid var(--color-footer-border);
  opacity: 0.75;
  padding: 32px 16px;
  text-align: center;
  font-size: 12px;
}

.footer__legal p {
  margin: 0;
  line-height: 1.5;
}

.footer__sep {
  color: #cacaca;
  margin: 0 6px;
}
</style>
