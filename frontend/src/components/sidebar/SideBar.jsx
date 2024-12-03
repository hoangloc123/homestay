import {Tab, Tabs} from '@nextui-org/react'
import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function Sidebar({active}) {
	const {pathname} = useLocation()
	const [activeTab, setActiveTab] = useState()

	useEffect(() => {
		setActiveTab
		active
	}, [active])

	return (
		<Tabs
			isVertical
			className="text-left"
			placement="start"
			selectedKey={pathname}
		>
			<Tab
				as={Link}
				key="/profile"
				to="/profile"
				title="Thông tin cá nhân"
			/>
			<Tab
				key="/change-password"
				to="/change-password"
				as={Link}
				title="Đổi mật khẩu"
			/>
			<Tab
				as={Link}
				key="/my-ticket"
				to="/my-ticket"
				title="Vé của tôi"
			/>
			<Tab
				as={Link}
				key="/my-review"
				to="/my-review"
				title="Nhận xét của tôi"
			/>
			<Tab
				as={Link}
				key="/my-wallet"
				to="/my-wallet"
				title="Ví của tôi"
			/>
		</Tabs>
	)
}
