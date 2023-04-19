/** @type {import('tailwindcss').Config} */

const ldnColors = {
  core: {
    blue: {
      50: '#EEF5FB',
      100: '#E2EEF8',
      200: '#C5DCF2',
      300: '#A8CBEB',
      400: '#8BB9E5',
      500: '#6DA7DE',
      600: '#3787D2',
      700: '#2566A2',
      800: '#18446C',
      900: '#0C2236'
    },
    darkPink: {
      50: '#FADEEE',
      100: '#ECCCDE',
      200: '#D899BD',
      300: '#C5669B',
      400: '#B1337A',
      500: '#9E0059',
      600: '#800048',
      700: '#610037',
      800: '#3D0023',
      900: '#1F0011'
    },
    yellow: {
      50: '#FFF8BD',
      100: '#FEF18B',
      200: '#FCF169',
      300: '#F9F22F',
      400: '#F3E80B',
      500: '#DEE000',
      600: '#BBBE04',
      700: '#7D8400',
      800: '#505600',
      900: '#252800'
    },
    red: {
      50: '#FCE9E9',
      100: '#F8D3D3',
      200: '#F1A7A7',
      300: '#E97676',
      400: '#E34A4A',
      500: '#D82222',
      600: '#AC1B1B',
      700: '#801414',
      800: '#580E0E',
      900: '#2C0707'
    },
    green: {
      50: '#EFF6EF',
      100: '#DFECDF',
      200: '#BFDABE',
      300: '#9FC79E',
      400: '#7FB47E',
      500: '#5EA15D',
      600: '#4C814B',
      700: '#396138',
      800: '#264125',
      900: '#132013'
    },
    purple: {
      50: '#F4E9F7',
      100: '#EBD6F0',
      200: '#D8AEE0',
      300: '#C485D1',
      400: '#B05CC1',
      500: '#943FA6',
      600: '#773285',
      700: '#5A2664',
      800: '#3C1943',
      900: '#1E0D21'
    },
    turquoise: {
      50: '#F0F9F8',
      100: '#E1F4F1',
      200: '#C0E8E1',
      300: '#A2DCD3',
      400: '#81D0C3',
      500: '#63C5B5',
      600: '#40AB99',
      700: '#308275',
      800: '#20564D',
      900: '#112D28'
    },
    pink: {
      50: '#FFEBF8',
      100: '#FFD6F1',
      200: '#FFADE2',
      300: '#FF8AD6',
      400: '#FF61C8',
      500: '#FF38BA',
      600: '#E60B99',
      700: '#BD007B',
      800: '#7A0050',
      900: '#3D0028'
    },
    orange: {
      50: '#FDF2E8',
      100: '#FBE6D0',
      200: '#F7CFA6',
      300: '#F3B577',
      400: '#EF9E4D',
      500: '#EB861E',
      600: '#C56B11',
      700: '#914F0D',
      800: '#623609',
      900: '#2F1A04'
    },
    glaPink: {
      50: '#FDE7EF',
      100: '#FCD4E2',
      200: '#F8AAC5',
      300: '#F57BA5',
      400: '#F15088',
      500: '#EE266D',
      600: '#CB1052',
      700: '#970C3D',
      800: '#68082A',
      900: '#340415'
    },
    grey: {
      50: '#F5F5F5',
      100: '#EAEAEA',
      200: '#D7D8D9',
      300: '#AEB1B4',
      400: '#868B8E',
      500: '#515a5e',
      600: '#353D42', // LDN Grey
      700: '#2A3135', // BTN
      800: '#1B2021', // Dark Panel
      900: '#121516' // Dark App
    }
  },
  perceptual: {
    blue: {
      50: '#DBE5F1',
      100: '#BBD0E7',
      200: '#A0B8D8',
      300: '#87A2C3',
      400: '#718FAF',
      500: '#5E7997',
      600: '#4E667F',
      700: '#3E5166',
      800: '#313F4E',
      900: '#252C34'
    },
    darkPink: {
      50: '#E8CAD3',
      100: '#DFB3C1',
      200: '#D69DB0',
      300: '#CA869E',
      400: '#BE708E',
      500: '#B15B7D',
      600: '#A3456C',
      700: '#92325C',
      800: '#7E214C',
      900: '#63183B'
    },
    yellow: {
      50: '#F3ECAA',
      100: '#DCD76C',
      200: '#C5C251',
      300: '#AFAC3E',
      400: '#999833',
      500: '#84832B',
      600: '#6F6E24',
      700: '#5C5A20',
      800: '#49481C',
      900: '#363419'
    },
    red: {
      50: '#F9D0C7',
      100: '#F7B6A7',
      200: '#F09C8B',
      300: '#E68371',
      400: '#D76D5B',
      500: '#C55746',
      600: '#B04435',
      700: '#983327',
      800: '#7D271E',
      900: '#5D2219'
    },
    green: {
      50: '#D8E4D6',
      100: '#B7D0B5',
      200: '#9CBC99',
      300: '#83A780',
      400: '#6C926B',
      500: '#597D57',
      600: '#486846',
      700: '#385338',
      800: '#2C3D2A',
      900: '#212A20'
    },
    purple: {
      50: '#E2D1E5',
      100: '#D7B9DA',
      200: '#C8A2CE',
      300: '#B98BC0',
      400: '#A976B0',
      500: '#9862A0',
      600: '#854F8F',
      700: '#703F7A',
      800: '#5B3062',
      900: '#422548'
    },
    turquoise: {
      50: '#BFE2DB',
      100: '#9BCFC6',
      200: '#82BBB1',
      300: '#6DA79D',
      400: '#5C9389',
      500: '#4E7F76',
      600: '#426A63',
      700: '#365751',
      800: '#2B4440',
      900: '#23302E'
    },
    pink: {
      50: '#FCD5E9',
      100: '#FCB5D9',
      200: '#F397CA',
      300: '#E37BB7',
      400: '#CE64A2',
      500: '#B5508C',
      600: '#993F75',
      700: '#7B315F',
      800: '#5B2847',
      900: '#3C1E2F'
    },
    orange: {
      50: '#FADFCB',
      100: '#F6C39C',
      200: '#E6A877',
      300: '#D3935D',
      400: '#BC7E46',
      500: '#A46936',
      600: '#8B572A',
      700: '#6F4622',
      800: '#55351C',
      900: '#392618'
    },
    glaPink: {
      50: '#FAD2D8',
      100: '#FAB6C2',
      200: '#F59CAC',
      300: '#EB8298',
      400: '#DD6B85',
      500: '#CC5772',
      600: '#B64361',
      700: '#9E3451',
      800: '#832A42',
      900: '#642334'
    }
  },
  gla: {
    pink: {
      100: '#FCD4E2',
      200: '#F8A8C5',
      300: '#F57DA7',
      400: '#F1518A',
      500: '#EE266D'
    },
    cyan: {
      100: '#CCEFFC',
      200: '#99DFF9',
      300: '#66CEF5',
      400: '#33BEF2',
      500: '#00AEEF'
    },
    green: {
      100: '#CCE8DA',
      200: '#99D1B6',
      300: '#66BB91',
      400: '#33A46D',
      500: '#008D48'
    },
    yellow: {
      100: '#FFFCCC',
      200: '#FFFA99',
      300: '#FFF766',
      400: '#FFF533',
      500: '#FFF200'
    },
    orange: {
      100: '#FADDD0',
      200: '#F6BCA1',
      300: '#F19A71',
      400: '#ED7942',
      500: '#E85713'
    },
    red: {
      100: '#F9CCD1',
      200: '#F399A4',
      300: '#EC6676',
      400: '#E63349',
      500: '#E0001B'
    },
    darkPink: {
      100: '#ECCCDE',
      200: '#D899BD',
      300: '#C5669B',
      400: '#B1337A',
      500: '#9E0059'
    },
    blue: {
      100: '#CCDDE5',
      200: '#99BCCB',
      300: '#669AB1',
      400: '#337997',
      500: '#00577D'
    },
    mustard: {
      100: '#F8ECCC',
      200: '#F1D999',
      300: '#EAC666',
      400: '#E3B333',
      500: '#DCA000'
    },
    purple: {
      100: '#E4D5E7',
      200: '#C9ABD0',
      300: '#AF81B8',
      400: '#9456A1',
      500: '#792C89'
    },
    grey: {
      100: '#D7D8D9',
      200: '#AEB1B4',
      300: '#868B8E',
      400: '#5D6468',
      500: '#353D42'
    },
    black: {
      100: '#DADADA',
      200: '#B2B2B2',
      300: '#878787',
      400: '#575756',
      500: '#000000'
    }
  }
};

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: ldnColors
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')]
};

module.exports = config;
