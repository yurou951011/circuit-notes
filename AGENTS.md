# AGENTS.md — 電路筆記 (circuit-notes)

AI 在新增或修改本專案任何檔案前，必須先讀完本文件。規則與現有檔案衝突時，以本文件為準，並在回報中指出衝突。

## 1. 專案目的
- 給電機系學生複習用的電子學／電路學講義網站，一課一頁，風格參考「呆一布講義」。
- 讀者：修電子學、電路學的大學生。重點是「看得懂、會算、不犯常見錯誤」，不是堆砌理論。
- 內容語言：繁體中文；專有名詞第一次出現附英文（例如 通道長度調變 channel-length modulation）。

## 2. 技術限制（不可違反）
- 純靜態網站：HTML + CSS + 原生 JavaScript。不使用框架、不需要建置步驟、不使用 npm。
- 不引入外部 CDN、外部字體、外部圖片。公式用 HTML（`<sub>`、`<sup>`）寫，不用 MathJax。
- 部署：GitHub Pages，來源為 main 分支根目錄。所有連結一律用相對路徑。
- 全站共用 `assets/style.css` 與 `assets/site.js`，課程頁不得自帶 `<style>` 或內嵌 script。

## 3. 目錄結構
```
circuit-notes/
├─ AGENTS.md              本文件
├─ README.md              專案簡介與預覽方式
├─ index.html             首頁，課程清單由 lessons.js 自動產生，不手寫卡片
├─ assets/
│  ├─ style.css           唯一樣式表
│  ├─ site.js             渲染首頁清單與上下課導覽
│  └─ lessons.js          所有課程的登記表（資料來源）
├─ lessons/               每課一個檔案：NN-slug.html
└─ templates/
   └─ lesson-template.html  新課程一律從這裡複製
```

## 4. 視覺風格
- 主題：像電路板與方格紙的清爽講義。留白多、行長不超過約 40 個中文字（`max-width: 44rem`）。
- 色票（只能用這些 CSS 變數，定義在 `style.css` 的 `:root`）：
  - `--bg #F2F6F4` 頁面底色　`--card #FFFFFF` 卡片　`--ink #14231F` 內文
  - `--accent #0F5C4B` 主色（PCB 綠，用於連結、標題線）　`--copper #B8742A` 輔色（只用於「常見錯誤」標記）
  - `--line #CBD8D2` 分隔線　`--formula #E3EFEA` 公式底色
- 字體：系統中文字體堆疊（Noto Sans TC、PingFang TC、微軟正黑體）。公式用等寬字體。
- 禁止：漸層、陰影堆疊、動畫、全大寫標籤、emoji 裝飾、新增色票。
- 必須：手機可讀（RWD）、連結有明顯 focus 樣式、對比足夠。

## 5. 課程頁結構（順序固定）
每個 `lessons/NN-slug.html` 都要有：
1. `<body data-lesson="NN-slug">`（與檔名相同，site.js 靠它產生上下課導覽）
2. `<header>`：回首頁連結 + 課名 `<h1>` + 一句話重點 `<p class="lead">`
3. `<main class="lesson">` 內依序：學習目標 → 重點觀念 → 公式（`<p class="formula">`）→ 範例（`<div class="example">`，含題目、解法、答案）→ 常見錯誤（`<div class="pitfall">`）→ 小結
4. `<nav id="pager"></nav>` 與 `<footer>`，並載入 `../assets/lessons.js` 再載入 `../assets/site.js`（順序不可顛倒）

## 6. 新增一課的標準流程（AI 照做）
1. 讀 `assets/lessons.js` 取得目前最大編號，新課編號 = 最大編號 + 1，兩位數補零。
2. 複製 `templates/lesson-template.html` 到 `lessons/NN-slug.html`，把所有【】占位文字換成真實內容。
3. 在 `assets/lessons.js` 的陣列最後新增一筆登記（欄位：id、slug、title、summary、tags）。
4. 不手動修改 `index.html` 或其他課程頁的導覽（site.js 會自動更新）。
5. 依第 9 節驗收清單自我檢查，最後回報：新增了哪些檔案、修改了哪些檔案。

## 7. 命名規則
- 檔名：`NN-slug.html`；slug 只用小寫英文與連字號，例如 `03-bjt-early-effect`。
- 課程標題：名詞片語，不加「第 N 課」（編號由程式顯示）。
- `tags` 用中文短詞，1～3 個，例如 `["MOSFET","直流分析"]`。

## 8. 內容寫作規範
- 每個公式後面要說明符號與單位；數字計算一律寫出代入式與單位。
- 範例的答案必須自己驗算過；不確定的數值不要寫，也不要編造實驗數據或出處。
- 範例要含一個「常見錯誤」對照（例如漏掉某一項時的錯誤答案）。
- 不貼整段教科書原文，用自己的話整理。
- 語氣：直接、簡潔，用主動語態；不加行銷式形容詞。

## 9. 驗收清單（每次修改後逐項確認）
- [ ] 檔名、`data-lesson`、`lessons.js` 的 id 與 slug 三者一致
- [ ] 頁面結構符合第 5 節，順序未變
- [ ] 沒有新增外部資源、內嵌樣式、內嵌 script
- [ ] 所有連結為相對路徑且能點開（首頁、上一課、下一課）
- [ ] 範例數值已驗算，單位完整
- [ ] 本機預覽（`python -m http.server` 後開 `http://localhost:8000`）首頁出現新課程卡片

## 10. AI 行為規則
- 只修改任務需要的檔案；不重構、不改色票、不改既有課程內容，除非使用者明確要求。
- 不刪除任何課程或登記資料。
- 需求不明確（主題範圍、難度）時先問一個問題，不要自行猜測後大量產出。
- 發現本文件規則不夠用時，提出修改建議，不要自行偷改本文件。

## 11. 常用指令範例
- 「新增一課：BJT 的 Early effect，國中以上看得懂的程度，範例請用 β=100、VA=100V。」
- 「檢查所有課程頁是否符合 AGENTS.md 第 5 節與第 9 節，只列出問題，不要修改。」
