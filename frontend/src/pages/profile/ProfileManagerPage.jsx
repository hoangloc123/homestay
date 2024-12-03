import {Button, ButtonGroup, Card, CardBody, CardHeader, Divider} from '@nextui-org/react'
import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import DatePickerField from '../../components/common/DatePickerField'
import InputField from '../../components/common/InputField'
import Sidebar from '../../components/sidebar/SideBar'
import {useAuth} from '../../context/AuthContext'
import {factories} from '../../factory'
import {ToastInfo, ToastNotiError} from '../../utils/Utils'

export default function ProfileManagerPage() {
	const {auth, login} = useAuth()
	const methods = useForm()
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: {errors},
	} = methods
	useEffect(() => {
		if (auth) {
			setValue('displayName', auth.displayName || '')
			setValue('photoURL', auth.photoURL || '')
			setValue('phone', auth.phone || '')
			// setValue('dob', auth.dob ? new Date(auth.dob) : null)
			setValue('gender', auth.gender || '')
			setValue('email', auth.email || '')
		}
	}, [auth])

	function handleSave(values) {
		setLoading(true)
		const newValues = {
			...values,
			// dob: values.dob ? new Date(values.dob.year, values.dob.month - 1, values.dob.day).toUTCString() : null,
		}
		factories
			.updateUserInfo(auth.id, newValues)
			.then(data => {
				ToastInfo('Cập nhật thông tin thành công')
				handleUserInfo()
				setLoading(false)
			})
			.catch(err => {
				if (err.response?.data?.message) {
					ToastNotiError(err.response?.data?.message)
				}
				setLoading(false)
			})
	}

	function handleUserInfo() {
		factories
			.getUserInfo(auth.id)
			.then(data => {
				login(data)
			})
			.catch(err => {
				ToastNotiError(err.response?.data?.message)
			})
	}

	return (
		<div className="mx-auto my-20 flex justify-center">
			<div className="flex w-full max-w-[60%] gap-6">
				<div className="w-fit">
					<Sidebar active="1" />
				</div>
				<div className="flex flex-grow">
					<Card className="w-full">
						<CardHeader className="font-bold">Thông tin cá nhân</CardHeader>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(handleSave)}>
								<CardBody className="w-full gap-4">
									<div className="flex gap-4">
										<InputField
											label={'Họ và tên'}
											placeholder="Nhập họ và tên"
											name={'displayName'}
											register={register}
											isRequired
											errors={errors}
										/>
										<InputField
											placeholder="Nhập số điện thoại"
											label={'Số điện thoại'}
											name={'phone'}
											isRequired
											register={register}
											errors={errors}
										/>
									</div>
									<div className="flex gap-4">
										<InputField
											placeholder="Nhập email"
											label={'Email'}
											isRequired
											name={'email'}
											register={register}
											errors={errors}
										/>
										<DatePickerField
											placeholder="Nhập ngày sinh"
											label={'Ngày sinh'}
											name={'dob'}
											isRequired
											register={register}
											errors={errors}
										/>
									</div>
									<ButtonGroup className="w-full">
										<Button
											className="w-full"
											variant="solid"
											color={watch('gender') === 1 ? 'primary' : 'default'}
											onClick={() => setValue('gender', 1)}
										>
											Nam
										</Button>
										<Button
											className="w-full"
											onClick={() => setValue('gender', 2)}
											variant="solid"
											color={watch('gender') === 2 ? 'primary' : 'default'}
										>
											Nữ
										</Button>
										<Button
											onClick={() => setValue('gender', 3)}
											color={watch('gender') === 3 ? 'primary' : 'default'}
											className="w-full"
											variant="solid"
										>
											Khác
										</Button>
									</ButtonGroup>
									<Divider />
									<Button
										color="primary"
										type="submit"
										isLoading={loading}
									>
										{'Lưu thông tin'}
									</Button>
								</CardBody>
							</form>
						</FormProvider>
					</Card>
				</div>
			</div>
		</div>
	)
}
