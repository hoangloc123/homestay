import {Button} from '@nextui-org/react'
import {cn} from '@utils/Utils'
import {useRef, useState} from 'react'

export default function SearchPage() {
	const overview = useRef()
	const info = useRef()
	const conform = useRef()
	const note = useRef()
	const comments = useRef()
	const [activeSection, setActiveSection] = useState()

	function handlePressScroll(ref) {
		setActiveSection(ref)
		scrollToSection(ref)
	}
	function scrollToSection(ref) {
		if (ref.current) {
			ref.current.scrollIntoView({behavior: 'smooth'})
		}
	}

	// function component UI
	// section
	function SectionNavigator() {
		return (
			<div className="flex w-full flex-grow flex-row border-b-1 border-grey-200">
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-0 border-b-3 border-b-cyan-dark', '')}
					onClick={() => handlePressScroll(overview)}
				>
					Tổng quan
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-none', activeSection === info)}
					onClick={() => handlePressScroll(info)}
				>
					Phòng và giá vé
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-none', activeSection === conform)}
					onClick={() => handlePressScroll(conform)}
				>
					Tiện nghi
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-none', activeSection === note)}
					onClick={() => handlePressScroll(note)}
				>
					Ghi chú
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-none', activeSection === comments)}
					onClick={() => handlePressScroll(comments)}
				>
					Bình luận
				</Button>
			</div>
		)
	}
	// overview
	function Overview() {
		return (
			<div
				ref={overview}
				className="p-4"
			>
				<div className="flex items-start justify-between">
					<div className="w-3/4">
						<h1 className="mb-2 text-2xl font-bold">Temple Da Nang Resort</h1>
						{/* <div className="flex items-center text-blue-600 mb-4">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-2">11 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng, Việt Nam – <span className="font-medium">Vị trí tuyệt vời</span> – <span className="underline">Hiển thị bản đồ</span></span>
          </div> */}
						<div className="mb-4 grid grid-cols-3 gap-2">
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 1"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 2"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 3"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 4"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 5"
								className="h-auto w-full"
							/>
							<div className="relative">
								<img
									src="https://placehold.co/200x150"
									alt="Resort view 6"
									className="h-auto w-full"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-lg font-bold text-white">
									+36 ảnh
								</div>
							</div>
						</div>
						<p className="mb-4">
							Bạn có thể đủ điều kiện hưởng giảm giá Genius tại Temple Da Nang Resort. Để biết giảm giá Genius có áp
							dụng cho ngày bạn chọn hay không, hãy <span className="text-blue-600 underline">đăng nhập</span>.
						</p>
						<p className="mb-4">
							Giảm giá Genius tại chỗ nghỉ này chỉ thuộc vào ngày đặt phòng, ngày lưu trú và các ưu đãi có sẵn khác.
						</p>
						<p className="mb-4">
							Nằm trên Bãi biển Mỹ Khê, Temple Da Nang Resort cung cấp chỗ nghỉ với Wi-Fi miễn phí và tầm nhìn ra biển.
							Tại đây cũng có hồ bơi ngoài trời và nhà hàng.
						</p>
						<p className="mb-4">
							Temple Da Nang Resort cách trung tâm thành phố Đà Nẵng 2 km, sân bay quốc tế Đà Nẵng 10 phút lái xe và Núi
							Ngũ Hành Sơn 8 km.
						</p>
						<p className="mb-4">
							Các phòng nghỉ tại đây đều được hoàn thiện với đồ kết an toàn trong phòng, truyền hình cáp màn hình phẳng,
							tủ lạnh mini và máy điều hòa nhiệt độ. Một số phòng nghỉ có bồn tắm và vòi sen hoặc phòng tắm riêng biệt.
							Tất cả các phòng đều có dép, máy sấy tóc và đồ vệ sinh cá nhân miễn phí. Các phòng nghỉ tại đây đều có ban
							công riêng.
						</p>
						<p className="mb-4">
							Tại Temple Da Nang Resort, du khách có thể thư giãn tại khu vực bãi biển riêng, phòng tắm nắng hoặc vườn.
							Các hoạt động như lặn biển, lướt ván buồm, chèo thuyền kayak và lặn với ống thở cũng có thể được sắp xếp
							tại đây. Du khách có thể tham gia các hoạt động như múa bụng, múa lửa và nhạc sống. Tại đây cũng có dịch
							vụ đưa đón có tính phí và dịch vụ giữ hành lý.
						</p>
						<p className="mb-4">Các cặp đôi đặc biệt thích địa điểm này — họ cho điểm 8,8 khi đi du lịch hai người.</p>
						<h2 className="mb-2 text-xl font-bold">Các tiện nghi được ưa chuộng nhất</h2>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex items-center">
								<i className="fas fa-swimming-pool text-green-600"></i>
								<span className="ml-2">Hồ bơi ngoài trời</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-smoking-ban text-green-600"></i>
								<span className="ml-2">Phòng không hút thuốc</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-concierge-bell text-green-600"></i>
								<span className="ml-2">Dịch vụ phòng</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-parking text-green-600"></i>
								<span className="ml-2">Chỗ đỗ xe miễn phí</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-wifi text-green-600"></i>
								<span className="ml-2">WiFi miễn phí</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-wheelchair text-green-600"></i>
								<span className="ml-2">Tiện nghi cho khách khuyết tật</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-utensils text-green-600"></i>
								<span className="ml-2">Nhà hàng</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-cocktail text-green-600"></i>
								<span className="ml-2">Quầy bar</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-spa text-green-600"></i>
								<span className="ml-2">Khu vực bãi tắm riêng</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-sun text-green-600"></i>
								<span className="ml-2">Bữa sáng</span>
							</div>
						</div>
					</div>
					<div className="w-1/4 rounded-lg bg-gray-100 p-4 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<span className="text-lg font-bold">Đánh giá</span>
							<div className="mb-2 flex items-center">
								<i className="fas fa-star text-yellow-500"></i>
								<i className="fas fa-star text-yellow-500"></i>
								<i className="fas fa-star text-yellow-500"></i>
							</div>
						</div>
						<img
							src="https://placehold.co/200x150"
							alt="Map"
							className="mb-4 h-auto w-full"
						/>
						<h2 className="mb-2 text-lg font-bold">Điểm nổi bật của chỗ nghỉ</h2>
						<ul className="mb-4 list-inside list-disc">
							<li>Hoàn hảo cho kỳ nghỉ 1 đêm!</li>
							<li>Địa điểm hàng đầu: Được khách gần đây đánh giá cao (8,8 điểm)</li>
							<li>Thông tin về bữa sáng: Tự chọn</li>
						</ul>
						<h2 className="mb-2 text-lg font-bold">Các lựa chọn của bạn</h2>
						<ul className="mb-4 list-inside list-disc">
							<li>Nhìn ra vườn</li>
							<li>Nhìn ra biển</li>
							<li>Phòng tắm riêng</li>
							<li>Khu vực tiếp khách riêng biệt trong khuôn viên</li>
						</ul>
						<h2 className="mb-2 text-lg font-bold">Hoạt động</h2>
						<ul className="mb-4 list-inside list-disc">
							<li>Lướt ván buồm</li>
							<li>Khu vực bãi tắm riêng</li>
							<li>Khu vực dành cho thả dù dưới nước (trong khuôn viên)</li>
						</ul>
						<button className="w-full rounded-lg bg-blue-600 py-2 text-white">Đặt ngay</button>
					</div>
				</div>
			</div>
		)
	}

	function InfoPrice() {
		return (
			<div
				ref={info}
				className="p-4"
			>
				<header className="mb-4 flex items-center justify-between">
					<h1 className="text-2xl font-bold">Phòng trống</h1>
					<div className="flex items-center space-x-2">
						<input
							type="text"
							className="border p-2"
							value="T5, 10 tháng 10 — T6, 11 tháng 10"
							readOnly
						/>
						<select className="border p-2">
							<option>2 người lớn · 1 trẻ em · 1 phòng</option>
						</select>
						<button className="rounded bg-blue-600 p-2 text-white">Thay đổi tìm kiếm</button>
					</div>
				</header>
				<div className="mb-4 flex justify-end">
					<a
						href="#"
						className="text-blue-600"
					>
						Chúng Tôi Luôn Khớp Giá!
					</a>
				</div>
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-blue-100">
							<th className="border p-2">Loại chỗ nghỉ</th>
							<th className="border p-2">Số lượng khách</th>
							<th className="border p-2">Giá hôm nay</th>
							<th className="border p-2">Các lựa chọn</th>
							<th className="border p-2">Chọn số lượng</th>
						</tr>
					</thead>
					<tbody>
						{[
							{
								type: 'Phòng Superior Có Giường Cỡ King',
								guests: '2 người lớn',
								price: 'VND 940.680',
								originalPrice: 'VND 2.400.000',
								discount: 'Tiết kiệm 61%',
								options: [
									'Bao bữa sáng tự chọn',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
									'Chỉ còn 5 phòng trống tại trang của chúng tôi',
								],
								select: true,
							},
							{
								type: 'Phòng Superior 2 Giường Đơn',
								guests: '2 giường đơn',
								price: 'VND 940.680',
								originalPrice: 'VND 2.400.000',
								discount: 'Tiết kiệm 61%',
								options: [
									'Bao bữa sáng tự chọn',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
									'Chỉ còn 5 phòng trống tại trang của chúng tôi',
								],
								select: true,
							},
							{
								type: 'Phòng Deluxe có Giường cỡ King Nhìn ra Khu vườn',
								guests: '2 người lớn',
								price: 'VND 1.063.530',
								originalPrice: 'VND 2.700.000',
								discount: 'Tiết kiệm 61%',
								options: [
									'Bao bữa sáng tự chọn',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
									'Chỉ còn 4 phòng trống tại trang của chúng tôi',
								],
								select: true,
							},
							{
								type: 'Phòng Deluxe 2 Giường Đơn Nhìn Ra Vườn',
								guests: '2 giường đơn',
								price: 'VND 1.063.530',
								originalPrice: 'VND 2.700.000',
								discount: 'Tiết kiệm 61%',
								options: [
									'Bao bữa sáng tự chọn',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
									'Chỉ còn 4 phòng trống tại trang của chúng tôi',
								],
								select: true,
							},
							{
								type: 'Phòng Deluxe Giường Đôi/2 Giường Đơn Nhìn Ra Đại Dương',
								guests: '2 người lớn',
								price: 'VND 4.050.000',
								originalPrice: '',
								discount: '',
								options: [
									'Bao bữa sáng VND 150.000 (không bắt buộc)',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
								],
								select: true,
							},
							{
								type: 'Phòng Deluxe Giường Đôi/2 Giường Đơn Nhìn Ra Đại Dương',
								guests: '2 người lớn',
								price: 'VND 4.500.000',
								originalPrice: '',
								discount: '',
								options: [
									'Bao bữa sáng tự chọn',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
								],
								select: true,
							},
							{
								type: 'Phòng Deluxe Giường Đôi/2 Giường Đơn Nhìn Ra Đại Dương',
								guests: '2 người lớn',
								price: 'VND 4.500.000',
								originalPrice: '',
								discount: '',
								options: [
									'Bao bữa sáng VND 150.000 (không bắt buộc)',
									'Không cần thẻ tín dụng',
									'Miễn phí huỷ trước kỳ nghỉ',
									'Không cần thanh toán trước - thanh toán tại chỗ nghỉ',
									'Genius - Có thể có giảm giá',
								],
								select: true,
							},
						].map((room, index) => (
							<tr
								key={index}
								className="border-t"
							>
								<td className="border p-2">
									<div className="font-bold">{room.type}</div>
									<div className="text-sm">
										<ul>
											<li>1 giường đôi cực lớn</li>
											<li>28 m² Ban công</li>
											<li>Nhìn ra vườn</li>
											<li>Nhìn ra địa danh nổi tiếng</li>
											<li>Phòng tắm riêng</li>
											<li>TV màn hình phẳng</li>
											<li>Điều hòa không khí</li>
											<li>WiFi miễn phí</li>
										</ul>
									</div>
								</td>
								<td className="border p-2 text-center">
									<div className="flex items-center justify-center space-x-1">
										<i className="fas fa-user"></i>
										<i className="fas fa-user"></i>
									</div>
								</td>
								<td className="border p-2 text-center">
									<div className="text-red-600 line-through">{room.originalPrice}</div>
									<div className="font-bold">{room.price}</div>
									<div className="text-green-600">{room.discount}</div>
								</td>
								<td className="border p-2">
									<ul className="text-sm">
										{room.options.map((option, i) => (
											<li
												key={i}
												className={option.includes('Chỉ còn') ? 'text-red-600' : ''}
											>
												{option}
											</li>
										))}
									</ul>
								</td>
								<td className="border p-2 text-center">
									{room.select && (
										<div className="flex items-center justify-center">
											<input
												type="checkbox"
												className="mr-2"
											/>
											<button className="rounded bg-blue-600 p-2 text-white">Tôi sẽ đặt</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
	return (
		<div className="mx-auto max-w-[80%] pt-10 2xl:max-w-[60%]">
			{/* navigator */}
			<SectionNavigator />
			<Overview />
			<InfoPrice />
		</div>
	)
}
