import { defineConfig } from 'vitepress'
import matter from 'gray-matter';
import { fileURLToPath, URL } from 'node:url';
import { withPwa } from '@vite-pwa/vitepress';

import { resolve } from 'path';
import fs from 'fs';

function getSidebar(dir) {
  const docsPath = resolve(__dirname, `../${dir}`);
  let mdFileList = [];

  function getFilesRecursively(directory, baseDir = '') {
    const files = fs.readdirSync(directory);
    const result = [];

    files.forEach(file => {
      const fullPath = resolve(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subDirFiles = getFilesRecursively(fullPath, `${baseDir}/${file}`);
        if (subDirFiles.length) {
          result.push({
            text: file,
            collapsed: true,
            items: subDirFiles
          });
        }
      } else {
        if (file.endsWith('.md') && !file.startsWith('index')) {
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          const { data } = matter(fileContent);
          if (data && (data.draft || data.placeholder)) {
            return;
          }
          if (data && typeof data.id == 'undefined') {
            return;
          }
          const title = `${data.id}.${data.title}` || file.replace('.md', '');
          result.push({
            text: title,
            link: `/${data.id}`
          });
          mdFileList.push(`- [${title}](${data.id})`);
        }
      }
    });

    return result;
  }

  const sidebar = getFilesRecursively(docsPath);
  const listMdContent = `# ADP Document List\n\n${mdFileList.join('\n')}`;
  fs.writeFileSync(resolve(docsPath, 'list.md'), listMdContent);
  return sidebar;
}

const rfcverbPlugin = (md) => {
  md.core.ruler.push('must_highlight', (state) => {
    state.tokens.forEach((blockToken) => {
      if (blockToken.type === 'inline') {
        blockToken.children.forEach((token) => {
          if (token.type === 'text') {
            token.content = token.content.replace(/MUST NOT/g, '<span class="must-highlight">MUST NOT</span>');
            token.content = token.content.replace(/MUST/g, '<span class="must-highlight">MUST</span>');
            token.content = token.content.replace(/SHOULD NOT/g, '<span class="should-highlight">SHOULD NOT</span>');
            token.content = token.content.replace(/SHOULD/g, '<span class="should-highlight">SHOULD</span>');
            token.content = token.content.replace(/MAY NOT/g, '<span class="may-highlight">MAY NOT</span>');
            token.content = token.content.replace(/MAY/g, '<span class="may-highlight">MAY</span>');
            token.content = token.content.replace(
              /\[DRAFT\]/g,
              '<v-chip rounded="0" variant="elevated" class="draft-label" color="primary">DRAFT</v-chip>'
            );
            token.type = 'html_inline'; // This ensures the content is treated as raw HTML
          }
        });
      }
    });
  });
};


// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: "API Design Principle BETA",
  description: "API Design Principle site",
  cleanUrls: true,
  base: '/api-design-principle-beta/',
  rewrites: {
    ':sub/:page': ':page',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '<span class="VPBadge warning">BETA</span> & RFC', link: '/rfc-beta' },
      { text: 'Home', link: '/' },
      { text: 'FAQ', link: '/46' },
      { text: 'LIST', link: '/list' },
    ],

    logo: '/logo.png',

    sidebar: getSidebar('./'),
    //sidebar: nestedSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/VIVOTEK-IT/api-design-principle-beta' }
    ],
    search: {
      provider: 'local'
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/VPNavBarTitle.vue', import.meta.url)
          )
        }
      ]
    },
  },
  markdown: {
    config: (md) => {
      md.use(rfcverbPlugin)
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'API Design Principle BETA',
      short_name: 'ADPBETA',
      description: 'API Design Principle site',
      theme_color: '#0186d1',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
  },
  ignoreDeadLinks: ['http://localhost:3000/index'],
}))
