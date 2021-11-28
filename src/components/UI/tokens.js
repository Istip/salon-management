export const tokens = {
  colors: {
    primary: '#2a81e3',

    primaryLight1: '#599de9',
    primaryLight2: '#88b8ef',
    primaryLight3: '#b7d4f5',
    primaryLight4: '#e5f0fc',

    primaryDark1: '#2165b1',
    primaryDark2: '#18487f',
    primaryDark3: '#0e2c4d',
    primaryDark4: '#050f1b',

    white: '#f6fafe',
    darkGrey: '#111',
    mediumGrey: '#C2C3C4',
    lightGrey: '#eee',

    error: '#EB431E',
    success: '#26AA5B',
    warning: '#ffc04d',
    pink: '#FF8DA1',
  },

  fontSize: {
    100: 100,
    300: 300,
    400: 400,
    700: 700,
    900: 900,
  },
};

// 100 300 400 700 900

export const fonts = {
  h1: {
    fontSize: '3rem',
    letterSpacing: '-0.7px',
    fontWeight: tokens.fontSize[100],
  },

  h2: {
    letterSpacing: '-0.7px',
    fontWeight: tokens.fontSize[700],
  },

  h3: {
    letterSpacing: '-0.7px',
    fontWeight: tokens.fontSize[900],
  },

  regular12: {
    fontWeight: tokens.fontSize[400],
    fontSize: '12px',
  },

  regular14: {
    fontWeight: tokens.fontSize[400],
    fontSize: '14px',
  },

  medium8: {
    fontWeight: tokens.fontSize[700],
    fontSize: '8px',
  },

  medium10: {
    fontWeight: tokens.fontSize[700],
    fontSize: '10px',
  },

  medium12: {
    fontWeight: tokens.fontSize[700],
    fontSize: '12px',
  },

  medium14: {
    fontWeight: tokens.fontSize[700],
    fontSize: '14px',
  },

  black10: {
    fontWeight: tokens.fontSize[900],
    fontSize: '10px',
  },

  black12: {
    fontWeight: tokens.fontSize[900],
    fontSize: '12px',
  },

  black14: {
    fontWeight: tokens.fontSize[900],
    fontSize: '14px',
  },

  black18: {
    fontWeight: tokens.fontSize[900],
    fontSize: '18px',
  },
};
