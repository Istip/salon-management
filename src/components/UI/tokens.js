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
    lightGrey: '#eee',

    error: '#ff3333',
    success: '#4da64d',
    warning: '#ffc04d',
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
    fontWeight: tokens.fontSize[900],
  },

  medium8: {
    fontWeight: tokens.fontSize[500],
    fontSize: '8px',
  },

  black12: {
    fontWeight: tokens.fontSize[900],
    fontSize: '12px',
  },

  black14: {
    fontWeight: tokens.fontSize[900],
    fontSize: '14px',
  },
};
