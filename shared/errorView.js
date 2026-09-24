/* hàm nhận element hiển thị lỗi và gán nội dung text lỗi vào element đó*/
export function showError(el, message) {
  el.textContent = message;
}

/* hàm nhận element hiển thị lỗi và xóa nội dung hiện tại của element đó*/
export function clearError(el) {
  el.textContent = "";
}