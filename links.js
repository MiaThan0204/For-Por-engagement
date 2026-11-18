/* ==========================================
   LINK VAULT: DANH SÁCH LINK CHO FAN
   ==========================================
   Muốn thêm / sửa / xóa link: chỉ cần sửa file này.

   Mỗi link gồm:
   - id       : tên riêng, KHÔNG trùng nhau (vd "ig-001"). Đừng đổi id của link cũ.
   - platform : "x" hoặc "ig"
   - action   : "comment" hoặc "share"
   - title    : tên hiện cho fan thấy
   - url      : link bài đăng (phải bắt đầu bằng https://)
*/

const LINKS = [

  {
    id: "ig-001",
    platform: "ig",
    action: "comment",
    title: "Instagram post 1 (thay bằng tên bài thật)",
    url: "https://www.instagram.com/p/THAY-LINK-THAT-VAO-DAY/"
  },

  {
    id: "x-001",
    platform: "x",
    action: "share",
    title: "X post 1 (thay bằng tên bài thật)",
    url: "https://x.com/THAY-LINK-THAT-VAO-DAY"
  },

  {
    id: "ig-002",
    platform: "ig",
    action: "comment",
    title: "Instagram post 2 (thay bằng tên bài thật)",
    url: "https://www.instagram.com/p/THAY-LINK-THAT-VAO-DAY-2/"
  }

];
