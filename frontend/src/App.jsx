import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import routes from './router/routes'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						/>
					))}
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
