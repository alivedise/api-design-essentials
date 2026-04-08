---
title: API 程式碼檢查
---
# 使用 Redocly 作為 API 程式碼檢查工具

## 步驟 1: 安裝

首先，安裝 Redocly CLI 和自定義規則集:

```bash
npm install -g @redocly/cli
npm install -D @redocly/openapi-core
npm install -D api-design-essentials
```

## 步驟 2: 在專案中初始化 Redocly

導航到您的專案目錄，在專案根目錄創建一個 `.redocly.yaml` 配置文件。

## 步驟 3: 配置 Redocly

打開 `.redocly.yaml` 文件並自定義它以包含自定義規則集。以下是一個示例配置:

```yaml
apiDefinitions:
  main: openapi.yaml
extends:
  - 'recommended'
  - 'api-design-essentials/recommended'
plugins:
  - ./node_modules/api-design-essentials/dist/plugin.cjs
```

## 步驟 4: 運行程式碼檢查器

要檢查您的 API 規範，請運行:

```bash
redocly lint openapi.yaml
```

將 `openapi.yaml` 替換為您的 OpenAPI 規範文件的路徑。

## 步驟 5: 解讀結果

Redocly 將輸出它發現的任何警告或錯誤，包括來自自定義規則集的警告或錯誤。

## 步驟 6: 修復問題並重新運行

解決程式碼檢查器在您的 OpenAPI 規範文件中報告的問題。進行更改後，重新運行程式碼檢查器以確保所有問題都已解決。

## 步驟 7: 與 CI/CD 集成

為確保 API 文件品質的一致性，將 Redocly 程式碼檢查集成到您的 CI/CD 流程中。例如，在 GitHub Actions 工作流程中:

```yaml
name: API 程式碼檢查

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: 使用 Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
    - run: npm install -g @redocly/cli
    - run: redocly lint openapi.yaml
```

此工作流程將在每次推送和拉取請求時運行帶有自定義規則集的 Redocly 程式碼檢查器。
