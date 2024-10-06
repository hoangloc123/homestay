import PrivateRoute from '../components/private-router/PrivateRoute'
import Layout from '../layout/Layout'
import HomePage from '../pages/homepage/HomePage'
import LoginPage from '../pages/login/Login'
import NotFoundPage from '../pages/not-found/NotFoundPage'

const routes = [
	{
		path: '/',
		element: (
			<Layout>
				<HomePage />
			</Layout>
		),
	},
	{
		path: '/about',
		element: <PrivateRoute element={<HomePage />} />,
	},
	{
		path: '/login',
		element: (
			<Layout>
				<LoginPage />
			</Layout>
		),
	},
	{
		path: '*',
		element: (
			<Layout>
				<NotFoundPage />
			</Layout>
		),
	},
]

export default routes
