import {Button, Chip} from '@nextui-org/react'
import {searchCar} from '@pages/mock'
import {RouterPath} from '@router/RouterPath'
import {TYPE_HOST} from '@utils/constants'
import {cn, convertStringToNumber, getGGMapLink} from '@utils/Utils'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function SearchResult() {
	return (
		<div className="flex w-full flex-col gap-2">
			<p className="text-2xl font-bold">Tìm thấy: 222 chỗ nghỉ</p>
			<div className="mb-2 flex flex-wrap gap-2">
				<Chip
					color="success"
					className="text-white"
				>
					12:00 - 24:00
				</Chip>
				<Chip
					color="success"
					className="text-white"
				>
					Giá vé: 120.000 - 500000
				</Chip>
			</div>
			<div className="flex w-full flex-col gap-5">
				{searchCar?.map(x => (
					<CardSearch item={x} />
				))}
			</div>
		</div>
	)
}

function CardSearch({item}) {
	const navigator = useNavigate()

	return (
		<div className="flex w-full flex-col rounded-lg border bg-white p-4 hover:shadow-xl">
			<div className="flex w-full">
				<div className="relative">
					<img
						src={
							item.busImage ??
							'https://www.booking.com/hotel/vn/the-song-vt-khang-aparment.vi.html?label=gog235jc-1DCAEoggI46AdIM1gDaPQBiAEBmAEquAEHyAEM2AED6AEBiAIBqAIDuAK8m4q4BsACAdICJDcyZTI0NDE2LWE3NjEtNDZiMC1iMmNmLWI3MDIxYjRlZDZiZtgCBOACAQ&sid=bb23610d06f6fec370120c4d5eec7480&aid=397594&ucfs=1&arphpl=1&checkin=2024-12-13&checkout=2024-12-14&dest_id=-3733750&dest_type=city&group_adults=3&req_adults=3&no_rooms=3&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=d5b20c5b6cc20068&srepoch=1730514613&all_sr_blocks=932002102_365956665_3_0_0&highlighted_blocks=932002102_365956665_3_0_0&matching_block_id=932002102_365956665_3_0_0&sr_pri_blocks=932002102_365956665_3_0_0__47520000&from_sustainable_property_sr=1&from=searchresults'
						}
						alt="Bus image"
						className="aspect-square h-52 w-52 rounded-md"
					/>
				</div>
				<div className="ml-4 flex-1">
					<div className="flex justify-between">
						<div>
							<h2 className="text-lg font-extrabold text-blue-600">{item.branchName}</h2>
							<div className="flex items-center gap-2">
								<p className="text-[10px] text-sm font-bold text-blue-500">
									{TYPE_HOST.find(x => x.id === item.busId)?.name ?? 'Loại'}
								</p>
								<p className="text-[10px] text-sm font-bold text-blue-500">{'Vũng tàu'}</p>
								<a
									target="_blank"
									href={getGGMapLink(16.0670626, 108.208676)}
									className="text-[10px] font-bold text-blue-500"
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
								<span className="rounded-md bg-blue-700 px-1 py-1 text-white">{item.rating}</span>
							</div>
						</div>
					</div>

					<div className="mt-2">
						<div className="flex items-center justify-between">
							<p className="w-fit rounded-lg border p-2 py-0 text-sm">Phòng được đề xuất cho bạn</p>
							<p className="w-fit py-0 text-[10px]">1 đêm, 4 người lớn</p>
						</div>
						<div className="mt-2 flex h-full items-center gap-4">
							<hr className="h-16 w-1 bg-gray-200" />
							<div className="flex min-h-[130px]">
								<div className="flex flex-col justify-center text-sm">
									<div className="flex">
										<div className="font-bold">Căn hộ 1 phòng ngủ</div>
									</div>
									<div className="flex">
										Căn hộ nguyên căn50 m²Bếp riêngPhòng tắm riêngBan côngNhìn ra hồNhìn ra vườnNhìn ra hồ bơiNhìn ra
										địa danh nổi tiếngNhìn ra thành phốHồ bơi có tầm nhìnHướng nhìn sân trongHồ bơi trên sân thượngĐiều
										hòa không khí Sân trongTV màn hình phẳng
									</div>
								</div>
								<div className="item-end flex min-w-[140px] flex-col justify-end">
									<p className="text-end font-bold">{convertStringToNumber(item.price)}</p>
									<p className="text-end text-[9px]">{'Đã bao gồm thuế và phí'}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-2 mt-0 flex w-full items-center justify-between">
				<div className="flex flex-col">
					<div className="text-content text-lg font-bold">
						{item?.feature.includes('F1') && 'KHÔNG CẦN THANH TOÁN TRƯỚC'}
					</div>
				</div>
				<div className="flex flex-col items-end gap-2">
					<Button
						variant="shadow"
						color="warning"
						className="text-white"
						onClick={() => {
							navigator(`${RouterPath.DETAIL}/${item.id}`)
						}}
					>
						Xem phòng trống
					</Button>
				</div>
			</div>
		</div>
	)
}
