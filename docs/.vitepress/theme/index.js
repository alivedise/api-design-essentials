// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './index.css'
import './md.css'
import './sw';
import createScrollHandler from './scrollhandler';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (!import.meta.env.SSR) {
      // i think this is a vitepress bug if same page refresh, the scroll position is not correct, so we need to handle it manually
      createScrollHandler(router);
    }
  }
}
