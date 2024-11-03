import {CustomTable} from '@components/custom-table/CustomTable'
import {Chip, Input, Tab, Tabs} from '@nextui-org/react'
import Constants from '@utils/constants'
import {convertStringToNumber} from '@utils/Utils'
import React, {useState} from 'react'

const bookingData = [
	{
		PhoneNumber: '0987654321',
		PassengerName: 'Duy Nam',
		BranchName: 'Hoàng Hiền',
		RoomName: 'Royal',
		RoomNumber: 4,
		Status: 1,
	},
	{
		PhoneNumber: '0987654321',
		PassengerName: 'Đại Nam',
		BranchName: 'Hoàng Hiền',
		RoomNumber: 2,
		RoomName: 'Royal',
		Status: 2,
	},
]

const columns = [
	{
		id: 'PassengerName',
		label: 'Tên Khách Hàng',
		renderCell: row => <div className="w-40">{row.PassengerName}</div>,
	},
	{
		id: 'BranchName',
		label: 'Tên chỗ nghỉ',
		renderCell: row => <div className="w-40">{row.BranchName}</div>,
	},
	{
		id: 'RoomName',
		label: 'Tên Phòng',
		renderCell: row => <div className="w-40">{row.RoomName}</div>,
	},
	{
		id: 'RoomNumber',
		label: 'Số lượng',
		renderCell: row => <span>{row.RoomNumber}</span>,
	},
	{
		id: 'count',
		label: 'Giá tiền',
		renderCell: row => <span>{convertStringToNumber(2300000)}</span>,
	},
	// {
	// 	id: 'time',
	// 	label: 'Thời Gian',
	// 	renderCell: row => (
	// 		<span>
	// 			{row.DepartureTime} - {row.ArrivalTime}
	// 		</span>
	// 	),
	// },
	{
		id: 'Status',
		label: 'Trạng Thái',
		renderCell: row => (
			<div className="w-36">
				<Chip color={Constants.optionsStatusBooking.find(x => x.value === row.Status)?.color}>
					<p className="text-white">{Constants.optionsStatusBooking.find(x => x.value === row.Status)?.label}</p>
				</Chip>
			</div>
		),
	},
]

export default function AdminBookingListSection() {
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
							title="Đã đặt"
						/>
						<Tab
							key="3"
							title="Đã hủy"
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
					data={bookingData}
				/>
			</div>
		</div>
	)
}
