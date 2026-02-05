# Copilot / AI Agent 指导（项目专用）

目的：快速让 AI 编码代理在此代码库中立即有生产力。包含整体架构、重要文件、约定、运行与调试步骤，以及可复制的示例模式。

**大局观**
- 类型：单页静态网站（纯 HTML/CSS/vanilla JS），无构建系统、无依赖管理。主要用于展示产品信息并提供简单交互。
- 主要组件：`index.html`（结构与内容）、`styles.css`（视觉、响应式布局）、`script.js`（所有交互逻辑）、`img/`（静态资源）。
- 设计理由：保持轻量、兼容多语言（页面为日文）、无需后端即可部署。

**关键文件/位置**
- `index.html`：页面分区使用带 `id` 的 `section`（例如 `#home`, `#products`, `#about`, `#contact`）。保持这些 id 的稳定性对 JS 行为（滚动、高亮）很重要。
- `script.js`：包含所有交互逻辑的单一脚本。关键函数/模式：
  - 平滑滚动：选择 `a[href^="#"]` 并使用 `scrollIntoView`。
  - 可见性动画：`IntersectionObserver` 观察 `.ess-card`, `.battery-card`, `.app-card`, `.heater-card`, `.component-card`, `.other-product-card`, `.detail-card`, `.timeline-item`。
  - 数字动画：`animateCounter()` 针对 `.total-shipments .number`。
  - 移动菜单：`createMobileMenu()` 在宽度 <= 768px 时插入切换按钮并切换 `nav.mobile-open`。
  - 懒加载：通过 `data-src` + `IntersectionObserver` 支持图片懒加载。
  - 诊断提示：脚本最后打印 `YILU HK LTD Website - Interactive features loaded`。
- `styles.css`：使用 CSS 变量（`:root`）和三档响应断点（1024、768、480）。常见布局单元：`.container`, `.ess-cards`, `.battery-products`, `.application-cards`。

**项目约定与模式（可直接复制的示例）
- 类名与语义：卡片类统一使用 `*-card`（例如 `.ess-card`, `.battery-card`）。动画类为 `.fade-in`。数字统计使用 `.total-shipments .number`。
- 响应式：通过媒体查询在 1024/768/480 三个阈值改变网格列数，新增元素应遵循相同断点。
- JS 选择器：脚本通过类名/ID 全局查询 DOM（非模块化），因此避免在 HTML 中重用会冲突的类名。
- 懒加载：用法示例 — 在 `index.html` 将 `<img src="placeholder.jpg" data-src="img/real.jpg">`，脚本会在可见时把 `data-src` 赋给 `src`。

**运行、调试与开发工作流**
- 本地快速预览（任意端口）：
  - 如果有 Python：`python -m http.server 8000`（在仓库根目录运行），然后用浏览器打开 `http://localhost:8000`。
  - 或者安装 VS Code 的 Live Server 插件并启用（推荐）。
- 调试 JS：打开浏览器开发者工具（Console），查找脚本输出 `YILU HK LTD Website - Interactive features loaded` 以确认脚本已加载。
- 图片问题：确保 `img/` 中存在引用的文件名，或者在 HTML 中使用 `data-src` 时检查懒加载逻辑是否触发。

**变更与贡献注意事项**
- 不要添加前端打包器或框架（例如 webpack、vite、React）除非明确需要；当前项目目标是轻量静态站点。
- 如果必须新增 JS 文件：
  - 保持命名清晰（例如 `hero-effects.js`），并在 `index.html` 末尾按加载顺序引入（依赖 `script.js` 的功能应在其后或合并）。
  - 优先复用现有类名与 `IntersectionObserver` 模式，避免复制大量重复选择器。
- 提交信息建议：`docs: update copilot instructions` 或 `feat(ui): add X card layout`。

**注意到的 TODO / 限制（来自代码可见内容）**
- 联系表单在 `index.html` 有占位 `form` 逻辑但 `script.js` 中未实现实际提交（脚本只是阻止默认并标注）。任何后端集成需创建 API 并在 JS 中实现 fetch。
- 轮播箭头（`.carousel-arrow`）目前只打印日志并无轮播实现；添加轮播时请保持箭头位置和隐藏规则（移动端会隐藏）。

如果本文件需要更多示例（例如：真实 `img` 懒加载示例、常见改动的代码片段），请告诉我想要的模块或你计划改动的区域，我会补充对应的可复制代码片段或小型实现。

---
请审阅这份 `.github/copilot-instructions.md`，指出哪些部分还需补充或需要更精确的代码引用（我可以迭代更新）。

**示例实现（可直接复制）**

- 图片懒加载（HTML）：在需要懒加载的 `<img>` 上使用 `data-src`，保留占位 `src`：

  ```html
  <img src="img/placeholder.jpg" data-src="img/real-image.jpg" alt="説明" width="600" height="400">
  ```

- 图片懒加载（轻量 JS）：如果 `script.js` 中的 `IntersectionObserver` 未包含特定占位处理，可使用下面的逻辑（可追加到 `script.js`）：

  ```javascript
  // 懒加载：确保 script.js 已在 DOMContentLoaded 后运行
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' });

    document.querySelectorAll('img[data-src]').forEach(i => lazyObserver.observe(i));
  }
  ```

- 联系表单前端提交（示例）
  - 目标：前端将表单数据 `POST` 到 `/api/contact`（这是示例端点，后端需实现）。
  - 在 `index.html` 中：

  ```html
  <form id="contact-form">
    <input name="name" required placeholder="お名前">
    <input name="email" type="email" required placeholder="メール">
    <textarea name="message" required placeholder="内容"></textarea>
    <button type="submit">送信</button>
  </form>
  <div id="contact-result" aria-live="polite"></div>
  ```

  - 在 `script.js` 中追加提交逻辑（示例，不会处理 CSRF）：

  ```javascript
  const contactForm = document.getElementById('contact-form');
  const contactResult = document.getElementById('contact-result');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Network error');
        contactResult.textContent = '送信が完了しました。ありがとうございます。';
        contactForm.reset();
      } catch (err) {
        contactResult.textContent = '送信に失敗しました。後ほど再度お試しください。';
      }
    });
  }
  ```

  - 后端建议：实现一个简单的 POST `/api/contact` 接口，接收 JSON，进行简单验证（name, email, message），并返回 200/4xx。若不想搭后端，可使用第三方表单服务（Formspree、Netlify Forms 等）。

**变更建议（可选）**
- 将 `script.js` 拆分成小模块（例如 `lazyload.js`、`contact.js`、`ui-helpers.js`）以利于维护，但保持打包器最小或直接用多个 `<script>` 引入以保持当前无构建要求。

