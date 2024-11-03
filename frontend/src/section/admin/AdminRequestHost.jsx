import {CustomTable} from '@components/custom-table/CustomTable'
import {Button, Input} from '@nextui-org/react'
import React from 'react'

const requestData = [
	{
		Province: 'Đà Nẵng',
		PhoneNumber: '0987654321',
		PassengerName: 'Duy Anh',
		BranchName: 'Hoàng Long',
		Status: 'Chờ Duyệt',
	},
	{
		Province: 'Đà Nẵng',
		PassengerName: 'Thiên Long',
		PhoneNumber: '0981234567',
		BranchName: 'Minh Tú',
		Status: 'Đã từ chối',
	},
]

const columns = [
	{
		id: 'PassengerName',
		label: 'Họ và Tên',
		renderCell: row => <div className="w-40">{row.PassengerName}</div>,
	},
	{
		id: 'BranchName',
		label: 'Tên Chỗ Nghỉ',
		renderCell: row => <div className="w-40">{row.BranchName}</div>,
	},
	{
		id: 'Province',
		label: 'Tỉnh / Thành phố',
		renderCell: row => <span>{row.Province}</span>,
	},
	{
		id: 'PhoneNumber',
		label: 'Số Điện Thoại',
		renderCell: row => <span>{row.PhoneNumber}</span>,
	},
	{
		id: 'Status',
		label: 'Trạng Thái',
		renderCell: row => (
			<div className="">
				<Button
					size="sm"
					color={'default'}
				>
					Chờ duyệt
				</Button>
			</div>
		),
	},
]

export default function AdminRequestHost({isAdmin}) {
	return (
		<div
			className="rounded bg-white px-4 py-3 pt-6 shadow-md"
			style={{
				height: 'calc(100% - 100px)',
			}}
		>
			<Input
				type="text"
				placeholder="Tìm kiếm tên, số điện thoại"
				className="w-full rounded-lg bg-gray-100 outline-none"
				startContent={<i className="fas fa-search mr-2 text-gray-500"></i>}
			/>
			<div className="mt-4">
				<CustomTable
					columns={columns}
					data={requestData}
				/>
			</div>
		</div>
	)
}
