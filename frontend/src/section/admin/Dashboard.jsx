import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import React from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement, // Đăng ký PointElement
	LineElement, // Đăng ký LineElement
	Filler, // Đăng ký Filler
)

const pieOptions = {
	responsive: true,
	plugins: {
		legend: {
			display: true,
			position: 'right',
			align: 'center',
			labels: {
				boxWidth: 20,
				padding: 15,
			},
		},
		tooltip: {
			callbacks: {
				label: function (tooltipItem) {
					return tooltipItem.label + ': ' + tooltipItem.raw
				},
			},
		},
	},
}

const Dashboard = () => {
	const revenueData = {
		labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
		datasets: [
			{
				label: 'Doanh Thu (VNĐ)',
				data: [50000000, 70000000, 30000000, 90000000, 60000000, 80000000],
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	}

	const bookingData = {
		labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
		datasets: [
			{
				label: 'Số Lượt Đặt Phòng',
				data: [120, 150, 90, 200, 160, 180],
				backgroundColor: 'rgba(255, 99, 132, 0.6)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	}

	const pieData = {
		labels: ['Nhà Nghỉ', 'Khách Sạn', 'Resort'],
		datasets: [
			{
				label: 'Tỷ Lệ Doanh Thu',
				data: [300000000, 200000000, 100000000],
				backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
			},
		],
	}

	const lineData = {
		labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
		datasets: [
			{
				label: 'Doanh Thu (VNĐ)',
				data: [50000000, 70000000, 30000000, 90000000, 60000000, 80000000],
				fill: false,
				backgroundColor: 'rgba(75, 192, 192, 1)',
				borderColor: 'rgba(75, 192, 192, 1)',
			},
		],
	}

	return (
		<div className="flex h-screen flex-col">
			<main className="flex-1 p-4">
				<p className="mb-2 mt-2 text-2xl font-bold">Số liệu tổng quan tháng này</p>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="items-center rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Số Lượt Đặt Phòng</h2>
						<p className="text-2xl">
							<i className="fas fa-ticket-alt mr-2 text-blue-500"></i> 1500
						</p>
					</div>
					<div className="rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Số Lượt Đặt Phòng thành công</h2>
						<p className="text-2xl">
							<i
								class="fa fa-check-circle mr-2 text-blue-500"
								aria-hidden="true"
							></i>
							300 / 80%
						</p>
					</div>
					<div className="rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Doanh Thu hệ thống</h2>
						<p className="text-2xl">
							<i className="fas fa-dollar-sign text-blue-500"></i> 500,000,000 VNĐ
						</p>
					</div>
				</div>

				<p className="mb-2 mt-6 text-2xl font-bold">Biểu đồ thống kê</p>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Doanh Thu Theo Tháng</h2>
						<Bar
							data={revenueData}
							options={{responsive: true}}
						/>
					</div>
					<div className="rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Số Lượt Đặt Phòng Theo Tháng</h2>
						<Bar
							data={bookingData}
							options={{responsive: true}}
						/>
					</div>
					<div className="h-[450px] rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Tỷ Lệ Doanh Thu Theo Loại Phòng</h2>
						<Pie
							data={pieData}
							options={pieOptions}
						/>
					</div>
					<div className="h-[450px] rounded-lg border bg-white p-4 shadow">
						<h2 className="text-lg font-semibold">Xu Hướng Doanh Thu Theo Tháng</h2>
						<Line
							data={lineData}
							options={{responsive: true}}
						/>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Dashboard
