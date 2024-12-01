import {Tab, Tabs} from '@nextui-org/react'
import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

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
				key="/profile"
				href="/profile"
				title="Thông tin cá nhân"
			/>
			<Tab
				key="/my-ticket"
				href="/my-ticket"
				title="Vé của tôi"
			/>
			<Tab
				key="/my-review"
				href="/my-review"
				title="Nhận xét của tôi"
			/>
			<Tab
				key="/my-wallet"
				href="/my-wallet"
				title="Ví của tôi"
			/>
		</Tabs>
	)
}
