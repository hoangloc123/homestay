import {Button} from '@chakra-ui/react'
import {CustomTable} from '@components/custom-table/CustomTable'
import {Chip, Input, Tab, Tabs} from '@nextui-org/react'
import TicketModal from '@pages/ticket/TicketModal'
import {ROLES, TICKET_STATUS} from '@utils/constants'
import {convertStringToNumber, getDate} from '@utils/Utils'
import React, {useEffect, useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory'

export default function AdminBookingListSection() {
	const [activeTab, setActiveTab] = useState(1)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])
	const {auth} = useAuth()
	const {onOpen} = useModalCommon()
	function loadList() {
		setLoading(true)
		factories
			.getListTicket({
				status: activeTab,
				id: auth.roles[0] === ROLES.HOST ? auth._id : null,
			})
			.then(data => {
				setData(data)
				setLoading(false)
			})
			.finally(() => setLoading(false))
	}
	useEffect(() => {
		if (!auth?._id) return
		loadList()
	}, [auth, activeTab])

	const columns = [
		{
			id: 'username',
			label: 'Tên khách hàng',
			renderCell: row => <div className="flex-grow">{row?.userId?.fullName}</div>,
		},
		{
			id: 'phone',
			label: 'Sđt',
			renderCell: row => <div className="flex-grow">{row?.userId?.phone}</div>,
		},
		{
			id: 'date',
			label: 'Ngày nhận phòng',
			renderCell: row => <div className="flex-grow">{getDate(row.fromDate)}</div>,
		},
		{
			id: 'time',
			label: 'Ngày trả phòng',
			renderCell: row => <div className="flex-grow">{getDate(row.toDate)}</div>,
		},
		{
			id: 'Chỗ nghỉ',
			label: 'Chỗ nghỉ',
			renderCell: row => <div className="flex-grow">{row?.accommodation?.name}</div>,
		},
		{
			id: 'amount',
			label: 'Số tiền',
			renderCell: row => (
				<div className="w-20">
					<span className="">{convertStringToNumber(row?.totalPrice)}</span>
				</div>
			),
		},
		{
			id: 'Status',
			label: 'Trạng Thái',
			renderCell: row => (
				<Chip
					color={TICKET_STATUS.find(x => x.value === row.status)?.color}
					className="text-white"
				>
					{TICKET_STATUS.find(x => x.value === row.status)?.label}
				</Chip>
			),
		},
		{
			id: 'Status2',
			label: 'Trạng Thái',
			renderCell: row => (
				<div className="flex gap-2">
					<Button
						size="sm"
						bgColor={'steelblue'}
						borderRadius={'full'}
						onClick={() => openDetail(row)}
						color={'white'}
					>
						Xem thông tin
					</Button>
					{row.status === 1 && (
						<Button
							onClick={() => openConfirm(row)}
							size="sm"
							borderRadius={'full'}
							bgColor={'tomato'}
							color={'white'}
						>
							Huỷ phòng
						</Button>
					)}
				</div>
			),
		},
	]

	function openDetail(row) {
		onOpen({
			view: (
				<TicketModal
					id={row._id}
					onReload={loadList}
				/>
			),
			title: 'Chi tiết',
			size: 'xl',
		})
	}
	return (
		<div className="h-full rounded bg-white px-4 py-3 shadow-md">
			<div className="mb-3 flex items-center justify-between gap-4">
				<Input
					type="text"
					placeholder="Tìm kiếm tên, số điện thoại"
					className="w-[400px] rounded-lg bg-gray-100 outline-none"
					startContent={<i className="fas fa-search mr-2 text-gray-500"></i>}
				/>
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
							title="Đã đặt"
						/>
						<Tab
							key="2"
							title="Đã huỷ"
						/>
						<Tab
							key="3"
							title="Đã hoàn thành"
						/>
						<Tab
							key="4"
							title="Đã đánh giá"
						/>
					</Tabs>
				</div>
			</div>

			<div className="mt-4">
				<CustomTable
					columns={columns}
					data={data}
					isLoading={loading}
				/>
			</div>
		</div>
	)
}
