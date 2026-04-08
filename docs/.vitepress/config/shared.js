import { fileURLToPath, URL } from 'node:url';
import rfcverbPlugin from './rfc-highlighter.js';

export const shared = {
  transformPageData(pageData) {
    pageData.frontmatter.head ??= []
    if (pageData.frontmatter.id != null) {
      pageData.title = `ADE-${pageData.frontmatter.id}: ${pageData.frontmatter.title}`;
    } else if (pageData.frontmatter.title != null) {
      pageData.title = `${pageData.frontmatter.title}`;
    }
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:title',
        content: `ADE-${pageData.frontmatter.id}: ${pageData.frontmatter.title}`
      }
    ])
  },
  cleanUrls: true,
  base: '/api-design-essentials/',
  lastUpdated: true,
  themeConfig: {
    logo: 'logo.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alivedise/api-design-essentials' }
    ],
    search: {
      provider: 'local'
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('redoc')
      },
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/VPNavBarTitle.vue', import.meta.url)
          )
        }
      ]
    },
    optimizeDeps: {
      include: ['mermaid']
    },
    ssr: {
      noExternal: ['mermaid']
    },
  },
  markdown: {
    config: (md) => {
      md.use(rfcverbPlugin);
    }
  },
  head: [
    ['link', { rel: 'icon', href: 'favicon.svg' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700' }],
    [
      'script', { src: 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js' }
    ],
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'API Design Essentials',
      short_name: 'ADE',
      description: 'API Design Essentials site',
      theme_color: '#0186d1',
      icons: [
        {
          src: 'logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
  },
  // ignoreDeadLinks: ['http://localhost:3000/index'],
  ignoreDeadLinks: true,
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  },
};