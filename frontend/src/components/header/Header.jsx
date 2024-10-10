import React from 'react'
import { Button, DateRangePicker, Select, SelectItem } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import { cn } from '../../utils/Utils';
import { useNavigate } from 'react-router-dom';

function Header({ showText }) {
	const navigate = useNavigate();
	function handleSearch() {
		navigate('/search')
	}
	return (
		<div className='relative bg-blue-800 rounded-es-xl rounded-ee-xl'>
			<div className='m-auto  w-full xl:max-w-[80%]'>
				<header className="pt-5 text-white">
					<div className="container mx-auto flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button className="text-2xl font-bold">Booking.com</button>
						</div>
						<div className="flex items-center space-x-2">
							<Button variant="light" color="white" className="hover:bg-blue-600 font-bold rounded-xl">Đăng chỗ nghỉ của quý vị</Button>
							<Button variant="bordered" color="primary" className="bg-slate-50 font-bold rounded-xl">Đăng ký</Button>
							<Button variant="bordered" color="primary" className="bg-slate-50 font-bold rounded-xl">Đăng nhập</Button>
						</div>
					</div>
				</header>

				<main className={cn("bg-blue-800 text-left text-white", !showText && 'py-7')}>
					{showText &&
						<><h1 className="pt-8 pb-2 text-4xl font-bold">Tìm chỗ nghỉ tiếp theo</h1><p className="pb-16 mt-2 text-lg">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p></>
					}
					<div className="xl:absolute w-full xl:w-[80vw] bottom-[-20px]">
						<div className="w-full flex items-center justify-center gap-1 rounded-xl bg-ye p-2 bg-accent shadow-lg flex-col xl:flex-row">

							<Select
								className="border-none flex-5 xl:flex-3"
								variant='flat'
								radius='sm'
								defaultSelectedKeys={[1]}
								placeholder="Bạn muốn đến đâu?"
								startContent={<i className="fas fa-bed text-gray-500"></i>}
							>
								<SelectItem key={1}>{'Hội An'}</SelectItem>
								<SelectItem key={2}>{'Đà Nẵng'}</SelectItem>
								<SelectItem key={3}>{'Đà Lạt'}</SelectItem>
							</Select>

							<DateRangePicker
								radius='sm'
								hideTimeZone
								variant='flat'
								visibleMonths={2}
								className="border-none flex-5"
								defaultValue={{
									start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
									end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
								}}
							/>

							<Button onClick={handleSearch} variant='solid' radius='sm' className="w-full min-w-[200px] xl:w-fit  bg-blue-600 px-4 py-2 text-white">Tìm kiếm</Button>
						</div>
					</div>
				</main>

			</div>

		</div>
	)
}

export default Header
