
// Hashtag cố định
const fixedHashtags = "#porsuppakarn #teeteepor";

// Keyword thay đổi theo từng sự kiện
const eventKeyword = "TTP TIME LINE";
/* ==========================================
   PHẦN 1: DANH SÁCH CAPTION
   ========================================== */

const banks = {

  // ========================================
  // CAPTION CHO X / TWITTER
  // ========================================

  x: {

    // Câu mở đầu
    opening: [
      "Sending all our love to Por today! 🩵",
      "Another day, another reason to cheer for Por! ✨",
      "Por, your journey inspires so many of us. 🐻",
      "We are always rooting for you, Por! 🩵",
      "A little reminder of how loved Por is. 💫",
      "So much appreciation for Por Suppakarn today! 🌷",
      "Let's fill today with positive energy for Por! ☁️",
      "Every step forward deserves a celebration, Por! ✨"
    ],

    // Nội dung chính
    middle: [
      "Your dedication and passion shine through everything you do.",
      "We can't wait to see all the wonderful things ahead.",
      "Your energy brings so much happiness to the people supporting you.",
      "The care you put into your work never goes unnoticed.",
      "May every new opportunity bring you joy and growth.",
      "You make even the smallest moments feel special.",
      "We're grateful for all the beautiful memories you share.",
      "Your hard work gives us another reason to smile."
    ],

    // Câu kết thúc
    ending: [
      "Keep shining at your own pace! 🌟",
      "We're cheering you on, always! 🩵",
      "Wishing you more happy moments ahead! 🫶",
      "You deserve so many wonderful things! ✨",
      "Stay happy, healthy and inspired! 🌷",
      "Sending you the warmest support! 🐻",
      "Here's to even brighter days! 💙",
      "We're proud to support your journey! ☁️"
    ]

  },


  // ========================================
  // CAPTION CHO INSTAGRAM
  // ========================================

  ig: {

    // Câu mở đầu
    opening: [
      "You look amazing, Por! 🩵",
      "So happy to see you shining! ✨",
      "Always cheering for you, Por! 🐻",
      "This moment is so lovely! 🌷",
      "You bring such beautiful energy! 💫",
      "What a wonderful update! 🩵",
      "Your smile is everything! ☀️",
      "So proud of you, Por! 🫶"
    ],

    // Nội dung chính
    middle: [
      "Your hard work and passion are truly inspiring.",
      "Wishing you lots of happiness in everything you do.",
      "You always make these moments feel special.",
      "It's lovely to see you enjoying what you do.",
      "We're excited for everything coming your way.",
      "Your positive energy is so contagious.",
      "Thank you for sharing this moment with us.",
      "Every new step in your journey is worth celebrating."
    ],

    // Câu kết thúc
    ending: [
      "Keep shining! ✨",
      "Sending lots of love! 🩵",
      "Take good care of yourself! 🌷",
      "You deserve all the happiness! 🐻",
      "Can't wait to see more! 💫",
      "Always here to support you! 🫶",
      "Have the loveliest day! ☁️",
      "We're rooting for you! 💙"
    ]

  }

};


/* ==========================================
   PHẦN 2: KHAI BÁO BIẾN
   ========================================== */

// Nền tảng mặc định là X
let platform = 'x';

// Lưu caption trước đó để hạn chế lặp
let previous = '';

// Lấy khu vực hiển thị caption trong HTML
const captionEl = document.getElementById('caption');

// Lấy nút Post
const postButton = document.getElementById('post');

// Lấy dòng hướng dẫn bên dưới các nút
const hint = document.getElementById('hint');

/* ==========================================
   PHẦN 2B: YOUR GOAL (ĐẾM SỐ CAPTION ĐÃ TẠO)
   ========================================== */

// Mục tiêu: số caption muốn tạo (đổi số này nếu muốn)
const GOAL = 500;

// Tên dùng để lưu số đếm trong trình duyệt
const STORAGE_KEY = 'forPorGoalCount';

// Lấy các phần tử trong HTML
const goalBox = document.getElementById('goal-box');
const goalLabel = document.getElementById('goal-label');
const goalCountEl = document.getElementById('goal-count');
const goalPercentEl = document.getElementById('goal-percent');
const goalFill = document.getElementById('goal-fill');
const goalBar = document.getElementById('goal-bar');

// Đọc số đã lưu từ lần trước (nếu không có thì bắt đầu từ 0)
let goalCount = 0;

try {
  goalCount = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
} catch {
  goalCount = 0;
}

