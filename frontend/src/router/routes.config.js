import PrivateRoute from '../components/private-router/PrivateRoute'
import Layout from '../layout/Layout'
import AdminPage from '../pages/admin'
import DetailPage from '../pages/detail/DetailPage'
import HomePage from '../pages/homepage/HomePage'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import ChangePasswordPage from '../pages/profile/ChangePasswordPage'
import ProfileManagerPage from '../pages/profile/ProfileManagerPage'
import RegisterHost from '../pages/register-host/RegisterHost'
import SearchPage from '../pages/search/SearchPage'
import {RouterPath} from './RouterPath'

const routesConfig = [
	{
		path: '/',
		element: HomePage,
		layout: Layout,
		layoutProps: {showText: true, showSearch: true},
	},
	{
		path: RouterPath.PROFILE,
		element: ProfileManagerPage,
		layout: Layout,
		layoutProps: {showText: false, showSearch: false},
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
		layoutProps: {showSearch: true},
	},
	{
		path: RouterPath.ADMIN,
		element: AdminPage,
	},
	{
		path: RouterPath.REGISTER_HOST,
		element: RegisterHost,
		layout: Layout,
		layoutProps: {showText: false, showSearch: false},
	},
	{
		path: RouterPath.CHANGE_PASSWORD,
		element: ChangePasswordPage,
		layout: Layout,
		layoutProps: {showText: false, showSearch: false},
	},
	{
		path: '/about',
		element: HomePage,
		layout: PrivateRoute,
	},
	{
		path: '*',
		element: NotFoundPage,
		layout: Layout,
	},
]

export default routesConfig
