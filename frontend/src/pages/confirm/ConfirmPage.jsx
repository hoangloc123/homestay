import DatePickerField from '@components/common/DatePickerField'
import ImageGallery from '@components/galery/Galery'
import {Button, Image, Radio, RadioGroup} from '@nextui-org/react'
import {RouterPath} from '@router/RouterPath'
import {PAYMENT_METHODS, PROVINCES, TYPE_HOST} from '@utils/constants'
import {convertStringToNumber, ToastInfo, ToastNotiError} from '@utils/Utils'
import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory'
import useRouter from '../../hook/use-router'

export default function ConfirmPage() {
	const [loading, setLoading] = useState(false)
	const methods = useForm()
	const {setValue} = methods
	const {auth} = useAuth()
	const router = useRouter()
	const params = router.getAll()
	const data = JSON.parse(decodeURIComponent(params.item))
	console.log('🚀 ~ ConfirmPage ~ data:', data)
	const {onOpen} = useModalCommon()

	function handleSave(values) {
		setLoading(true)
		const newTicket = {
			userId: auth._id,
			name: values.fullName,
			phone: values.phone,
			email: values?.email,
			seats: data.seats,
			bus: data.bus,
			driverId: data.driverId,
			status: 1,
			tripId: data._id,
			price: data.price,
			paymentMethod: values.payment ?? 1,
		}
		factories
			.addMoneyToWallet(newTicket)
			.then(() => {
				setLoading(false)
				ToastInfo('Đặt vé thành công')
				const encodedItem = encodeURIComponent(JSON.stringify(data))
				router.push({
					pathname: RouterPath.CREATED_SUCCESS,
					params: {
						item: encodedItem,
					},
				})
			})
			.catch(err => {
				if (err.response?.data?.message) {
					ToastNotiError(err.response?.data?.message)
				}
				setLoading(false)
			})
	}
	useEffect(() => {
		if (auth) {
			setValue('fullName', auth.fullName)
			setValue('phone', auth.phone)
			setValue('email', auth.email)
		}
	}, [auth])

	function openModalImageGallery(images) {
		onOpen({
			view: <ImageGallery images={images} />,
			title: 'Thư viện ảnh',
			size: '5xl',
			showFooter: false,
		})
	}
	return (
		<div className="mx-auto mb-20 mt-6 flex max-w-full gap-4 px-5 lg:max-w-[70%] lg:px-0 2xl:max-w-[60%]">
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleSave)}>
					<div className="flex flex-row justify-between gap-10">
						<div className="flex w-2/3 flex-col gap-4">
							<div className="w-full rounded-lg border p-6 shadow-lg">
								<h2 className="mb-4 text-lg font-semibold">Thông tin thuê</h2>
								<div className="mb-4 flex items-center justify-between">
									<div className="flex items-center gap-4">
										<span className="text-sm">
											<DatePickerField
												label="Ngày nhận phòng"
												name="dateStart"
											/>
										</span>
										<span className="text-sm">
											<DatePickerField
												label="Ngày trả phòng"
												name="dateEnd"
											/>
										</span>
									</div>
								</div>
								<div className="mb-4 flex items-center">
									<Image
										src={data.images[0] ?? 'https://static.vexere.com/production/images/1716953194738.jpeg?w=250&h=250'}
										alt="Bus image"
										className="mr-4 h-24 w-24"
									/>
									<div>
										<h3 className="font-semibold">{data.name}</h3>
										<h3 className="text-[10px] font-semibold">{data.address}</h3>
										<h3 className="font-semibold">{PROVINCES.find(x => x.value === data.city)?.label}</h3>
										<p className="text-md text-gray-800">{TYPE_HOST.find(x => x.id === data.type)?.name}</p>
									</div>
								</div>
								<hr className="my-4 border-gray-300" />
								<div className="flex flex-row gap-4">
									{data.roomsSelected?.map((room, index) => {
										const roomT = data.rooms.find(x => x._id === room.roomId)
										return (
											<div
												key={index}
												className="flex w-full flex-col gap-2"
											>
												<div className="flex w-full flex-row items-center gap-5">
													<button
														className="relative"
														type="button"
														onClick={() => openModalImageGallery(roomT?.images ?? [])}
													>
														<Image
															src={roomT.images?.[0]}
															alt="Resort view 6"
															className="z-auto aspect-square w-28"
														/>
														<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-10 text-lg font-bold text-white">
															+{roomT.images.length}
														</div>
													</button>
													<div className="flex w-full flex-row justify-between">
														<div className="flex flex-col gap-1">
															<div className="flex items-center gap-2">
																<p className="text-sm font-semibold">{roomT.name}</p>
																<p className="text-sm font-semibold">{roomT.capacity}</p>
																<i className="fas fa-user-friends ml-0 mr-2 text-gray-500"></i>
															</div>
															<p className="text-sm text-gray-500">(x{room.number})</p>
														</div>
														<p className="text-sm text-gray-500">{convertStringToNumber(roomT.pricePerNight * room.number)}</p>
													</div>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
						<div className="w-1/3">
							<div className="mb-5 w-full rounded-lg border p-6 px-4 shadow-lg">
								<div className="mb-4 flex justify-between">
									<span className="text-lg font-semibold">Giá tiền</span>
									<div className="flex flex-col items-end">
										<span className="font-sans text-sm font-semibold">
											{data.roomsSelected.length} x {convertStringToNumber(data.price)}
										</span>
									</div>
								</div>
								<div className="mb-4 flex items-center justify-between">
									<span className="text-lg font-semibold">Tổng tiền:</span>
									<div className="text-2xl font-bold text-gray-900">
										VND {data.roomsSelected.reduce((total, number) => total + number.price * number.number, 0)}
									</div>
								</div>
							</div>

							{/* // thanh toán */}
							<div className="w-full rounded-lg border p-6 px-4 shadow-lg">
								<p className="mb-2 text-lg font-bold">Phương thức thanh toán</p>
								<RadioGroup>
									{PAYMENT_METHODS.filter(i => ['1', '2'].includes(i.id)).map(x => (
										<Radio
											key={x.id}
											value={x.id}
											defaultChecked={'1'}
										>
											{x.label}
										</Radio>
									))}
								</RadioGroup>

								{/* <RadioGroup
									defaultValue={data.paymentMethods[0]}
									onChange={e => {
										setValue('payment', e)
									}}
								>
									{PAYMENT_METHODS.filter(i => data.paymentMethods.includes(i.id)).map(x => (
										<Radio
											key={x.id}
											value={x.id}
											defaultChecked={x.id === data.paymentMethods[0]}
										>
											{x.label}
										</Radio>
									))}
								</RadioGroup> */}
							</div>

							<Button
								color="primary"
								type="submit"
								className="mt-4 w-full"
								variant="shadow"
								isLoading={loading}
							>
								Tiếp tục
							</Button>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
