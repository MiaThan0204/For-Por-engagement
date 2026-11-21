/* ==========================================
   LINK VAULT: DANH SÁCH LINK CHO FAN
   ==========================================
   Muốn thêm / sửa / xóa link: chỉ cần sửa file này.

   Mỗi link là MỘT DÒNG, gồm:
   - id       : tên riêng, KHÔNG trùng nhau (vd "x-001"). Đừng đổi id của link cũ.
   - platform : "x" hoặc "ig"
   - action   : "share", "quote", "reply" hoặc "comment" (viết từ nào cũng được)
   - title    : tên hiện cho fan thấy
   - url      : link bài đăng (phải bắt đầu bằng https://)

   Lưu ý: sau mỗi dòng link có dấu phẩy,
   RIÊNG DÒNG CUỐI CÙNG của cả danh sách thì KHÔNG có dấu phẩy.
*/

const LINKS = [

  /* ===== X / TWITTER (thêm link X mới ở dưới dòng này) ===== */

  { id: "x-001", platform: "x", action: "share", title: "X post 1 (@porsuppakarn)", url: "https://x.com/porsuppakarn/status/1937805604971766043" },
  { id: "x-002", platform: "x", action: "share", title: "X post 2 (@fablej23)", url: "https://x.com/fablej23/status/2123790556635832483" },
  { id: "x-003", platform: "x", action: "share", title: "X post 3 (@PorWrapUp)", url: "https://x.com/PorWrapUp/status/2123650042607116446" },


  /* ===== INSTAGRAM (thêm link Instagram mới ở dưới dòng này) ===== */

  { id: "ig-001", platform: "ig", action: "comment", title: "Instagram post 1", url: "https://www.instagram.com/p/DfzR3FjIyRD/" },
  { id: "ig-002", platform: "ig", action: "comment", title: "Instagram post 2", url: "https://www.instagram.com/p/Dfrg_JgoxOv/" }

];
