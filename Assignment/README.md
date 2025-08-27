# Fashion Shop - React App

## Hướng dẫn cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cài đặt JSON Server (nếu chưa có)
```bash
npm install -g json-server
```

### 3. Chạy JSON Server (Terminal 1)
```bash
json-server --watch products.json --port 3001
```

### 4. Chạy React App (Terminal 2)
```bash
npm start
```

## Tài khoản test

### Admin Account:
- **Username:** admin
- **Password:** admin
- **Role:** admin

### User Account:
- **Username:** user  
- **Password:** user
- **Role:** user

### User Account 2:
- **Username:** nganv
- **Password:** 123456
- **Role:** user

## Debug Role Issues

Nếu gặp vấn đề với role, hãy:

1. **Clear localStorage:** Nhấn nút "Clear LocalStorage (Debug)" trong trang đăng nhập
2. **Kiểm tra Console:** Mở Developer Tools (F12) và xem console logs
3. **Kiểm tra API:** Truy cập http://localhost:3001/users để xem dữ liệu users

## Features

- ✅ Đăng nhập/Đăng ký với phân quyền role
- ✅ Hiển thị role trong header (debug mode)
- ✅ Phân quyền admin/user cho các chức năng
- ✅ Quản lý sản phẩm (admin)
- ✅ Giỏ hàng và thanh toán (user)
- ✅ Wishlist (user)
- ✅ Responsive design với Bootstrap

## Cấu trúc dự án

```
src/
├── components/          # React components
├── context/            # React Context (Auth, Cart, Wishlist)
├── redux/              # Redux store và slices
└── App.js              # Main app component
```

## Troubleshooting

### Vấn đề thường gặp:

1. **Role không hiển thị đúng:**
   - Clear localStorage
   - Kiểm tra console logs
   - Đảm bảo JSON Server đang chạy

2. **API không hoạt động:**
   - Kiểm tra JSON Server có chạy trên port 3001
   - Kiểm tra file products.json có đúng format

3. **React app không start:**
   - Kiểm tra port 3000 có bị chiếm không
   - Chạy `npm install` lại
