import {Button} from '@chakra-ui/react'
import {cn} from '@utils/Utils'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

// const sidebarItems = [
//   //   { id: 'menu', icon: 'fa-bars', label: 'Menu' },
//   { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
//   { id: 'users', icon: 'fa-users', label: 'Users', active: true },
//   { id: 'bus', icon: 'fa-bus', label: 'Bus' },
//   { id: 'tasks', icon: 'fa-clipboard-list', label: 'Tasks' },
//   //   { id: 'profile', icon: 'fa-smile', label: 'Profile' },
//   //   { id: 'files', con: 'fa-file-alt', label: 'Files' },
//   //   { id: 'favorites', icon: 'fa-star', label: 'Favorites' },
//   //   { id: 'settings', icon: 'fa-cog', label: 'Settings' },
// ];

const sidebarItems = [
	{
		id: 'dashboardAll',
		icon: 'fa-th-large',
		label: 'Tổng quan',
		title: 'Tổng quan',
		roles: ['admin'],
	},
	{
		id: 'busAll',
		icon: 'fa-hotel',
		title: 'Danh sách cơ sở cho thuê',
		label: 'Chỗ nghỉ',
		roles: ['admin'],
	},
	{
		id: 'usersAll',
		icon: 'fa-users',
		label: 'Tài khoản',
		title: 'Danh sách Tài khoản',
		active: true,
		roles: ['admin'],
	},
	{
		id: 'ticketAll',
		icon: 'fa-tasks',
		label: 'Đặt phòng',
		title: 'Danh sách lượt đặt phòng',
		roles: ['admin'],
	},
	{
		id: 'request',
		icon: 'fa-clipboard-list',
		label: 'Yêu cầu',
		title: 'Đăng ký chỗ nghỉ mới',
		roles: ['admin'],
	},
	{
		id: 'dashboard',
		icon: 'fa-th-large',
		label: 'Tổng quan',
		title: 'Tổng quan',
		roles: ['chuNhaXe'],
	},
	{
		id: 'users',
		icon: 'fa-users',
		label: 'Tài khoản',
		title: 'Danh sách Tài khoản',
		active: true,
		roles: ['chuNhaXe'],
	},
	{
		id: 'buses',
		icon: 'fa-hotel',
		label: 'Chỗ nghỉ',
		title: 'Danh sách Chỗ nghỉ',
		roles: ['chuNhaXe', 'taiXe', 'phuXe'],
	},
	{
		id: 'tickets',
		icon: 'fa-clipboard-list',
		label: 'Đặt phòng',
		title: 'Danh sách lượt đặt phòng',
		roles: ['chuNhaXe', 'nhanVien'],
	},
	{
		id: 'profile',
		icon: 'fa-smile',
		title: 'Thông tin tài khoản',
		label: 'Thông tin',
		roles: ['chuNhaXe', 'nhanVien', 'taiXe', 'phuXe'],
	},
]
export default function AdminSideBar({selectedItem, onSelectItem}) {
	const [currentUserRole, setCurrentUserRole] = useState('chuNhaXe')
	const filteredItems = sidebarItems.filter(item => item.roles.includes(currentUserRole))

	const {logout} = useAuth()
	const navigator = useNavigate()
	function handleLogout() {
		logout()
		navigator('/')
	}

	return (
		<aside className="flex h-screen w-[170px] flex-col justify-between bg-white shadow-xl">
			<div className="flex flex-col items-center py-0">
				{filteredItems.map(item => {
					return (
						<button
							variant={'ghost'}
							key={item.id}
							onClick={() => onSelectItem(item.id, item.title)}
							start
							className={cn(
								'p-none flex w-full items-center justify-start gap-2 border-none p-2',
								selectedItem === item.id && 'bg-blue-100',
							)}
						>
							<i
								key={item.id}
								className={`fas ${item.icon} w-8 cursor-pointer ${
									selectedItem === item.id ? 'text-blue-500' : 'text-gray-500'
								}`}
							></i>
							<p className={cn('font-semibold', selectedItem === item.id && 'font-bold text-blue-700')}>{item.label}</p>
						</button>
					)
				})}
			</div>
			<div className="mb-2 flex flex-col">
				<Button onClick={() => setCurrentUserRole('admin')}>A</Button>
				<Button onClick={() => setCurrentUserRole('chuNhaXe')}>B</Button>
				<Button onClick={() => setCurrentUserRole('taiXe')}>C</Button>
				<Button onClick={() => setCurrentUserRole('phuXe')}>D</Button>
				<Button
					onClick={handleLogout}
					size="sm"
					variant="shadow"
					color="secondary"
				>
					<i
						class="fa fa-sign-out-alt text-red"
						aria-hidden="true"
					></i>{' '}
				</Button>
			</div>
		</aside>
	)
}
