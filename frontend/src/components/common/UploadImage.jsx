import React from 'react'
import {useFormContext} from 'react-hook-form'

export default function UploadImages({label, name}) {
	const {register, setValue, watch} = useFormContext()
	const images = watch(name) || []
	const handleAddImage = () => {
		setValue(name, [...images, {file: null, url: null}])
	}
	const handleChangeImage = (index, file) => {
		const newImages = [...images]
		newImages[index] = {file, url: URL.createObjectURL(file)}
		setValue(name, newImages)
	}
	return (
		<div className="flex flex-col gap-1 rounded-lg bg-neutral-100 px-3 py-2">
			<p className="text-sm">{label}</p>
			<div className="flex flex-col gap-2">
				{images.map((image, index) => (
					<div
						key={index}
						className="flex gap-2"
					>
						<input
							type="file"
							onChange={e => handleChangeImage(index, e.target.files[0])}
							className="block max-w-[500px] appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
						/>
						{image.file && (
							<div className="flex w-full flex-grow justify-end">
								<img
									src={image.url}
									alt="images"
									className="h-24 rounded-lg"
								/>
							</div>
						)}
					</div>
				))}
				<button
					onClick={handleAddImage}
					type="button"
					className="mt-2 w-[150px] rounded-md bg-primary-500 px-4 py-2 text-sm text-white"
				>
					Thêm ảnh mới
				</button>
			</div>
		</div>
	)
}
