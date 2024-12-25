import TextAreaField from '@components/common/TextAreaField'
import GoogleMapLink from '@components/map/GoogleMapLink'
import MapView from '@components/map/MapView'
import {Button, Chip} from '@nextui-org/react'
import {TICKET_STATUS} from '@utils/constants'
import {convertStringToNumber, getDate, ToastInfo, ToastNotiError} from '@utils/Utils'
import {useEffect, useMemo, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory'

const maxStars = 5
export default function TicketModal({item, onReload}) {
	const methods = useForm()
	const [rating, setRating] = useState(item.rating)
	const [hover, setHover] = useState(0)
	const {onClose} = useModalCommon()
	const {auth} = useAuth()
	const isOwner = useMemo(() => auth?._id === item.userId._id, [item])
	useEffect(() => {
		if (item?.star) {
			setRating(Number(item.star))
			methods.setValue('content', item.review)
		}
	}, [item?.star])
	const onSubmit = () => {
		const values = methods.watch()
		factories
			.createReview({
				review: values.content,
				star: rating,
				id: item._id,
			})
			.then(data => {
				if (data._id) {
					ToastInfo('Cảm ơn bạn đã đánh giá dịch vụ của chúng tôi')
					onReload()
					onClose()
				}
			})
			.catch(err => {
				ToastNotiError(err.response.data.message)
			})
	}
	return (
		<div className="">
			<div className=" ">
				<div className="rounded-md bg-blue-100 p-2 text-center">
					<div className="flex flex-row justify-between">
						<p className="font-bold">Ngày nhận phòng:</p>
						<p className="">{getDate(item?.fromDate)}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-bold">Ngày trả phòng:</p>
						<p className="">{getDate(item?.toDate)}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-bold">Tổng tiền thanh toán:</p>
						<p className="">{convertStringToNumber(item?.totalPrice)}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-bold">Trạng thái:</p>
						<Chip
							color={TICKET_STATUS.find(x => x.value === item.status)?.color}
							className="text-white"
						>
							{TICKET_STATUS.find(x => x.value === item.status)?.label}
						</Chip>
					</div>
				</div>
				<div className="flex justify-around gap-2 rounded-t-lg bg-gray-100 p-2">
					<div className="flex flex-col gap-2">
						<p className="font-bold">Địa chỉ</p>
						<p className="text-sm">{item.accommodation?.address}</p>
					</div>
					<div className="mt-2 flex flex-col items-end justify-end gap-2 text-center">
						<GoogleMapLink
							lat={item?.accommodation?.lat}
							lng={item?.accommodation?.lng}
						/>
						<MapView
							zoom={20}
							height={'200px'}
							width={'200px'}
							lat={item?.accommodation?.lat}
							lng={item?.accommodation?.lng}
						/>
					</div>
				</div>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className="my-2 rounded-xl bg-neutral-100 p-2">
							<p className="text-lg font-bold">Đánh giá của bạn</p>
							<div className="mb-1 flex w-full justify-center space-x-1">
								{Array.from({length: maxStars}, (_, index) => {
									const starValue = index + 1
									return (
										<i
											key={index}
											className={`fa fa-star cursor-pointer text-2xl transition-colors ${
												starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'
											}`}
											onClick={() => isOwner && setRating(starValue)}
											onMouseEnter={() => isOwner && item.status === 1 && setHover(starValue)}
											onMouseLeave={() => isOwner && item.status === 1 && setHover(0)}
										></i>
									)
								})}
							</div>
							<TextAreaField
								name={'content'}
								className="border-none bg-transparent shadow-none hover:border-none hover:bg-transparent"
								isDisabled={!isOwner}
							/>
							{isOwner && item.status === 1 && (
								<div className="flex w-full justify-end">
									<Button
										type="submit"
										className="mt-4 text-white"
										color="secondary"
									>
										Gửi đánh giá
									</Button>
								</div>
							)}
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
