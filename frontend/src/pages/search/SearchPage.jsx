import React, {useEffect} from 'react'
import SearchResult from './SearchResult'
import SideBarSearch from './SideBarSearch'

export default function SearchPage() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className="mx-auto max-w-full px-5 pb-24 pt-10 lg:max-w-[80%] lg:px-0 2xl:max-w-[60%]">
			<div className="flex flex-row">
				<div className="w-1/4">
					<SideBarSearch />
				</div>
				<div className="flex-grow">
					<SearchResult />
				</div>
			</div>
		</div>
	)
}
