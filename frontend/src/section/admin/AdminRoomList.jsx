import {CustomTable} from '@components/custom-table/CustomTable'
import {Button, Input} from '@nextui-org/react'
import {ROLES} from '@utils/constants'
import {convertStringToNumber} from '@utils/Utils'
import React, {useEffect, useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory/index'
import CreateRoomModal from './modal/CreateRoomModal'

const columns = [
	{
		id: 'name',
		label: 'Tên phòng',
		renderCell: row => <div className="w-40">{row?.name}</div>,
	},
	{
		id: 'capacity',
		label: 'Số người',
		renderCell: row => <div className="w-40">{row.capacity}</div>,
	},
	{
		id: 'price',
		label: 'Giá mỗi đêm',
		renderCell: row => <div className="w-40">{convertStringToNumber(row.pricePerNight)}</div>,
	},
	{
		id: 'quantity',
		label: 'Số phòng trống',
		renderCell: row => <div className="w-40">{row?.quantity}</div>,
	},
]

export default function AdminRoomList() {
	const [keyword, setKeyword] = useState()
	const [data, setData] = useState([])
	const [pagination, setPagination] = useState()
	const {auth} = useAuth()
	const [loading, setLoading] = useState(true)
	const {onOpen} = useModalCommon()
	useEffect(() => {
		loadList()
	}, [keyword, pagination?.current, auth])

	function AddRoom() {
		onOpen({
			view: <CreateRoomModal onReload={loadList} />,
			title: 'Tạo phòng thuê mới',
			size: '2xl',
		})
	}
	function loadList() {
		setLoading(true)
		const params = {
			page: pagination?.current,
			...(auth.roles[0] === ROLES.HOST ? {ownerId: auth._id} : {}),
			...(keyword ? {keyword} : {}),
		}
		factories
			.getAdminListRoom(params)
			.then(data => {
				setData(data?.rooms)
				setLoading(false)
				setPagination(data.pagination)
			})
			.finally(() => setLoading(false))
	}
	return (
		<div className="h-full rounded bg-white px-4 py-3 shadow-md">
			<div className="mb-3 flex items-center justify-between">
				<div className="mt-2 flex w-full items-center justify-end">
					<Button
						onClick={AddRoom}
						size="sm"
						color="primary"
					>
						Tạo phòng mới
					</Button>
				</div>
			</div>

			<Input
				type="text"
				onChange={e => setKeyword(e.target.value)}
				placeholder="Tìm kiếm biển số"
				className="w-full rounded-lg bg-gray-100 outline-none"
				startContent={<i className="fas fa-search mr-2 text-gray-500"></i>}
			/>
			<div className="mt-4">
				<CustomTable
					columns={columns}
					data={data ?? []}
					isLoading={loading}
				/>
			</div>
		</div>
	)
}
