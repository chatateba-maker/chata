(function () {
  if (document.getElementById('chata-root')) return;

  const STORAGE_KEY = 'chata_position';
  const MESSAGES = [
    'ぶふっ…（鼻ぺちゃ）',
    'なでてにゃ～🐾',
    'ごはんまだ？',
    'むすっ…（不満顔）',
    'ここ、わたしの場所にゃ',
    'zzz…ぐっすりにゃ',
    'もふもふしてるでしょ？',
    'あったかいとこ好きにゃ',
    'じーっ…（見つめてる）',
    'ぎゅってして！',
    'ふにゃ～ん♪',
    'あなたのこと、好きにゃよ🐱',
  ];

  // --- DOM 構築 ---
  const root = document.createElement('div');
  root.id = 'chata-root';

  const bubble = document.createElement('div');
  bubble.id = 'chata-bubble';
  bubble.style.display = 'none';

  const cat = document.createElement('div');
  cat.id = 'chata-cat';
  cat.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 108" width="80" height="86">
      <!-- 体（ずんぐりむっくり） -->
      <ellipse cx="50" cy="88" rx="30" ry="20" fill="#c89030"/>
      <!-- 体の縞模様 -->
      <path d="M34,80 Q50,76 66,80" stroke="#8a5e18" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>
      <path d="M30,88 Q50,84 70,88" stroke="#8a5e18" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>
      <!-- 左前足 -->
      <ellipse cx="28" cy="98" rx="11" ry="7" fill="#c89030"/>
      <!-- 右前足 -->
      <ellipse cx="72" cy="98" rx="11" ry="7" fill="#c89030"/>
      <!-- しっぽ（短め・縞入り） -->
      <path d="M78,92 Q94,80 86,68" stroke="#c89030" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M78,92 Q94,80 86,68" stroke="#8a5e18" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="4,5" opacity="0.7"/>
      <!-- 左耳（大きめ三角） -->
      <polygon points="20,38 29,5 53,30" fill="#c89030"/>
      <polygon points="25,36 29,12 49,29" fill="#e8c070"/>
      <!-- 右耳（大きめ三角） -->
      <polygon points="47,30 71,5 80,38" fill="#c89030"/>
      <polygon points="51,29 71,12 75,36" fill="#e8c070"/>
      <!-- 頭（横幅広め） -->
      <ellipse cx="50" cy="47" rx="36" ry="29" fill="#c89030"/>
      <!-- おでこのM字タビー模様 -->
      <path d="M34,28 Q39,22 44,28 Q50,20 56,28 Q61,22 66,28" stroke="#8a5e18" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85"/>
      <!-- ほほの縞 -->
      <line x1="14" y1="50" x2="32" y2="52" stroke="#8a5e18" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
      <line x1="14" y1="56" x2="32" y2="56" stroke="#8a5e18" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
      <line x1="68" y1="52" x2="86" y2="50" stroke="#8a5e18" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
      <line x1="68" y1="56" x2="86" y2="56" stroke="#8a5e18" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
      <!-- ギョロ目（虹彩） -->
      <circle cx="38" cy="50" r="9" fill="#c87820"/>
      <circle cx="62" cy="50" r="9" fill="#c87820"/>
      <!-- ギョロ目（瞳孔） -->
      <circle cx="38" cy="50" r="6.5" fill="#1a1a1a"/>
      <circle cx="62" cy="50" r="6.5" fill="#1a1a1a"/>
      <!-- 目のハイライト -->
      <circle cx="40.5" cy="47.5" r="2.5" fill="white"/>
      <circle cx="64.5" cy="47.5" r="2.5" fill="white"/>
      <circle cx="36" cy="53" r="1.2" fill="white" opacity="0.5"/>
      <circle cx="60" cy="53" r="1.2" fill="white" opacity="0.5"/>
      <!-- 眉間のしわ（不満顔） -->
      <line x1="45" y1="40" x2="48" y2="44" stroke="#8a5e18" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="55" y1="40" x2="52" y2="44" stroke="#8a5e18" stroke-width="1.4" stroke-linecap="round"/>
      <!-- 鼻（目の近く） -->
      <ellipse cx="47.5" cy="55" rx="1.8" ry="1.3" fill="#9a6020"/>
      <ellipse cx="52.5" cy="55" rx="1.8" ry="1.3" fill="#9a6020"/>
      <!-- 口（小さめへの字） -->
      <path d="M45,60 Q50,57 55,60" stroke="#8a5e18" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M45,60 Q43,62 44,64" stroke="#8a5e18" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <path d="M55,60 Q57,62 56,64" stroke="#8a5e18" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <!-- ひげ -->
      <line x1="14" y1="57" x2="34" y2="57" stroke="#e8d090" stroke-width="0.9" opacity="0.9"/>
      <line x1="14" y1="61" x2="34" y2="59" stroke="#e8d090" stroke-width="0.9" opacity="0.9"/>
      <line x1="66" y1="57" x2="86" y2="57" stroke="#e8d090" stroke-width="0.9" opacity="0.9"/>
      <line x1="66" y1="59" x2="86" y2="61" stroke="#e8d090" stroke-width="0.9" opacity="0.9"/>
    </svg>
  `;

  root.appendChild(bubble);
  root.appendChild(cat);
  document.body.appendChild(root);

  // --- 位置の復元 ---
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}
  if (saved) {
    root.style.left = saved.x + 'px';
    root.style.bottom = '';
    root.style.top = saved.y + 'px';
    root.style.right = '';
  }

  // --- セリフ表示 ---
  let bubbleTimer = null;

  cat.addEventListener('click', (e) => {
    if (isDragging) return;
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    bubble.textContent = msg;
    bubble.style.display = 'block';
    bubble.classList.remove('chata-bubble-hide');
    bubble.classList.add('chata-bubble-show');

    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubble.classList.remove('chata-bubble-show');
      bubble.classList.add('chata-bubble-hide');
      setTimeout(() => { bubble.style.display = 'none'; }, 300);
    }, 3000);
  });

  // --- ドラッグ ---
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  cat.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = root.getBoundingClientRect();
    // ふわふわ中の実際の位置を取得してfixedに反映
    root.style.top = rect.top + 'px';
    root.style.left = rect.left + 'px';
    root.style.bottom = '';
    root.style.right = '';
    root.classList.add('chata-dragging');
    root.style.transition = 'none';
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - dragOffsetX;
    const y = e.clientY - dragOffsetY;
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.bottom = '';
    root.style.right = '';
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    root.classList.remove('chata-dragging');
    root.style.transition = '';
    // 位置を保存
    const rect = root.getBoundingClientRect();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: rect.left, y: rect.top }));
  });
})();
