## 技術棧

本項目使用 React, Next.js, TailwindCSS, Zustand, 和 TypeScript 構建。

## 功能介紹

### 身份驗證

- **Clerk 身份驗證:** 支持 GitHub 和 Google 登入。

### 筆記側邊欄 (Sidebar)

- **搜索:** 用戶可以通過標題搜索筆記。
- **設定:** 提供深色模式切換功能。
- **垃圾桶:** 支持文件的臨時刪除。

### 筆記主頁

- **添加圖標或封面:** 支持拖放上傳圖片。
- **模仿 Notion 的編輯指令 ("/"):** 使用 "/" 指令快速插入元素或改變內容格式。

## 安裝與運行

```bash
# 克隆倉庫
git clone [倉庫URL]

# 安裝依賴
npm install

# 運行項目
npm run dev

## 環境變數設定

請在您的 `.env` 檔案或環境變數設定中加入以下屬性：
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```
