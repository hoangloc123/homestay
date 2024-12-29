import InputField from '@components/common/InputField'
import InputQuillForm from '@components/common/InputQuillForm'
import SelectField from '@components/common/SelectField'
import UploadImages from '@components/common/UploadImage'
import {Button, Checkbox} from '@nextui-org/react'
import {AMENITIES, PAYMENT_METHODS, PROVINCES, TYPE_HOST} from '@utils/constants'
import {ToastInfo, ToastNotiError, uploadFirebase} from '@utils/Utils'
import React, {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useAuth} from '../../../context/AuthContext'
import {useModalCommon} from '../../../context/ModalContext'
import {factories} from '../../../factory'

export default function CreateAccommodationModal({onReload}) {
	const [isLoading, setIsLoading] = useState(false)
	const [amenities, setAmenities] = useState([])
	const [paymentMethods, setPaymentMethods] = useState([])
	const {auth} = useAuth()
	const {onClose} = useModalCommon()
	const methods = useForm()
	const {watch, setValue} = methods

	// useEffect(() => {
	// 	setValue('price', 0)
	// 	setValue('ownerId', '1')
	// 	setValue('name', '1')
	// 	setValue('city', '1')
	// 	setValue('avatar', '1')
	// 	setValue('address', '1')
	// 	setValue('pricePerNight', '1')
	// 	setValue('amenities', '1')
	// 	setValue('lat', '1')
	// 	setValue('lng', '1')
	// 	setValue('images', '1')
	// 	setValue('description', '1')
	// 	setValue('noteAccommodation', '1')
	// 	setValue('type', '1')
	// 	setValue('outstanding', '1')
	// 	setValue('options', '1')
	// 	setValue('activities', '1')
	// }, [])
	async function handleSave(values) {
		setIsLoading(true)
		let data = {
			...values,
			ownerId: auth._id,
			pricePerNight: Number(values.pricePerNight),
			amenities: amenities,
			paymentMethods: paymentMethods,
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
			.createNewAccommodation(data)
			.then(() => {
				ToastInfo('Tạo mới chỗ nghỉ thành công')
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
	function handleChoosePayment(id) {
		const newList = paymentMethods.includes(id) ? paymentMethods.filter(paymentMethod => paymentMethod !== id) : [...paymentMethods, id]
		setPaymentMethods(newList)
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
								placeholder="Nhập tên chỗ nghỉ"
								label="Tên chỗ nghỉ"
								isRequired
								validate={{required: 'Bắt buộc chọn'}}
								name={'name'}
							/>
							<SelectField
								options={PROVINCES || []}
								placeholder="Chọn thành phố"
								isRequired
								label="Thành phố"
								isMultiple
								validate={{required: 'Bắt buộc chọn'}}
								name={'city'}
							/>
						</div>
						<SelectField
							options={TYPE_HOST || []}
							placeholder="Chọn loại chỗ nghỉ"
							label="Loại hình"
							isRequired
							validate={{required: 'Bắt buộc chọn'}}
							name={'type'}
						/>
						<div className="flex flex-row gap-2">
							<InputField
								placeholder="Nhập địa chỉ"
								label="Địa chỉ"
								validate={{required: 'Bắt buộc chọn'}}
								isRequired
								name={'address'}
							/>
							{watch('type') <= 3 && (
								<InputField
									placeholder="0"
									label="Nhập giá mỗi đêm"
									isRequired
									validate={{required: 'Bắt buộc chọn'}}
									name={'pricePerNight'}
									type="number"
								/>
							)}
						</div>
						<div className="flex flex-row gap-2">
							<InputField
								placeholder="Nhập kinh độ"
								isRequired
								label="Kinh độ"
								validate={{required: 'Bắt buộc chọn'}}
								name={'lat'}
							/>
							<InputField
								placeholder="Nhập vĩ độ"
								isRequired
								label="Vĩ độ"
								validate={{required: 'Bắt buộc chọn'}}
								name={'lng'}
							/>
						</div>
						<UploadImages
							label="Hình ảnh"
							name={'hostImage'}
						/>
						<div className="rounded-lg bg-neutral-100 p-4">
							<p className="mb-2 text-sm">Tiện nghi</p>
							<div className="flex flex-wrap gap-4">
								{AMENITIES.map(x => (
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
						<div className="rounded-lg bg-neutral-100 p-4">
							<p className="mb-2 text-sm">Phương thức thanh toán</p>
							<div className="flex flex-wrap gap-4">
								{PAYMENT_METHODS.map(x => (
									<div className="flex flex-row gap-1">
										<Checkbox
											key={x.id}
											isSelected={paymentMethods.includes(x.id)}
											onValueChange={() => handleChoosePayment(x.id)}
										/>
										<p className="text-sm text-neutral-700">{x.label}</p>
									</div>
								))}
							</div>
						</div>
						<InputQuillForm
							placeholder="Miêu tả"
							label="Miêu tả"
							name={'description'}
						/>
						<InputQuillForm
							placeholder="Điểm nổi bật"
							label="Điểm nổi bật"
							name={'outstanding'}
						/>
						<InputQuillForm
							placeholder="Lựa chọn"
							label="Lựa chọn"
							name={'options'}
						/>
						<InputQuillForm
							placeholder="Hoạt động"
							label="Hoạt động"
							name={'activities'}
						/>
						<InputQuillForm
							placeholder="Ghi chú quy định"
							label="Quy định"
							name={'noteAccommodation'}
						/>
					</div>
					<Button
						isLoading={isLoading}
						type="submit"
					>
						Tạo mới chỗ nghỉ
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}
