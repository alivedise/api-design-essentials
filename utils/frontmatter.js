const fs = require('fs');
const path = require('path');

// 目標資料夾路徑
const targetDir = '/Users/alive/Downloads/c5bb235b-eccb-4bfb-aec2-cc104fa02436_Export-76aba28e-f472-43f8-8476-2e660c4b38ec/API Design Principle [DRAFTING] 6d4c173c2dae4b0baf1c2b9f83bc3144';


function getSubDirectories(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(dir, dirent.name));
}

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

function extractInfoFromFilename(filename) {
  const match = filename.match(/^\[ADP-(\d+)(?:\s([ODP]))?\]\s(.*?)\s[a-f0-9]{32}\.md$/);
  if (match) {
    const id = match[1];
    const type = match[2];
    const title = match[3];
    const overview = type === 'O';
    const draft = type === 'D';
    const placeholder = type === 'P';
    return { id, title, overview, draft, placeholder };
  }
  return null;
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

function updateLinksInFiles(files, fileMap) {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/\(([^)]+ADP-(\d+)[^)]+)\)/g, (match, p1, p2) => {
      const id = `ADP-${p2}`;
      const newFileName = fileMap.get(id);
      if (newFileName) {
        return `(${p1.replace(/\[ADP-\d+\][^\)]+$/, newFileName)})`;
      }
      return match;
    });

    fs.writeFileSync(file, content, 'utf8');
  });
}

function renameFilesAndAddFrontmatter(files, fileMap) {
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
      fileMap.set(`ADP-${info.id}`, newFileName);
    }
  });

  // 删除旧文件
  files.forEach(file => fs.unlinkSync(file));
}

// 运行脚本
const subDirs = getSubDirectories(targetDir);

subDirs.forEach(subDir => {
  const markdownFiles = getMarkdownFiles(subDir);
  const fileMap = new Map();

  // 先更新链接
  markdownFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    content.replace(/\(([^)]+ADP-(\d+)[^)]+)\)/g, (match, p1, p2) => {
      const id = `ADP-${p2}`;
      const newFileName = `${p2}.md`;
      fileMap.set(id, newFileName);
      return match;
    });
  });

  updateLinksInFiles(markdownFiles, fileMap);

  // 然后重命名并添加 frontmatter
  renameFilesAndAddFrontmatter(markdownFiles, fileMap);

  console.log(`所有文件已成功重命名并更新在目录 ${subDir} 中。`);
});

console.log("所有操作已完成。");
