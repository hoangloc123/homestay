import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import routesConfig from './router/routes.config'
import {ModalProvider} from './context/ModalContext'
import 'react-phone-input-2/lib/style.css'

const App = () => {
	return (
		<AuthProvider>
			<ModalProvider>
				<Router>
					<Routes>
						{routesConfig.map(({layout: LayoutComponent, layoutProps, element: PageComponent, ...route}, index) => (
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
			</ModalProvider>
		</AuthProvider>
	)
}

export default App
