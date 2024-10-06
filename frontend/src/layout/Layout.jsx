import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const Layout = ({children, isShowFooter = true}) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			{isShowFooter && <Footer />}
		</>
	)
}

export default Layout
