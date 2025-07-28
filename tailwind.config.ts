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
				/* ===== SEMANTIC COLORS ===== */
				border: 'rgb(var(--border))',
				input: 'rgb(var(--input))',
				ring: 'rgb(var(--ring))',
				background: 'rgb(var(--background))',
				foreground: 'rgb(var(--foreground))',
				
				/* ===== BRAND COLORS ===== */
				primary: {
					DEFAULT: 'rgb(var(--primary))',
					foreground: 'rgb(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'rgb(var(--secondary))',
					foreground: 'rgb(var(--secondary-foreground))'
				},
				
				/* ===== STATUS COLORS ===== */
				success: {
					50: 'rgb(var(--success-50))',
					100: 'rgb(var(--success-100))',
					200: 'rgb(var(--success-200))',
					300: 'rgb(var(--success-300))',
					400: 'rgb(var(--success-400))',
					500: 'rgb(var(--success-500))',
					600: 'rgb(var(--success-600))',
					700: 'rgb(var(--success-700))',
					800: 'rgb(var(--success-800))',
					900: 'rgb(var(--success-900))',
					DEFAULT: 'rgb(var(--success-500))',
					foreground: 'rgb(var(--neutral-0))'
				},
				warning: {
					50: 'rgb(var(--warning-50))',
					100: 'rgb(var(--warning-100))',
					200: 'rgb(var(--warning-200))',
					300: 'rgb(var(--warning-300))',
					400: 'rgb(var(--warning-400))',
					500: 'rgb(var(--warning-500))',
					600: 'rgb(var(--warning-600))',
					700: 'rgb(var(--warning-700))',
					800: 'rgb(var(--warning-800))',
					900: 'rgb(var(--warning-900))',
					DEFAULT: 'rgb(var(--warning-500))',
					foreground: 'rgb(var(--neutral-0))'
				},
				error: {
					50: 'rgb(var(--error-50))',
					100: 'rgb(var(--error-100))',
					200: 'rgb(var(--error-200))',
					300: 'rgb(var(--error-300))',
					400: 'rgb(var(--error-400))',
					500: 'rgb(var(--error-500))',
					600: 'rgb(var(--error-600))',
					700: 'rgb(var(--error-700))',
					800: 'rgb(var(--error-800))',
					900: 'rgb(var(--error-900))',
					DEFAULT: 'rgb(var(--error-500))',
					foreground: 'rgb(var(--neutral-0))'
				},
				
				/* ===== NEUTRAL COLORS ===== */
				neutral: {
					0: 'rgb(var(--neutral-0))',
					50: 'rgb(var(--neutral-50))',
					100: 'rgb(var(--neutral-100))',
					200: 'rgb(var(--neutral-200))',
					300: 'rgb(var(--neutral-300))',
					400: 'rgb(var(--neutral-400))',
					500: 'rgb(var(--neutral-500))',
					600: 'rgb(var(--neutral-600))',
					700: 'rgb(var(--neutral-700))',
					800: 'rgb(var(--neutral-800))',
					900: 'rgb(var(--neutral-900))'
				},
				
				/* ===== BRAND SCALE ===== */
				brand: {
					50: 'rgb(var(--brand-50))',
					100: 'rgb(var(--brand-100))',
					200: 'rgb(var(--brand-200))',
					300: 'rgb(var(--brand-300))',
					400: 'rgb(var(--brand-400))',
					500: 'rgb(var(--brand-500))',
					600: 'rgb(var(--brand-600))',
					700: 'rgb(var(--brand-700))',
					800: 'rgb(var(--brand-800))',
					900: 'rgb(var(--brand-900))',
					DEFAULT: 'rgb(var(--brand-600))'
				},
				
				/* ===== COMPONENT COLORS ===== */
				destructive: {
					DEFAULT: 'rgb(var(--destructive))',
					foreground: 'rgb(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'rgb(var(--muted))',
					foreground: 'rgb(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'rgb(var(--accent))',
					foreground: 'rgb(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'rgb(var(--popover))',
					foreground: 'rgb(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'rgb(var(--card))',
					foreground: 'rgb(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'rgb(var(--sidebar-background))',
					foreground: 'rgb(var(--sidebar-foreground))',
					primary: 'rgb(var(--sidebar-primary))',
					'primary-foreground': 'rgb(var(--sidebar-primary-foreground))',
					accent: 'rgb(var(--sidebar-accent))',
					'accent-foreground': 'rgb(var(--sidebar-accent-foreground))',
					border: 'rgb(var(--sidebar-border))',
					ring: 'rgb(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-brand': 'var(--gradient-brand)',
				'gradient-success': 'var(--gradient-success)'
			},
			boxShadow: {
				'subtle': 'var(--shadow-xs)',
				'soft': 'var(--shadow-sm)',
				'medium': 'var(--shadow-md)',
				'strong': 'var(--shadow-lg)',
				'dramatic': 'var(--shadow-xl)'
			},
			transitionDuration: {
				'fast': '150ms',
				'normal': '200ms',
				'slow': '300ms'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
