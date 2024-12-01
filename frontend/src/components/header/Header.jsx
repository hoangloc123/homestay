import {NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper} from '@chakra-ui/react'
import {getLocalTimeZone, parseDate, today} from '@internationalized/date'
import {
	Avatar,
	Button,
	DateRangePicker,
	Divider,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectItem,
	Switch,
} from '@nextui-org/react'
import {cn, getDate} from '@utils/Utils'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import useRouter from '../../hook/use-router'
import {RouterPath} from '../../router/RouterPath'
import {provinceSearch} from '../../utils/constants'
import LoginModal from './Login'
import RegisterModal from './Register'

const initToday = new Date()
const defaultRange = {
	start: parseDate(getDate(initToday, 3)),
	end: parseDate(getDate(initToday.setDate(initToday.getDate() + 7), 3)),
}

function Header({showText, showSearch = false}) {
	const navigate = useNavigate()

	const {auth, logout} = useAuth()
	const [destination, setDestination] = useState('21')
	const [roomCount, setRoomCount] = useState(1)
	const [personCount, setPersonCount] = useState(2)
	const [havePet, setHavePet] = useState(false)
	const {onOpen} = useModalCommon()
	const [dateRange, setDateRange] = useState(defaultRange)

	const router = useRouter()

	function handleSearch() {
		const newParams = {
			city: destination,
			fromDate: dateRange.start,
			toDate: dateRange.end,
			roomQuantity: roomCount,
			capacity: personCount,
			isWithPet: Boolean(havePet),
			pricePerNight: '100000, 2000000',
		}
		router.push({
			pathname: RouterPath.SEARCH,
			params: newParams,
		})
	}

	const openLogin = () => {
		onOpen({
			view: <LoginModal />,
			title: 'Đăng nhập',
			showFooter: false,
		})
	}
	function handleLogout() {
		logout()
	}
	function openRegister() {
		onOpen({
			view: <RegisterModal />,
			title: 'Đăng ký',
			showFooter: false,
		})
	}

	return (
		<div className="relative rounded-ee-xl rounded-es-xl bg-blue-800">
			<div className="m-auto w-full max-w-[80%] 2xl:max-w-[80%]">
				<header className="pt-5 text-white">
					<div className="container mx-auto flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Link
								to="/"
								className="text-2xl font-bold"
							>
								Booking.com
							</Link>
						</div>
						<div className="flex items-center space-x-2">
							<Button
								variant="light"
								color="white"
								className="rounded-xl font-bold hover:bg-blue-600"
							>
								Đăng chỗ nghỉ của quý vị
							</Button>

							{auth ? (
								<>
									<Dropdown>
										<DropdownTrigger>
											<Button
												variant="light"
												className="border-none hover:bg-transparent"
											>
												<Avatar
													src={auth.avatar}
													className="h-6 w-6 bg-gray-200"
												/>
												<p className="text-white">{auth.name} </p>
												<i className="fa fa-caret-down text-white"></i>
											</Button>
										</DropdownTrigger>
										<DropdownMenu aria-label="Static Actions">
											<DropdownItem
												key="profile"
												onClick={() => navigate(RouterPath.PROFILE)}
											>
												<i className="fas fa-user mr-2"></i>
												<span>Thông tin tài khoản</span>
											</DropdownItem>
											<DropdownItem
												key="ticket"
												onClick={() => navigate(RouterPath.TICKET)}
											>
												<i className="fas fa-ticket-alt mr-2"></i>
												<span>Vé của tôi</span>
											</DropdownItem>
											onClick={() => navigate(RouterPath.REVIEW)}
											<DropdownItem key="review">
												<i className="fas fa-comment-dots mr-2"></i>
												<span>Nhận xét chuyến đi</span>
											</DropdownItem>
											<DropdownItem
												color="danger"
												onClick={handleLogout}
											>
												<i className="fas fa-power-off mr-2"></i>
												<span>Đăng xuất</span>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</>
							) : (
								<>
									<Button
										variant="bordered"
										color="primary"
										onClick={() => openRegister()}
										className="rounded-xl bg-slate-50 font-bold"
									>
										Đăng ký
									</Button>
									<Button
										variant="bordered"
										color="primary"
										className="rounded-xl bg-slate-50 font-bold"
										onClick={() => openLogin()}
									>
										Đăng nhập
									</Button>
								</>
							)}
						</div>
					</div>
				</header>

				<main className={cn('bg-blue-800 text-left text-white')}>
					{showText && (
						<>
							<h1 className="pb-2 pt-8 text-4xl font-bold">Tìm chỗ nghỉ tiếp theo</h1>
							<p className="mt-2 pb-16 text-lg">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p>
						</>
					)}

					{showSearch && (
						<div className="bottom-[-20px] w-full xl:absolute xl:w-[80%] 2xl:w-[80%]">
							<div className="bg-ye flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-accent p-1 shadow-lg xl:flex-row">
								<Select
									className="flex-4 xl:flex-3 border-none"
									variant="flat"
									radius="sm"
									aria-label={'city'}
									defaultSelectedKeys={['21']}
									onChange={e => setDestination(e.target.value)}
									placeholder="Bạn muốn đến đâu?"
									startContent={<i className="fas fa-bed text-gray-500"></i>}
								>
									{provinceSearch.map(x => (
										<SelectItem
											aria-label={x.name}
											key={x.id}
										>
											{x.name}
										</SelectItem>
									))}
								</Select>

								<DateRangePicker
									radius="sm"
									variant="flat"
									visibleMonths={2}
									className="flex-5 border-none"
									value={dateRange}
									onChange={setDateRange}
									minValue={today(getLocalTimeZone())}
								/>

								<Popover
									placement="bottom"
									offset={10}
								>
									<PopoverTrigger>
										<Button className={cn('flex-3 w-full rounded-lg border-none bg-white xl:min-w-[250px]', havePet && 'min-w-[300px]')}>
											Phòng {personCount} người · {roomCount} phòng {havePet && '· Vật nuôi'}
											<i
												className="fa fa-caret-down tet-xl text-[20px] text-grey-500"
												aria-hidden="true"
											></i>
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<div className="flex w-[300px] flex-col gap-2 p-4">
											<div className="flex w-full">
												<div className="flex w-full items-center justify-between gap-20">
													<p className="text-small font-bold">Số người mỗi phòng</p>
												</div>
												<NumberInput
													minWidth={'100px'}
													onChange={e => setPersonCount(e)}
													value={personCount}
													max={1000}
													min={1}
												>
													<NumberInputField />
													<NumberInputStepper>
														<NumberIncrementStepper />
														<NumberDecrementStepper />
													</NumberInputStepper>
												</NumberInput>
											</div>

											<div className="flex w-full">
												<div className="flex w-full items-center justify-between gap-20">
													<p className="text-small font-bold">Số phòng</p>
												</div>
												<NumberInput
													minWidth={'100px'}
													onChange={e => setRoomCount(e)}
													value={roomCount}
													max={1000}
													min={1}
												>
													<NumberInputField />
													<NumberInputStepper>
														<NumberIncrementStepper />
														<NumberDecrementStepper />
													</NumberInputStepper>
												</NumberInput>
											</div>

											<Divider />

											<div className="flex w-full">
												<div className="flex w-full items-center justify-between gap-20">
													<p className="text-small font-bold">Vật nuôi</p>
												</div>
												<Switch
													isSelected={havePet}
													onChange={() => setHavePet(!havePet)}
													color={'blue-base'}
												/>
											</div>
										</div>
									</PopoverContent>
								</Popover>

								<Button
									onClick={() => handleSearch()}
									variant="solid"
									radius="sm"
									className="w-full min-w-[200px] bg-blue-600 px-4 py-2 text-white xl:w-fit"
								>
									Tìm kiếm
								</Button>
							</div>
						</div>
					)}

					{!showText && showSearch && <div className="pb-9" />}
					{!showText && !showSearch && <div className="pb-5" />}
				</main>
			</div>
		</div>
	)
}

export default Header
