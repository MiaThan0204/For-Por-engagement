

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


/* ==========================================
   PHẦN 2B: YOUR GOAL (ĐẾM SỐ CAPTION ĐÃ TẠO)
   ========================================== */

// Mục tiêu: số caption muốn tạo (đổi số này nếu muốn)
const GOAL = 2000;

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

  // Không cho bộ đếm vượt quá 1000
  goalCount = Math.min(GOAL, Math.max(0, goalCount));

  const percent = (goalCount / GOAL) * 100;
  const shown = Number(percent.toFixed(1));

  goalCountEl.textContent = goalCount + ' / ' + GOAL;
  goalPercentEl.textContent = shown + '%';
  goalFill.style.width = percent + '%';

  goalBar.setAttribute(
    'aria-valuenow',
    String(Math.round(percent))
  );

  const done = goalCount >= GOAL;

  goalBox.classList.toggle('done', done);
  goalLabel.textContent = done ? 'YOUR GOAL 🎉' : 'YOUR GOAL';

  // Khóa nút Generate khi đạt 1000
  const generateBtn = document.getElementById('generate');

  generateBtn.disabled = done;
  // Hiện nút Start again khi đã đạt mục tiêu
  const restartBtn = document.getElementById('restart-goal');
  if (restartBtn) restartBtn.hidden = !done;
 
generateBtn.innerHTML = done
  ? '<span class="generate-icon" aria-hidden="true">✓</span>' +
    '<span>Goal Completed!</span>'
  : '<span class="generate-icon" aria-hidden="true">↻</span>' +
    '<span>Generate another caption</span>';
}

function addToGoal() {

  // Không cho vượt quá 2000
  if (goalCount >= GOAL) {
    return;
  }

  goalCount++;

  try {
    localStorage.setItem(STORAGE_KEY, String(goalCount));
  } catch {
    // Vẫn hoạt động nếu không lưu được
  }

  updateGoal();

  // Hiện popup khi vừa đạt 2000
  checkGoalCompleted();

}


/* ==========================================
   PHẦN 2C: ICE ROSE GOAL POPUP
   ========================================== */

const goalModal = document.getElementById('goal-modal');
const goalClose = document.getElementById('goal-popup-close');
const goalDone = document.getElementById('goal-popup-done');

// Chỉ hiện khi vừa đạt 2000/
let goalPopupShown = false;

function checkGoalCompleted() {

  if (
    goalCount >= GOAL &&
    !goalPopupShown &&
    goalModal
  ) {
    goalPopupShown = true;
    goalModal.hidden = false;

    // Đưa focus vào nút Done
    goalDone?.focus();
  }

}

// Đóng popup
function closeGoalPopup() {
  if (goalModal) {
    goalModal.hidden = true;
  }
}

// Nút X
goalClose?.addEventListener('click', closeGoalPopup);

// Nút Done
goalDone?.addEventListener('click', closeGoalPopup);

/* ==========================================
   START AGAIN - RESET GOAL
   ========================================== */

const goalRestart = document.getElementById('goal-popup-restart');

// Hàm bắt đầu lại từ 0 (dùng chung cho 2 nút Start Again)
function restartGoal() {

  // Reset counter
  goalCount = 0;

  // Cho phép popup xuất hiện ở vòng tiếp theo
  goalPopupShown = false;

  // Lưu tiến độ mới
  try {
    localStorage.setItem(STORAGE_KEY, '0');
  } catch {
    // Tiếp tục nếu trình duyệt không cho lưu
  }

  // Cập nhật 0 / 2000, mở khóa Generate, ẩn nút Start again
  updateGoal();

  // Đóng popup (nếu đang mở)
  closeGoalPopup();

  // Tạo caption đầu tiên cho vòng mới
  previous = '';
  generate();

}

// Nút Start Again trong popup
goalRestart?.addEventListener('click', restartGoal);

// Nút Start again trên trang chính
document
  .getElementById('restart-goal')
  ?.addEventListener('click', restartGoal);

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

  // Không tạo caption mới sau khi đạt 2000
  if (goalCount >= GOAL) return;

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


/* Đổi icon và chữ nút Post theo nền tảng */

