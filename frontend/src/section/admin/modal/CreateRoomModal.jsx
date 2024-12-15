import InputField from '@components/common/InputField'
import InputQuillForm from '@components/common/InputQuillForm'
import SelectField from '@components/common/SelectField'
import UploadImages from '@components/common/UploadImage'
import {Button, Checkbox, Spinner} from '@nextui-org/react'
import {AMENITIES_ROOM} from '@utils/constData'
import {ToastInfo, ToastNotiError, uploadFirebase} from '@utils/Utils'
import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useAuth} from '../../../context/AuthContext'
import {useModalCommon} from '../../../context/ModalContext'
import {factories} from '../../../factory'

export default function CreateRoomModal({onReload}) {
	const [isLoading, setIsLoading] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [amenities, setAmenities] = useState([])
	const [data, setData] = useState([])
	const [paymentMethods, setPaymentMethods] = useState([])
	const {auth} = useAuth()
	const {onClose} = useModalCommon()
	const methods = useForm()
	const {watch, setValue} = methods

	useEffect(() => {
		setValue('quantity', 20)
		setValue('capacity', 2)
		setValue('pricePerNight', 150000)
		setValue('name', 'Phòng Giường Đôi Lớn')
		loadList()
	}, [auth])
	function loadList() {
		setIsReady(false)
		const params = {
			ownerId: auth._id,
			limit: 1000,
		}
		factories
			.getAdminListAccommodation(params)
			.then(data => {
				const list = data?.accommodations.map(item => ({
					value: item._id,
					label: item.name,
				}))
				setData(list)
				setIsReady(true)
			})
			.finally(() => setIsReady(true))
	}

	async function handleSave(values) {
		setIsLoading(true)
		let data = {
			...values,
			ownerId: auth._id,
			pricePerNight: Number(values.pricePerNight),
			amenities: amenities,
			id: values.accommodationId,
		}
		if (values?.hostImage?.length > 0) {
			const newUrls = []
			for (const image of values?.hostImage) {
				if (!image.url) continue
				const newUrl = await uploadFirebase(image.file)
				newUrls.push(newUrl)
			}
			data.images = newUrls
		}

		factories
			.createNewRoom(data)
			.then(() => {
				ToastInfo('Tạo mới phòng thành công')
				onClose()
				onReload()
				setIsLoading(false)
			})
			.catch(err => {
				if (err.response?.data?.message) {
					ToastNotiError(err.response?.data?.message)
				}
				setIsLoading(false)
			})
	}

	function handleChooseAmenity(id) {
		const newList = amenities.includes(id) ? amenities.filter(amenityId => amenityId !== id) : [...amenities, id]
		setAmenities(newList)
	}
	if (!isReady) {
		return <Spinner />
	}
	return (
		<div className="flex flex-col gap-4 p-5 pt-0">
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleSave)}
					className="flex flex-col gap-4"
				>
					<div className="flex max-h-[70vh] flex-col gap-4 overflow-scroll">
						<div className="flex flex-row gap-2">
							<InputField
								placeholder="Nhập tên phòng"
								label="Tên phòng"
								validate={{required: 'Bắt buộc chọn'}}
								name={'name'}
							/>
							<SelectField
								options={data ?? []}
								placeholder="Chọn chỗ nghỉ"
								label="Chỗ nghỉ"
								validate={{required: 'Bắt buộc chọn'}}
								name={'accommodationId'}
							/>
						</div>
						<div className="flex flex-row gap-2">
							<InputField
								placeholder="Số người"
								label="Số người"
								validate={{required: 'Bắt buộc chọn'}}
								name={'capacity'}
							/>
							<InputField
								placeholder="Giá mỗi đêm"
								label="Giá mỗi đêm"
								type="number"
								validate={{required: 'Bắt buộc chọn'}}
								name={'pricePerNight'}
							/>
						</div>
						<div className="flex flex-row gap-2">
							<InputField
								placeholder="Số lượng phòng"
								type="number"
								label="Số lượng phòng"
								validate={{required: 'Bắt buộc chọn'}}
								name={'quantity'}
							/>
						</div>
						<UploadImages
							label="Hình ảnh"
							name={'hostImage'}
						/>
						<div className="rounded-lg bg-neutral-100 p-4">
							<p className="mb-2 text-sm font-bold">Tiện nghi</p>
							<div className="flex flex-wrap gap-4">
								{AMENITIES_ROOM.map(room => (
									<div className="flex-base-[700px] flex flex-wrap gap-[120px]">
										<div className="flex w-[250px] flex-col gap-2">
											<p className="mb-2 text-sm">{room.title}</p>
											{room.items?.map(x => (
												<div className="flex flex-row gap-1">
													<Checkbox
														key={x.id}
														isSelected={amenities.includes(x.id)}
														onValueChange={() => handleChooseAmenity(x.id)}
													/>
													<p className="text-sm text-neutral-700">{x.title}</p>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
						<InputQuillForm
							placeholder="Mô tả"
							label="Mô tả"
							name={'description'}
						/>
					</div>
					<Button
						isLoading={isLoading}
						type="submit"
						color="primary"
					>
						Tạo mới chỗ nghỉ
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}