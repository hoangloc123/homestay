/** @type {import('tailwindcss').Config} */
const {nextui} = require('@nextui-org/react')
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontSize: {
				'4xs': '8px',
				'3xs': '10px',
				'2xs': '12px',
				xs: '14px',
				s: '16px',
				m: '18px',
				l: '20px',
				xl: '24px',
				'3xl': '40px',
				'4xl': '48px',
				'5xl': '60px',
			},
			lineHeight: {
				'2xs': '18px',
				xs: '20px',
				s: '24px',
				m: '28px',
				l: '32px',
				xl: '36px',
				'3xl': '60px',
				'4xl': '72px',
				'5xl': '80px',
			},
			backgroundImage: {
				'gradient-rainbow': 'linear-gradient(96deg, #3758F9 2.58%, #13C296 68.78%, #C814F6 114.78%)',
			},
			colors: {
				'neutral-600': '#777777',
				'green-dark': '#1A8245',
				'cyan-dark': '#0B76B7',
				'purple-dark': '#6D28D9',
				metal: '#637381',
				pumpkin: '#FA4E4E',
				'white-content': '#F3F4F6',
				'primary-shade': 'oklch(var(--primary-shade) / <alpha-value>)',
				'green-dark-shade': '#DAF8E6',
				'red-dark': '#E10E0E',
				'red-dark-shade': '#FEEBEB',
				'neutral-content': '#E6E6E6',
				snow: '#FFF9FC',
				red: '#F23030',
			},
			gridTemplateColumns: {
				'max-128': 'repeat(auto-fill, minmax(0, 128px))',
				'max-200': 'repeat(auto-fill, minmax(0, 200px))',
			},
		},
	},
	plugins: [nextui()],
}
