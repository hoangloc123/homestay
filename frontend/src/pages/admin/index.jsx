import HeaderAdmin from '@components/header/HeaderAdmin'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import AdminBookingListSection from '../../section/admin/AdminBookingListSection'
import AdminHostList from '../../section/admin/AdminHostList'
import AdminRequestHost from '../../section/admin/AdminRequestHost'
import AdminSideBar from '../../section/admin/AdminSideBar'
import AdminUser from '../../section/admin/AdminUser'
import Dashboard from '../../section/admin/Dashboard'
import {ROLES, sidebarItems} from '../../utils/constants'

export default function AdminPage() {
	const [selectedItem, setSelectedItem] = useState('dashboardAll')
	const [selectedName, setSelectedName] = useState('Tổng quan')
	const [filterItems, setFilterItems] = useState([])
	const {auth, loading} = useAuth()
	const {onOpen} = useModalCommon()
	const navigator = useNavigate()

	const handleItemClick = (itemId, name) => {
		setSelectedItem(itemId)
		setSelectedName(name)
	}

	useEffect(() => {
		if (auth) {
			if (auth.roles[0] === ROLES.USER) {
				navigator(RouterPath.NOT_FOUND)
				return
			}
			const newList = sidebarItems.filter(item => item.roles.includes(auth.roles[0]))
			setFilterItems(newList)
		}
	}, [auth])

	useEffect(() => {
		if (filterItems?.length > 0) {
			setSelectedItem(filterItems[0].id)
			setSelectedName(filterItems[0].title)
		}
	}, [filterItems])

	const renderContent = () => {
		switch (selectedItem) {
			case 'dashboardAll':
				return <Dashboard isAdmin />
			case 'usersAll':
				return <AdminUser isAdmin />
			case 'busAll':
				return <AdminHostList isAdmin />
			case 'request':
				return <AdminRequestHost isAdmin />
			case 'dashboard':
				return <Dashboard />
			case 'users':
				return <AdminUser />
			case 'buses':
				return <AdminHostList />
			case 'bookingAll':
				return <AdminBookingListSection isAdmin />
			case 'booking':
				return <AdminBookingListSection />
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
						filteredItems={filterItems}
					/>
					<main className="h-screen flex-1 items-start overflow-scroll">
						<HeaderAdmin title={selectedName} />
						{renderContent()}
					</main>
				</div>
			</div>
		)
}
