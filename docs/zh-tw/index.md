---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: ADE 首頁

hero:
  name: "ADE"
  text: "API 設計精要"
  tagline: API 設計的慣例和指南
  actions:
    - theme: brand
      text: ADE 目的
      link: /zh-tw/1
    - theme: alt
      text: 完整 ADE 列表
      link: /zh-tw/list
    - theme: alt
      text: English
      link: /

features:
  - title: 標準合規性
    details: 檢視根據標準或慣例應用的 RESTful API 設計精要；使用 OpenAPI 進行文件化。
    icon: ✅
  - title: 事件設計
    details: 使用 CloudEvents 設計 API 事件
    icon: 🎉
  - title: 問題設計
    details: 使用 HTTP Problem 設計 API 錯誤
    icon: ❌
  - icon: 🛠️
    title: 自訂API Linter
    details: 使用redocly 自訂的 API Linter
    link: /zh-tw/lint
---
