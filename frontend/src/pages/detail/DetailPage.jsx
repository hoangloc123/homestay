import {NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper} from '@chakra-ui/react'
import GoogleMapLink from '@components/map/GoogleMapLink'
import MapView from '@components/map/MapView'
import {parseZonedDateTime} from '@internationalized/date'
import {Button, DateRangePicker, Image} from '@nextui-org/react'
import {cn, convertStringToNumber} from '@utils/Utils'
import 'leaflet/dist/leaflet.css'
import {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import ImageGallery from '../../components/galery/Galery'
import Loading from '../../components/loading/Loading'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory'
import useRouter from '../../hook/use-router'
import {amenitiesConst} from '../../utils/constData'
import {roomList} from '../mock'

const reviews = [
	{
		id: 1,
		name: 'My',
		country: 'Việt Nam',
		avatar: 'https://placehold.co/50x50',
		stayDetails: 'Căn Hộ 1 Phòng Ngủ Có Ban Công',
		stayDuration: '4 đêm · tháng 8/2024',
		stayType: 'Cặp đôi',
		reviewDate: 'Ngày đánh giá: ngày 27 tháng 8 năm 2024',
		title: 'Rẻ bất ngờ',
		rating: 9.0,
		pros: 'Giá rẻ bất ngờ nên mình phải hỏi đi hỏi lại, tiện ích đầy đủ nhưng hơi ngại vì mình phải đổi căn giữa chừng 1 tẹo. Đặt studio 1 phòng ngủ mà bên home toàn đưa căn 2 phòng ngủ nên bị dư ko làm gì luôn. Có karaoke miễn phí và bơi thoải mái, giải trí nữa nên cũng thích, gần trung tâm',
		cons: 'Dụng cụ bếp mình thấy còn hơi chưa sạch sẽ và đầy đủ tiện nghi lắm thôi, còn lại quá okeee',
		response: 'cảm ơn quý khách rất nhiều.hẹn gặp lại quý khách lần sau ạk',
		helpfulCount: 1,
	},
	{
		id: 2,
		name: 'Ngọc',
		country: 'Việt Nam',
		avatar: 'https://placehold.co/50x50',
		stayDetails: 'Căn Hộ 3 Phòng Ngủ Nhìn Ra Biển',
		stayDuration: '1 đêm · tháng 10/2024',
		reviewDate: 'Ngày đánh giá: ngày 9 tháng 10 năm 2024',
		title: 'ok',
		rating: 10,
		pros: 'ok',
		helpfulCount: 0,
	},
]
const latitude = 16.071229 // Vĩ độ mới
const longitude = 108.229786

const htmlContent = `<h1>Chào mừng đến với trang web của tôi!</h1>
                       <p>Đây là một đoạn văn bản được render từ HTML.</p>`

export default function DetailPage() {
	const router = useRouter()
	const {id} = useParams()
	const {onOpen} = useModalCommon()

	const overviewRef = useRef()
	const infoRef = useRef()
	const commentsRef = useRef()
	const amenityRef = useRef()
	const noteRef = useRef()
	const policyRef = useRef()

	const [activeSection, setActiveSection] = useState()
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		if (!id) return
		factories
			.getDetailAccommodation(id)
			.then(data => setData(data))
			.finally(() => setLoading(false))
	}, [id])

	function handlePressScroll(ref) {
		setActiveSection(ref)
		scrollToSection(ref)
	}
	function scrollToSection(ref) {
		if (ref.current) {
			ref.current.scrollIntoView({behavior: 'smooth'})
		}
	}

	function openModalImageGallery() {
		onOpen({
			view: <ImageGallery images={data.images} />,
			title: 'Thư viện ảnh',
			size: '5xl',
			showFooter: false,
		})
	}

	return (
		<div className="mx-auto max-w-full px-5 pb-24 pt-10 lg:max-w-[80%] lg:px-0">
			<SectionNavigator />

			{loading ? (
				<Loading />
			) : (
				<>
					<Overview />
					<InfoPrice />
					<PolicyRender />
					<Amenity selectedIds={data?.amenities} />
					<NoteRender note={data?.note} />
					<CommentList />
				</>
			)}
		</div>
	)

	// section
	function SectionNavigator() {
		return (
			<div className="flex w-full flex-grow flex-row overflow-x-auto border-b-1 border-grey-200">
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-0 border-b-3 border-b-cyan-dark', '')}
					onClick={() => handlePressScroll(overviewRef)}
				>
					Tổng quan
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === infoRef)}
					onClick={() => handlePressScroll(infoRef)}
				>
					Phòng và giá vé
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-none', activeSection === amenityRef)}
					onClick={() => handlePressScroll(amenityRef)}
				>
					Tiện nghi
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === policyRef)}
					onClick={() => handlePressScroll(policyRef)}
				>
					Chính sách
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === noteRef)}
					onClick={() => handlePressScroll(noteRef)}
				>
					Ghi chú
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === commentsRef)}
					onClick={() => handlePressScroll(commentsRef)}
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
				ref={overviewRef}
				className="my-5"
			>
				<div className="flex items-start justify-between gap-4 overflow-scroll">
					<div className="w-3/4 min-w-[300px]">
						<h1 className="mb-2 text-3xl font-bold">{data.name}</h1>
						<div className="mb-4 grid grid-cols-3 gap-2">
							{data.images.slice(0, 5).map((image, index) => (
								<Image
									key={index}
									className="aspect-w-6 aspect-h-5 overflow-hidden rounded-md border"
									src={image}
									alt={`Resort view ${index + 1}`}
									style={{
										height: '100%',
										width: '100%',
										objectFit: 'cover',
									}}
								/>
							))}
							{data.images.length > 5 && (
								<button
									className="relative"
									onClick={openModalImageGallery}
								>
									<Image
										src={data.images[6]}
										alt="Resort view 6"
										className="z-0 h-auto w-full"
									/>
									<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 text-lg font-bold text-white">
										+{data.images.length - 6}
									</div>
								</button>
							)}
						</div>

						<div
							className="mb-4"
							dangerouslySetInnerHTML={{__html: data.description}}
						/>
					</div>
					<div className="w-1/4 min-w-[200px] rounded-lg bg-gray-100 p-4 shadow-lg">
						<div className="mb-4 flex justify-between">
							<span className="text-lg font-bold">Đánh giá</span>
							<div className="mb-2 flex items-center">
								{Array.from({length: 5}, (_, index) => (
									<i
										key={index}
										className={`fas fa-star ${index < data?.rating ? 'text-yellow-500' : 'text-gray-300'}`}
									></i>
								))}
							</div>
						</div>
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
						<button
							onClick={() => handlePressScroll(infoRef)}
							className="w-full rounded-lg bg-blue-600 py-2 text-white"
						>
							Đặt ngay
						</button>
					</div>
				</div>
				<div className="flex w-full flex-row justify-between">
					<div className="flex-grow">
						<h2 className="mb-2 text-xl font-bold">Các tiện nghi</h2>
						<div className="flex flex-wrap gap-5">
							{amenitiesConst.map(amenity => {
								const selectedIds = data.amenities
								const hasSelectedChild = amenity.items.some(item => selectedIds.includes(item.id))
								if (selectedIds.includes(amenity.id) || hasSelectedChild) {
									return (
										<div
											key={amenity.id}
											className="min-w-[150px] rounded-md border px-6 py-3 shadow-md"
										>
											<div className="flex items-center gap-2">
												{amenity.icon()}
												<p className={cn('text-lg font-bold')}>{amenity.title}</p>
											</div>
										</div>
									)
								}
							})}
						</div>
					</div>

					<div className="min-w-[400px]">
						<h2 className="mb-2 w-full text-xl font-bold">Hiển thị trên bản đồ</h2>
						<div className="flex w-full justify-end">
							<GoogleMapLink
								lat={data?.lat}
								lng={data?.lng}
							/>
						</div>
						<MapView
							zoom={20}
							height={'400px'}
							width={'100%'}
							lat={data?.lat}
							lng={data?.lng}
						/>
					</div>
				</div>
			</div>
		)
	}

	function InfoPrice() {
		return (
			<div
				ref={infoRef}
				className="my-10"
			>
				<header className="mb-4 flex items-center justify-between">
					<h1 className="text-3xl font-bold">Phòng trống</h1>
					<div className="flex items-center space-x-2">
						<DateRangePicker
							radius="sm"
							hideTimeZone
							variant="flat"
							visibleMonths={2}
							className="flex-5 border-none"
							defaultValue={{
								start: parseZonedDateTime('2024-04-01T00:45[America/Los_Angeles]'),
								end: parseZonedDateTime('2024-04-08T11:15[America/Los_Angeles]'),
							}}
						/>
						<Button
							onClick={() => {}}
							variant="solid"
							radius="sm"
							className="w-full min-w-[200px] bg-blue-600 px-4 py-2 text-white xl:w-fit"
						>
							Thay đổi tìm kiếm
						</Button>
					</div>
				</header>
				<div className="my-10 flex flex-row">
					<table className="w-full min-w-[900px] border-collapse overflow-scroll">
						<thead>
							<tr className="max-h-12 border-l bg-blue-100">
								<th className="border p-2">Loại chỗ nghỉ</th>
								<th className="border p-2">Số lượng khách</th>
								<th className="border p-2">Giá hôm nay</th>
								<th className="border p-2">Các lựa chọn</th>
								<th className="border p-2">Chọn số lượng</th>
							</tr>
						</thead>
						<tbody>
							{roomList.map((room, index) => (
								<tr
									key={index}
									className=""
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
										<div className="font-bold text-green-600">{convertStringToNumber(room.price)}</div>
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
											<div className="flex items-center justify-center gap-5">
												<NumberInput
													className="max-w-[80px]"
													defaultValue={15}
													min={0}
													max={100}
													clampValueOnBlur={false}
												>
													<NumberInputField />
													<NumberInputStepper>
														<NumberIncrementStepper />
														<NumberDecrementStepper />
													</NumberInputStepper>
												</NumberInput>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex flex-col border-b border-r">
						<div className="flex h-[66px] min-w-64 items-center justify-center border border-r bg-blue-100 text-center font-bold 2xl:h-[42px]">
							Thanh toán
						</div>
						<div className="sticky right-0 top-0 p-2">
							<div className="mx-auto max-w-xs rounded-lg bg-blue-50 p-4 shadow-md">
								<div className="mb-2 text-sm text-gray-700">2 phòng tổng tiền</div>
								<div className="text-2xl font-bold text-gray-900">VND 1.200.000</div>
								<div className="my-2 flex justify-end">
									<Button
										color="primary"
										variant="shadow"
										className="rounded-md"
									>
										Đặt phòng
									</Button>
								</div>
								<div className="mt-4 text-sm text-gray-700">Bạn sẽ được chuyển sang bước kế tiếp</div>
								<ul className="list-inside list-disc text-sm text-gray-700">
									<li>Xác nhận tức thời</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	function Review({review}) {
		return (
			<div className="mb-4 flex w-full flex-row rounded-lg bg-white p-4 shadow">
				<div className="flex w-1/4 items-start">
					<img
						src={review.avatar}
						alt="User avatar"
						className="mr-4 h-12 w-12 rounded-full"
					/>
					<div>
						<div className="mb-1 flex items-center">
							<h3 className="mr-2 font-bold">{review.name}</h3>
							<span className="text-sm text-gray-500">{review.country}</span>
						</div>
						<div className="mb-1 text-sm text-gray-500">{review.stayDetails}</div>
						<div className="mb-1 text-sm text-gray-500">{review.stayDuration}</div>
						<div className="text-sm text-gray-500">{review.stayType}</div>
					</div>
				</div>
				<div className="mt- flex-1">
					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-500">{review.reviewDate}</div>
						<div className="rounded bg-blue-600 px-2 py-1 text-sm font-bold text-white">{review.rating}</div>
					</div>
					<h4 className="mt-2 font-bold">{review.title}</h4>
					<div className="mt-2 flex flex-col">
						<p className="flex items-center text-green-600">
							<i className="fas fa-smile mr-2"></i>
							{review.pros}
						</p>
						{review.cons && (
							<p className="text-red-600 mt-2 flex items-center">
								<i className="fas fa-frown mr-2"></i>
								{review.cons}
							</p>
						)}
					</div>
					{/* {review.response && (
            <div className="bg-gray-100 p-2 rounded mt-4">
              <p className="flex items-center text-gray-700"><i className="fas fa-comment-dots mr-2"></i>Phản hồi của chỗ nghỉ:</p>
              <p className="text-gray-700 mt-1">{review.response}</p>
            </div>
          )} */}
					{/* <div className="flex items-center mt-4 text-sm text-gray-500">
            <span>{review.helpfulCount} người thấy đánh giá này có ích.</span>
            <button className="ml-4 text-blue-600 flex items-center"><i className="fas fa-thumbs-up mr-1"></i>Hữu ích</button>
            <button className="ml-4 text-blue-600 flex items-center"><i className="fas fa-thumbs-down mr-1"></i>Không hữu ích</button>
          </div> */}
				</div>
			</div>
		)
	}

	function CommentList() {
		return (
			<div
				ref={commentsRef}
				className="mx-auto mt-20 w-full"
			>
				<h1 className="mb-4 text-3xl font-bold">Đánh giá của khách</h1>
				{reviews.map(review => (
					<Review
						key={review.id}
						review={review}
					/>
				))}
			</div>
		)
	}

	function Amenity({selectedIds}) {
		if (!selectedIds) return
		return (
			<div
				ref={amenityRef}
				className="my-10 flex flex-col"
			>
				<h1 className="mb-4 text-3xl font-bold">Dịch vụ đi kèm</h1>
				<div className="flex flex-row flex-wrap gap-[30px]">
					{amenitiesConst.map(amenity => {
						const hasSelectedChild = amenity.items.some(item => selectedIds.includes(item.id))
						if (selectedIds.includes(amenity.id) || hasSelectedChild) {
							return (
								<div
									key={amenity.id}
									className="w-[320px]"
								>
									<div className="flex items-center gap-2">
										{amenity.icon()}
										<p className={cn('text-lg', selectedIds.includes(amenity.id) && 'font-bold')}>{amenity.title}</p>
									</div>
									<ul>
										{amenity.items.map(item => {
											if (selectedIds.includes(item.id)) {
												return (
													<li
														key={item.id}
														className="flex flex-row items-center gap-2"
													>
														<i className="fas fa-check text-xs text-gray-400"></i>
														<p className="text-xs text-gray-600">{item.title}</p>
													</li>
												)
											}
										})}
									</ul>
								</div>
							)
						}
					})}
				</div>
			</div>
		)
	}

	function PolicyRender() {
		return (
			<div
				ref={policyRef}
				className="mx-auto my-20 w-full rounded-lg bg-white"
			>
				<h1 className="mb-4 text-3xl font-bold">Chính sách</h1>
				<div className="mb-4 rounded-lg border p-4 shadow-md">
					<div className="mb-4 flex">
						<div className="flex w-72">
							<i className="fas fa-sign-in-alt mr-2 text-xl"></i>
							<h2 className="font-bold">Nhận phòng</h2>
						</div>
						<div dangerouslySetInnerHTML={{__html: data.policy.checkIn}} />
					</div>
					<div className="mb-4 flex flex-row">
						<div className="flex w-72">
							<i className="fas fa-sign-out-alt mr-2 text-xl"></i>
							<h2 className="font-bold">Trả phòng</h2>
						</div>
						<div dangerouslySetInnerHTML={{__html: data.policy.checkOut}} />
					</div>

					<div className="mb-4 flex flex-row">
						<div className="flex min-w-72">
							<i className="fas fa-ban mr-2 text-xl"></i>
							<h2 className="font-bold">Hủy đặt phòng/ Trả trước</h2>
						</div>
						<div dangerouslySetInnerHTML={{__html: data.policy.cancellationPolicy}} />
					</div>
					<div className="mb-4 flex">
						<div className="flex min-w-72">
							<i className="fas fa-ban mr-2 text-xl"></i>
							<h2 className="font-bold">Không giới hạn độ tuổi</h2>
						</div>
						<div>
							<p>Không có yêu cầu về độ tuổi khi nhận phòng</p>
						</div>
					</div>
					<div className="mb-4 flex">
						<div className="flex min-w-72">
							<i className="fas fa-paw mr-2 text-xl"></i>
							<h2 className="font-bold">Vật nuôi</h2>
						</div>
						<div> {data.policy.allowPetPolicy ? 'Cho phép mang theo vật nuôi' : 'Không cho phép mang theo vật nuôi'}</div>
					</div>
					<div className="flex">
						<div className="flex min-w-72">
							<i className="fas fa-credit-card mr-2 text-xl"></i>
							<h2 className="font-bold">Các phương thức thanh toán</h2>
						</div>
						<div>
							<div className="mt-2 flex space-x-2">
								<div className="flex items-center justify-center rounded-lg border px-2">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
										alt="Visa"
										className="h-4 w-14 rounded-lg border"
									/>
								</div>
								<div className="flex items-center justify-center rounded-lg border px-2">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
										alt="MasterCard logo"
										className="h-4 w-14"
									/>
								</div>
								<div className="flex items-center justify-center rounded-lg border px-1">
									<img
										src="https://www.shareicon.net/data/512x512/2016/07/08/117093_online_512x512.png"
										alt="JCB logo"
										className="h-4 w-14"
									/>
								</div>
								<div className="flex items-center justify-center rounded-lg border px-1">
									<img
										src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
										alt="Cash logo"
										className="h-4 w-14"
									/>
								</div>
								<div className="rounded-md bg-green-600 px-2 py-0.5 text-white">
									<span className="text-sm">Tiền mặt</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	function NoteRender({note}) {
		if (note)
			return (
				<div
					ref={noteRef}
					className="my-10 flex flex-col"
				>
					<h1 className="mb-4 text-3xl font-bold">Ghi chú</h1>
					<div
						className="rounded-lg border p-4 shadow-md"
						dangerouslySetInnerHTML={{__html: note}}
					></div>
				</div>
			)
	}
}
