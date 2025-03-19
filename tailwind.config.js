/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "./public/pages/*.md"],
  theme: {
  	extend: {
			fontFamily: {
				display: ['WarrenDisplay'],
				sans: ['WarrenText'],
				text: ['WarrenText']
			},
			fontSize: {
				// Display sizes
				'd1': ['160px', { lineHeight: '160px', letterSpacing: '0' }],
				'd2': ['104px', { lineHeight: '104px', letterSpacing: '0' }],
				'd3': ['64px', { lineHeight: '72px', letterSpacing: '0' }],
				// Heading sizes
				'h1': ['48px', { lineHeight: '56px', letterSpacing: '0' }],
				'h2': ['40px', { lineHeight: '48px', letterSpacing: '0' }],
				'h3': ['32px', { lineHeight: '40px', letterSpacing: '0' }],
				'h4': ['24px', { lineHeight: '32px', letterSpacing: '0' }],
				'h5': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
				'h6': ['19px', { lineHeight: '26px', letterSpacing: '0' }],
				// Paragraph sizes
				'p1': ['31px', { lineHeight: '40px', letterSpacing: '0' }],
				'p2': ['23px', { lineHeight: '32px', letterSpacing: '0' }],
				'p3': ['19px', { lineHeight: '28px', letterSpacing: '0' }],
				'p4': ['17px', { lineHeight: '26px', letterSpacing: '0' }],
			},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
        // Paleta Urucum
        urucum: {
          '100': '#F8EAE3', // #F8EAE3
          '200': '#E7C7C1', // #E7C7C1
          '300': '#D9A198', // #D9A198
          '400': '#CD7165', // #CD7165
          '500': '#C54F39', // #C54F39
          '600': '#A3402F', // #A3402F
          '700': '#834526', // #834526
          '800': '#502318', // #502318
        },
        // Paleta Duna
        duna: {
          '100': '#F5DED0', // #F5DED0
          '200': '#ECDEC5', // #ECDEC5
          '300': '#E2BEA0', // #E2BEA0
          '400': '#DBA370', // #DBA370
          '500': '#D3944E', // #D3944E
          '600': '#AC7B3F', // #AC7B3F
          '700': '#8C5233', // #8C5233
          '800': '#634524', // #634524
        },
        // Paleta Céu
        ceu: {
          '100': '#E3E8F3', // #E3E8F3
          '200': '#C3CFE5', // #C3CFE5
          '300': '#9CB3D7', // #9CB3D7
          '400': '#688EC7', // #688EC7
          '500': '#4079BF', // #4079BF
          '600': '#34639C', // #34639C
          '700': '#2B517F', // #2B517F
          '800': '#1E395A', // #1E395A
        },
        // Paleta Selva
        selva: {
          '100': '#EBEEE8', // #EBEEE8
          '200': '#C3D2C4', // #C3D2C4
          '300': '#9CB79F', // #9CB79F
          '400': '#6C986F', // #6C986F
          '500': '#41864C', // #41864C
          '600': '#35603E', // #35603E
          '700': '#2B5932', // #2B5932
          '800': '#1E3F25', // #1E3F25
        },
        // Cores Primárias Warren
        carvao: '#333131', // #333131
        terracota: '#C7452D', // #C7452D
        ouro: '#C7935A', // #C7935A
        linho: '#EBE7E6', // #EBE7E6
        
        // Cores adicionais do Warren WaaS
        'warren-gray': {
          '50': '#f9f9f9',
          '100': '#f3f3f3',
          '200': '#e9e9e9',
          '300': '#d9d9d9',
          '400': '#b8b8b8',
          '500': '#999999',
          '600': '#666666',
          '700': '#4d4d4d',
          '800': '#333333',
          '900': '#1a1a1a',
          '950': '#0d0d0d',
        }
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
