import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress';
import { withMermaid } from "vitepress-plugin-mermaid";

import { shared } from './shared'
import { en } from './en'
import { zhTW } from './zh-tw'

export default withPwa(withMermaid(defineConfig({
  ...shared,
  rewrites: {
    'en/:path+/:page': ':page',
    'en/list.md': 'list.md',
    'en/faq.md': 'faq.md',
    'en/rfc-beta.md': 'rfc-beta.md',
    'en/lint.md': 'lint.md',
    'zh-tw/:path+/:page': 'zh-tw/:page',
  },
  locales: {
    root: { label: 'English', ...en },
    'zh-tw': { label: '繁體中文', ...zhTW },
  }
})))