// Cập nhật chữ và thanh tiến độ
function updateGoal() {

  // Phần trăm thật, tối đa 100%
  const percent = Math.min(100, (goalCount / GOAL) * 100);

  // Làm tròn 1 chữ số thập phân (vd: 0.4%)
  const shown = Number(percent.toFixed(1));

  goalCountEl.textContent = goalCount + ' / ' + GOAL;
  goalPercentEl.textContent = shown + '%';
  goalFill.style.width = percent + '%';
  goalBar.setAttribute('aria-valuenow', String(Math.round(percent)));

  // Đạt mục tiêu thì đổi màu và chữ
  const done = goalCount >= GOAL;
  goalBox.classList.toggle('done', done);
  goalLabel.textContent = done ? 'YOUR GOAL 🎉' : 'YOUR GOAL';

}

// Cộng thêm 1 và lưu lại
function addToGoal() {

  goalCount++;

  try {
    localStorage.setItem(STORAGE_KEY, String(goalCount));
  } catch {
    // Nếu trình duyệt chặn lưu thì vẫn đếm bình thường trong phiên này
  }

  updateGoal();

}

/* ==========================================
   PHẦN 3: HÀM CHỌN CÂU NGẪU NHIÊN
   ========================================== */

function pick(a) {

  // Chọn một vị trí ngẫu nhiên trong mảng
  const randomIndex = Math.floor(
    Math.random() * a.length
  );

  // Trả về câu tại vị trí được chọn
  return a[randomIndex];

}


/* ==========================================
   PHẦN 4: HÀM TẠO CAPTION
   ========================================== */

function generate() {

  let s;
  let attempts = 0;

  do {

    // Lấy danh sách câu theo nền tảng
    let b = banks[platform];

    // Chọn 1 câu mở đầu, 1 câu giữa, 1 câu cuối
    s = [
      pick(b.opening),
      pick(b.middle),
      pick(b.ending)
    ].join(' ');

    // Nếu là X thì thêm 2 hashtag
   if (platform === 'x') {
        s += '\n\n' +
        [eventKeyword.trim(), fixedHashtags]
        .filter(Boolean)
        .join('\n\n');
    }

    attempts++;

  } while (
    s === previous &&
    attempts < 20
  );

  // Lưu caption vừa tạo
  previous = s;

  // Hiển thị caption lên website
  captionEl.textContent = s;

}


/* ==========================================
   PHẦN 5: XỬ LÝ KHI CHỌN X / INSTAGRAM
   ========================================== */

document.querySelectorAll('.tab').forEach(b => {

  b.addEventListener('click', () => {

    // Xác định nền tảng được chọn
    platform = b.dataset.platform;

    // Đổi giao diện nút đang được chọn
    document.querySelectorAll('.tab').forEach(t => {

      t.classList.toggle(
        'selected',
        t === b
      );

      t.setAttribute(
        'aria-pressed',
        String(t === b)
      );

    });

    // Đổi tên nút Post
    postButton.textContent =
      platform === 'x'
        ? '↗  Post on X'
        : '↗  Open Instagram';

    // Đổi dòng hướng dẫn
    hint.textContent =
      platform === 'x'
        ? 'X opens with your caption prefilled.'
        : 'Copy your caption, then paste it into an Instagram comment.';

    // Reset caption trước đó
    previous = '';

    // Tạo caption mới
    generate();

  });

});


/* ==========================================
   PHẦN 6: NÚT GENERATE ANOTHER CAPTION
   ========================================== */

document.getElementById('generate').addEventListener(
  'click',
  () => {

    // Tạo caption mới
    generate();

    // Cộng 1 vào mục tiêu
    addToGoal();

  }
);


/* ==========================================
   PHẦN 7: NÚT COPY CAPTION
   ========================================== */

document.getElementById('copy').addEventListener(
  'click',
  async () => {

    try {

      // Copy caption vào clipboard
      await navigator.clipboard.writeText(
        captionEl.textContent
      );

      // Lấy nút Copy
      const b = document.getElementById('copy');

      // Hiển thị thông báo thành công
      b.textContent = '✓  Copied!';

      // Sau 1.7 giây đổi về tên ban đầu
      setTimeout(() => {

        b.textContent = '▢  Copy caption';

      }, 1700);

    } catch {

      // Thông báo nếu không copy được
      alert(
        'Please select and copy the caption manually.'
      );

    }

  }
);


/* ==========================================
   PHẦN 8: NÚT POST ON X / OPEN INSTAGRAM
   ========================================== */

postButton.addEventListener('click', () => {

  // Nếu chọn X, mở trang soạn bài có caption
  // Nếu chọn Instagram, mở Instagram
  const url =
    platform === 'x'
      ? 'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(captionEl.textContent)
      : 'https://www.instagram.com/';

  window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  );

});


