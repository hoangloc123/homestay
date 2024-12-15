import {CustomTable} from '@components/custom-table/CustomTable'
import {Button, Input} from '@nextui-org/react'
import {PROVINCES, ROLES, TYPE_HOST} from '@utils/constants'
import React, {useEffect, useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import {useModalCommon} from '../../context/ModalContext'
import {factories} from '../../factory/index'
import CreateAccommodationModal from './modal/CreateAccommodationModal'

const columns = [
	{
		id: 'name',
		label: 'Tên chỗ nghỉ',
		renderCell: row => <div className="w-40">{row?.name}</div>,
	},
	{
		id: 'type',
		label: 'Loại hình',
		renderCell: row => <div className="w-40">{TYPE_HOST.find(x => x.id === row.type)?.name}</div>,
	},
	{
		id: 'city',
		label: 'Thành phố',
		renderCell: row => <div className="w-40">{PROVINCES.find(x => x.id == row.city)?.name}</div>,
	},
	{
		id: 'rating',
		label: 'Đánh giá',
		renderCell: row => <div className="w-40">{row?.rating || 'Chưa có đánh giá'}</div>,
	},
	{
		id: 'address',
		label: 'Địa chỉ',
		renderCell: row => <div className="w-40">{row?.address}</div>,
	},
]

export default function AdminAccommodationList() {
	const [keyword, setKeyword] = useState()
	const [data, setData] = useState([])
	const [pagination, setPagination] = useState()
	const {auth} = useAuth()
	const [loading, setLoading] = useState(true)
	const {onOpen} = useModalCommon()
	useEffect(() => {
		loadList()
	}, [keyword, pagination?.current])

	function createAcmd() {
		onOpen({
			view: <CreateAccommodationModal onReload={loadList} />,
			title: 'Tạo chỗ nghỉ mới',
			size: '2xl',
		})
	}
	function loadList() {
		setLoading(true)
		const params = {
			ownerId: auth.roles[0] === ROLES.ADMIN ? '' : auth._id,
			page: pagination?.current,
			...(keyword ? {keyword} : {}),
		}
		factories
			.getAdminListAccommodation(params)
			.then(data => {
				setData(data?.accommodations)
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
						onClick={createAcmd}
						size="sm"
						color="primary"
					>
						Tạo chỗ nghỉ mới
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
