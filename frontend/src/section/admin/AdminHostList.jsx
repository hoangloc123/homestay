import {CustomTable} from '@components/custom-table/CustomTable'
import {Button, Chip, Input, Tab, Tabs, Tooltip} from '@nextui-org/react'
import React, {useState} from 'react'

const dataBusList = [
	{
		Province: 'Đà Nẵng',
		PhoneNumber: '0987654321',
		BranchName: 'Tiến Anh',
		TicketCount: '3',
		TripFrom: '14:30',
		TripTo: '14:30',
		Route: 'Hà Nội - Thanh Hóa',
		status: 'Đang làm việc',
		Type: 'Pickup',
	},
	{
		Province: 'Đà Nẵng',
		PhoneNumber: '0987654321',
		BranchName: 'Duy Anh',
		TicketCount: '2',
		TripFrom: '14:30',
		TripTo: '14:30',
		Trip: '14:30',
		Route: 'Hà Nội - Thanh Hóa',
		status: 'Đang tạm nghỉ',
		Type: 'Pickup',
	},
	{
		Province: 'Đà Nẵng',
		PhoneNumber: '0987654321',
		BusName: 'Duy Anh',
		BranchName: 'Duy Anh',
		TripFrom: '14:30',
		TripTo: '14:30',
		TicketCount: '1',
		Trip: '14:30',
		status: 'Đang làm việc',
		Route: 'Hà Nội - Thanh Hóa',
		Type: 'Pickup',
	},
	{
		Province: 'Đà Nẵng',
		PhoneNumber: '0987654321',
		BusName: 'Duy Anh',
		TicketCount: '1',
		TripFrom: '14:30',
		TripTo: '14:30',
		BranchName: 'Duy Anh',
		status: 'Đang làm việc',
		Trip: '14:30',
		Route: 'Hà Nội - Thanh Hóa',
		Type: 'Pickup',
	},
]

const columns = [
	{
		id: 'BranchName',
		label: 'Tên chỗ nghỉ',
		renderCell: row => <div className="w-40">{row.BranchName}</div>,
	},
	{
		id: 'BranchName',
		label: 'Tình / Thành phố',
		renderCell: row => <div className="w-40">{row.Province}</div>,
	},
	{
		id: 'phone',
		label: 'Số điện thoại',
		renderCell: row => <span>{row.PhoneNumber}</span>,
	},
	{
		id: 'status',
		label: 'Trạng thái',
		renderCell: row => (
			<div className="w-36">
				<Chip color={row.status === 'Đang làm việc' ? 'primary' : 'default'}>{row.status}</Chip>
			</div>
		),
	},
	{
		id: 'action',
		label: 'Tác vụ',
		headCell: () => <span className="w-full text-center">Tác vụ</span>,
		renderCell: row => (
			<div className="">
				<Tooltip content="Xóa">
					<Button
						variant="ghost"
						size="sm"
						className="h-8 max-w-8 border-none"
					>
						<i className="fas fa-trash-alt text-sm text-pink-500"></i>
					</Button>
				</Tooltip>
			</div>
		),
	},
]

export default function AdminHostList() {
	const [activeTab, setActiveTab] = useState()
	return (
		<div className="h-full rounded bg-white px-4 py-3 shadow-md">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex">
					<Tabs
						variant="light"
						color="primary"
						aria-label="Tabs colors"
						radius="lg"
						selectedKey={activeTab}
						onSelectionChange={setActiveTab}
					>
						<Tab
							key="1"
							title="Tất cả"
						/>
						<Tab
							key="2"
							title="Đang hoạt động"
						/>
						<Tab
							key="3"
							title="Đang tạm nghỉ"
						/>
					</Tabs>
				</div>
			</div>

			<Input
				type="text"
				placeholder="Tìm kiếm tên, số điện thoại"
				className="w-full rounded-lg bg-gray-100 outline-none"
				startContent={<i className="fas fa-search mr-2 text-gray-500"></i>}
			/>
			<div className="mt-4">
				<CustomTable
					columns={columns}
					data={dataBusList}
				/>
			</div>
		</div>
	)
}
