import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			kbeauty: {
  				pink: '#FFE5EC',
  				'pink-light': '#FFF0F5',
  				'pink-dark': '#FFB6C1',
  				peach: '#FFF0E5',
  				'peach-light': '#FFF8F0',
  				'peach-dark': '#FFDAB9',
  				mint: '#E5F5F0',
  				'mint-light': '#F0FFF0',
  				'mint-dark': '#98FB98',
  				lavender: '#F0E5FF',
  				'lavender-light': '#F8F0FF',
  				'lavender-dark': '#DDA0DD',
  				cream: '#FFF8F0',
  				'cream-light': '#FFFEFA',
  				'cream-dark': '#F5F5DC',
  				'neutral-50': '#FEFEFE',
  				'neutral-100': '#F8F9FA',
  				'neutral-200': '#E9ECEF',
  				'neutral-300': '#DEE2E6',
  				'neutral-400': '#CED4DA',
  				'neutral-500': '#6C757D',
  				'neutral-600': '#495057',
  				'neutral-700': '#343A40',
  				'neutral-800': '#212529',
  				'neutral-900': '#0D1117'
  			},
  			brand: {
  				primary: '#FF6B9D',
  				'primary-light': '#FF8FB3',
  				'primary-dark': '#E05A8A',
  				secondary: '#C66FBC',
  				'secondary-light': '#D68FD0',
  				'secondary-dark': '#B055A8',
  				accent: '#95E1D3',
  				'accent-light': '#A8E6DB',
  				'accent-dark': '#7DDCC5',
  				tertiary: '#87CEEB',
  				'tertiary-light': '#9BD4EE',
  				'tertiary-dark': '#70B8D1',
  				dark: '#2C3E50',
  				'dark-light': '#34495E',
  				'dark-dark': '#1A252F',
  				success: '#10B981',
  				warning: '#F59E0B',
  				error: '#EF4444',
  				info: '#3B82F6'
  			},
  			gradient: {
  				primary: 'linear-gradient(135deg, #FF6B9D 0%, #C66FBC 100%)',
  				secondary: 'linear-gradient(135deg, #95E1D3 0%, #87CEEB 100%)',
  				tertiary: 'linear-gradient(135deg, #FFE5EC 0%, #F0E5FF 100%)',
  				warm: 'linear-gradient(135deg, #FFF0E5 0%, #FFE5EC 100%)',
  				cool: 'linear-gradient(135deg, #E5F5F0 0%, #F0E5FF 100%)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-display)',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'monospace'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'9xl': [
  				'8rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem',
  			'144': '36rem'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			soft: '0 2px 15px 0 rgba(0, 0, 0, 0.1)',
  			'soft-lg': '0 10px 25px 0 rgba(0, 0, 0, 0.1)',
  			glow: '0 0 20px rgba(255, 107, 157, 0.3)',
  			'glow-lg': '0 0 40px rgba(255, 107, 157, 0.4)',
  			'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'float-delayed': 'float 8s ease-in-out infinite 2s',
  			glow: 'glow 2s ease-in-out infinite',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'slide-down': 'slideDown 0.5s ease-out',
  			'slide-in-left': 'slideInLeft 0.5s ease-out',
  			'slide-in-right': 'slideInRight 0.5s ease-out',
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
  			'bounce-soft': 'bounceSoft 0.6s ease-out',
  			shimmer: 'shimmer 2s linear infinite',
  			'gradient-x': 'gradientX 3s ease infinite',
  			'gradient-y': 'gradientY 3s ease infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			glow: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(100px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-100px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					transform: 'translateX(-100px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			slideInRight: {
  				'0%': {
  					transform: 'translateX(100px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			bounceSoft: {
  				'0%, 20%, 53%, 80%, 100%': {
  					transform: 'translate3d(0,0,0)'
  				},
  				'40%, 43%': {
  					transform: 'translate3d(0, -8px, 0)'
  				},
  				'70%': {
  					transform: 'translate3d(0, -4px, 0)'
  				},
  				'90%': {
  					transform: 'translate3d(0, -2px, 0)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			gradientX: {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			gradientY: {
  				'0%, 100%': {
  					backgroundPosition: '50% 0%'
  				},
  				'50%': {
  					backgroundPosition: '50% 100%'
  				}
  			}
  		},
  		transitionTimingFunction: {
  			'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}