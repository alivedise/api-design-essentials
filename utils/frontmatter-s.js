const fs = require('fs');
const path = require('path');

// 目標資料夾路徑
const targetDir = '/Users/alive/Downloads/0ad90239-c041-4ddc-9375-535671b67bf1_Export-4f38a75c-5b69-4418-87b2-42d684088e38';

const fileMap = new Map();

function getMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isFile() && path.extname(item.name) === '.md') {
      files.push(fullPath);
    }
  });

  return files;
}

function createFrontmatter(id, title, overview, draft, placeholder) {
  let frontmatter = `---\nid: ${id}\ntitle: ${title}\n`;
  if (overview) {
    frontmatter += 'overview: true\n';
  }
  if (draft) {
    frontmatter += 'draft: true\n';
  }
  if (placeholder) {
    frontmatter += 'placeholder: true\n';
  }
  frontmatter += '---\n';
  return frontmatter;
}

function extractInfoFromFilename(filename) {
  const match = filename.match(/^\[ADP-(\d+)(?:\s([ODP]))?\]\s(.*?)\s[a-f0-9]{32}\.md$/);
  if (match) {
    const id = match[1];
    const type = match[2];
    const title = match[3].replace(/\s[a-f0-9]{32}$/, '');
    const overview = type === 'O';
    const draft = type === 'D';
    const placeholder = type === 'P';
    return { id, title, overview, draft, placeholder };
  }
  return null;
}

function renameAndAddFrontmatter(files) {
  files.forEach(file => {
    const basename = path.basename(file);
    const info = extractInfoFromFilename(basename);

    if (info) {
      const newFileName = `${info.id}.md`;
      const newFilePath = path.join(path.dirname(file), newFileName);

      let content = fs.readFileSync(file, 'utf8');
      const frontmatter = createFrontmatter(info.id, info.title, info.overview, info.draft, info.placeholder);
      content = frontmatter + content;

      fs.writeFileSync(newFilePath, content);
      fileMap.set(`adp-${info.id}`, newFileName);
    }
  });
}

function updateLinksInFiles(files) {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, p1, p2) => {
      const decodedLink = decodeURIComponent(p2);
      const linkPathParts = decodedLink.split('/');
      const linkFile = linkPathParts.pop();
      const linkMatch = linkFile.match(/adp-(\d+)\.md$/i);

      if (linkMatch) {
        const id = `adp-${linkMatch[1]}`;
        const newFileName = fileMap.get(id);
        if (newFileName) {
          linkPathParts.push(newFileName);
          const newPath = linkPathParts.join('/') + '.md';
          return `[${p1}](${newPath})`;
        }
      }
      return match;
    });

    fs.writeFileSync(file, content, 'utf8');
  });
}

// 运行脚本
const markdownFiles = getMarkdownFiles(targetDir);
renameAndAddFrontmatter(markdownFiles);
updateLinksInFiles(markdownFiles);

console.log("所有文件已成功重命名并更新。请检查结果。");
