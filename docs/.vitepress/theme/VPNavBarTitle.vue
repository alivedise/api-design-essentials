<template>
  <div class="adp-nav-container" v-if="hasSidebar">
    <div>
      <div class="adp-nav-hero">
        ADP
      </div>
      <span class="nav-sub">API Design Principle</span>
      <Badge type="warning" text="BETA" />
    </div>
  </div>
</template>

<script setup>
import { useSidebar } from 'vitepress/theme'
const { hasSidebar } = useSidebar()
</script>

<style>
.adp-nav-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 15px 0;
}
.adp-nav-hero {
  font-size: 20px;
  background: -webkit-linear-gradient(left, #005180, white, #0186d1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
span.nav-sub {
  padding: 10px;
}
</style>
