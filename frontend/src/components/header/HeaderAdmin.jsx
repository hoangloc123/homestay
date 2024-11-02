import {Button} from '@nextui-org/react'
import React from 'react'

export default function HeaderAdmin({title}) {
	return (
		<header className="sticky top-0 z-20 mb-1 flex items-center justify-between bg-white p-2 shadow-2xl">
			<div className="flex w-1/2 items-center bg-white p-2">
				<p className="font-bold">{title}</p>
			</div>
			<div className="flex items-center">
				<Button
					variant="ghost"
					className="ml-4 flex items-center border-1 px-4 py-0"
				>
					<span className="mr-2">Admin Tiến</span>
					<i className="fas fa-user-circle text-gray-500"></i>
				</Button>
			</div>
		</header>
	)
}
