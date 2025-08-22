---
title: "test test"
description: "Translate 안녕하세요"
published: "2024-06-28T03:18:22.197Z"
tags: ['Java']
series: "과거 Hashnode"
---

<button onclick="translatePage()">Translate</button>
<script type="text/javascript">
function translatePage() {
  var languageSelect = document.createElement('select');
  languageSelect.innerHTML = `
    <option value="en">English</option>
    <option value="ja">Japanese</option>
    <option value="zh-CN">Chinese (Simplified)</option>
  `;
  languageSelect.onchange = function() {
    var lang = this.value;
    location.href = 'https://translate.google.com/translate?sl=auto&tl=' + lang + '&u=' + encodeURIComponent(window.location.href);
  };
  document.body.appendChild(languageSelect);
}
</script>


안녕하세요