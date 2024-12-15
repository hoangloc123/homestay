import {Button, Chip} from '@nextui-org/react'
import {RouterPath} from '@router/RouterPath'
import {convertStringToNumber, getGGMapLink} from '@utils/Utils'

import {Flex} from '@chakra-ui/react'
import {useEffect, useMemo, useState} from 'react'
import Loading from '../../components/loading/Loading'
import PaginationCustom from '../../components/pagination'
import {factories} from '../../factory'
import useRouter from '../../hook/use-router'
import {AMENITIES, PROVINCES, TYPE_HOST} from '../../utils/constants'

export default function SearchResult() {
	const router = useRouter()
	const {
		city,
		fromDate,
		toDate,
		capacity,
		roomQuantity,
		isWithPet,
		amenities = '',
		pricePerNight,
		page = 1,
		limit = 10,
		sort,
		type,
	} = router.getAll()
	const [loading, setLoading] = useState(false)
	const [newPage, setPage] = useState()
	const [data, setData] = useState([])

	const price = useMemo(() => {
		return pricePerNight.split(',')
	}, [pricePerNight])

	useEffect(() => {
		setLoading(true)
		const newData = {
			city,
			fromDate: fromDate,
			toDate: toDate,
			capacity: capacity,
			roomQuantity: roomQuantity,
			isWithPet: isWithPet,
			pricePerNight: pricePerNight,
			amenities: amenities,
			page: newPage,
			limit: 10,
		}
		factories
			.getAccommodations(newData)
			.then(data => setData(data))
			.finally(() => setLoading(false))
	}, [city, fromDate, toDate, capacity, roomQuantity, isWithPet, amenities, pricePerNight, page, limit])

	return (
		<div className="flex w-full flex-col gap-2">
			<p className="text-2xl font-bold">Tìm thấy: {data?.pagination?.total ?? 0} chỗ nghỉ</p>
			<div className="mb-2 flex flex-wrap gap-2">
				{sort && (
					<Chip
						color="success"
						className="text-white"
					>
						{sort}
					</Chip>
				)}

				{/* Loại chỗ nghĩ */}
				{type?.split(',')?.map((item, index) => {
					const data = TYPE_HOST.find(x => x.id.toString() === item)?.name
					if (data) {
						return (
							<Chip
								key={index}
								color="primary"
								className="text-white"
							>
								{data}
							</Chip>
						)
					}
					return null
				})}
				{/* Tiện nghi */}
				{amenities?.split(',')?.map((item, index) => {
					const data = AMENITIES.find(x => x.id === item)?.title
					if (data) {
						return (
							<Chip
								key={index}
								color="success"
								className="text-white"
							>
								{data}
							</Chip>
						)
					}
					return null
				})}
				<Chip
					color="warning"
					className="text-white"
				>
					Giá: {price[0]} - {price[1]}
				</Chip>
			</div>
			{!loading ? (
				<div className="flex w-full flex-col gap-5">
					{data?.accommodations?.map(x => (
						<CardSearch
							key={x._id}
							item={x}
						/>
					))}
					<PaginationCustom
						total={data?.pagination?.total}
						onChange={setPage}
					/>
				</div>
			) : (
				<Loading />
			)}
		</div>
	)
}

function CardSearch({item}) {
	const router = useRouter()

	return (
		<div className="flex w-full flex-col rounded-lg border bg-white p-4 hover:shadow-xl">
			<div className="flex w-full">
				<div className="relative">
					<img
						src={
							item?.avatar ??
							'https://cf.bstatic.com/xdata/images/hotel/square240/619341232.webp?k=7887c694275fc4c37189071e70c9b3193ba6dfab928f1248f471ee8896113163&o='
						}
						alt="image"
						className="aspect-square h-52 w-52 rounded-md"
					/>
				</div>
				<div className="ml-4 flex-1">
					<div className="flex justify-between">
						<div>
							<Flex
								alignItems={'center'}
								gap={2}
							>
								<h2 className="text-lg font-extrabold text-blue-600">{item?.name}</h2>
								<p className="text-[10px] text-sm font-bold text-blue-500">{TYPE_HOST.find(x => x.id === item.type)?.name ?? 'Loại'}</p>
							</Flex>
							<div className="flex items-center gap-2">
								<p className="text-[10px] text-sm font-bold text-blue-400 underline">
									{item.address} - {PROVINCES.find(x => x.id.toString() === item.city)?.name}
								</p>
								<a
									target="_blank"
									href={getGGMapLink(item?.lat, item?.lng)}
									className="text-[10px] font-bold text-blue-500 underline"
								>
									{'Xem trên bản đồ'}
								</a>
							</div>
						</div>
						<div className="flex items-center justify-center gap-2">
							<div className="flex flex-col items-end">
								<p className="text-[14px] font-bold">Rất tốt</p>
								<p className="text-[12px] text-gray-600">194 đánh giá</p>
							</div>
							<div className="flex items-center text-sm text-gray-500">
								<span className="rounded-md bg-blue-700 px-1 py-1 text-white">{item?.rating ?? 0}</span>
							</div>
						</div>
					</div>

					<div className="mt-2">
						<div className="flex items-center justify-between">
							<p className="mt-1 w-fit rounded-lg border p-2 py-0 text-sm">Phòng được đề xuất cho bạn</p>
							<p className="w-fit py-0 text-[10px]">1 đêm, 4 người lớn</p>
						</div>
						<div className="flex h-full items-center gap-4">
							<hr className="h-16 w-1 bg-gray-200" />
							<div className="flex min-h-[130px]">
								<div className="flex flex-col justify-center text-sm">
									<div className="flex">
										<div className="font-bold">Căn hộ 1 phòng ngủ</div>
									</div>
									<div className="flex">
										Căn hộ nguyên căn50 m²Bếp riêngPhòng tắm riêngBan côngNhìn ra hồNhìn ra vườnNhìn ra hồ bơiNhìn ra địa danh nổi tiếngNhìn
										ra thành phốHồ bơi có tầm nhìnHướng nhìn sân trongHồ bơi trên sân thượngĐiều hòa không khí Sân trongTV màn hình phẳng
									</div>
								</div>
								<div className="item-end flex min-w-[140px] flex-col justify-end">
									<p className="text-end font-bold">{convertStringToNumber(item?.pricePerNight)}</p>
									<p className="text-end text-[9px]">{'Đã bao gồm thuế và phí'}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-2 mt-0 flex w-full items-center justify-between">
				<div className="flex flex-col">
					<div className="text-content text-lg font-bold">{item?.amenities.includes('F1') && 'KHÔNG CẦN THANH TOÁN TRƯỚC'}</div>
				</div>
				<div className="flex flex-col items-end gap-2">
					<Button
						variant="shadow"
						color="warning"
						className="text-white"
						onClick={() => {
							router.push({
								pathname: `${RouterPath.DETAIL}/${item._id}`,
							})
						}}
					>
						Xem phòng trống
					</Button>
				</div>
			</div>
		</div>
	)
}
