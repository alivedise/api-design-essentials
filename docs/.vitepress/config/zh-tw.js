import matter from 'gray-matter';

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
          if (data && typeof data.id == 'undefined') {
            return;
          }
          let title = `${data.id}.${data.title}` || file.replace('.md', '');
          if (data) {
            if (data.placeholder) {
              title = `<span class="VPBadge danger">暫定</span> ${title}`;
            }
          }
          
          mdFileList.push({
            listItem: `- [${title}](${data.id})`,
            id: data.id,
         });
          result.push({
            text: title,
            link: `/zh-tw/${data.id}`
          });
        }
      }
    });

    return result;
  }

  const sidebar = getFilesRecursively(docsPath);
  sidebar.sort((a, b) => {
    const aIsOverall = a.text && (a.text.toLowerCase().includes('overall') || a.text.includes('綜合') || a.text.includes('總覽'));
    const bIsOverall = b.text && (b.text.toLowerCase().includes('overall') || b.text.includes('綜合') || b.text.includes('總覽'));
    if (aIsOverall && !bIsOverall) return -1;
    if (!aIsOverall && bIsOverall) return 1;
    return 0;
  });
  mdFileList = mdFileList.sort((a, b) => a.id - b.id).map((item) => item.listItem);
  const listMdContent = `---\ntitle: ADE 全列表\n---\n# ADE 全列表\n\n${mdFileList.join('\n')}\n`;
  fs.writeFileSync(resolve(docsPath, 'list.md'), listMdContent);
  return sidebar;
}


// https://vitepress.dev/reference/site-config
export const zhTW = {
  title: "API 設計精要",
  description: "API 設計精要與最佳實踐",
  lang: 'zh-tw',
  lastUpdated: {
    text: '最後更新於',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium'
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '<span class="VPBadge warning">BETA</span> & RFC', link: '/zh-tw/rfc-beta' },
      { text: '首頁', link: '/zh-tw' },
      { text: '常見問題', link: '/zh-tw/faq' },
      { text: 'API檢查', link: '/zh-tw/lint' },
      { text: '列表', link: '/zh-tw/list' },
    ],

    sidebar: [
      ...getSidebar('../zh-tw'),
      {
        text: '相關站點',
        items: [
          { text: 'BEE -- 後端工程精要', link: 'https://alivedise.github.io/backend-engineering-essentials/' },
          { text: 'DEE -- 資料庫工程精要', link: 'https://alivedise.github.io/database-engineering-essentials/' },
        ],
      },
    ],
  },
};