/* ==========================================
   PHẦN 9: TẠO CAPTION KHI MỞ WEBSITE
   ========================================== */

generate();

// Hiển thị số đếm đã lưu khi mở website
updateGoal();

/* ==========================================
   PHẦN 10: LINK VAULT (DANH SÁCH LINK CHO FAN)
   ========================================== */

// Lấy danh sách link từ file links.js (nếu file lỗi thì dùng danh sách rỗng)
const linkData = typeof LINKS !== 'undefined' ? LINKS : [];

// Tên dùng để lưu các link fan đã mở
const DONE_KEY = 'forPorLinksDone';

// Lấy các phần tử trong HTML
const linkListEl = document.getElementById('link-list');
const linksProgressEl = document.getElementById('links-progress');
const linksFillEl = document.getElementById('links-fill');
const nextLinkBtn = document.getElementById('next-link');
const resetLinksBtn = document.getElementById('reset-links');

// Đọc danh sách link đã mở từ lần trước
let doneKeys = [];

try {
  const saved = JSON.parse(localStorage.getItem(DONE_KEY));
  if (Array.isArray(saved)) doneKeys = saved;
} catch {
  doneKeys = [];
}

// Mỗi link được nhận biết bằng id (không có id thì dùng url)
function keyOf(link) {
  return link.id || link.url;
}

// Chỉ nhận link bắt đầu bằng https:// cho an toàn
function isSafeUrl(url) {
  return typeof url === 'string' && /^https:\/\//i.test(url);
}

// Lưu lại danh sách đã mở
function saveDone() {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(doneKeys));
  } catch {
    // Trình duyệt chặn lưu thì vẫn dùng bình thường trong phiên này
  }
}

// Mở link và đánh dấu đã xong
function openLink(link) {

  if (!isSafeUrl(link.url)) return;

  if (!doneKeys.includes(keyOf(link))) {
    doneKeys.push(keyOf(link));
    saveDone();
  }

  window.open(link.url, '_blank', 'noopener,noreferrer');

  renderLinks();

}

// Vẽ lại danh sách link và thanh tiến độ
function renderLinks() {

  const valid = linkData.filter(l => isSafeUrl(l.url));

  const doneCount = valid.filter(
    l => doneKeys.includes(keyOf(l))
  ).length;

  const percent = valid.length
    ? (doneCount / valid.length) * 100
    : 0;

  linksProgressEl.textContent = doneCount + ' / ' + valid.length + ' done';
  linksFillEl.style.width = percent + '%';

  // Xóa danh sách cũ rồi vẽ lại
  linkListEl.textContent = '';

  if (valid.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'link-empty';
    empty.textContent = 'No links yet. Please check back soon 🩵';
    linkListEl.appendChild(empty);
  }

  valid.forEach(link => {

    const done = doneKeys.includes(keyOf(link));

    const li = document.createElement('li');
    li.className = 'link-item' + (done ? ' done' : '');

    // Biểu tượng nền tảng
    const badge = document.createElement('span');
    badge.className = 'link-badge';
    badge.textContent = link.platform === 'x' ? '𝕏' : '◎';

    // Tên link và loại việc cần làm
    const info = document.createElement('div');
    info.className = 'link-info';

    const title = document.createElement('strong');
    title.textContent = link.title || 'Link';

    const tag = document.createElement('small');
    tag.textContent = link.action === 'share' ? 'Share' : 'Comment';

    info.appendChild(title);
    info.appendChild(tag);

    // Nút mở link
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'link-open';
    btn.textContent = done ? '✓ Open again' : 'Open ↗';
    btn.addEventListener('click', () => openLink(link));

    li.appendChild(badge);
    li.appendChild(info);
    li.appendChild(btn);

    linkListEl.appendChild(li);

  });

  // Nút "Open next link": mở link đầu tiên chưa làm
  const next = valid.find(l => !doneKeys.includes(keyOf(l)));

  nextLinkBtn.disabled = !next;
  nextLinkBtn.textContent = next
    ? '→  Open next link'
    : '✓  All links done';

  // Chỉ hiện nút Reset khi đã mở ít nhất 1 link
  resetLinksBtn.hidden = doneCount === 0;

}

// Bấm "Open next link"
nextLinkBtn.addEventListener('click', () => {

  const next = linkData.find(
    l => isSafeUrl(l.url) && !doneKeys.includes(keyOf(l))
  );

  if (next) openLink(next);

});

// Bấm "Reset progress"
resetLinksBtn.addEventListener('click', () => {

  if (!confirm('Reset your link progress?')) return;

  doneKeys = [];
  saveDone();
  renderLinks();

});

// Hiển thị danh sách khi mở website
renderLinks();
