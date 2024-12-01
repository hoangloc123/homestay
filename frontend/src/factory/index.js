import ApiConstants from '../adapter/ApiConstants'
import ApiOperation from '../adapter/ApiOperation'

export const factories = {
	getAccommodations: data => {
		return ApiOperation.request({
			url: ApiConstants.ACCOMMODATIONS,
			method: 'GET',
			params: data,
		})
	},
	getDetailAccommodation: id => {
		return ApiOperation.request({
			url: ApiConstants.ACCOMMODATIONS + '/' + id,
			method: 'GET',
		})
	},
}
