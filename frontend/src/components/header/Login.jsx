import {Button, Input} from '@nextui-org/react'
import {signInWithPopup} from 'firebase/auth'
import React, {useState} from 'react'
import {useAuth} from '../..//context/AuthContext'
import {auth, googleProvider} from '../../config/firebaseConfig'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory'
import {ToastNotiError} from '../../utils/Utils'
import RegisterModal from './Register'

const LoginModal = () => {
	const {onOpen, onClose} = useModalCommon()
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => setIsVisible(!isVisible)

	const {login} = useAuth()
	function openRegister() {
		onOpen({
			view: <RegisterModal />,
			title: 'Đăng ký',
			showFooter: false,
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

	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const user = result.user
			handleLogin(user)
		} catch (error) {
			console.error('Error during Google login:', error.message)
			alert('Đăng nhập thất bại, vui lòng thử lại.')
		}
	}

	const handleLoginEmail = () => {
		const email = document.getElementById('email').value
		const password = document.getElementById('password').value
		factories
			.getLoginEmail(email, password)
			.then(data => {
				login(data)
				onClose()
			})
			.catch(error => {
				if (error.response.data.error === 'Firebase: Error (auth/invalid-credential).') {
					ToastNotiError('Không tìm thấy tài khoản hoặc thông tin không chính xác!')
				} else {
					ToastNotiError(`Lỗi không xác định: ${error.message || 'Vui lòng thử lại sau!'}`)
				}
			})
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
			</div>

			<Button
				className="mt-8 w-full rounded-lg"
				onClick={handleLoginEmail}
			>
				Tiếp tục
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
					onClick={handleGoogleLogin}
				>
					Đăng nhập với Google
				</Button>
				<div className="mt-4 flex">
					<p>Bạn chưa có tài khoản?</p>
					<button
						onClick={() => openRegister()}
						className="px-2 font-bold text-cyan-dark"
					>
						Đăng ký
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoginModal
