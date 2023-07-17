function decodeJWTToken(token) {
    // Split the token into its three parts: header, payload, and signature
    const parts = token.split('.');

    // Decode the payload part using base64 decoding
    const payload = JSON.parse(atob(parts[1]));

    // Extract the data from the payload object
    const userId = payload.Id;
    const name = payload.UserName;
    const iat = payload.iat;
    const email = payload.email;
    const role = payload.role;

    // Create an object with the extracted data
    const decodedToken = {
        userId: userId,
        name: name,
        email: email,
        role: role,
        issuedAt: new Date(iat * 1000)
    };

    return decodedToken;
}

const check = decodeJWTToken(localStorage.getItem('token'));
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');
const userInfo = document.getElementById('user-info');

if (isLoggedIn()) {
  // Nếu người dùng đã đăng nhập, ẩn nút đăng nhập và hiển thị nút đăng xuất
  loginLink.style.display = 'none';
  logoutLink.style.display = 'block';

  // Lấy thông tin người dùng từ localStorage và hiển thị
  const user = check.name;
  if (user) {
    userInfo.innerText = user;
    console.log(user);
    userInfo.style.display = 'inline-block';
  }
} else {
  // Nếu người dùng chưa đăng nhập, ẩn nút đăng xuất và hiển thị nút đăng nhập
  loginLink.style.display = 'block';
  logoutLink.style.display = 'none';
}

// Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
function isLoggedIn() {
  // Kiểm tra xem token JWT có tồn tại trong localStorage hay không
  const token = localStorage.getItem('token');
  return !!token;
}

// Hàm xử lý đăng xuất
function handleLogout() {
  // Xóa token JWT và thông tin người dùng khỏi localStorage
  localStorage.removeItem('token');

  // Chuyển hướng người dùng đến trang đăng nhập
  window.location.href = '/index.html';
}

// Gán sự kiện click cho nút đăng xuất
logoutLink.addEventListener('click', handleLogout);
