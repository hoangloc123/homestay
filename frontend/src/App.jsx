import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import routesConfig from './router/routes.config'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{routesConfig.map(({ layout: LayoutComponent, layoutProps, element: PageComponent, ...route }, index) => (
						<Route
							key={index}
							{...route}
							element={
								LayoutComponent ? (
									<LayoutComponent {...layoutProps}>
										<PageComponent />
									</LayoutComponent>
								) : (
									<PageComponent />
								)
							}
						/>
					))}
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
