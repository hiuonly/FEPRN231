function handleRegister() {
    const email = document.getElementById('semail').value;
    const password = document.getElementById('spass').value;
    const confirmPassword = document.getElementById('repass').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
  
    // Check if email and password fields are not empty
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
  
    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp');
        return;
    }
  
    // Tạo đối tượng dữ liệu để gửi lên API
    const data = {
        'uImg': 'avatar-vo-danh-10.png',
        'email': email,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
        'phoneNumber': phone,
        'roleId': 2,
        'address': address
    };
  
    // Gửi yêu cầu POST đến API để đăng ký tài khoản
    fetch('https://localhost:7180/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Hiển thị thông báo và chuyển hướng đến trang đăng nhập
            alert('Đăng ký tài khoản thành công');
            window.location.href = '/login.html';
        })
        .catch(error => {
            console.error(error.message);
            alert('Có lỗi xảy ra khi đăng ký tài khoản');
        });
  }
  
  const registerButton = document.getElementById('register');
  registerButton.addEventListener('click', event => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit
    handleRegister();
  });