postButton.innerHTML =
  platform === 'x'
    ? '<i class="bi bi-twitter-x" aria-hidden="true"></i><span>Post on X ↗</span>'
    : '<i class="bi bi-instagram" aria-hidden="true"></i><span>Open Instagram ↗</span>';


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

    // Đã đạt 2000 thì dừng
    if (goalCount >= GOAL) {
      return;
    }

    // Tạo caption mới
    generate();

    // Cộng tiến độ
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
      b.innerHTML =
        '<i class="bi bi-check2" aria-hidden="true"></i>' +
        '<span>Copied!</span>';

      // Sau 1.7 giây khôi phục icon Copy
      setTimeout(() => {
        b.innerHTML =
          '<i class="bi bi-files" aria-hidden="true"></i>' +
          '<span>Copy caption</span>';
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
// Nếu đã đạt mục tiêu từ trước thì hiện popup để có nút Start Again
checkGoalCompleted();

/* ==========================================
   PHẦN 10: LINK VAULT (DANH SÁCH LINK CHO FAN)
   ========================================== */

// Lấy danh sách link từ file links.js (nếu file lỗi thì dùng danh sách rỗng)
const linkData = typeof LINKS !== 'undefined' ? LINKS : [];

// Tên dùng để lưu các link fan đã làm xong
const DONE_KEY = 'forPorLinksDone';

// Lấy các phần tử của khung Link Vault
const linkListEl = document.getElementById('link-list');
const linksProgressEl = document.getElementById('links-progress');
const linksFillEl = document.getElementById('links-fill');
const nextLinkBtn = document.getElementById('next-link');
const vaultEl = document.getElementById('vault');

// Lấy các phần tử của cửa sổ caption
const vaultModal = document.getElementById('vault-modal');
const modalBadge = document.getElementById('modal-badge');
const modalTitle = document.getElementById('modal-title');
const modalSub = document.getElementById('modal-sub');
const modalText = document.getElementById('modal-text');
const modalStatus = document.getElementById('modal-status');
const modalCopyOpen = document.getElementById('modal-copy-open');

// Tab đang xem: 'x' hoặc 'ig'
let vaultTab = 'x';

// Link đang được mở trong cửa sổ caption
let currentLink = null;

// Đọc danh sách link đã làm xong từ lần trước
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

// Link thuộc X hay Instagram
function platOf(link) {
  return link.platform === 'x' ? 'x' : 'ig';
}

// Danh sách link của tab đang xem
function tabLinks() {
  return linkData.filter(
    l => isSafeUrl(l.url) && platOf(l) === vaultTab
  );
}

// Lưu lại danh sách đã làm xong
function saveDone() {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(doneKeys));
  } catch {
    // Trình duyệt chặn lưu thì vẫn dùng bình thường trong phiên này
  }
}


/* ------------------------------------------
   Tạo caption ngẫu nhiên cho 1 link
   (dùng lại banks, pick, hashtag ở phía trên)
   ------------------------------------------ */

function makeCaption(plat) {

  // Link X dùng caption X, link Instagram dùng caption Instagram
  const b = banks[plat] || banks.ig;

  let s = [
    pick(b.opening),
    pick(b.middle),
    pick(b.ending)
  ].join(' ');

  // Caption X thì thêm keyword và hashtag
  if (plat === 'x') {
    s += '\n\n' +
      [eventKeyword.trim(), fixedHashtags]
        .filter(Boolean)
        .join('\n\n');
  }

  return s;

}


/* ------------------------------------------
   Mở link + đánh dấu đã xong
   ------------------------------------------ */

function openLink(link) {

  if (!isSafeUrl(link.url)) return;

  // Link vừa mở có phải link đang đến lượt không?
  const before = tabLinks().find(l => !doneKeys.includes(keyOf(l)));
  const wasNext = !!before && keyOf(before) === keyOf(link);

  if (!doneKeys.includes(keyOf(link))) {
    doneKeys.push(keyOf(link));
    saveDone();
  }

  window.open(link.url, '_blank', 'noopener,noreferrer');

  // Nếu mở đúng link đến lượt thì cuộn tới link kế tiếp
  renderLinks(wasNext);

}


/* ------------------------------------------
   Cửa sổ caption (hiện khi bấm vào 1 link)
   ------------------------------------------ */

function showModal(link) {

  currentLink = link;

  modalBadge.textContent = platOf(link) === 'x' ? '𝕏' : '◎';
  modalTitle.textContent = link.title || 'Link';

  // Share / Quote thì ghi "caption", còn lại ghi "comment"
  modalSub.textContent =
    (link.action === 'share' || link.action === 'quote')
      ? 'Auto-matched caption randomized for this post.'
      : 'Auto-matched comment randomized for this post.';

  modalText.value = makeCaption(platOf(link));
  modalStatus.textContent = '';

  vaultModal.hidden = false;
  modalCopyOpen.focus();

}

function hideModal() {

  vaultModal.hidden = true;
  currentLink = null;

}

// Nút ×, bấm ra ngoài cửa sổ, hoặc phím Esc để đóng
document.getElementById('modal-close').addEventListener('click', hideModal);

vaultModal.addEventListener('click', (e) => {
  if (e.target === vaultModal) hideModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !vaultModal.hidden) hideModal();
});

// Nút Randomize: đổi sang caption khác
document.getElementById('modal-random').addEventListener('click', () => {

  if (!currentLink) return;

  modalText.value = makeCaption(platOf(currentLink));
  modalStatus.textContent = '';

});

// Nút COPY COMMENT & OPEN LINK
modalCopyOpen.addEventListener('click', async () => {

  if (!currentLink) return;

  const link = currentLink;

  // Bắt đầu copy ngay (trước khi mở tab mới)
  let copied;

  try {
    copied = navigator.clipboard
      .writeText(modalText.value)
      .then(() => true, () => false);
  } catch {
    copied = Promise.resolve(false);
  }

  // Mở link
  openLink(link);

  // Copy được thì đóng cửa sổ, không được thì báo để fan tự copy
  if (await copied) {

    hideModal();

  } else {

    modalText.select();
    modalStatus.textContent =
      'Could not copy automatically. Please copy the text above manually.';

  }

});

