import StarIcon from '@assets/base/icon/Star'
import {
	Accordion,
	AccordionItem,
	Button,
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	Slider,
	TimeInput,
} from '@nextui-org/react'
import {TYPE_HOST} from '@utils/constants'
import {amenitiesSearchConst} from '@utils/constData'
import React from 'react'
export default function SideBarSearch() {
	return (
		<div className="px-2">
			<div className="w-64">
				<div className="flex flex-col rounded-t-lg border border-b-0 p-4">
					<h2 className="mb-2 font-bold">Sắp xếp:</h2>
					<div className="mb-0">
						<RadioGroup defaultValue="S1">
							<Radio value="S1">Mặc định</Radio>
							<Radio value="S4"> Đánh giá cao nhất</Radio>
							<Radio value="S5"> Giá tăng dần</Radio>
							<Radio value="S6"> Giá giảm dần</Radio>
						</RadioGroup>
					</div>
				</div>
				<div className="border border-b-0 p-4">
					<h3 className="mb-4 font-semibold">Ngân sách của bạn:</h3>
					<Slider
						step={50}
						label="Giá"
						minValue={100000}
						maxValue={2000000}
						defaultValue={[100000, 2000000]}
						formatOptions={{style: 'currency', currency: 'VND'}}
						className="max-w-md"
					/>
				</div>
				<div className="mb-4 rounded-b-lg border px-4 py-4">
					<h3 className="font-semibold">Bộ lọc:</h3>
					<Accordion
						className="px-0"
						variant="light"
						open
					>
						<AccordionItem
							key="1.1"
							title="Loại chỗ nghỉ"
						>
							<div className="flex flex-col gap-1">
								<CheckboxGroup label="">
									{TYPE_HOST.map(x => (
										<Checkbox value={x.id}>{x.name}</Checkbox>
									))}
								</CheckboxGroup>
							</div>
						</AccordionItem>
						<AccordionItem
							key="3.3"
							title="Tiêu chí phổ biến"
						>
							<div className="flex flex-col gap-1">
								<CheckboxGroup label="">
									{amenitiesSearchConst.map(x => (
										<Checkbox value={x.id}>{x.title}</Checkbox>
									))}
								</CheckboxGroup>
							</div>
						</AccordionItem>
						{/* <AccordionItem
							key="2"
							aria-label="Giá vé"
							title="Giá vé"
						>
							<div className="">
								<Slider
									step={50}
									label="Giá"
									minValue={100000}
									maxValue={2000000}
									defaultValue={[100000, 2000000]}
									formatOptions={{style: 'currency', currency: 'VND'}}
									className="max-w-md"
								/>
							</div>
						</AccordionItem> */}

						<AccordionItem
							key="5"
							title="Đánh giá"
						>
							<div className="flex w-3/4 flex-col gap-1">
								<Button
									variant="ghost flex-start"
									className="flex-start"
								>
									<StarIcon />
									<StarIcon />
									<StarIcon />
									<StarIcon />
									trở lên
								</Button>
								<Button
									variant="ghost flex-start"
									className="flex-start"
								>
									<StarIcon />
									<StarIcon />
									<StarIcon />
									trở lên
								</Button>
							</div>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	)
}
