module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'declaration-property-value-disallowed-list': {
      '/^(color|background|border(-color)?|outline-color)$/': [
        '/#([0-9a-f]{3}|[0-9a-f]{6})/i',
        '/rgb\\(/i',
        '/hsl\\(/i',
      ],
    },
    'declaration-property-value-allowed-list': {
      '/^(color|background|border(-color)?|outline-color)$/': ['/var\\(--[a-z-]+\\)/'],
    },
  },
};
