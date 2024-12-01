import {Button, Input} from '@nextui-org/react'
import {signInWithPopup} from 'firebase/auth'
import React, {useState} from 'react'
import {auth, googleProvider} from '../../config/firebaseConfig'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory'
import {Role} from '../../utils/constants'
import {ToastNotiError} from '../../utils/Utils'
import LoginModal from './Login'

const RegisterModal = () => {
	const {onOpen, onClose} = useModalCommon()
	const {login} = useAuth()

	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(!isVisible)

	const openLogin = () => {
		onOpen({
			view: <LoginModal />,
			title: 'Đăng nhập',
			showFooter: false,
		})
	}

	const handleSignUpEmail = () => {
		const email = document.getElementById('email').value
		const password = document.getElementById('password').value
		const confirmPassword = document.getElementById('confirmPassword').value
		if (!password || !confirmPassword || !email) {
			ToastNotiError('Vui lòng nhập thông tin')
			return
		}
		if (password !== confirmPassword) {
			ToastNotiError('Mật khẩu không khớp, vui lòng nhập lại mật khẩu')
			return
		}
		const role = {roles: [Role.EMPLOYEE]}
		factories
			.getSignUpEmail(email, password, role)
			.then(data => {
				login(data)
				onClose()
			})
			.catch(error => {
				if (error.response.data.error === 'Firebase: Error (auth/email-already-in-use).') {
					ToastNotiError('Email đã được sử dụng')
				} else {
					ToastNotiError(`Lỗi không xác định: ${error.message || 'Vui lòng thử lại sau!'}`)
				}
			})
	}

	function handleLogin(user) {
		const userInfo = {
			id: user.uid,
			name: user.displayName,
			avatar: user.photoUrl,
			email: user.email,
			phone: user?.phoneNumber,
			accessToken: user.accessToken,
			role: '1',
			emailVerified: user.emailVerified,
		}
		login(userInfo)
		onClose()
	}

	const handleGoogleSignUp = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const user = result.user
			handleLogin(user)
		} catch (error) {
			alert('Đăng ký thất bại, vui lòng thử lại.')
		}
	}

	return (
		<div>
			<div className="w-full">
				<Input
					type="email"
					label="Email"
					id="email"
				/>
				<Input
					id="password"
					label="Mật khẩu"
					placeholder="Nhập mật khẩu"
					className="mt-5"
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							aria-label="toggle password visibility"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<i
									class="fa fa-eye-slash"
									aria-hidden="true"
								></i>
							) : (
								<i
									class="fa fa-eye"
									aria-hidden="true"
								></i>
							)}
						</button>
					}
					type={isVisible ? 'text' : 'password'}
				/>
				<Input
					id="confirmPassword"
					label="Nhập lại mật khẩu"
					placeholder="Nhập lại mật khẩu"
					className="mt-5"
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							aria-label="toggle password visibility"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<i
									class="fa fa-eye-slash"
									aria-hidden="true"
								></i>
							) : (
								<i
									class="fa fa-eye"
									aria-hidden="true"
								></i>
							)}
						</button>
					}
					type={isVisible ? 'text' : 'password'}
				/>
			</div>

			<Button
				onClick={handleSignUpEmail}
				className="mt-8 w-full rounded-lg"
				variant="solid"
				color="primary"
			>
				Đăng ký
			</Button>

			<div className="mt-4 flex w-full items-center">
				<div className="h-[1px] flex-grow bg-neutral-200" />
				<p className="px-2">hoặc</p>
				<div className="h-[1px] flex-grow bg-neutral-200" />
			</div>

			<div className="mt-4">
				<Button
					radius={'sm'}
					color="primary"
					className="w-full"
					onClick={handleGoogleSignUp}
				>
					Đăng ký với Google
				</Button>
				<div className="mt-4 flex">
					<p>Bạn đã có tài khoản?</p>
					<button
						onClick={() => openLogin()}
						className="px-2 font-bold text-cyan-dark"
					>
						Đăng nhập
					</button>
				</div>
			</div>
		</div>
	)
}

export default RegisterModal
