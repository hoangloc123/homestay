export default class Constants {
	static optionsStatusBooking = [
		{label: 'Chưa xác nhận', value: 1, color: 'warning'},
		{label: 'Đã xác nhận', value: 2, color: 'primary'},
		{label: 'Đã hoàn thành', value: 3, color: 'success'},
		{label: 'Đã đánh giá', value: 4, color: 'secondary'},
	]
	static vietnamProvinces = [
		{label: 'Hà Nội', value: 1},
		{label: 'Hà Giang', value: 2},
		{label: 'Cao Bằng', value: 3},
		{label: 'Lào Cai', value: 4},
		{label: 'Điện Biên', value: 5},
		{label: 'Lai Châu', value: 6},
		{label: 'Sơn La', value: 7},
		{label: 'Yên Bái', value: 8},
		{label: 'Tuyên Quang', value: 9},
		{label: 'Lạng Sơn', value: 10},
		{label: 'Quảng Ninh', value: 11},
		{label: 'Hòa Bình', value: 12},
		{label: 'Ninh Bình', value: 13},
		{label: 'Thái Bình', value: 14},
		{label: 'Thanh Hóa', value: 15},
		{label: 'Nghệ An', value: 16},
		{label: 'Hà Tĩnh', value: 17},
		{label: 'Quảng Bình', value: 18},
		{label: 'Quảng Trị', value: 19},
		{label: 'Thừa Thiên-Huế', value: 20},
		{label: 'Đà Nẵng', value: 21},
		{label: 'Quảng Nam', value: 22},
		{label: 'Quảng Ngãi', value: 23},
		{label: 'Bình Định', value: 24},
		{label: 'Phú Yên', value: 25},
		{label: 'Khánh Hòa', value: 26},
		{label: 'Ninh Thuận', value: 27},
		{label: 'Bình Thuận', value: 28},
		{label: 'Kon Tum', value: 29},
		{label: 'Gia Lai', value: 30},
		{label: 'Đắk Lắk', value: 31},
		{label: 'Đắk Nông', value: 32},
		{label: 'Lâm Đồng', value: 33},
		{label: 'Bình Phước', value: 34},
		{label: 'Tây Ninh', value: 35},
		{label: 'Bình Dương', value: 36},
		{label: 'Đồng Nai', value: 37},
		{label: 'Bà Rịa-Vũng Tàu', value: 38},
		{label: 'Hồ Chí Minh', value: 39},
		{label: 'Long An', value: 40},
		{label: 'Tiền Giang', value: 41},
		{label: 'Bến Tre', value: 42},
		{label: 'Trà Vinh', value: 43},
		{label: 'Vĩnh Long', value: 44},
		{label: 'Đồng Tháp', value: 45},
		{label: 'An Giang', value: 46},
		{label: 'Kiên Giang', value: 47},
		{label: 'Cần Thơ', value: 48},
		{label: 'Hậu Giang', value: 49},
		{label: 'Sóc Trăng', value: 50},
		{label: 'Bạc Liêu', value: 51},
		{label: 'Cà Mau', value: 52},
		{label: 'Tây Ninh', value: 53},
		{label: 'Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam', value: 54},
		{label: 'Hà Giang', value: 55},
		{label: 'Cao Bằng', value: 56},
		{label: 'Lào Cai', value: 57},
		{label: 'Điện Biên', value: 58},
		{label: 'Lai Châu', value: 59},
		{label: 'Sơn La', value: 60},
		{label: 'Yên Bái', value: 61},
		{label: 'Tuyên Quang', value: 62},
		{label: 'Lạng Sơn', value: 63},
	]
}
export const TYPE_HOST = [
	{
		id: 1,
		name: 'Căn hộ',
	},
	{
		id: 2,
		label: '46-Seater Sleeper Bus',
		name: 'Khách sạn',
	},
	{
		id: 4,
		name: 'Nhà nghỉ',
	},
	{
		id: 5,
		label: '34-Seater Coach',
		name: 'Nhà & căn hộ nguyên căn',
	},

	{
		id: 3,
		name: 'Nhà gỗ',
	},
	{
		id: 6,
		name: 'Biệt thự',
	},
	{
		id: 7,
		label: 'VIP Sleeper Bus',
		name: 'Resort',
	},
	{
		id: 8,
		name: 'Nhà nghỉ B&B',
	},
	{
		id: 9,
		name: 'Xe Du Lịch 30 Chỗ',
	},
	{
		id: 10,
		name: 'Khách sạn tình nhân',
	},
]

export const provinceSearch = [
	{
		id: 21,
		name: 'Đà Nẵng',
	},
	{
		id: 1,
		name: 'Hà Nội',
	},
	{
		id: 2,
		name: 'Vũng Tàu',
	},
	{
		id: 23,
		name: 'Hải Phòng',
	},
	{
		id: 'ho chi minh',
		name: 'TP. Hồ Chí Minh',
	},
]

export const amenitiesSearchConst = [
	{id: '3.1', title: 'Nhìn ra thành phố'},
	{id: '3.2', title: 'Nhìn ra địa danh nổi tiếng'},
	{id: '4.1', title: 'Bàn ghế ngoài trời'},
	{id: '4.3', title: 'Hồ bơi riêng'},
	{id: '8.7', title: 'Minibar'},
	{id: '8.8', title: 'Nhà hàng'},
	{id: '8.9', title: 'Máy pha trà/cà phê'},
	{id: '10.1', title: 'Có chỗ đỗ xe'},
	{
		id: '12.1',
		title: 'Có xuất hóa đơn',
	},
	{id: '13.1', title: 'Dịch vụ đưa đón (Phụ phí)'},
	{id: '13.3', title: 'Chỗ ngủ cho vật nuôi'},
	{
		id: '12.4',
		title: 'Lễ tân 24 giờ',
	},
	{id: '9.1', title: 'Wi-fi miễn phí'},
]

export const Role = {
	ADMIN: 'admin',
	USER: 'user',
	HOST: 'host',
	EMPLOYEE: 'employee',
}
