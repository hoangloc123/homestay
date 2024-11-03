import HeaderAdmin from '@components/header/HeaderAdmin'
import LoginModal from '@components/header/Login'
import {RouterPath} from '@router/RouterPath'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import Dashboard from '../../section/admin/Dashboard'
import AdminUser from '../../section/admin/AdminUser'
import AdminBusList from '../../section/admin/AdminBusList'
import AdminRequestHost from '../../section/admin/AdminRequestHost'
import AdminSideBar from '../../section/admin/AdminSideBar'
import TicketListPage from '../../section/admin/AdminTicketList'

export default function AdminPage() {
	const [selectedItem, setSelectedItem] = useState('users')
	const [selectedName, setSelectedName] = useState('')
	const {auth, loading} = useAuth()
	const {onOpen} = useModalCommon()
	const navigator = useNavigate()
	const handleItemClick = (itemId, name) => {
		setSelectedItem(itemId)
		setSelectedName(name)
	}

	useEffect(() => {
		if (!loading) {
			if (auth?.role !== '1') {
				navigator(RouterPath.NOT_FOUND)
				return
			}
			if (!auth) {
				onOpen({
					view: <LoginModal />,
					title: 'Đăng nhập',
					showFooter: false,
				})
			}
		}
	}, [auth, loading])

	const renderContent = () => {
		switch (selectedItem) {
			case 'dashboardAll':
				return <Dashboard isAdmin />
			case 'usersAll':
				return <AdminUser isAdmin />
			case 'busAll':
				return <AdminBusList isAdmin />
			case 'request':
				return <AdminRequestHost isAdmin />
			case 'dashboard':
				return <Dashboard />
			case 'users':
				return <AdminUser />
			case 'buses':
				return <AdminBusList />
			case 'ticketAll':
				return <TicketListPage />
			case 'tickets':
				return <TicketListPage />
			default:
				return 'Not Found'
		}
	}

	if (!loading)
		return (
			<div className="flex flex-row">
				<div className="flex w-full">
					<AdminSideBar
						selectedItem={selectedItem}
						onSelectItem={(id, label) => {
							return handleItemClick(id, label)
						}}
					/>
					<main className="h-screen flex-1 items-start overflow-scroll">
						<HeaderAdmin title={selectedName} />
						{renderContent()}
					</main>
				</div>
			</div>
		)
}
