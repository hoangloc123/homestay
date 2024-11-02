import Layout from '@layout/Layout'
import HomePage from '@pages/homepage/HomePage'
import LoginPage from '@pages/login/Login'
import NotFoundPage from '@pages/not-found/NotFoundPage'
import {RouterPath} from './RouterPath'
import PrivateRoute from '@components/private-router/PrivateRoute'
import DetailPage from '@pages/detail/DetailPage'
import SearchPage from '@pages/search/SearchPage'
import AdminPage from '@pages/admin'

const routesConfig = [
	{
		path: '/',
		element: HomePage,
		layout: Layout,
		layoutProps: {showText: true},
	},
	{
		path: `${RouterPath.DETAIL}/:id`,
		element: DetailPage,
		layout: Layout,
	},
	{
		path: RouterPath.SEARCH,
		element: SearchPage,
		layout: Layout,
	},
	{
		path: RouterPath.ADMIN,
		element: AdminPage,
	},
	{
		path: '/about',
		element: HomePage,
		layout: PrivateRoute,
	},
	{
		path: '/login',
		element: LoginPage,
		layout: Layout,
	},
	{
		path: '*',
		element: NotFoundPage,
		layout: Layout,
	},
]

export default routesConfig
