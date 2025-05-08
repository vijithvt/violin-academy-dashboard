
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced color palette for South Indian classical themes
				maroon: {
					50: '#fdf2f2',
					100: '#f9e0e0',
					200: '#f7c1c1',
					300: '#ef9393',
					400: '#e25c5c',
					500: '#d23535',
					600: '#c02828',
					700: '#9c1f1f',
					800: '#811e1e',
					900: '#6c1c1c',
				},
				saffron: {
					50: '#fff9eb',
					100: '#ffefc7',
					200: '#ffe08a',
					300: '#ffc84d',
					400: '#ffad1f',
					500: '#ff9006',
					600: '#e67000',
					700: '#bf4e02',
					800: '#9a3c08',
					900: '#7e320c',
				},
				ivory: {
					50: '#fffef8',
					100: '#fffceb',
					200: '#fff8d6',
					300: '#fff0b0',
					400: '#ffe27e',
					500: '#ffc94a',
					600: '#e6a520',
					700: '#b37618',
					800: '#8c5817',
					900: '#724518',
				},
				gold: {
					50: '#fbf8eb',
					100: '#f7edc7',
					200: '#f0da8a',
					300: '#e8c44d',
					400: '#e1af23',
					500: '#cb960f',
					600: '#a67509',
					700: '#7a550b',
					800: '#664710',
					900: '#553a12',
				},
				peacock: {
					50: '#ebfff9',
					100: '#d0f7f0',
					200: '#a5ebe2',
					300: '#6dd8ce',
					400: '#37bbb3',
					500: '#1d9d96',
					600: '#117d7c',
					700: '#106465',
					800: '#105152',
					900: '#0f4344',
				}
			},
			fontFamily: {
				serif: ['DM Serif Display', 'Georgia', 'serif'],
				sans: ['Poppins', 'Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float-up': {
					'0%': { 
						transform: 'translateY(0)', 
						opacity: '0.5' 
					},
					'50%': { 
						opacity: '0.9' 
					},
					'100%': { 
						transform: 'translateY(-100px)', 
						opacity: '0' 
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
