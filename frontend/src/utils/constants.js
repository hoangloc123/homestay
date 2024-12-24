export const TYPE_HOST = [
    {
        id: 1,
        name: 'Căn hộ',
    },
    {
        id: 2,
        name: 'Nhà nguyên căn',
    },
    {
        id: 3,
        name: 'Biệt thự',
    },
    {
        id: 4,
        name: 'Khách sạn',
    },
    {
        id: 5,
        name: 'Nhà nghỉ',
    },
    {
        id: 6,
        name: 'Resort',
    },
]

export const PROVINCES = [
    {
        id: '21',
        name: 'Đà Nẵng',
    },
    {
        id: '1',
        name: 'Hà Nội',
    },
    {
        id: '2',
        name: 'Vũng Tàu',
    },
    {
        id: '23',
        name: 'Hải Phòng',
    },
    {
        id: '25',
        name: 'TP. Hồ Chí Minh',
    },
]

export const AMENITIES = [
    { id: '3.1', title: 'Nhìn ra thành phố' },
    { id: '3.2', title: 'Nhìn ra địa danh nổi tiếng' },
    { id: '4.1', title: 'Bàn ghế ngoài trời' },
    { id: '4.3', title: 'Hồ bơi riêng' },
    { id: '8.7', title: 'Minibar' },
    { id: '8.8', title: 'Nhà hàng' },
    { id: '8.9', title: 'Máy pha trà/cà phê' },
    { id: '10.1', title: 'Có chỗ đỗ xe' },
    {
        id: '12.1',
        title: 'Có xuất hóa đơn',
    },
    { id: '13.1', title: 'Dịch vụ đưa đón (Phụ phí)' },
    { id: '13.3', title: 'Chỗ ngủ cho vật nuôi' },
    {
        id: '12.4',
        title: 'Lễ tân 24 giờ',
    },
    { id: '9.1', title: 'Wi-fi miễn phí' },
]

export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    HOST: 'host',
    EMPLOYEE: 'employee',
})

export const sidebarItems = [
    {
        id: 'dashboard',
        icon: 'fa-th-large',
        label: 'Tổng quan',
        title: 'Tổng quan',
        roles: ['admin', 'host'],
    },
    {
        id: 'users',
        icon: 'fa-users',
        label: 'Tài khoản',
        title: 'Danh sách Tài khoản',
        active: true,
        roles: ['admin', 'host'],
    },
    {
        id: 'accommodation',
        icon: 'fa-hotel',
        title: 'Danh sách cơ sở cho thuê',
        label: 'Chỗ nghỉ',
        roles: ['admin', 'host'],
    },
    {
        id: 'room',
        icon: 'fa-bed',
        title: 'Danh sách phòng thuê',
        label: 'Phòng thuê',
        roles: ['admin', 'host'],
    },
    {
        id: 'booking',
        icon: 'fa-tasks',
        label: 'Đặt phòng',
        title: 'Danh sách lượt đặt phòng',
        roles: ['admin', 'host'],
    },
    {
        id: 'request',
        icon: 'fa-clipboard-list',
        label: 'Yêu cầu',
        title: 'Đăng ký chỗ nghỉ mới',
        roles: ['admin'],
    },
    {
        id: 'review',
        icon: 'fa-star',
        label: 'Đánh giá',
        title: 'Danh sách đánh giá',
        roles: ['admin'],
    },
    // {
    //     id: 'profile',
    //     icon: 'fa-smile',
    //     title: 'Thông tin tài khoản',
    //     label: 'Thông tin',
    //     roles: ['admin', 'host', 'employee'],
    // },
]


export const GENDER = {
    1: 'Nam',
    2: 'Nữ',
    3: 'Khác',
};


export const STATUS = {
    true: 'Hoạt động',
    false: 'Vô hiệu hóa',
};


export const PAYMENT_METHODS = [
    {
        id: '1',
        label: 'Thanh toán khi nhận phòng',
    },
    {
        id: '2',
        label: 'Thanh toán qua VNPAY',
    },
    {
        id: '3',
        label: 'Thanh toán qua ví MOMO',
        disable: true,
    },
];

export const REVIEW = [
    {
        id: 1,
        title: 'Rất tốt',
    }
]

export const WEEKDAYS = [
    'Chủ nhật ',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
];