// Nút OPEN LINK ONLY
document.getElementById('modal-open-only').addEventListener('click', () => {

  if (!currentLink) return;

  openLink(currentLink);
  hideModal();

});


/* ------------------------------------------
   Vẽ khung Link Vault: tab, danh sách, tiến độ
   ------------------------------------------ */

function renderLinks(scrollToNext = false) {

  const list = tabLinks();

  const doneCount = list.filter(
    l => doneKeys.includes(keyOf(l))
  ).length;

  const percent = list.length
    ? (doneCount / list.length) * 100
    : 0;

  // Tiến độ: 0 / 100 done (0%)
  linksProgressEl.textContent =
    doneCount + ' / ' + list.length +
    ' done (' + Number(percent.toFixed(1)) + '%)';

  linksFillEl.style.width = percent + '%';

  // Đổi màu theo tab: X = đen, Instagram = hồng tím
  vaultEl.classList.toggle('is-x', vaultTab === 'x');
  vaultEl.classList.toggle('is-ig', vaultTab === 'ig');

  // Nút tab đang chọn
  document.querySelectorAll('.vault-tab').forEach(t => {

    const on = t.dataset.vtab === vaultTab;

    t.classList.toggle('selected', on);
    t.setAttribute('aria-pressed', String(on));

  });

  // Link đến lượt: link đầu tiên chưa làm trong tab này
  const next = list.find(l => !doneKeys.includes(keyOf(l)));

  // Nhớ vị trí thanh cuộn để vẽ lại xong không bị nhảy lên đầu
  const keepScroll = linkListEl.scrollTop;
  let nextRow = null;

  // Xóa danh sách cũ rồi vẽ lại
  linkListEl.textContent = '';

  if (list.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'link-empty';
    empty.textContent = 'No links yet. Please check back soon 🩵';
    linkListEl.appendChild(empty);
  }

  list.forEach((link, i) => {

    const done = doneKeys.includes(keyOf(link));

    const isNext = !!next && keyOf(next) === keyOf(link);

    const li = document.createElement('li');
    li.className =
      'link-item' +
      (done ? ' done' : '') +
      (isNext ? ' is-next' : '');

    if (isNext) nextRow = li;

    // Số thứ tự: 01, 02, 03...
    const num = document.createElement('span');
    num.className = 'link-num';
    num.textContent = String(i + 1).padStart(2, '0');

    // Tên link và loại việc cần làm (share, quote, reply, comment...)
    const info = document.createElement('div');
    info.className = 'link-info';

    const title = document.createElement('strong');
    title.textContent = link.title || 'Link';

    const tag = document.createElement('small');
    tag.textContent = (link.action || 'comment') + (isNext ? ' · next' : '');

    info.appendChild(title);
    info.appendChild(tag);

    // Nút mở cửa sổ caption
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'link-open';
    btn.textContent = 'Open ↗';
    btn.addEventListener('click', () => showModal(link));

    // Dấu tích: chỉ hiện khi fan đã mở link (fan không tự tích được)
    const status = document.createElement('span');
    status.className = 'link-status' + (done ? ' is-done' : '');
    status.setAttribute('role', 'img');
    status.setAttribute('aria-label', done ? 'Completed' : 'Not opened yet');
    status.textContent = done ? '✓' : '';

    li.appendChild(num);
    li.appendChild(info);
    li.appendChild(btn);
    li.appendChild(status);

    linkListEl.appendChild(li);

  });

  // Giữ nguyên vị trí cuộn của fan
  linkListEl.scrollTop = keepScroll;

  // Chỉ khi cần (mở trang, đổi tab, vừa mở link đến lượt) mới cuộn tới link kế tiếp
  if (scrollToNext && nextRow) {

    const top = nextRow.offsetTop;
    const bottom = top + nextRow.offsetHeight;

    if (top < linkListEl.scrollTop) {
      linkListEl.scrollTop = top - 4;
    } else if (bottom > linkListEl.scrollTop + linkListEl.clientHeight) {
      linkListEl.scrollTop = bottom - linkListEl.clientHeight + 4;
    }

  }

  // Nút "Open next link": mở link đến lượt
  nextLinkBtn.disabled = !next;
  nextLinkBtn.textContent = next
    ? '→  Open next link'
    : '✓  All links done';

}

// Bấm tab X / Instagram
document.querySelectorAll('.vault-tab').forEach(t => {

  t.addEventListener('click', () => {

    vaultTab = t.dataset.vtab;
    linkListEl.scrollTop = 0;
    renderLinks(true);

  });

});

// Bấm "Open next link"
nextLinkBtn.addEventListener('click', () => {

  const next = tabLinks().find(l => !doneKeys.includes(keyOf(l)));

  if (next) showModal(next);

});

// Hiển thị khung Link Vault khi mở website
renderLinks(true);
