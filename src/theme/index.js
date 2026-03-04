

export const Colors = {
  // Backgrounds
  bgBase:     '#0c0e14',
  bgSurface:  '#13151f',
  bgElevated: '#1a1d2b',
  bgOverlay:  '#21253a',

  // Borders
  border:      '#2a2f45',
  borderFocus: '#6366f1',

  // Text
  textPrimary:   '#f0f2ff',
  textSecondary: '#8891b4',
  textMuted:     '#4d5480',

  // Accent / Brand
  accent:      '#6366f1',
  accentHover: '#4f52d6',
  accentLight: 'rgba(99,102,241,0.12)',
  accentGlow:  'rgba(99,102,241,0.25)',

  // Semantic
  success:   '#22c55e',
  successBg: 'rgba(34,197,94,0.10)',
  warning:   '#f59e0b',
  danger:    '#ef4444',
  dangerBg:  'rgba(239,68,68,0.10)',

  // Gradient stops
  gradientStart: '#6366f1',
  gradientEnd:   '#8b5cf6',
};

export const Typography = {
  // Font families — make sure these are linked via react-native-vector-icons / custom fonts
  fontRegular:  'System',
  fontMedium:   'System',
  fontSemiBold: 'System',
  fontBold:     'System',

  // Sizes
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  xxl:  28,
  xxxl: 34,
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
  xxxl:32,
  huge:40,
};

export const Radius = {
  sm:   6,
  md:   12,
  lg:   16,
  xl:   24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
};

